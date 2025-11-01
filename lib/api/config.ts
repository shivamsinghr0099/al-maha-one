// API Configuration and Base Setup

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.mahaone.com"
export const USE_DEMO_MODE = process.env.NEXT_PUBLIC_USE_DEMO_MODE === "true" || !process.env.NEXT_PUBLIC_API_BASE_URL

export const API_ENDPOINTS = {
  // Super Admin Endpoints
  SUPER_ADMIN: {
    LOGIN: "/superAdmin/login",
    LANGUAGE: {
      LIST: "/superAdmin/language/list",
      ADD: "/superAdmin/language/add",
      EDIT: "/superAdmin/language/edit",
      REMOVE: "/superAdmin/language/remove",
    },
    CURRENCY: {
      LIST: "/superAdmin/currency/list",
      ADD: "/superAdmin/crrency/add",
      EDIT: "/superAdmin/currency/edit",
      REMOVE: "/superAdmin/currency/remove",
    },
    TIMEZONE: {
      LIST: "/superAdmin/timezone/list",
      ADD: "/superAdmin/timezone/add",
      EDIT: "/superAdmin/timezone/edit",
      REMOVE: "/superAdmin/timezone/remove",
    },
    ROLE: {
      LIST: "/superAdmin/role/list",
      ADD: "/superAdmin/role/add",
      EDIT: "/superAdmin/role/edit",
      REMOVE: "/superAdmin/role/remove",
    },
    MODULE: {
      LIST: "/superAdmin/module/list",
      ADD: "/superAdmin/module/add",
      EDIT: "/superAdmin/module/edit",
      REMOVE: "/superAdmin/module/remove",
    },
    PERMISSION: {
      LIST: "/superAdmin/permission/list",
      ADD: "/superAdmin/permission/add",
      EDIT: "/superAdmin/permission/edit",
      REMOVE: "/superAdmin/permission/remove",
    },
    DOMAIN: {
      LIST: "/superAdmin/domain/list",
      ADD: "/superAdmin/domain/add",
      EDIT: "/superAdmin/domain/edit",
      REMOVE: "/superAdmin/domain/remove",
    },
  },
  // Building Manager Endpoints
  BUILDING_MANAGER: {
    AUTH: {
      LOGIN: "/buildingManager/auth/login",
      PROFILE_GET: "/buildingManager/auth/profile",
      PROFILE_EDIT: "/buildingManager/auth/profile/edit",
      VERIFY: "/buildingManager/auth/verify",
      FORGOT_PASSWORD: "/user/auth/forgot-password",
      RESET_PASSWORD: "/user/auth/reset-password",
    },
    PROFILE: {
      GET: "/buildingManager/auth/profile",
      EDIT: "/buildingManager/auth/profile/edit",
      VERIFY: "/buildingManager/auth/verify",
    },
    VISIT_PURPOSE: {
      LIST: "/buildingManager/visit/purpose/list",
      ADD: "/buildingManager/visit/purpose/add",
      EDIT: "/buildingManager/visit/purpose/edit",
      REMOVE: "/buildingManager/visit/purpose/remove",
    },
    TENANT: {
      LIST: "/buildingManager/tenant/list",
      ADD: "/buildingManager/tenant/add",
      EDIT: "/buildingManager/tenant/edit",
      REMOVE: "/buildingManager/tenant/remove",
      PROPERTY_CONNECT: "/buildingManager/tenant/property/connect",
    },
    LANDLORD: {
      LIST: "/buildingManager/landlord/list",
      ADD: "/buildingManager/landlord/add",
      EDIT: "/buildingManager/landlord/edit",
      REMOVE: "/buildingManager/landlord/remove",
      PROPERTY_CONNECT: "/buildingManager/landlord/property/connect",
    },
    VISIT: {
      LIST: "/buildingManager/visit/list",
      EDIT: "/buildingManager/visit/edit",
    },
    REPORT_PRIORITY: {
      LIST: "/buildingManager/report/priority/list",
      ADD: "/buildingManager/report/priority/add",
      EDIT: "/buildingManager/report/priority/edit",
      REMOVE: "/buildingManager/report/priority/remove",
    },
    REPORT_CATEGORY: {
      LIST: "/buildingManager/report/category/list",
      ADD: "/buildingManager/report/category/add",
      EDIT: "/buildingManager/report/category/edit",
      REMOVE: "/buildingManager/report/category/remove",
    },
    REPORT: {
      LIST: "/buildingManager/report/list",
      EDIT_STATUS: "/buildingManager/report/edit/status",
    },
    COMMUNITY_WALL: {
      LIST: "/buildingManager/communityWall/list",
      ADD: "/buildingManager/communityWall/add",
      EDIT: "/buildingManager/communityWall/edit",
      REMOVE: "/buildingManager/communityWall/remove",
    },
    AMENITY_BOOKING: {
      LIST: "/buildingManager/amenity/booking/list",
      EDIT: "/buildingManager/amenity/booking/edit",
    },
    HOME_SERVICE_BOOKING: {
      LIST: "/buildingManager/home/service/booking/list",
      EDIT: "/buildingManager/home/service/booking/edit",
    },
    PROPERTY: {
      LIST: "/buildingManager/property/list",
      ADD: "/buildingManager/property/add",
      EDIT: "/buildingManager/property/edit",
      REMOVE: "/buildingManager/property/remove",
    },
    AMENITY: {
      LIST: "/buildingManager/amenity/list",
      ADD: "/buildingManager/amenity/add",
      EDIT: "/buildingManager/amenity/edit",
      REMOVE: "/buildingManager/amenity/remove",
    },
    HOME_SERVICE: {
      LIST: "/buildingManager/home/service/list",
      ADD: "/buildingManager/home/service/add",
      EDIT: "/buildingManager/home/service/edit",
      REMOVE: "/buildingManager/home/service/remove",
    },
    HOME_SERVICE_PRODUCT: {
      LIST: "/buildingManager/home/service/product/list",
      ADD: "/buildingManager/home/service/product/add",
      EDIT: "/buildingManager/home/service/product/edit",
      REMOVE: "/buildingManager/home/service/product/remove",
    },
    SERVICE_PROVIDER: {
      LIST: "/buildingManager/service/provider/list",
      ADD: "/buildingManager/service/provider/add",
      EDIT: "/buildingManager/service/provider/edit",
      REMOVE: "/buildingManager/service/provider/remove",
    },
  },
}

export const AUTH_TOKEN_KEY = "mahaone_auth_token"
export const USER_DATA_KEY = "mahaone_user_data"
