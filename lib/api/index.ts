// Central API exports - Single source of truth for all API services

export { BuildingManagerService, buildingManagerService } from "@/lib/api/building-manager.service"
export { authService } from "@/lib/api/auth"
export { apiClient } from "@/lib/api/client"
export { API_ENDPOINTS, API_BASE_URL, AUTH_TOKEN_KEY, USER_DATA_KEY } from "@/lib/api/config"
export { DomainHomeService, domainHomeService } from "@/lib/api/domain-home.service"

// Re-export all types from Building Manager
export type {
  Tenant,
  Property,
  VisitPurpose,
  Visit,
  AmenityBooking,
  HomeServiceBooking,
  HomeServiceProduct,
  CommunityPost,
  Profile,
} from "@/lib/api/building-manager.service"

// Re-export all types from Domain Home Service
export type {
  DomainHomeStats,
  Amenity,
  AmenityListResponse,
  FinanceStats,
  PaginationParams,
} from "@/lib/api/domain-home.service"
