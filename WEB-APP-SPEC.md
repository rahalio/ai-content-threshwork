# Threshwork — Web App Specification

**Product:** Threshwork  
**Surface:** Operator console (`platform/webapp`)  
**Audience:** Content ops director, queue manager, review agent, vendor/sourcing manager, policy/regulatory lead  

## Positioning (UX)

Industrial **control plane**, not marketing SaaS. The first question the UI answers is: *where does the machine stop and the human start — per queue, by impact tier, with evidence?*

## Market UX findings

- **Hive Moderation** — Thresholds map confidence → policy categories → auto-act vs Review Feed; separate appeals. Docs: [Thresholds](https://docs.thehive.ai/docs/thresholds), [Review Feeds](https://docs.thehive.ai/docs/post-review-feed-1), [Appeals](https://docs.thehive.ai/docs/handle-appeals).
- **Alice (ex-ActiveFence / Spectrum Labs)** — Runtime guardrails + continuous eval/drift as first-class nav ([alice.io](https://alice.io/)).
- **Besedo** — Policy rule editor beside ops KPIs (automation %, time-to-live) ([besedo.com](https://besedo.com/)).
- **Prodigy** — Binary accept/reject of a *proposal*; prefer uncertain scores ([prodi.gy docs](https://prodi.gy/docs/recipes)).
- **Labelbox / Nucleus / ML monitors** — Bake-off on *your* golden labels + shadow traffic; confusion by slice, not vendor hero charts.
- **ServiceNow-style ops** — SLA clocks pre-empt priority; breach risk sorts the inbox.
- **Platform appeals (YouTube/Meta public patterns)** — Appeal ≠ same review queue; different adjudicator.
- **Exposure / wellbeing** — Caps and self view; never peer league tables of graphic volume.

## Information architecture

### Primary nav

| Nav | Route prefix | Emphasize for |
| --- | --- | --- |
| Portfolio | `/` , `/portfolio/*` | Ops director |
| Queues | `/queues` | Queue manager, policy |
| Work | `/work` | Review agent, queue manager |
| Vendors | `/vendors` | Sourcing |
| Settings | `/settings` | Admin |

Role-aware future: hide Vendors/Governance depth from agents; default home by role.

### Extended screens (v1.1)

Clocks (`/work/clocks`), Governance (queue hub tab), Exposure (`/portfolio/exposure`), Appeals (`/work/appeals`) — reachable from Work/Portfolio before promoting to top-level nav.

## Design system

### Theme & spirit

- **Name signal:** “Threshwork” is hero-level in shell + login (brand first).
- **Surfaces:** Cool paper / graphite ink; faint threshold rail accent (amber); steel blue interactive accent — not purple, not cream+terracotta, not broadsheet.
- **Density:** Compact tables (12–13px UI), sticky filters; workbench = large content pane + tight chrome.
- **Type:** Source Serif 4 (display) · IBM Plex Sans (UI) · IBM Plex Mono (scores, IDs, clocks).
- **Motion:** fade-up on page entry; pulse on threshold rail (login); avoid glow noise.

### Semantics

| Token | Meaning |
| --- | --- |
| Impact tier T0–T3 | Left rail weight / ink strength — not rainbow pills |
| Teal / accent band | Machine-final OK above threshold |
| Threshold amber | Human required / near breach |
| Rose / fail | Rights block, clock breach, suspended automation |
| Neutral pills | draft · shadow · live · suspended |

### Patterns to copy / avoid

**Copy:** threshold matrix (tier × floor × sample × fallback); workbench proposal+confidence+evidence+clock; vendor dual-column shadow; portfolio realised/promised; separate appeals; exposure progress-to-cap.

**Avoid:** vendor-benchmark hero charts; cards-for-everything; mixing appeals into live review; one global confidence slider; peer exposure ranks.

## Screen inventory

### Portfolio

| Route | Purpose | API | Key UI |
| --- | --- | --- | --- |
| `/` | Sponsor home | `listRoadmapEntries`, benefits summary | Ranked queues, benefit vs case, scorecard age |
| `/portfolio/roadmap` | Re-score history | `listRoadmapEntries`, `rescoreRoadmap` | Triggers, change log, re-score CTA |
| `/portfolio/egress` | Egress register | `listEgressRecords` | Queue/vendor/period filters |
| `/portfolio/exposure` | Agent exposure | `getExposureLedger` | Cap vs hours; wellbeing tone |

### Queues

| Route | Purpose | API | Key UI |
| --- | --- | --- | --- |
| `/queues` | Registry | `listQueues`, `registerQueue` | Tier + automation filters |
| `/queues/[id]` | Hub | `getQueue`, scorecard, threshold, approval | Tabs: overview / scorecard / threshold / governance |
| `/queues/[id]/scorecard` | Score | `getQueueScorecard`, `scoreQueue` | Weightings locked before scores |
| `/queues/[id]/threshold` | Floors | `getThresholdPolicy`, `setThresholdPolicy` | Tier floor banner |
| `/queues/[id]/governance` | Approve automation | `decideAutomationApproval` | Approve / refuse / suspend / revert + reason |

### Work

| Route | Purpose | API | Key UI |
| --- | --- | --- | --- |
| `/work` | Inbox | `listWorkItems` | Clock-sorted; state filters |
| `/work/[id]` | Item + review | `getRoutingDecision`, `getRightsRecord`, `recordHumanReview` | Proposal + evidence; rights gate |
| `/work/appeals` | Appeals | `listAppeals`, `resolveAppeal` | Second-human adjudication |
| `/work/clocks` | SLA / statutory | `listResponseClocks`, `preemptResponseClock` | At-risk first |

### Vendors

| Route | Purpose | API | Key UI |
| --- | --- | --- | --- |
| `/vendors` | Connectors | `listVendorConnectors` | Capability filter |
| `/vendors/evaluations` | Shadow bake-offs | `listVendorEvaluations`, `startVendorEvaluation` | Own golden set accuracy |
| `/vendors/golden-sets` | Labelled samples | `listGoldenSets` | Per-queue scope |
| `/vendors/cutover` | Traffic cutover | `cutoverVendorTraffic` | Rollback window |

### Settings

| Route | Purpose | API |
| --- | --- | --- |
| `/login` | Auth | `operatorLogin` / API key |
| `/settings` | Hub | — |
| `/settings/api-keys` | Keys | `listTenantApiKeys`, create/revoke |
| `/settings/users` | Operators | `listTenantUsers`, enable/disable |

## Key flows

1. **Score → unlock automation:** Portfolio/Queues → weightings locked → score → assign tier → Policy approves → eligible.
2. **Set tier threshold:** Queues → threshold policy → floor/sample/escalation → versioned save.
3. **Agent review:** Work → clock-sorted item → proposal+evidence → accept / override / escalate → exposure updates.
4. **Vendor shadow bake-off:** Vendors → golden set → shadow → compare → cutover with fallback.
5. **Drift pullback:** Calibration miss → tighten/suspend machine-final → human lane → sponsor log.
6. **Appeal:** Separate queue → different reviewer → overturn feeds calibration.
7. **Clock pre-empt:** At-risk item jumps inbox; breach/clear recorded.

## Entity → UI map

| Entity | List | Detail / action |
| --- | --- | --- |
| Queue | `/queues` | Hub + score/threshold/governance |
| QueueScorecard | Hub / scorecard | Score form |
| ThresholdPolicy | — | Threshold screen |
| WorkItem | `/work` | Item workbench |
| Appeal | `/work/appeals` | Resolve |
| ResponseClock | `/work/clocks` | Preempt |
| VendorConnector / Evaluation / GoldenSet | `/vendors*` | Shadow / cutover |
| BenefitRecord / RoadmapEntry / Egress / Exposure | Portfolio | Meter / re-score / audit |

## Implementation notes

- Shell: Next.js 14 App Router under `platform/webapp`.
- Clients: OpenAPI-aligned services in `src/services/domains/*` (codegen feature stubs + rewritten operationId clients).
- Custom UI in `app/` and `features/*/components`; regenerate-owned clients stay in services.
- Auth: API key (demo `ddd_demo_local_dev_key`) or operator JWT against `api-server :4000`.

## Sources

- Seed thesis: [PRODUCT.md](PRODUCT.md) (Accenture AI in Content Services)
- Hive Moderation docs (thresholds, review feeds, appeals)
- Alice / ActiveFence product positioning
- Besedo hybrid moderation KPIs
- Prodigy HITL recipes
- Labelbox / ML monitoring bake-off patterns
- Industry T&S wellbeing / exposure-cap practice
