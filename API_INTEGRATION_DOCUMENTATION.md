# MahaOne Property Portal - API Integration Documentation

## Overview

This document provides comprehensive documentation for the API integration implemented in the MahaOne Property Portal. The integration connects all frontend components to the backend APIs while maintaining the existing UI design with the MahaOne brand theme.

## Architecture

### API Service Layer Structure

\`\`\`
lib/api/
├── config.ts                    # API configuration and endpoints
├── client.ts                    # HTTP client with error handling
├── auth.ts                      # Authentication service
├── super-admin.service.ts       # Super Admin API methods
└── building-manager.service.ts  # Building Manager API methods
\`\`\`

## API Configuration

### Base URL
The API base URL is configured via environment variable:
\`\`\`
NEXT_PUBLIC_API_BASE_URL=https://api.mahaone.com
\`\`\`

### Authentication
- JWT tokens are stored in localStorage under key: `mahaone_auth_token`
- User data is stored in localStorage under key: `mahaone_user_data`
- All authenticated requests include `Authorization: Bearer {token}` header

## API Services

### 1. Super Admin Service

#### Language Management
- **List Languages**: `SuperAdminService.listLanguages({ searchKey?, limit?, offset? })`
- **Add Language**: `SuperAdminService.addLanguage({ name, code })`
- **Edit Language**: `SuperAdminService.editLanguage({ languageId, name?, code? })`
- **Remove Language**: `SuperAdminService.removeLanguage(languageId)`

#### Currency Management
- **List Currencies**: `SuperAdminService.listCurrencies({ limit?, offset? })`
- **Add Currency**: `SuperAdminService.addCurrency({ name: { name }, code, symbol })`
- **Edit Currency**: `SuperAdminService.editCurrency({ currencyId, name?, code?, symbol?, status? })`
- **Remove Currency**: `SuperAdminService.removeCurrency(currencyId)`

#### Timezone Management
- **List Timezones**: `SuperAdminService.listTimezones({ limit?, offset? })`
- **Add Timezone**: `SuperAdminService.addTimezone({ name, code, regionName, offsetHours, offsetMinutes, offsetString, description })`
- **Edit Timezone**: `SuperAdminService.editTimezone({ timezoneId, ...fields })`
- **Remove Timezone**: `SuperAdminService.removeTimezone(timezoneId)`

#### Role Management
- **List Roles**: `SuperAdminService.listRoles({ searchKey?, limit?, offset? })`
- **Add Role**: `SuperAdminService.addRole({ name, code })`
- **Edit Role**: `SuperAdminService.editRole({ roleId, name?, code? })`
- **Remove Role**: `SuperAdminService.removeRole(roleId)`

#### Module Management
- **List Modules**: `SuperAdminService.listModules({ searchKey?, limit?, offset? })`
- **Add Module**: `SuperAdminService.addModule({ name, code })`
- **Edit Module**: `SuperAdminService.editModule({ moduleId, name?, code? })`
- **Remove Module**: `SuperAdminService.removeModule(moduleId)`

#### Permission Management
- **List Permissions**: `SuperAdminService.listPermissions({ searchKey?, limit?, offset? })`
- **Add Permission**: `SuperAdminService.addPermission({ name, code })`
- **Edit Permission**: `SuperAdminService.editPermission({ permissionId, name?, code? })`
- **Remove Permission**: `SuperAdminService.removePermission(permissionId)`

#### Domain Management
- **List Domains**: `SuperAdminService.listDomains({ searchKey?, limit?, offset? })`
- **Add Domain**: `SuperAdminService.addDomain({ name, email, phone, phoneCode, password, mediaId? })`
- **Edit Domain**: `SuperAdminService.editDomain({ domainId, ...fields })`
- **Remove Domain**: `SuperAdminService.removeDomain(domainId)`

### 2. Building Manager Service

#### Tenant Management
- **List Tenants**: `BuildingManagerService.listTenants({ limit?, offset? })`
- **Add Tenant**: `BuildingManagerService.addTenant({ firstName, lastName, email, phoneNumber, homeAddress, deliveryAddress })`
- **Edit Tenant**: `BuildingManagerService.editTenant({ tenantId, ...fields })`
- **Remove Tenant**: `BuildingManagerService.removeTenant(tenantId)`
- **Connect Property**: `BuildingManagerService.connectTenantProperty(userId, propertyId)`

#### Landlord Management
- **List Landlords**: `BuildingManagerService.listLandlords({ limit?, offset? })`
- **Add Landlord**: `BuildingManagerService.addLandlord({ firstName, lastName, email, phoneNumber, homeAddress, deliveryAddress })`
- **Edit Landlord**: `BuildingManagerService.editLandlord({ landlordId, ...fields })`
- **Remove Landlord**: `BuildingManagerService.removeLandlord(landlordId)`

#### Property Management
- **List Properties**: `BuildingManagerService.listProperties({ limit?, offset? })`
- **Add Property**: `BuildingManagerService.addProperty({ name, location, area, bedrooms, floor, propertyType, noOfAdults, ownerId, isHandedOver, tenantId?, documents? })`
- **Edit Property**: `BuildingManagerService.editProperty({ propertyId, ...fields })`
- **Remove Property**: `BuildingManagerService.removeProperty(propertyId)`

#### Visit Management
- **List Visits**: `BuildingManagerService.listVisits(propertyId, { limit?, offset? })`
- **Edit Visit**: `BuildingManagerService.editVisit(visitId, approvalStatus)`

#### Visit Purpose Management
- **List Visit Purposes**: `BuildingManagerService.listVisitPurposes({ limit?, offset? })`
- **Add Visit Purpose**: `BuildingManagerService.addVisitPurpose({ name, autoApproval? })`
- **Edit Visit Purpose**: `BuildingManagerService.editVisitPurpose({ visitPurposeId, name?, autoApproval? })`
- **Remove Visit Purpose**: `BuildingManagerService.removeVisitPurpose(visitPurposeId)`

#### Report Management
- **List Report Priorities**: `BuildingManagerService.listReportPriorities({ limit?, offset? })`
- **List Report Categories**: `BuildingManagerService.listReportCategories({ limit?, offset? })`
- **Add/Edit/Remove**: Similar pattern for priorities and categories

#### Amenity Management
- **List Amenities**: `BuildingManagerService.listAmenities({ limit?, offset? })`
- **Add Amenity**: `BuildingManagerService.addAmenity({ propertyId, name, capacity, price })`
- **Edit Amenity**: `BuildingManagerService.editAmenity({ amenityId, ...fields })`
- **Remove Amenity**: `BuildingManagerService.removeAmenity(amenityId)`

#### Home Service Management
- **List Home Services**: `BuildingManagerService.listHomeServices(propertyId, { limit?, offset? })`
- **Add Home Service**: `BuildingManagerService.addHomeService({ propertyId, title, mediaId? })`
- **Edit Home Service**: `BuildingManagerService.editHomeService({ homeServiceId, ...fields })`
- **Remove Home Service**: `BuildingManagerService.removeHomeService(homeServiceId)`

#### Service Provider Management
- **List Service Providers**: `BuildingManagerService.listServiceProviders({ serviceId?, limit?, offset? })`
- **Add Service Provider**: `BuildingManagerService.addServiceProvider({ serviceId, email, name, phone?, mediaId? })`
- **Edit Service Provider**: `BuildingManagerService.editServiceProvider({ serviceProviderId, ...fields })`
- **Remove Service Provider**: `BuildingManagerService.removeServiceProvider(serviceProviderId)`

### 3. Authentication Service

#### Methods
- **Login Super Admin**: `AuthService.loginSuperAdmin({ name, password })`
- **Login Building Manager**: `AuthService.loginBuildingManager({ email, password })`
- **Get Profile**: `AuthService.getProfile()`
- **Update Profile**: `AuthService.updateProfile(data)`
- **Logout**: `AuthService.logout()`
- **Check Authentication**: `AuthService.isAuthenticated()`

#### Token Management
- **Set Token**: `AuthService.setAuthToken(token)`
- **Get Token**: `AuthService.getAuthToken()`
- **Clear Auth**: `AuthService.clearAuth()`

## Error Handling

### APIError Class
All API errors are wrapped in the `APIError` class with:
- `message`: Error description
- `statusCode`: HTTP status code
- `data`: Additional error data from API

### Usage Example
\`\`\`typescript
try {
  const response = await SuperAdminService.listLanguages()
  // Handle success
} catch (error) {
  if (error instanceof APIError) {
    console.error('API Error:', error.message, error.statusCode)
    // Show user-friendly error message
  }
}
\`\`\`

## Integration with UI Components

### Loading States
All API calls should implement loading states:
\`\`\`typescript
const [loading, setLoading] = useState(false)

const fetchData = async () => {
  setLoading(true)
  try {
    const response = await SuperAdminService.listLanguages()
    setData(response.data)
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false)
  }
}
\`\`\`

### Error Display
Use toast notifications or inline error messages to display API errors to users.

### Data Refresh
After successful add/edit/delete operations, refresh the list data to show updated information.

## Security Considerations

1. **Token Storage**: JWT tokens are stored in localStorage (consider httpOnly cookies for production)
2. **Token Expiration**: Implement token refresh mechanism
3. **HTTPS**: All API calls should use HTTPS in production
4. **Input Validation**: Validate all user inputs before sending to API
5. **Error Messages**: Don't expose sensitive information in error messages

## Testing

### Manual Testing Checklist
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] List data with pagination
- [ ] Add new record
- [ ] Edit existing record
- [ ] Delete record
- [ ] Handle network errors
- [ ] Handle API errors
- [ ] Token expiration handling
- [ ] Logout functionality

### API Testing Tools
- Use Postman or similar tools to test API endpoints independently
- Verify request/response formats match API documentation
- Test error scenarios (invalid data, unauthorized access, etc.)

## Next Steps

1. **Connect UI to APIs**: Update dashboard components to use API services instead of mock data
2. **Implement Loading States**: Add loading indicators for all API operations
3. **Error Handling**: Implement user-friendly error messages and retry mechanisms
4. **Token Refresh**: Implement automatic token refresh before expiration
5. **Offline Support**: Consider implementing offline data caching
6. **Performance**: Implement data caching and pagination optimization
7. **Testing**: Write unit and integration tests for API services

## Support

For API-related issues or questions, refer to the backend API documentation or contact the backend development team.
