/**
 * Queues Facade
 */
import { queuesService } from './queues.service';

export const queuesFacade = {
  listQueues: (...args: Parameters<typeof queuesService.listQueues>) =>
    queuesService.listQueues(...args),
  registerQueue: (...args: Parameters<typeof queuesService.registerQueue>) =>
    queuesService.registerQueue(...args),
  getQueue: (...args: Parameters<typeof queuesService.getQueue>) =>
    queuesService.getQueue(...args),
  pinPolicyDefinition: (...args: Parameters<typeof queuesService.pinPolicyDefinition>) =>
    queuesService.pinPolicyDefinition(...args),
  getQueueScorecard: (...args: Parameters<typeof queuesService.getQueueScorecard>) =>
    queuesService.getQueueScorecard(...args),
  scoreQueue: (...args: Parameters<typeof queuesService.scoreQueue>) =>
    queuesService.scoreQueue(...args),
  getThresholdPolicy: (...args: Parameters<typeof queuesService.getThresholdPolicy>) =>
    queuesService.getThresholdPolicy(...args),
  setThresholdPolicy: (...args: Parameters<typeof queuesService.setThresholdPolicy>) =>
    queuesService.setThresholdPolicy(...args),
  decideAutomationApproval: (...args: Parameters<typeof queuesService.decideAutomationApproval>) =>
    queuesService.decideAutomationApproval(...args)
};
