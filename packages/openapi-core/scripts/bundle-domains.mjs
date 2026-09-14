#!/usr/bin/env node
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', '.bundled');
mkdirSync(outDir, { recursive: true });

const domains = ['identity', 'queues', 'routing', 'vendors', 'portfolio'];

for (const domain of domains) {
  for (const [ext, flag] of [
    ['openapi.yaml', 'yaml'],
    ['json', 'json'],
  ]) {
    const output = join(outDir, `${domain}.${ext === 'json' ? 'json' : 'openapi.yaml'}`);
    // redocly uses api name from .redocly.yaml
    const r = spawnSync(
      'pnpm',
      ['exec', 'redocly', 'bundle', domain, '--output', output],
      { cwd: root, stdio: 'inherit', shell: false }
    );
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
  console.log(`bundled ${domain}`);
}
