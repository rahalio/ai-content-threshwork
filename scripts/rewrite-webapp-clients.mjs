#!/usr/bin/env node
/**
 * Replace buggy webapp codegen service/hook output with operationId-named clients
 * that call Threshwork /v0|/v1 paths directly (envelope-aware via unwrap).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundled = path.join(root, 'packages/openapi-core/src/.bundled');
const outBase = path.join(root, 'platform/webapp/src/services/domains');

function loadOps(domain) {
  const jsonPath = path.join(bundled, `${domain}.json`);
  const spec = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const ops = [];
  for (const [p, methods] of Object.entries(spec.paths || {})) {
    for (const [method, op] of Object.entries(methods)) {
      if (!op || typeof op !== 'object' || !op.operationId) continue;
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
      const pathParams = [...p.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
      ops.push({
        operationId: op.operationId,
        method: method.toUpperCase(),
        path: p,
        pathParams,
        summary: op.summary || op.operationId,
      });
    }
  }
  return ops;
}

function pascal(s) {
  return s.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
}

function writeDomain(domain) {
  const ops = loadOps(domain);
  const dir = path.join(outBase, domain);
  fs.mkdirSync(path.join(dir, 'hooks'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'contracts'), { recursive: true });

  const methods = ops
    .map((op) => {
      const params = [
        ...op.pathParams.map((p) => `${p}: string`),
        op.method === 'GET' || op.method === 'DELETE'
          ? 'params?: Record<string, string | number | boolean | undefined>'
          : 'body?: unknown',
        'signal?: AbortSignal',
      ].join(', ');

      let urlExpr = `\`${op.path.replace(/\{(\w+)\}/g, '${$1}')}\``;
      const call =
        op.method === 'GET' || op.method === 'DELETE'
          ? `apiClient.${op.method.toLowerCase()}(${urlExpr}, { params, signal })`
          : `apiClient.${op.method.toLowerCase()}(${urlExpr}, { body, signal })`;

      return `  /** ${op.summary} */
  async ${op.operationId}(${params}) {
    return unwrap(${call});
  }`;
    })
    .join(',\n\n');

  const service = `/**
 * ${pascal(domain)} Service — handwritten client over OpenAPI (post-codegen).
 */
import { apiClient } from '@/services/shared/infrastructure';
import { makeService } from '@/services/shared/infrastructure/service-wrapper';
import { unwrap } from '@/services/shared/http';

const raw = {
${methods}
};

export const ${domain}Service = makeService(raw, '${domain}');
`;

  const facadeMethods = ops
    .map(
      (op) => `  ${op.operationId}: (...args: Parameters<typeof ${domain}Service.${op.operationId}>) =>
    ${domain}Service.${op.operationId}(...args)`,
    )
    .join(',\n');

  const facade = `/**
 * ${pascal(domain)} Facade
 */
import { ${domain}Service } from './${domain}.service';

export const ${domain}Facade = {
${facadeMethods}
};
`;

  const queryOps = ops.filter((o) => o.method === 'GET');
  const mutationOps = ops.filter((o) => o.method !== 'GET');

  const queries = `/**
 * ${pascal(domain)} query hooks
 */
import { useQuery } from '@tanstack/react-query';
import { ${domain}Service } from '../${domain}.service';

${queryOps
  .map((op) => {
    const args = op.pathParams.map((p) => `${p}: string`).join(', ');
    const keyParts = [`'${domain}'`, `'${op.operationId}'`, ...op.pathParams];
    const callArgs = [...op.pathParams, 'undefined', 'signal'].join(', ');
    const enabled =
      op.pathParams.length > 0
        ? `,\n    enabled: Boolean(${op.pathParams.join(' && ')})`
        : '';
    return `export function use${pascal(op.operationId)}(${args}${args ? ', ' : ''}options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [${keyParts.join(', ')}],
    queryFn: ({ signal }) => ${domain}Service.${op.operationId}(${callArgs}),
    ...options${enabled}
  });
}`;
  })
  .join('\n\n')}
`;

  const mutations = `/**
 * ${pascal(domain)} mutation hooks
 */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ${domain}Service } from '../${domain}.service';

${mutationOps
  .map((op) => {
    const pathArgs = op.pathParams.map((p) => `${p}: string`).join('; ');
    const varsType =
      op.method === 'DELETE'
        ? `{ ${pathArgs}${pathArgs ? '; ' : ''}params?: Record<string, string | number | boolean | undefined> }`
        : `{ ${pathArgs}${pathArgs ? '; ' : ''}body?: unknown }`;
    return `export function use${pascal(op.operationId)}() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: ${varsType}) =>
      ${domain}Service.${op.operationId}(${[
      ...op.pathParams.map((p) => `vars.${p}`),
      op.method === 'DELETE' ? 'vars.params' : 'vars.body',
    ].join(', ')}),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['${domain}'] });
    },
  });
}`;
  })
  .join('\n\n')}
`;

  const hooksIndex = `export * from './queries';
export * from './mutations';
`;

  const index = `export { ${domain}Service } from './${domain}.service';
export { ${domain}Facade } from './facade';
export * from './hooks';
`;

  const contracts = `/** Contracts stub for ${domain} */
export const ${domain}Schemas = {} as const;
`;

  const apiTypes = `/** API types placeholder for ${domain} */
export type ${pascal(domain)}ApiPlaceholder = Record<string, unknown>;
`;

  fs.writeFileSync(path.join(dir, `${domain}.service.ts`), service);
  fs.writeFileSync(path.join(dir, 'facade.ts'), facade);
  fs.writeFileSync(path.join(dir, 'hooks/queries.ts'), queries);
  fs.writeFileSync(path.join(dir, 'hooks/mutations.ts'), mutations);
  fs.writeFileSync(path.join(dir, 'hooks/index.ts'), hooksIndex);
  fs.writeFileSync(path.join(dir, 'index.ts'), index);
  fs.writeFileSync(path.join(dir, 'contracts', `${domain}.zod.schema.ts`), contracts);
  fs.writeFileSync(path.join(dir, 'contracts', 'index.ts'), `export * from './${domain}.zod.schema';\n`);
  fs.writeFileSync(path.join(dir, `${domain}.api-types.ts`), apiTypes);
  console.log('rewrote', domain, ops.length, 'ops');
}

for (const d of ['identity', 'queues', 'routing', 'vendors', 'portfolio']) {
  writeDomain(d);
}
