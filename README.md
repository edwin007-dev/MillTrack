# MillTrack | Full-Stack E-Commerce & Service Booking Platform

**MillTrack** is a full-stack web application developed using **Angular, TypeScript, Node.js, Express.js, and MySQL**, designed to digitize the operations of traditional mill businesses.

The platform integrates **e-commerce functionality with service appointment management**, allowing customers to browse and purchase mill products, book milling services, and manage their orders through a centralized system.

Mill owners can manage product listings, handle customer service requests, schedule appointments, and monitor business activities. The application also incorporates automated email notifications and time-slot-based booking to improve operational efficiency and prevent scheduling conflicts.

## Key Features

### Customer Features

- **User Registration & Authentication:** Customer account registration, login, and authentication.
- **Product Catalogue:** Browse available products across categories such as spices, grains, and oils.
- **Product Details:** View individual product information, pricing, and availability.
- **Shopping Cart:** Add products to the cart and manage selected items.
- **Product Checkout:** Place product orders through a dedicated checkout workflow.
- **Service Booking:** Browse available milling services and schedule appointments.
- **Time-Slot Selection:** Choose preferred appointment dates and time slots.
- **Booking Status:** Track service requests and their acceptance or rejection.
- **Email Notifications:** Receive automated confirmations and booking-related updates.

### Mill Owner Features

- **Product Management:** Add, update, and manage products and their categories.
- **Service Management:** Maintain available milling services and service details.
- **Booking Management:** View incoming service requests and accept or reject bookings.
- **Appointment Scheduling:** Manage service appointments based on available time slots.
- **Order Management:** View and manage customer product orders.
- **Business Reports:** Access operational reports and analytics for monitoring business activities.

### Core System Features

- **Separate Checkout Workflows:** Independent processes for product purchases and service bookings.
- **Time-Slot Conflict Prevention:** Booking validation designed to prevent multiple appointments from occupying the same service slot.
- **Automated Email Integration:** Transactional email notifications implemented using Nodemailer.
- **RESTful API Architecture:** Backend APIs for communication between the Angular frontend and Node.js server.
- **Relational Database Integration:** Structured MySQL database for managing customers, products, services, bookings, and transactions.
- **Dynamic User Interface:** Angular components and reactive forms for interactive application workflows.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Angular, TypeScript, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MySQL |
| API Architecture | REST APIs |
| Email Integration | Nodemailer |
| Frontend Forms | Angular Reactive Forms |
| Version Control | Git, GitHub |
| Development Tools | Visual Studio Code, MySQL |

## System Architecture

MillTrack follows a client-server architecture with a dedicated frontend, backend, and relational database.

```text
               Customer / Mill Owner
                        |
                        v
                Angular Frontend
                 (TypeScript)
                        |
                        v
                   REST APIs
                        |
                        v
              Node.js + Express.js
                        |
              +---------+---------+
              |                   |
              v                   v
         MySQL Database      Nodemailer
              |                   |
              v                   v
        Application Data     Email Alerts
```

### Frontend

The Angular application handles user interaction, page navigation, form validation, product browsing, shopping cart operations, and service booking interfaces.

### Backend

The Node.js and Express.js server handles API requests, business logic, database operations, order processing, appointment scheduling, and email notifications.

### Database

MySQL provides persistent storage for customer accounts, mill information, product categories, product details, service listings, bookings, and orders.

## Application Workflow

### Product Purchase Workflow

1. Customers register or log in to the application.
2. Browse products organized into categories.
3. View individual product details.
4. Add selected products to the shopping cart.
5. Review cart items and proceed to checkout.
6. Submit the order.
7. The backend processes and stores the order details in MySQL.

### Service Booking Workflow

1. Customers browse available milling services.
2. Select a service and preferred appointment date.
3. Choose an available time slot.
4. Submit the booking request.
5. The system checks for scheduling conflicts to prevent overlapping bookings.
6. The mill owner reviews and accepts or rejects the request.
7. The customer receives an email notification with the booking status and relevant appointment details.

## Database Design

MillTrack uses a relational MySQL database to maintain structured application data.

The database includes entities for:

- **Customers:** Registration and customer account information.
- **Mills:** Mill business information and associated services.
- **Products:** Product listings, descriptions, pricing, and categories.
- **Categories & Subcategories:** Product classification and organization.
- **Services:** Available milling services and their details.
- **Bookings:** Service booking information, appointment dates, and status.
- **Booking Details:** Individual service requests associated with bookings.
- **Orders:** Customer product purchases and transaction records.
- **Locations:** Geographic information associated with customers and mill businesses.

Relational database operations support data retrieval, record management, and application workflows.

## Installation & Setup

### Prerequisites

Ensure the following are installed:

- Node.js and npm
- Angular CLI
- MySQL Server
- Git
- Visual Studio Code or another code editor

