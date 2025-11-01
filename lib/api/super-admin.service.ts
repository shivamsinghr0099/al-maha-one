// Super Admin API Service
import { apiClient } from "./client"
import { API_ENDPOINTS } from "./config"

// TypeScript Interfaces
export interface Language {
  id: string
  name: { en: string; ar?: string }
  code: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Currency {
  id: string
  name: { en: string; ar?: string }
  code: string
  symbol: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Timezone {
  id: string
  name: { en: string; ar?: string }
  offset: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Role {
  id: string
  name: { en: string; ar?: string }
  status: string
  createdAt: string
  updatedAt: string
}

export interface Module {
  id: string
  name: { en: string; ar?: string }
  status: string
  createdAt: string
  updatedAt: string
}

export interface Permission {
  id: string
  name: { en: string; ar?: string }
  moduleId: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Domain {
  id: string
  name: { en: string; ar?: string }
  url: string
  status: string
  createdAt: string
  updatedAt: string
}

// Super Admin Service Class
class SuperAdminService {
  // Language APIs
  async listLanguages(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Language[] }>(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.LIST, params || {})
  }

  async addLanguage(data: { name: { en: string; ar?: string }; code: string }) {
    return apiClient.post<Language>(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.ADD, data)
  }

  async editLanguage(data: {
    languageId: string
    name?: { en: string; ar?: string }
    code?: string
    status?: string
  }) {
    return apiClient.post<Language>(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.EDIT, data)
  }

  async removeLanguage(languageId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.REMOVE, { languageId })
  }

  // Currency APIs
  async listCurrencies(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Currency[] }>(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.LIST, params || {})
  }

  async addCurrency(data: { name: { en: string; ar?: string }; code: string; symbol: string }) {
    return apiClient.post<Currency>(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.ADD, data)
  }

  async editCurrency(data: {
    currencyId: string
    name?: { en: string; ar?: string }
    code?: string
    symbol?: string
    status?: string
  }) {
    return apiClient.post<Currency>(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.EDIT, data)
  }

  async removeCurrency(currencyId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.REMOVE, { currencyId })
  }

  // Timezone APIs
  async listTimezones(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Timezone[] }>(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.LIST, params || {})
  }

  async addTimezone(data: { name: { en: string; ar?: string }; offset: string }) {
    return apiClient.post<Timezone>(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.ADD, data)
  }

  async editTimezone(data: {
    timezoneId: string
    name?: { en: string; ar?: string }
    offset?: string
    status?: string
  }) {
    return apiClient.post<Timezone>(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.EDIT, data)
  }

  async removeTimezone(timezoneId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.REMOVE, { timezoneId })
  }

  // Role APIs
  async listRoles(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Role[] }>(API_ENDPOINTS.SUPER_ADMIN.ROLE.LIST, params || {})
  }

  async addRole(data: { name: { en: string; ar?: string } }) {
    return apiClient.post<Role>(API_ENDPOINTS.SUPER_ADMIN.ROLE.ADD, data)
  }

  async editRole(data: { roleId: string; name?: { en: string; ar?: string }; status?: string }) {
    return apiClient.post<Role>(API_ENDPOINTS.SUPER_ADMIN.ROLE.EDIT, data)
  }

  async removeRole(roleId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.ROLE.REMOVE, { roleId })
  }

  // Module APIs
  async listModules(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Module[] }>(API_ENDPOINTS.SUPER_ADMIN.MODULE.LIST, params || {})
  }

  async addModule(data: { name: { en: string; ar?: string } }) {
    return apiClient.post<Module>(API_ENDPOINTS.SUPER_ADMIN.MODULE.ADD, data)
  }

  async editModule(data: { moduleId: string; name?: { en: string; ar?: string }; status?: string }) {
    return apiClient.post<Module>(API_ENDPOINTS.SUPER_ADMIN.MODULE.EDIT, data)
  }

  async removeModule(moduleId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.MODULE.REMOVE, { moduleId })
  }

  // Permission APIs
  async listPermissions(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Permission[] }>(
      API_ENDPOINTS.SUPER_ADMIN.PERMISSION.LIST,
      params || {},
    )
  }

  async addPermission(data: { name: { en: string; ar?: string }; moduleId: string }) {
    return apiClient.post<Permission>(API_ENDPOINTS.SUPER_ADMIN.PERMISSION.ADD, data)
  }

  async editPermission(data: {
    permissionId: string
    name?: { en: string; ar?: string }
    moduleId?: string
    status?: string
  }) {
    return apiClient.post<Permission>(API_ENDPOINTS.SUPER_ADMIN.PERMISSION.EDIT, data)
  }

  async removePermission(permissionId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.PERMISSION.REMOVE, { permissionId })
  }

  // Domain APIs
  async listDomains(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Domain[] }>(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.LIST, params || {})
  }

  async addDomain(data: { name: { en: string; ar?: string }; url: string }) {
    return apiClient.post<Domain>(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.ADD, data)
  }

  async editDomain(data: {
    domainId: string
    name?: { en: string; ar?: string }
    url?: string
    status?: string
  }) {
    return apiClient.post<Domain>(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.EDIT, data)
  }

  async removeDomain(domainId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.REMOVE, { domainId })
  }
}

// Create and export singleton instance
export const superAdminService = new SuperAdminService()

// Export complete - ready for import
