// Building Manager API Service

import { apiClient } from "./client"
import { API_ENDPOINTS } from "./config"

export interface Tenant {
  id: string
  firstName: { en: string; ar?: string }
  lastName: { en: string; ar?: string }
  email: string
  phoneNumber: string
  homeAddress: any
  deliveryAddress: any
  status: string
  createdAt: string
  updatedAt: string
}

export interface Property {
  id: string
  name: { en: string; ar?: string }
  location: any
  area: number
  bedrooms: number
  floor: number
  propertyType: { en: string; ar?: string }
  noOfAdults: number
  ownerId: string
  isHandedOver: boolean
  tenantId: string | null
  domainId: string
  status: string
  createdAt: string
  updatedAt: string
  propertyDocuments?: any[]
}

export interface VisitPurpose {
  id: string
  name: { en: string; ar?: string }
  autoApproval: boolean
  createdAt: string
  updatedAt: string
}

export interface Visit {
  id: string
  propertyId: string
  userId: string
  visiterName: { name: string; en?: string; ar?: string }
  visitorMobileNumber: string
  approvalStatus: string
  visitPurposeId: string
  date: string
  noOfAccompanyingPersons: number
  note: string
  eventStatus: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface AmenityBooking {
  id: string
  amenityId: string
  userId: string
  propertyId: string
  bookingDate: string
  startTime: string
  endTime: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface HomeServiceBooking {
  id: string
  homeServiceId: string
  userId: string
  propertyId: string
  bookingDate: string
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface HomeServiceProduct {
  id: string
  homeServiceId: string
  name: { en: string; ar?: string }
  description?: { en: string; ar?: string }
  price: number
  status: string
  createdAt: string
  updatedAt: string
}

export interface CommunityPost {
  id: string
  propertyId: string
  userId: string
  title: { en: string; ar?: string }
  content: { en: string; ar?: string }
  mediaId?: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface Profile {
  id: string
  firstName: { en: string; ar?: string }
  lastName: { en: string; ar?: string }
  email: string
  phoneNumber: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
}

export class BuildingManagerService {
  static async getProfile() {
    return apiClient.post<Profile>(API_ENDPOINTS.BUILDING_MANAGER.AUTH.PROFILE_GET, {})
  }

  static async editProfile(data: {
    firstName?: { en: string; ar?: string }
    lastName?: { en: string; ar?: string }
    phoneNumber?: string
  }) {
    return apiClient.post<Profile>(API_ENDPOINTS.BUILDING_MANAGER.AUTH.PROFILE_EDIT, data)
  }

  static async verifyAccount(verificationCode: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AUTH.VERIFY, { verificationCode })
  }

  static async listTenants(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Tenant[] }>(API_ENDPOINTS.BUILDING_MANAGER.TENANT.LIST, params || {})
  }

  static async addTenant(data: {
    firstName: { en: string }
    lastName: { en: string }
    email: string
    phoneNumber: string
    homeAddress: any
    deliveryAddress: any
  }) {
    return apiClient.post<Tenant>(API_ENDPOINTS.BUILDING_MANAGER.TENANT.ADD, data)
  }

  static async editTenant(data: {
    tenantId: string
    firstName?: { en: string }
    lastName?: { en: string }
    email?: string
    phoneNumber?: string
    homeAddress?: any
    deliveryAddress?: any
    password?: string
  }) {
    return apiClient.post<Tenant>(API_ENDPOINTS.BUILDING_MANAGER.TENANT.EDIT, data)
  }

  static async removeTenant(tenantId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.TENANT.REMOVE, { tenantId })
  }

  static async connectTenantProperty(userId: string, propertyId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.TENANT.PROPERTY_CONNECT, {
      userId,
      propertyId,
    })
  }

