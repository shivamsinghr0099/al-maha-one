# MahaOne Property Portal - Navigation Structure

## 🗺️ Complete Navigation Map

This document provides a comprehensive overview of the navigation structure for all user roles in the MahaOne Property Portal.

---

## 🏠 Public Routes

### Landing & Authentication
- `/` - Landing page / Login
- `/user-type` - User type selection
- `/onboarding` - New user onboarding

---

## 👤 Role-Based Navigation

### 1. 🔴 Super Admin Dashboard (`/super-admin/dashboard`)

#### Main Navigation Tabs
1. **Overview** - System-wide statistics and metrics
2. **Building Ops** - Building operations management
3. **Landlord Tools** - Landlord management features
4. **Financial** - Financial oversight and reports
5. **Approvals** - Approval workflows
6. **Analytics** - System analytics and insights
7. **Emergency** - Emergency management
8. **Domains** - Master data management ⭐
9. **Reports** - Report generation

#### Domain Management Sub-Tabs
- **Languages** - Manage supported languages (English, Arabic, etc.)
- **Currencies** - Currency configuration (AED, USD, EUR, etc.)
- **Timezones** - Timezone settings
- **Countries** - Country master data
- **Cities** - City listings
- **Areas** - Area/district management
- **Property Types** - Villa, Apartment, Townhouse, etc.
- **Amenities** - Pool, Gym, Parking, BBQ, etc.

#### Quick Actions
- User Management
- Property Approval
- Financial Review
- System Settings
- Backup & Restore
- Audit Logs

---

### 2. 🟢 Building Manager Dashboard (`/building-manager/dashboard`)

#### Main Navigation
- **Dashboard** - Overview and statistics
- **Properties** - Property management
- **Tenants** - Tenant information and management
- **Landlords** - Landlord management (`/building-manager/landlords/[id]/properties`)
- **Visitors** - Visitor tracking and management
- **Amenities** - Amenity booking management
- **Services** - Home service requests
- **Community** - Community posts and engagement
- **Maintenance** - Maintenance coordination
- **Reports** - Generate reports

#### Quick Actions
- Add New Tenant
- Schedule Maintenance
- Approve Visitor
- Post Community Update
- Review Service Requests
- Generate Report

---

### 3. 🔵 Landlord Dashboard (`/landlord/dashboard`)

#### Main Navigation
- **Dashboard** - Portfolio overview
- **Properties** - Property listings (`/landlord/properties`)
- **Tenants** - Tenant information
- **Financial** - Income and expenses
- **Maintenance** - Maintenance requests
- **Documents** - Document management
- **Reports** - Financial and property reports
- **Messages** - Communication center

#### Quick Actions
- View Property Details
- Check Tenant Status
- Review Financials
- Approve Maintenance
- Upload Documents
- Send Message

---

### 4. 🟡 Tenant Dashboard (`/tenant/dashboard`)

#### Main Navigation
- **Dashboard** - Personal overview
- **Services** - Home services (`/services`)
- **Amenities** - Amenity booking (`/amenities`)
- **Visitors** - Visitor management (`/tenant/visitors`)
- **Payments** - Payment history (`/tenant/payments`)
- **Maintenance** - Maintenance requests (`/maintenance`)
- **Documents** - Personal documents (`/documents`)
- **Community** - Community feed (`/community`)
- **Profile** - Profile settings (`/profile`)

#### Tenant-Specific Features
- **Violations** - View violations (`/tenant/violations`)
- **Lift Booking** - Book service lift (`/tenant/lift-booking`)
- **Home Modification** - Request modifications (`/tenant/home-modification`)
- **Contractor Permit** - Apply for permits (`/tenant/contractor-permit`)

#### Quick Actions (Tenant Services)
- Move In/Out - Schedule moving services
- Home Services - AC, Plumbing, Electrical
- Home Modification - Structural changes
- Parking & Access - Cards & permits
- Violations & Penalties - View notices
- Amenities Booking - Pool, Gym, BBQ
- Visitor Management - Add & track visitors
- Lift Booking - Reserve service lift
- Support & Help Center - FAQs & emergency

---

## 🔗 Shared Routes (All Authenticated Users)

### Common Features
- `/dashboard` - General dashboard (role-agnostic)
- `/profile` - User profile management
- `/notifications` - Notification center
- `/help` - Help and support
- `/azure-eye` - Azure Eye integration
- `/parking` - Parking management
- `/more` - Additional features menu

### Property Features
- `/properties` - Property listings
- `/properties/[id]` - Property details

