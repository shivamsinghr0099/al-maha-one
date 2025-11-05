// Central API exports - Single source of truth for all API services

// Export service classes
export { BuildingManagerService, buildingManagerService } from "./building-manager.service"
export { authService } from "./auth"
export { apiClient } from "./client"
export { API_ENDPOINTS, API_BASE_URL, AUTH_TOKEN_KEY, USER_DATA_KEY } from "./config"
export { DomainHomeService, domainHomeService } from "./domain-home.service"

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
} from "./building-manager.service"

// Re-export all types from Domain Home Service
export type {
  DomainHomeStats,
  Amenity,
  AmenityListResponse,
  FinanceStats,
  PaginationParams,
} from "./domain-home.service"
