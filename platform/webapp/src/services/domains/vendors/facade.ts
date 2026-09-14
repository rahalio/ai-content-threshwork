/**
 * Vendors Facade
 */
import { vendorsService } from './vendors.service';

export const vendorsFacade = {
  listVendorConnectors: (...args: Parameters<typeof vendorsService.listVendorConnectors>) =>
    vendorsService.listVendorConnectors(...args),
  registerVendorConnector: (...args: Parameters<typeof vendorsService.registerVendorConnector>) =>
    vendorsService.registerVendorConnector(...args),
  listVendorEvaluations: (...args: Parameters<typeof vendorsService.listVendorEvaluations>) =>
    vendorsService.listVendorEvaluations(...args),
  startVendorEvaluation: (...args: Parameters<typeof vendorsService.startVendorEvaluation>) =>
    vendorsService.startVendorEvaluation(...args),
  cutoverVendorTraffic: (...args: Parameters<typeof vendorsService.cutoverVendorTraffic>) =>
    vendorsService.cutoverVendorTraffic(...args),
  listGoldenSets: (...args: Parameters<typeof vendorsService.listGoldenSets>) =>
    vendorsService.listGoldenSets(...args)
};
