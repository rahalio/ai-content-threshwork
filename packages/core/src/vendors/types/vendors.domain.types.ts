/**
 * Vendors Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/vendors.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EvaluationId = components["schemas"]["EvaluationId"];
export type GoldenSet = components["schemas"]["GoldenSet"];
export type GoldenSetId = components["schemas"]["GoldenSetId"];
export type GoldenSetListData = components["schemas"]["GoldenSetListData"];
export type QueueCutoverResult = components["schemas"]["QueueCutoverResult"];
export type VendorCapability = components["schemas"]["VendorCapability"];
export type VendorConnector = components["schemas"]["VendorConnector"];
export type VendorConnectorCreate = components["schemas"]["VendorConnectorCreate"];
export type VendorConnectorListData = components["schemas"]["VendorConnectorListData"];
export type VendorEvaluation = components["schemas"]["VendorEvaluation"];
export type VendorEvaluationCreate = components["schemas"]["VendorEvaluationCreate"];
export type VendorEvaluationListData = components["schemas"]["VendorEvaluationListData"];
export type VendorId = components["schemas"]["VendorId"];
export type VendorCutoverRequest = components["schemas"]["VendorCutoverRequest"];
export type Vendor = operations["listVendorConnectors"]["responses"]["200"]["content"]["application/json"]["data"];
export type Evaluation = operations["listVendorEvaluations"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterVendorConnectorRequestInput = NonNullable<operations["registerVendorConnector"]["requestBody"]>["content"]["application/json"];
export type StartVendorEvaluationRequestInput = NonNullable<operations["startVendorEvaluation"]["requestBody"]>["content"]["application/json"];
export type CutoverVendorTrafficRequestInput = NonNullable<operations["cutoverVendorTraffic"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListVendorConnectorsParams = NonNullable<operations["listVendorConnectors"]["parameters"]["query"]>;
export type ListVendorEvaluationsParams = NonNullable<operations["listVendorEvaluations"]["parameters"]["query"]>;
export type StartVendorEvaluationParams = operations["startVendorEvaluation"]["parameters"]["path"];
export type CutoverVendorTrafficParams = operations["cutoverVendorTraffic"]["parameters"]["path"];
export type ListGoldenSetsParams = NonNullable<operations["listGoldenSets"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListVendorConnectorsResponse = operations["listVendorConnectors"]["responses"]["200"]["content"]["application/json"];
export type RegisterVendorConnectorResponse = operations["registerVendorConnector"]["responses"]["201"]["content"]["application/json"];
export type ListVendorEvaluationsResponse = operations["listVendorEvaluations"]["responses"]["200"]["content"]["application/json"];
export type StartVendorEvaluationResponse = operations["startVendorEvaluation"]["responses"]["202"]["content"]["application/json"];
export type CutoverVendorTrafficResponse = operations["cutoverVendorTraffic"]["responses"]["202"]["content"]["application/json"];
export type ListGoldenSetsResponse = operations["listGoldenSets"]["responses"]["200"]["content"]["application/json"];


