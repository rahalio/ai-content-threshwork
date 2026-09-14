/**
 * Identity Facade
 */
import { identityService } from './identity.service';

export const identityFacade = {
  listTenantApiKeys: (...args: Parameters<typeof identityService.listTenantApiKeys>) =>
    identityService.listTenantApiKeys(...args),
  createTenantApiKey: (...args: Parameters<typeof identityService.createTenantApiKey>) =>
    identityService.createTenantApiKey(...args),
  getTenantApiKey: (...args: Parameters<typeof identityService.getTenantApiKey>) =>
    identityService.getTenantApiKey(...args),
  revokeTenantApiKey: (...args: Parameters<typeof identityService.revokeTenantApiKey>) =>
    identityService.revokeTenantApiKey(...args),
  listTenantUsers: (...args: Parameters<typeof identityService.listTenantUsers>) =>
    identityService.listTenantUsers(...args),
  createTenantUser: (...args: Parameters<typeof identityService.createTenantUser>) =>
    identityService.createTenantUser(...args),
  getTenantUser: (...args: Parameters<typeof identityService.getTenantUser>) =>
    identityService.getTenantUser(...args),
  updateTenantUser: (...args: Parameters<typeof identityService.updateTenantUser>) =>
    identityService.updateTenantUser(...args),
  disableTenantUser: (...args: Parameters<typeof identityService.disableTenantUser>) =>
    identityService.disableTenantUser(...args),
  enableTenantUser: (...args: Parameters<typeof identityService.enableTenantUser>) =>
    identityService.enableTenantUser(...args),
  operatorLogin: (...args: Parameters<typeof identityService.operatorLogin>) =>
    identityService.operatorLogin(...args),
  getOperatorMe: (...args: Parameters<typeof identityService.getOperatorMe>) =>
    identityService.getOperatorMe(...args),
  updateOperatorMe: (...args: Parameters<typeof identityService.updateOperatorMe>) =>
    identityService.updateOperatorMe(...args),
  operatorRefresh: (...args: Parameters<typeof identityService.operatorRefresh>) =>
    identityService.operatorRefresh(...args),
  operatorLogout: (...args: Parameters<typeof identityService.operatorLogout>) =>
    identityService.operatorLogout(...args)
};