  static async listLandlords(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Tenant[] }>(API_ENDPOINTS.BUILDING_MANAGER.LANDLORD.LIST, params || {})
  }

  static async addLandlord(data: {
    firstName: { en: string }
    lastName: { en: string }
    email: string
    phoneNumber: string
    homeAddress: any
    deliveryAddress: any
  }) {
    return apiClient.post<Tenant>(API_ENDPOINTS.BUILDING_MANAGER.LANDLORD.ADD, data)
  }

  static async editLandlord(data: {
    landlordId: string
    firstName?: { en: string }
    lastName?: { en: string }
    email?: string
    phoneNumber?: string
    homeAddress?: any
    deliveryAddress?: any
    password?: string
  }) {
    return apiClient.post<Tenant>(API_ENDPOINTS.BUILDING_MANAGER.LANDLORD.EDIT, data)
  }

  static async removeLandlord(landlordId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.LANDLORD.REMOVE, { landlordId })
  }

  static async listProperties(params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Property[] }>(
      API_ENDPOINTS.BUILDING_MANAGER.PROPERTY.LIST,
      params || {},
    )
  }

  static async addProperty(data: {
    name: { en: string; ar?: string }
    location: any
    area: number
    bedrooms: number
    floor: number
    propertyType: { en: string; ar?: string }
    noOfAdults: number
    ownerId: string
    isHandedOver: boolean
    tenantId?: string
    documents?: any[]
  }) {
    return apiClient.post<Property>(API_ENDPOINTS.BUILDING_MANAGER.PROPERTY.ADD, data)
  }

  static async editProperty(data: {
    propertyId: string
    area?: number
    bedrooms?: number
    tenantId?: string
    documents?: any[]
  }) {
    return apiClient.post<Property>(API_ENDPOINTS.BUILDING_MANAGER.PROPERTY.EDIT, data)
  }

  static async removeProperty(propertyId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.PROPERTY.REMOVE, { propertyId })
  }

  static async listVisitPurposes(params?: { limit?: number; offset?: number }) {
    return apiClient.post<VisitPurpose[]>(API_ENDPOINTS.BUILDING_MANAGER.VISIT_PURPOSE.LIST, params || {})
  }

  static async addVisitPurpose(data: { name: { en: string; ar?: string }; autoApproval?: boolean }) {
    return apiClient.post<VisitPurpose>(API_ENDPOINTS.BUILDING_MANAGER.VISIT_PURPOSE.ADD, data)
  }

  static async editVisitPurpose(data: {
    visitPurposeId: string
    name?: { en: string }
    autoApproval?: boolean
  }) {
    return apiClient.post<VisitPurpose>(API_ENDPOINTS.BUILDING_MANAGER.VISIT_PURPOSE.EDIT, data)
  }

  static async removeVisitPurpose(visitPurposeId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.VISIT_PURPOSE.REMOVE, { visitPurposeId })
  }

  static async listVisits(propertyId: string, params?: { limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: Visit[] }>(API_ENDPOINTS.BUILDING_MANAGER.VISIT.LIST, {
      propertyId,
      ...params,
    })
  }

  static async editVisit(visitId: string, approvalStatus: string) {
    return apiClient.post<Visit>(API_ENDPOINTS.BUILDING_MANAGER.VISIT.EDIT, {
      visitId,
      approvalStatus,
    })
  }

  static async listReportPriorities(params?: { limit?: number; offset?: number }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_PRIORITY.LIST, params || {})
  }

  static async addReportPriority(data: { name: { name: string }; status?: string }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_PRIORITY.ADD, data)
  }

  static async editReportPriority(data: {
    reportPriorityId: string
    name?: { name: string }
    status?: string
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_PRIORITY.EDIT, data)
  }

  static async removeReportPriority(reportPriorityId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_PRIORITY.REMOVE, {
      reportPriorityId,
    })
  }

  static async listReportCategories(params?: { limit?: number; offset?: number }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_CATEGORY.LIST, params || {})
  }

  static async addReportCategory(data: { name: { name: string }; status?: string }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_CATEGORY.ADD, data)
  }

  static async editReportCategory(data: {
    reportCategoryId: string
    name?: { name: string }
    status?: string
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_CATEGORY.EDIT, data)
  }

  static async removeReportCategory(reportCategoryId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.REPORT_CATEGORY.REMOVE, {
      reportCategoryId,
    })
  }

  static async listAmenities(params?: { limit?: number; offset?: number }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AMENITY.LIST, params || {})
  }

  static async addAmenity(data: {
    propertyId: string
    name: { name: string }
    capacity: number
    price: number
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AMENITY.ADD, data)
  }

  static async editAmenity(data: {
    amenityId: string
    name?: { name: string }
    description?: { desc: string }
    mediaId?: string
    capacity?: number
    price?: number
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AMENITY.EDIT, data)
  }

  static async removeAmenity(amenityId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AMENITY.REMOVE, { amenityId })
  }

  static async listAmenityBookings(params?: { amenityId?: string; limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: AmenityBooking[] }>(
      API_ENDPOINTS.BUILDING_MANAGER.AMENITY_BOOKING.LIST,
      params || {},
    )
  }

  static async editAmenityBooking(data: {
    amenityBookingId: string
    status: string
  }) {
    return apiClient.post<AmenityBooking>(API_ENDPOINTS.BUILDING_MANAGER.AMENITY_BOOKING.EDIT, data)
  }

  static async listHomeServices(propertyId: string, params?: { limit?: number; offset?: number }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE.LIST, {
      propertyId,
      ...params,
    })
  }

  static async addHomeService(data: {
    propertyId: string
    title: { name: string }
    mediaId?: string
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE.ADD, data)
  }

  static async editHomeService(data: {
    homeServiceId: string
    propertyId?: string
    title?: { name: string }
    mediaId?: string
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE.EDIT, data)
  }

  static async removeHomeService(homeServiceId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE.REMOVE, { homeServiceId })
  }

  static async listHomeServiceProducts(params?: { homeServiceId?: string; limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: HomeServiceProduct[] }>(
      API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE_PRODUCT.LIST,
      params || {},
    )
  }

  static async addHomeServiceProduct(data: {
    homeServiceId: string
    name: { en: string; ar?: string }
    description?: { en: string; ar?: string }
    price: number
  }) {
    return apiClient.post<HomeServiceProduct>(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE_PRODUCT.ADD, data)
  }

  static async editHomeServiceProduct(data: {
    homeServiceProductId: string
    name?: { en: string; ar?: string }
    description?: { en: string; ar?: string }
    price?: number
  }) {
    return apiClient.post<HomeServiceProduct>(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE_PRODUCT.EDIT, data)
  }

  static async removeHomeServiceProduct(homeServiceProductId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE_PRODUCT.REMOVE, { homeServiceProductId })
  }

  static async listHomeServiceBookings(params?: { homeServiceId?: string; limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: HomeServiceBooking[] }>(
      API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE_BOOKING.LIST,
      params || {},
    )
  }

  static async editHomeServiceBooking(data: {
    homeServiceBookingId: string
    status: string
  }) {
    return apiClient.post<HomeServiceBooking>(API_ENDPOINTS.BUILDING_MANAGER.HOME_SERVICE_BOOKING.EDIT, data)
  }

  static async listServiceProviders(params?: { serviceId?: string; limit?: number; offset?: number }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.SERVICE_PROVIDER.LIST, params || {})
  }

  static async addServiceProvider(data: {
    serviceId: string
    email: string
    name: { name: string }
    phone?: string
    mediaId?: string
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.SERVICE_PROVIDER.ADD, data)
  }

  static async editServiceProvider(data: {
    serviceProviderId: string
    serviceId?: string
    email?: string
    name?: { name: string; en?: string; ar?: string }
    phone?: string
    mediaId?: string
  }) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.SERVICE_PROVIDER.EDIT, data)
  }

  static async removeServiceProvider(serviceProviderId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.SERVICE_PROVIDER.REMOVE, {
      serviceProviderId,
    })
  }

  static async listCommunityPosts(params?: { propertyId?: string; limit?: number; offset?: number }) {
    return apiClient.post<{ count: number; rows: CommunityPost[] }>(
      API_ENDPOINTS.BUILDING_MANAGER.COMMUNITY_WALL.LIST,
      params || {},
    )
  }

  static async addCommunityPost(data: {
    propertyId: string
    title: { en: string; ar?: string }
    content: { en: string; ar?: string }
    mediaId?: string
  }) {
    return apiClient.post<CommunityPost>(API_ENDPOINTS.BUILDING_MANAGER.COMMUNITY_WALL.ADD, data)
  }

  static async editCommunityPost(data: {
    communityPostId: string
    title?: { en: string; ar?: string }
    content?: { en: string; ar?: string }
    mediaId?: string
    status?: string
  }) {
    return apiClient.post<CommunityPost>(API_ENDPOINTS.BUILDING_MANAGER.COMMUNITY_WALL.EDIT, data)
  }

  static async removeCommunityPost(communityPostId: string) {
    return apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.COMMUNITY_WALL.REMOVE, { communityPostId })
  }
}

export const buildingManagerService = BuildingManagerService
