/**
 * Routing Facade
 */
import { routingService } from './routing.service';

export const routingFacade = {
  listWorkItems: (...args: Parameters<typeof routingService.listWorkItems>) =>
    routingService.listWorkItems(...args),
  submitWorkItem: (...args: Parameters<typeof routingService.submitWorkItem>) =>
    routingService.submitWorkItem(...args),
  getRoutingDecision: (...args: Parameters<typeof routingService.getRoutingDecision>) =>
    routingService.getRoutingDecision(...args),
  getRightsRecord: (...args: Parameters<typeof routingService.getRightsRecord>) =>
    routingService.getRightsRecord(...args),
  recordHumanReview: (...args: Parameters<typeof routingService.recordHumanReview>) =>
    routingService.recordHumanReview(...args),
  listCalibrationSamples: (...args: Parameters<typeof routingService.listCalibrationSamples>) =>
    routingService.listCalibrationSamples(...args),
  listAppeals: (...args: Parameters<typeof routingService.listAppeals>) =>
    routingService.listAppeals(...args),
  openAppeal: (...args: Parameters<typeof routingService.openAppeal>) =>
    routingService.openAppeal(...args),
  resolveAppeal: (...args: Parameters<typeof routingService.resolveAppeal>) =>
    routingService.resolveAppeal(...args),
  listResponseClocks: (...args: Parameters<typeof routingService.listResponseClocks>) =>
    routingService.listResponseClocks(...args),
  preemptResponseClock: (...args: Parameters<typeof routingService.preemptResponseClock>) =>
    routingService.preemptResponseClock(...args)
};
