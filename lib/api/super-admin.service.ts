// Super Admin API Service

import { apiClient } from "./client"
import { API_ENDPOINTS } from "./config"

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

export class SuperAdminService {
  // Language APIs
  static async listLanguages(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Language[] }>(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.LIST, params || {})
  }

  static async addLanguage(data: { name: { en: string; ar?: string }; code: string }) {
    return apiClient.post<Language>(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.ADD, data)
  }

  static async editLanguage(data: {
    languageId: string
    name?: { en: string; ar?: string }
    code?: string
    status?: string
  }) {
    return apiClient.post<Language>(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.EDIT, data)
  }

  static async removeLanguage(languageId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.LANGUAGE.REMOVE, { languageId })
  }

  // Currency APIs
  static async listCurrencies(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Currency[] }>(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.LIST, params || {})
  }

  static async addCurrency(data: {
    name: { en: string; ar?: string }
    code: string
    symbol: string
  }) {
    return apiClient.post<Currency>(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.ADD, data)
  }

  static async editCurrency(data: {
    currencyId: string
    name?: { en: string; ar?: string }
    code?: string
    symbol?: string
    status?: string
  }) {
    return apiClient.post<Currency>(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.EDIT, data)
  }

  static async removeCurrency(currencyId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.CURRENCY.REMOVE, { currencyId })
  }

  // Timezone APIs
  static async listTimezones(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Timezone[] }>(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.LIST, params || {})
  }

  static async addTimezone(data: { name: { en: string; ar?: string }; offset: string }) {
    return apiClient.post<Timezone>(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.ADD, data)
  }

  static async editTimezone(data: {
    timezoneId: string
    name?: { en: string; ar?: string }
    offset?: string
    status?: string
  }) {
    return apiClient.post<Timezone>(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.EDIT, data)
  }

  static async removeTimezone(timezoneId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.TIMEZONE.REMOVE, { timezoneId })
  }

  // Role APIs
  static async listRoles(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Role[] }>(API_ENDPOINTS.SUPER_ADMIN.ROLE.LIST, params || {})
  }

  static async addRole(data: { name: { en: string; ar?: string } }) {
    return apiClient.post<Role>(API_ENDPOINTS.SUPER_ADMIN.ROLE.ADD, data)
  }

  static async editRole(data: {
    roleId: string
    name?: { en: string; ar?: string }
    status?: string
  }) {
    return apiClient.post<Role>(API_ENDPOINTS.SUPER_ADMIN.ROLE.EDIT, data)
  }

  static async removeRole(roleId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.ROLE.REMOVE, { roleId })
  }

  // Module APIs
  static async listModules(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Module[] }>(API_ENDPOINTS.SUPER_ADMIN.MODULE.LIST, params || {})
  }

  static async addModule(data: { name: { en: string; ar?: string } }) {
    return apiClient.post<Module>(API_ENDPOINTS.SUPER_ADMIN.MODULE.ADD, data)
  }

  static async editModule(data: {
    moduleId: string
    name?: { en: string; ar?: string }
    status?: string
  }) {
    return apiClient.post<Module>(API_ENDPOINTS.SUPER_ADMIN.MODULE.EDIT, data)
  }

  static async removeModule(moduleId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.MODULE.REMOVE, { moduleId })
  }

  // Permission APIs
  static async listPermissions(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Permission[] }>(
      API_ENDPOINTS.SUPER_ADMIN.PERMISSION.LIST,
      params || {},
    )
  }

  static async addPermission(data: {
    name: { en: string; ar?: string }
    moduleId: string
  }) {
    return apiClient.post<Permission>(API_ENDPOINTS.SUPER_ADMIN.PERMISSION.ADD, data)
  }

  static async editPermission(data: {
    permissionId: string
    name?: { en: string; ar?: string }
    moduleId?: string
    status?: string
  }) {
    return apiClient.post<Permission>(API_ENDPOINTS.SUPER_ADMIN.PERMISSION.EDIT, data)
  }

  static async removePermission(permissionId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.PERMISSION.REMOVE, { permissionId })
  }

  // Domain APIs
  static async listDomains(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Domain[] }>(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.LIST, params || {})
  }

  static async addDomain(data: { name: { en: string; ar?: string }; url: string }) {
    return apiClient.post<Domain>(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.ADD, data)
  }

  static async editDomain(data: {
    domainId: string
    name?: { en: string; ar?: string }
    url?: string
    status?: string
  }) {
    return apiClient.post<Domain>(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.EDIT, data)
  }

  static async removeDomain(domainId: string) {
    return apiClient.post(API_ENDPOINTS.SUPER_ADMIN.DOMAIN.REMOVE, { domainId })
  }
}

// Export the service class for use throughout the application
export const superAdminService = SuperAdminService
