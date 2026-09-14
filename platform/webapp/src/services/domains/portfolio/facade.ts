/**
 * Portfolio Facade
 */
import { portfolioService } from './portfolio.service';

export const portfolioFacade = {
  getBenefitRecord: (...args: Parameters<typeof portfolioService.getBenefitRecord>) =>
    portfolioService.getBenefitRecord(...args),
  listEgressRecords: (...args: Parameters<typeof portfolioService.listEgressRecords>) =>
    portfolioService.listEgressRecords(...args),
  getExposureLedger: (...args: Parameters<typeof portfolioService.getExposureLedger>) =>
    portfolioService.getExposureLedger(...args),
  listRoadmapEntries: (...args: Parameters<typeof portfolioService.listRoadmapEntries>) =>
    portfolioService.listRoadmapEntries(...args),
  rescoreRoadmap: (...args: Parameters<typeof portfolioService.rescoreRoadmap>) =>
    portfolioService.rescoreRoadmap(...args)
};
