# Codegen guide

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:identity   # full identity scaffold (starter)
pnpm codegen:webapp     # webapp services + features for identity + product domains
pnpm dev:web            # Next console on :3000 (API on :4000)
```

### Webapp layer

- Config: `layers.webapp.services|features.enabled` in `.codegen/.zero-codegen-merged.json`
- Output: `platform/webapp/src/services/domains/{domain}/` and `platform/webapp/src/features/{domain}/`
- Post-step: `scripts/rewrite-webapp-clients.mjs` rebuilds operationId-named clients/hooks on correct `/v0|/v1` paths (codegen feature stubs remain; raw codegen service objects need this rewrite for Threshwork)
- Custom UI lives in `app/` and `features/*/components` — regenerate-owned clients/hooks stay in `services/domains`

Config: `.codegen/.zero-codegen-merged.json`  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## OpenAPI sample shape

- `packages/openapi-core/src/common/` — envelopes, problem, security, parameters, primitives
- `packages/openapi-core/src/identity.yaml` — live sample domain
- `.codegen/openapi-examples/` — teaching specs (not wired to Redocly)

## Shared vs product

| Shared (keep) | Product (add in consumer) |
|---------------|---------------------------|
| `_shared` dirs, middleware, messaging | Domain YAML + generated trees |
| Identity domain | Invoice / orders / … domains |
| Envelope + Problem contracts | Domain-specific schemas |

## Related skills

- `ddd-platform` — architecture & anti-drift
- `ddd-codegen` — pipeline commands
- `ddd-identity` — auth blueprint
