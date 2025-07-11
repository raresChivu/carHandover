# Car Handover Application - Database Schema

This directory contains the database schema and related documentation for the Car Handover Application.

## Files

- `schema.dbml` - Complete database schema in DBML format with all relationships and constraints

## Schema Overview

The database schema supports the complete car handover workflow including:

### Core Entities

1. **Users** - Unified table for both employees and admins (role-based access)
2. **Cars** - Complete car information with assignment tracking
3. **Process Verbals** - Detailed handover documentation
4. **Orders** - Car request lifecycle management
5. **Notifications** - User communication system
6. **Car Assignments** - Historical assignment tracking
7. **User Sessions** - Authentication and session management

### Key Features

- **Role-Based Access**: Single user table with `isAdmin` flag
- **Complete Audit Trail**: All car assignments and handovers are tracked
- **Flexible Notifications**: Can relate to cars, orders, or be system notifications
- **Session Management**: Secure user authentication support
- **Data Integrity**: Foreign key relationships ensure consistency

## Using the Schema

### Viewing the Schema

1. Visit [dbdiagram.io](https://dbdiagram.io/)
2. Copy the contents of `schema.dbml`
3. Paste into the editor to visualize relationships

### Database Implementation

The schema can be converted to SQL for various databases:

- **PostgreSQL**: Recommended for production
- **MySQL**: Alternative relational database
- **SQLite**: Good for development/testing

### Migration from localStorage

The current application uses localStorage for data persistence. This schema provides a direct migration path:

1. **Users**: Map from `registeredUsers` localStorage key
2. **Cars**: Map from `cars` localStorage key
3. **Process Verbals**: Extract from PVS form submissions
4. **Orders**: Extract from order management system
5. **Notifications**: Map from user notification arrays

## Implementation Notes

### Required Indexes

For optimal performance, create indexes on:

- `users.email` (login lookups)
- `cars.status` (filtering available cars)
- `cars.plate` (license plate searches)
- `orders.status` (pending requests)
- `notifications.recipientUserId` (user notifications)
- `notifications.isRead` (unread notifications)

### Business Rules

Implement these constraints in your application or database:

1. Cars can only be assigned to one user at a time
2. Only admins can approve/reject orders
3. Users can only request available cars
4. Process verbals require complete handover information
5. Maintain complete audit trail for assignments

### Security Considerations

- Hash all passwords before storage
- Implement proper session management
- Use parameterized queries to prevent SQL injection
- Regularly clean up expired sessions
- Implement proper access controls based on user roles

## Future Enhancements

The schema supports future features:

- Car maintenance tracking
- Advanced reporting and analytics
- Multi-location support
- Integration with external systems
- Mobile app backend support