### Step 1: Clone the Repository

```bash
git clone https://github.com/edwin007-dev/MillTrack.git
cd MillTrack
```

### Step 2: Install Frontend Dependencies

Navigate to the Angular project directory containing `angular.json` and `package.json`.

```bash
npm install
```

### Step 3: Install Backend Dependencies

Navigate to the Node.js backend directory containing its `package.json`.

```bash
npm install
```

### Step 4: Configure the Database

1. Start your MySQL server.
2. Create a database for the application.
3. Import the project's SQL schema, if included in the repository.
4. Locate the backend database connection configuration.
5. Update the MySQL hostname, username, password, and database name according to your local environment.

### Step 5: Configure Email Notifications

The application uses Nodemailer for sending booking-related email notifications.

Configure the SMTP credentials in the backend's email configuration.

Keep email credentials, passwords, and other sensitive values out of version control.

### Step 6: Start the Backend Server

From the backend directory, run the start command defined in its `package.json`.

For example:

```bash
npm start
```

### Step 7: Start the Angular Frontend

From the Angular project directory, run:

```bash
ng serve
```

By default, Angular's development server is accessible at:

```text
http://localhost:4200/
```

Ensure that the frontend API configuration points to the correct backend server address.

**Note:** Folder names, server commands, database configuration, and repository URLs may vary depending on the project's actual structure.

## Project Objectives

- Digitize traditional mill business operations through a centralized web application.
- Develop an integrated platform for online product sales and milling service bookings.
- Implement appointment scheduling with time-slot conflict prevention.
- Build RESTful APIs for communication between frontend and backend systems.
- Design and manage a relational MySQL database.
- Automate service booking confirmations and status notifications.
- Provide mill owners with tools for managing products, services, and customer requests.
- Gain practical experience in full-stack application development.

## Technical Implementation

### Angular Frontend Development

- Developed modular components for customer and mill owner interfaces.
- Implemented Angular routing for navigation between application pages.
- Used Angular Reactive Forms for data entry and validation.
- Integrated backend APIs using Angular services.
- Implemented dynamic rendering of products, services, and booking information.

### Backend API Development

- Built backend functionality using Node.js and Express.js.
- Developed API endpoints for customer, product, service, and booking operations.
- Implemented database queries for retrieving and updating application records.
- Integrated Nodemailer for automated email notifications.
- Implemented booking management logic for appointment scheduling and status updates.

### Database Management

- Designed relational database structures using MySQL.
- Implemented SQL queries and joins for retrieving related business information.
- Managed customer, product, booking, and service records.
- Connected backend services with MySQL for persistent data storage.

## Challenges & Solutions

### Preventing Service Overbooking

**Challenge:** Multiple customers attempting to reserve the same service appointment slot.

**Solution:** Implemented time-slot validation to check appointment availability and prevent scheduling conflicts.

### Managing Different Checkout Processes

**Challenge:** Product purchases and service appointments require different information and processing workflows.

**Solution:** Developed separate checkout processes for product orders and service bookings.

### Automating Booking Notifications

**Challenge:** Keeping customers informed about booking confirmations and status changes.

**Solution:** Integrated Nodemailer to automate email notifications for booking-related events.

### Managing Relational Data

**Challenge:** Retrieving information distributed across customers, mills, products, services, and bookings.

**Solution:** Used relational database design and SQL joins to retrieve and manage related records.

## What I Learned

Through this project, I gained practical experience in:

- Building full-stack applications using Angular and Node.js.
- Developing backend services with Express.js.
- Designing and consuming REST APIs.
- Managing relational databases using MySQL.
- Writing SQL joins and CRUD operations.
- Implementing scheduling and booking validation.
- Developing separate e-commerce and service checkout workflows.
- Integrating automated email functionality.
- Organizing frontend components and backend services.
- Debugging and integrating frontend, backend, and database operations.

## Future Enhancements

- Secure online payment gateway integration.
- Real-time appointment availability updates.
- Advanced product search and filtering.
- Improved business analytics and reporting dashboards.
- Automated invoice generation.
- Customer ratings and reviews.
- Mobile-responsive interface improvements.
- Advanced inventory management.
- Role-based access control enhancements.
- Cloud deployment and production infrastructure.

## Project Information

**Project Name:** MillTrack

**Project Type:** Full-Stack Web Application

**Domain:** E-Commerce & Service Booking Management

**Technologies:** Angular, TypeScript, Node.js, Express.js, MySQL

**Purpose:** Academic project and full-stack development portfolio

## Author

**[Edwin Benson](https://github.com/edwin007-dev)**

Developed as an academic project to demonstrate practical experience in full-stack web development, REST API integration, relational database management, and business workflow automation.

---

⭐ If you find this project useful, consider giving the repository a star!
