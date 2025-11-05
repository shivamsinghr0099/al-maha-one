// Central API exports - Only export what works in browser environment

export { authService } from "@/lib/api/auth"
export { apiClient } from "@/lib/api/client"
export { API_ENDPOINTS, API_BASE_URL, AUTH_TOKEN_KEY, USER_DATA_KEY } from "@/lib/api/config"

// Note: Service files (building-manager.service, domain-home.service, super-admin.service)
// should be imported directly where needed, not re-exported through this index file
// to avoid browser module resolution issues
