# Spandana Hospital Appointment System

## Overview
The Spandana Hospital Appointment System is a web application designed to facilitate the booking of medical appointments with doctors. The application provides users with an intuitive interface to view doctor profiles, check availability, and book appointments seamlessly. It includes both a patient-facing portal and an administrative system for managing multiple hospital branches.

## Table of Contents
- [Completed Features](#completed-features)
- [In Progress](#in-progress)
- [Planned Features](#planned-features)
- [Technical Architecture](#technical-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Completed Features
- **Doctor Profiles**: Users can view detailed profiles of doctors, including their qualifications, specialties, and experience.
- **Appointment Booking**: Users can select a date and time to book an appointment with a doctor.
- **Responsive Design**: The application is fully responsive and works on various devices.
- **Error Handling**: Proper error handling for loading states and failed API calls.
- **Toast Notifications**: Users receive feedback through toast notifications for actions like successful bookings or errors.
- **Dynamic Data Fetching**: The application fetches data from the API to display doctors and their available appointment slots.
- **Multi-tenant Admin Dashboard**: Administrative interface supporting multiple hospital branches with:
  - Organization overview and management
  - Branch-specific dashboards with statistics
  - Doctor management interface
  - Appointment tracking system
  - Department management

## In Progress
1. **Backend Integration**
   - Setting up API endpoints for each feature
   - Implementing data models and relationships
   - Creating authentication and authorization system

2. **Admin Dashboard Enhancement**
   - Implementing CRUD operations for all entities
   - Adding real-time data updates
   - Enhancing data visualization and reporting

3. **Multi-tenant Architecture**
   - Finalizing tenant isolation strategy
   - Implementing tenant-specific configurations
   - Setting up role-based access control

## Planned Features
- **User Authentication**: Multi-level authentication system for patients, doctors, and administrators
- **Appointment Management**: Comprehensive system for tracking and managing appointments
- **Analytics Dashboard**: Advanced analytics for hospital administrators
- **Doctor Scheduling**: Automated scheduling system with conflict resolution
- **Patient Records**: Secure electronic health records system
- **Inventory Management**: Track medical supplies and equipment
- **Billing Integration**: Automated billing and payment processing

## Technical Architecture
### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Components**: Custom components built with Radix UI
- **Styling**: TailwindCSS with custom theming
- **State Management**: React Query for server state
- **Charts**: Recharts for data visualization

### Backend (Planned)
- **API**: RESTful API with Node.js/Express
- **Database**: PostgreSQL for relational data
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3 for document storage
- **Caching**: Redis for performance optimization

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/spandana-hospital.git
   cd spandana-hospital
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   API_URL=http://your-api-url
   NEXT_PUBLIC_API_URL=http://your-api-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
### Patient Portal
- Navigate to the home page to view the list of doctors
- Click on a doctor's profile to view more details and book an appointment
- Use the calendar to select a date and time for your appointment

### Admin Dashboard
- Access the admin interface at `/admin`
- View and manage multiple hospital branches
- Monitor appointments, doctors, and departments
- Access detailed analytics and reports

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.