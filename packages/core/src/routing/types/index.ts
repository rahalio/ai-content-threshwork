/**
 * Routing Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/routing.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Appeal = components["schemas"]["Appeal"];
export type AppealCreate = components["schemas"]["AppealCreate"];
export type AppealId = components["schemas"]["AppealId"];
export type AppealListData = components["schemas"]["AppealListData"];
export type ClockId = components["schemas"]["ClockId"];
export type ClockType = components["schemas"]["ClockType"];
export type ContentType = components["schemas"]["ContentType"];
export type DecisionAction = components["schemas"]["DecisionAction"];
export type HumanReview = components["schemas"]["HumanReview"];
export type HumanReviewCreate = components["schemas"]["HumanReviewCreate"];
export type HumanReviewListData = components["schemas"]["HumanReviewListData"];
export type ReviewId = components["schemas"]["ReviewId"];
export type RightsRecord = components["schemas"]["RightsRecord"];
export type RoutingDecision = components["schemas"]["RoutingDecision"];
export type WorkItem = components["schemas"]["WorkItem"];
export type WorkItemCreate = components["schemas"]["WorkItemCreate"];
export type WorkItemId = components["schemas"]["WorkItemId"];
export type WorkItemListData = components["schemas"]["WorkItemListData"];
export type WorkItemOrigin = components["schemas"]["WorkItemOrigin"];
export type WorkItemState = components["schemas"]["WorkItemState"];
export type AppealResolveRequest = components["schemas"]["AppealResolveRequest"];
export type ResponseClock = components["schemas"]["ResponseClock"];
export type ResponseClockListData = components["schemas"]["ResponseClockListData"];
export type CalibrationSample = operations["listCalibrationSamples"]["responses"]["200"]["content"]["application/json"]["data"];

// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitWorkItemRequestInput = NonNullable<operations["submitWorkItem"]["requestBody"]>["content"]["application/json"];
export type RecordHumanReviewRequestInput = NonNullable<operations["recordHumanReview"]["requestBody"]>["content"]["application/json"];
export type OpenAppealRequestInput = NonNullable<operations["openAppeal"]["requestBody"]>["content"]["application/json"];
export type ResolveAppealRequestInput = NonNullable<operations["resolveAppeal"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListWorkItemsParams = NonNullable<operations["listWorkItems"]["parameters"]["query"]>;
export type GetRoutingDecisionParams = operations["getRoutingDecision"]["parameters"]["path"];
export type GetRightsRecordParams = operations["getRightsRecord"]["parameters"]["path"];
export type RecordHumanReviewParams = operations["recordHumanReview"]["parameters"]["path"];
export type ListCalibrationSamplesParams = NonNullable<operations["listCalibrationSamples"]["parameters"]["query"]>;
export type ListAppealsParams = NonNullable<operations["listAppeals"]["parameters"]["query"]>;
export type ResolveAppealParams = operations["resolveAppeal"]["parameters"]["path"];
export type ListResponseClocksParams = NonNullable<operations["listResponseClocks"]["parameters"]["query"]>;
export type PreemptResponseClockParams = operations["preemptResponseClock"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListWorkItemsResponse = operations["listWorkItems"]["responses"]["200"]["content"]["application/json"];
export type SubmitWorkItemResponse = operations["submitWorkItem"]["responses"]["202"]["content"]["application/json"];
export type GetRoutingDecisionResponse = operations["getRoutingDecision"]["responses"]["200"]["content"]["application/json"];
export type GetRightsRecordResponse = operations["getRightsRecord"]["responses"]["200"]["content"]["application/json"];
export type RecordHumanReviewResponse = operations["recordHumanReview"]["responses"]["201"]["content"]["application/json"];
export type ListCalibrationSamplesResponse = operations["listCalibrationSamples"]["responses"]["200"]["content"]["application/json"];
export type ListAppealsResponse = operations["listAppeals"]["responses"]["200"]["content"]["application/json"];
export type OpenAppealResponse = operations["openAppeal"]["responses"]["201"]["content"]["application/json"];
export type ResolveAppealResponse = operations["resolveAppeal"]["responses"]["200"]["content"]["application/json"];
export type ListResponseClocksResponse = operations["listResponseClocks"]["responses"]["200"]["content"]["application/json"];
export type PreemptResponseClockResponse = operations["preemptResponseClock"]["responses"]["202"]["content"]["application/json"];