### Service Features
- `/services` - Service requests
- `/amenities` - Amenity bookings
- `/visitors` - Visitor management
- `/maintenance` - Maintenance requests
- `/payments` - Payment processing

### Communication
- `/community` - Community posts
- `/notifications` - Alerts and updates
- `/reports` - Generate reports

---

## 📱 Mobile Navigation Structure

### Bottom Navigation Bar (Mobile)
1. **Home** - Dashboard
2. **Services** - Quick access to services
3. **Amenities** - Amenity booking
4. **Community** - Community feed
5. **More** - Additional options

### Top Navigation Bar (Mobile)
- Logo/Brand
- Search
- Notifications
- Profile Menu

### Hamburger Menu (Mobile)
- All main navigation items
- Quick actions
- Settings
- Logout

---

## 🎯 Navigation Patterns

### Desktop Navigation
- **Top Header:** Logo, Search, Notifications, Profile
- **Sidebar:** Main navigation menu (collapsible)
- **Breadcrumbs:** Current location indicator
- **Tabs:** Sub-navigation within sections

### Mobile Navigation
- **Bottom Tab Bar:** Primary navigation (5 items)
- **Top Bar:** Logo, Search, Notifications
- **Drawer:** Extended menu access
- **Floating Action Button:** Quick actions

---

## 🔐 Access Control Matrix

| Route | Super Admin | Building Manager | Landlord | Tenant |
|-------|-------------|------------------|----------|--------|
| `/super-admin/*` | ✅ | ❌ | ❌ | ❌ |
| `/building-manager/*` | ✅ | ✅ | ❌ | ❌ |
| `/landlord/*` | ✅ | ✅ | ✅ | ❌ |
| `/tenant/*` | ✅ | ✅ | ❌ | ✅ |
| `/dashboard` | ✅ | ✅ | ✅ | ✅ |
| `/services` | ✅ | ✅ | ✅ | ✅ |
| `/amenities` | ✅ | ✅ | ✅ | ✅ |
| `/community` | ✅ | ✅ | ✅ | ✅ |
| `/profile` | ✅ | ✅ | ✅ | ✅ |

---

## 🎨 Navigation UI Components

### Available Components
- `components/navigation.tsx` - Desktop navigation
- `components/touch-navigation.tsx` - Mobile navigation
- `components/ui/navigation-menu.tsx` - Radix UI navigation menu
- `components/ui/sidebar.tsx` - Collapsible sidebar

### Navigation Features
- ✅ Active route highlighting
- ✅ Breadcrumb navigation
- ✅ Keyboard shortcuts
- ✅ Touch gestures (mobile)
- ✅ Responsive design
- ✅ Accessibility (ARIA labels)
- ✅ Role-based visibility

---

## 🚀 Quick Navigation Shortcuts

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Global search
- `Ctrl/Cmd + B` - Toggle sidebar
- `Ctrl/Cmd + /` - Show shortcuts
- `Ctrl/Cmd + H` - Go to home/dashboard
- `Ctrl/Cmd + P` - Go to profile
- `Ctrl/Cmd + N` - Notifications

### Touch Gestures (Mobile)
- **Swipe Right** - Open sidebar
- **Swipe Left** - Close sidebar
- **Pull Down** - Refresh
- **Long Press** - Context menu

---

## 📊 Navigation Analytics

### Tracked Metrics
- Most visited pages
- Navigation path analysis
- Time spent per section
- Drop-off points
- Search queries
- Quick action usage

---

## 🔄 Navigation State Management

### Current Implementation
- URL-based routing (Next.js App Router)
- Client-side navigation with `next/navigation`
- Active route detection with `usePathname()`
- Role-based route protection
- Redirect logic for unauthorized access

---

## 📝 Navigation Best Practices

### Implemented
- ✅ Clear visual hierarchy
- ✅ Consistent placement
- ✅ Descriptive labels
- ✅ Visual feedback (hover, active states)
- ✅ Breadcrumb trails
- ✅ Search functionality
- ✅ Mobile-first design
- ✅ Accessibility compliance

---

## 🎯 Future Enhancements

### Planned Features
- [ ] Personalized navigation (based on usage)
- [ ] Recently visited pages
- [ ] Favorite/bookmark pages
- [ ] Multi-language navigation labels
- [ ] Voice navigation (accessibility)
- [ ] Gesture customization
- [ ] Navigation history
- [ ] Quick switcher (Cmd+K style)

---

*Last Updated: January 2025*
*Version: 1.0.0*
