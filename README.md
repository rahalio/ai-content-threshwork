# Threshwork

OpenAPI-first **DDD** monorepo for **Threshwork** — an automation portfolio control plane for content operations (queues, thresholds, vendor shadowing, benefit metering). Built on the zero-apps codegen scaffold with package scope **`@ddd/*`**.

Product pack: [`PRODUCT.md`](PRODUCT.md) · web app: [`WEB-APP-SPEC.md`](WEB-APP-SPEC.md) · seed skeleton: [`openapi.yaml`](openapi.yaml) · codegen contracts: [`packages/openapi-core/src/`](packages/openapi-core/src/).

## Domains

| Domain | OpenAPI | Responsibility |
|--------|---------|----------------|
| `identity` | `identity.yaml` | API keys, operator users, auth stubs |
| `queues` | `queues.yaml` | Registry, policy pin, scorecards, thresholds, automation approval |
| `routing` | `routing.yaml` | Work items, rights, routing, review, appeals, response clocks |
| `vendors` | `vendors.yaml` | Connectors, evaluations, golden sets, cutover |
| `portfolio` | `portfolio.yaml` | Benefits, egress, exposure, roadmap |

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: ddd_demo_local_dev_key

pnpm codegen:webapp   # generate console clients + feature stubs
pnpm dev:web          # Next console → http://127.0.0.1:3000
```

Product domain list smoke (requires Dynamo Local + `TABLE_NAME`):

```bash
curl -H "X-API-Key: ddd_demo_local_dev_key" http://127.0.0.1:4000/v1/queues
curl -H "X-API-Key: ddd_demo_local_dev_key" http://127.0.0.1:4000/v1/work-items
curl -H "X-API-Key: ddd_demo_local_dev_key" http://127.0.0.1:4000/v1/vendors
curl -H "X-API-Key: ddd_demo_local_dev_key" http://127.0.0.1:4000/v1/roadmap
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=ddd-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
TABLE_NAME=ddd-core-local AWS_ENDPOINT_URL=http://localhost:8000 AWS_REGION=us-east-1 pnpm dev:api
```

## Codegen

```bash
pnpm codegen:product   # Mode A: queues + routing + vendors + portfolio (all layers)
pnpm codegen:core      # Mode B default after YAML edits: core only for all domains
pnpm codegen:queues    # single-domain full generate
```

Config: [`.codegen/.zero-codegen-merged.json`](.codegen/.zero-codegen-merged.json)  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

### Rules (agents)

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See [`.cursor/skills/`](.cursor/skills/) and [`docs/CODEGEN.md`](docs/CODEGEN.md).
