/**
 * Portfolio Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/portfolio.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BenefitRecord = components["schemas"]["BenefitRecord"];
export type EgressRecord = components["schemas"]["EgressRecord"];
export type EgressRecordListData = components["schemas"]["EgressRecordListData"];
export type ExposureLedgerEntry = components["schemas"]["ExposureLedgerEntry"];
export type ExposureLedgerListData = components["schemas"]["ExposureLedgerListData"];
export type RoadmapEntry = components["schemas"]["RoadmapEntry"];
export type RoadmapEntryListData = components["schemas"]["RoadmapEntryListData"];
export type RoadmapRescoreRequest = components["schemas"]["RoadmapRescoreRequest"];
export type Roadmap = operations["listRoadmapEntries"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RescoreRoadmapRequestInput = NonNullable<operations["rescoreRoadmap"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetBenefitRecordParams = NonNullable<operations["getBenefitRecord"]["parameters"]["query"]>;
export type ListEgressRecordsParams = NonNullable<operations["listEgressRecords"]["parameters"]["query"]>;
export type GetExposureLedgerParams = operations["getExposureLedger"]["parameters"]["path"];
export type ListRoadmapEntriesParams = NonNullable<operations["listRoadmapEntries"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetBenefitRecordResponse = operations["getBenefitRecord"]["responses"]["200"]["content"]["application/json"];
export type ListEgressRecordsResponse = operations["listEgressRecords"]["responses"]["200"]["content"]["application/json"];
export type GetExposureLedgerResponse = operations["getExposureLedger"]["responses"]["200"]["content"]["application/json"];
export type ListRoadmapEntriesResponse = operations["listRoadmapEntries"]["responses"]["200"]["content"]["application/json"];
export type RescoreRoadmapResponse = operations["rescoreRoadmap"]["responses"]["202"]["content"]["application/json"];


