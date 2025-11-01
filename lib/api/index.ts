// Central API exports - Single source of truth for all API services

// Export service classes
export { SuperAdminService, superAdminService } from "./super-admin.service"
export { BuildingManagerService, buildingManagerService } from "./building-manager.service"
export { authService } from "./auth"
export { apiClient } from "./client"
export { API_ENDPOINTS, API_BASE_URL, AUTH_TOKEN_KEY, USER_DATA_KEY } from "./config"

// Re-export all types from Super Admin
export type {
  Language,
  Currency,
  Timezone,
  Role,
  Module,
  Permission,
  Domain,
} from "./super-admin.service"

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
