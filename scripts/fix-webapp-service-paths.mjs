#!/usr/bin/env node
/**
 * Post-process generated webapp domain services/facades:
 * 1. Rewrite /orgs/${orgId}/… URLs to Threshwork /v0|/v1/…
 * 2. Insert missing commas between object-literal methods (codegen bug)
 * 3. Drop unused imports that break type-check
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const domainsDir = path.join(root, 'platform/webapp/src/services/domains');

if (!fs.existsSync(domainsDir)) {
  console.log('No webapp domains dir; skip path fix');
  process.exit(0);
}

function fixCommasInObjectLiteral(src) {
  // After a method body `  }` that is followed by blank lines then another
  // method/comment at indent 2, insert a comma: `  },`
  return src.replace(/^  \}(\n\n(?:  \/\*\*|  async |  [a-zA-Z]))/gm, '  },$1');
}

function fixServiceOrFacade(filePath) {
  let src = fs.readFileSync(filePath, 'utf8');
  const before = src;

  src = src.replace(
    /\n\s*const orgId = getEffectiveOrgId\(\);\n\s*if \(!orgId\) \{\n\s*throw new Error\("Organization ID is required"\);\n\s*\}\n/g,
    '\n',
  );
  src = src.replace(/\/orgs\/\$\{orgId\}\//g, '/');
  src = src.replace(/`\/\/+/g, '`/');
  src = src.replace(/'\/\/+/g, "'/");
  src = src.replace(/"\/\/+/g, '"/');

  if (!src.includes('getEffectiveOrgId(')) {
    src = src.replace(
      /import \{ getEffectiveOrgId \} from "@\/services\/shared\/infrastructure\/tenant-state";\n/,
      '',
    );
  }

  if (
    src.includes('formatValidationError') &&
    !src.includes('formatValidationError(')
  ) {
    src = src.replace(
      /import \{ validateApiResponse, formatValidationError \} from "@\/services\/shared\/contracts";/,
      'import { validateApiResponse } from "@/services/shared/contracts";',
    );
  }
  if (
    src.includes('validateApiResponse') &&
    !src.includes('validateApiResponse(')
  ) {
    src = src.replace(
      /import \{ validateApiResponse \} from "@\/services\/shared\/contracts";\n/,
      '',
    );
  }

  src = fixCommasInObjectLiteral(src);

  if (src !== before) {
    fs.writeFileSync(filePath, src);
    console.log('fixed:', path.relative(root, filePath));
  }
}

function stubContracts(domain) {
  const contractsDir = path.join(domainsDir, domain, 'contracts');
  const zodFile = path.join(contractsDir, `${domain}.zod.schema.ts`);
  if (!fs.existsSync(zodFile)) return;
  // Generated contracts try to re-export non-existent @ddd/core/{domain}Schemas.
  // Replace with a safe stub so the barrel compiles.
  const stub = `/**
 * ${domain} domain contracts (stub)
 * Hand-maintained until core exports a schemas namespace for webapp re-use.
 */
export const ${domain}Schemas = {} as const;
`;
  fs.writeFileSync(zodFile, stub);

  const indexFile = path.join(contractsDir, 'index.ts');
  if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(
      indexFile,
      `export * from "./${domain}.zod.schema";\n`,
    );
  }
  console.log('stubbed contracts:', domain);
}

for (const domain of fs.readdirSync(domainsDir)) {
  const dir = path.join(domainsDir, domain);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const name of [`${domain}.service.ts`, 'facade.ts']) {
    const file = path.join(dir, name);
    if (fs.existsSync(file)) fixServiceOrFacade(file);
  }

  stubContracts(domain);

  // api-types often has empty export type { } which is invalid — fix
  const apiTypes = path.join(dir, `${domain}.api-types.ts`);
  if (fs.existsSync(apiTypes)) {
    let t = fs.readFileSync(apiTypes, 'utf8');
    if (/export type \{\s*\}/.test(t) || /export type \{\s*\/\/[^\n]*\n\s*\}/.test(t)) {
      t = `/** API types for ${domain} — extend when wiring typed clients */\nexport type ${domain.charAt(0).toUpperCase() + domain.slice(1)}ApiPlaceholder = Record<string, unknown>;\n`;
      fs.writeFileSync(apiTypes, t);
      console.log('fixed api-types:', domain);
    }
  }

  // index.ts may export empty type block — soften
  const indexFile = path.join(dir, 'index.ts');
  if (fs.existsSync(indexFile)) {
    let idx = fs.readFileSync(indexFile, 'utf8');
    const cleaned = idx.replace(
      /export type \{\s*\/\/[^\n]*\n\s*\} from '\.\/[^']+';\n?/g,
      '',
    );
    if (cleaned !== idx) {
      fs.writeFileSync(indexFile, cleaned);
      console.log('fixed barrel:', domain);
    }
  }
}
