import { apiClient } from "./client"
import { API_ENDPOINTS } from "./config"

/**
 * Domain Home Statistics Response
 */
export interface DomainHomeStats {
  totalProperties: {
    count: number
    thisMonth: number
  }
  totalBuildingManager: number
  totalUsers: number
}

/**
 * Amenity Item
 */
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

/**
 * Amenity List Response
 */
export interface AmenityListResponse {
  count: number
  rows: Amenity[]
}

/**
 * Finance Statistics
 */
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

/**
 * Pagination Parameters
 */
export interface PaginationParams {
  offset?: number
  limit?: number
}

/**
 * Domain Home Service
 * Handles API calls for home statistics, amenities, and finance data
 */
export class DomainHomeService {
  /**
   * Get home statistics (total properties, building managers, users)
   */
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

  /**
   * Get amenity list with pagination
   */
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

  /**
   * Get finance statistics (amenity and home service revenue)
   */
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

  /**
   * Get amenity by ID
   */
  async getAmenityById(id: string): Promise<Amenity | null> {
    const amenities = await this.getAmenityList()
    return amenities.rows.find((amenity) => amenity.id === id) || null
  }

  /**
   * Get amenities by property ID
   */
  async getAmenitiesByProperty(propertyId: string): Promise<Amenity[]> {
    const amenities = await this.getAmenityList({ limit: 100 })
    return amenities.rows.filter((amenity) => amenity.propertyId === propertyId)
  }

  /**
   * Get active amenities only
   */
  async getActiveAmenities(params?: PaginationParams): Promise<Amenity[]> {
    const amenities = await this.getAmenityList(params)
    return amenities.rows.filter((amenity) => amenity.status === "ACTIVE" && !amenity.isDeleted)
  }
}

// Export singleton instance
export const domainHomeService = new DomainHomeService()
