/**
 * Queues Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/queues.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AutomationStatus = components["schemas"]["AutomationStatus"];
export type ImpactTier = components["schemas"]["ImpactTier"];
export type PolicyDefinition = components["schemas"]["PolicyDefinition"];
export type Queue = components["schemas"]["Queue"];
export type QueueCreate = components["schemas"]["QueueCreate"];
export type QueueId = components["schemas"]["QueueId"];
export type QueueListData = components["schemas"]["QueueListData"];
export type QueueScorecard = components["schemas"]["QueueScorecard"];
export type QueueScorecardCreate = components["schemas"]["QueueScorecardCreate"];
export type TaskType = components["schemas"]["TaskType"];
export type ThresholdPolicy = components["schemas"]["ThresholdPolicy"];
export type AutomationApprovalRequest = components["schemas"]["AutomationApprovalRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterQueueRequestInput = NonNullable<operations["registerQueue"]["requestBody"]>["content"]["application/json"];
export type PinPolicyDefinitionRequestInput = NonNullable<operations["pinPolicyDefinition"]["requestBody"]>["content"]["application/json"];
export type ScoreQueueRequestInput = NonNullable<operations["scoreQueue"]["requestBody"]>["content"]["application/json"];
export type SetThresholdPolicyRequestInput = NonNullable<operations["setThresholdPolicy"]["requestBody"]>["content"]["application/json"];
export type DecideAutomationApprovalRequestInput = NonNullable<operations["decideAutomationApproval"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListQueuesParams = NonNullable<operations["listQueues"]["parameters"]["query"]>;
export type GetQueueParams = operations["getQueue"]["parameters"]["path"];
export type PinPolicyDefinitionParams = operations["pinPolicyDefinition"]["parameters"]["path"];
export type GetQueueScorecardParams = operations["getQueueScorecard"]["parameters"]["path"];
export type ScoreQueueParams = operations["scoreQueue"]["parameters"]["path"];
export type GetThresholdPolicyParams = operations["getThresholdPolicy"]["parameters"]["path"];
export type SetThresholdPolicyParams = operations["setThresholdPolicy"]["parameters"]["path"];
export type DecideAutomationApprovalParams = operations["decideAutomationApproval"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListQueuesResponse = operations["listQueues"]["responses"]["200"]["content"]["application/json"];
export type RegisterQueueResponse = operations["registerQueue"]["responses"]["201"]["content"]["application/json"];
export type GetQueueResponse = operations["getQueue"]["responses"]["200"]["content"]["application/json"];
export type PinPolicyDefinitionResponse = operations["pinPolicyDefinition"]["responses"]["200"]["content"]["application/json"];
export type GetQueueScorecardResponse = operations["getQueueScorecard"]["responses"]["200"]["content"]["application/json"];
export type ScoreQueueResponse = operations["scoreQueue"]["responses"]["201"]["content"]["application/json"];
export type GetThresholdPolicyResponse = operations["getThresholdPolicy"]["responses"]["200"]["content"]["application/json"];
export type SetThresholdPolicyResponse = operations["setThresholdPolicy"]["responses"]["200"]["content"]["application/json"];
export type DecideAutomationApprovalResponse = operations["decideAutomationApproval"]["responses"]["200"]["content"]["application/json"];


