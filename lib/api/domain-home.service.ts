import { apiClient } from "./client"
import { API_ENDPOINTS } from "./config"

export interface DomainHomeStats {
  totalProperties: {
    count: number
    thisMonth: number
  }
  totalBuildingManager: number
  totalUsers: number
}

export interface Amenity {
  id: string
  propertyId: string
  name: {
    ar: string
    en: string
  }
  description: {
    ar: string
    en: string
  }
  mediaId: string | null
  domainId: string
  capacity: number | null
  price: number
  status: "ACTIVE" | "INACTIVE"
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface AmenityListResponse {
  count: number
  rows: Amenity[]
}

export interface FinanceStats {
  amenity: {
    totalRevenue: number
    revenueThisMonth: number
    revenuePrevMonth: number
    revenueChangePercent: string
  }
  homeService: {
    totalRevenue: number
    revenueThisMonth: number
    revenuePrevMonth: number
    revenueChangePercent: string
  }
}

export interface PaginationParams {
  offset?: number
  limit?: number
}

export class DomainHomeService {
  async getHomeStats(params?: PaginationParams): Promise<DomainHomeStats> {
    const response = await apiClient.post<{ success: boolean; data: DomainHomeStats }>(
      `${API_ENDPOINTS.DOMAIN}/home/list`,
      {
        offset: params?.offset ?? 0,
        limit: params?.limit ?? 20,
      },
    )
    return response.data
  }

  async getAmenityList(params?: PaginationParams): Promise<AmenityListResponse> {
    const response = await apiClient.post<{ success: boolean; data: AmenityListResponse }>(
      `${API_ENDPOINTS.DOMAIN}/home/amenityList`,
      {
        offset: params?.offset ?? 0,
        limit: params?.limit ?? 20,
      },
    )
    return response.data
  }

  async getFinanceStats(params?: PaginationParams): Promise<FinanceStats> {
    const response = await apiClient.post<{ success: boolean; data: FinanceStats }>(
      `${API_ENDPOINTS.DOMAIN}/home/finance/list`,
      {
        offset: params?.offset ?? 0,
        limit: params?.limit ?? 20,
      },
    )
    return response.data
  }

  async getAmenityById(id: string): Promise<Amenity | null> {
    const amenities = await this.getAmenityList()
    return amenities.rows.find((amenity) => amenity.id === id) || null
  }

  async getAmenitiesByProperty(propertyId: string): Promise<Amenity[]> {
    const amenities = await this.getAmenityList({ limit: 100 })
    return amenities.rows.filter((amenity) => amenity.propertyId === propertyId)
  }

  async getActiveAmenities(params?: PaginationParams): Promise<Amenity[]> {
    const amenities = await this.getAmenityList(params)
    return amenities.rows.filter((amenity) => amenity.status === "ACTIVE" && !amenity.isDeleted)
  }

  async getLanguages(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/languages`)
    return response.data
  }

  async addLanguage(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/languages`, data)
    return response.data
  }

  async editLanguage(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(
      `${API_ENDPOINTS.DOMAIN}/languages/${id}`,
      data,
    )
    return response.data
  }

  async deleteLanguage(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/languages/${id}`)
  }

  async getCurrencies(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/currencies`)
    return response.data
  }

  async addCurrency(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/currencies`, data)
    return response.data
  }

  async editCurrency(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(
      `${API_ENDPOINTS.DOMAIN}/currencies/${id}`,
      data,
    )
    return response.data
  }

  async deleteCurrency(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/currencies/${id}`)
  }

  async getTimezones(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/timezones`)
    return response.data
  }

  async addTimezone(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/timezones`, data)
    return response.data
  }

  async editTimezone(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(
      `${API_ENDPOINTS.DOMAIN}/timezones/${id}`,
      data,
    )
    return response.data
  }

  async deleteTimezone(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/timezones/${id}`)
  }

  async getRoles(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/roles`)
    return response.data
  }

  async addRole(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/roles`, data)
    return response.data
  }

  async editRole(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/roles/${id}`, data)
    return response.data
  }

  async deleteRole(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/roles/${id}`)
  }

  async getModules(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/modules`)
    return response.data
  }

  async addModule(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/modules`, data)
    return response.data
  }

  async editModule(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/modules/${id}`, data)
    return response.data
  }

  async deleteModule(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/modules/${id}`)
  }

  async getPermissions(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/permissions`)
    return response.data
  }

  async addPermission(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/permissions`, data)
    return response.data
  }

  async editPermission(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(
      `${API_ENDPOINTS.DOMAIN}/permissions/${id}`,
      data,
    )
    return response.data
  }

  async deletePermission(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/permissions/${id}`)
  }

  async getDomains(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/domains`)
    return response.data
  }

  async addDomain(data: any): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/domains`, data)
    return response.data
  }

  async editDomain(id: number, data: any): Promise<any> {
    const response = await apiClient.put<{ success: boolean; data: any }>(`${API_ENDPOINTS.DOMAIN}/domains/${id}`, data)
    return response.data
  }

  async deleteDomain(id: number): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.DOMAIN}/domains/${id}`)
  }

  async getCountries(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/countries`)
    return response.data
  }

  async getCities(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/cities`)
    return response.data
  }

  async getAreas(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/areas`)
    return response.data
  }

  async getPropertyTypes(): Promise<any[]> {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(`${API_ENDPOINTS.DOMAIN}/property-types`)
    return response.data
  }

  async getAmenities(): Promise<Amenity[]> {
    const response = await this.getAmenityList({ limit: 100 })
    return response.rows
  }
}

export const domainHomeService = new DomainHomeService()
