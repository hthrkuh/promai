Here’s the updated `README.md` file for your application:

```markdown
# GIF Store Application

## Overview

This application is a GIF store that allows users to view trending GIFs, search for specific GIFs, and purchase GIFs using Stripe for payment processing. It integrates with a CRM system to log payment details and includes role-based access control, allowing only managers to access certain features.

## Features

- **Trending GIFs**: View a list of currently trending GIFs.
- **Search GIFs**: Search for GIFs by keyword.
- **Purchase GIFs**: Buy GIFs using Stripe's secure checkout process.
- **User Authentication**: Secure login and logout functionality.
- **Role-Based Access Control**: Only managers can access certain features, like viewing CRM data.
- **CRM Integration**: Logs payment details to a CRM system.
- **API Documentation**: Auto-generated API documentation using Swagger.

## Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express
- **Database**: (Specify if any database is used)
- **Payment Gateway**: Stripe
- **CRM Integration**: Custom CRM API
- **API Documentation**: Swagger

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Stripe account (for payment processing)
- CRM system (for logging payments)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/gif-store.git
   cd gif-store
   ```

2. **Install backend dependencies:**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following content:

   ```env
   PORT=5000
   STRIPE_SECRET_KEY=your_stripe_secret_key
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   ```

   Adjust `FRONTEND_URL` as needed.

### Running the Application

1. **Start the backend server:**

   ```bash
   cd server
   npm start
   ```

2. **Start the frontend application:**

   ```bash
   cd ../client
   npm start
   ```

3. **Access the application:**

   Open your browser and go to `http://localhost:3000` to view the application.

4. **Access Swagger API Documentation:**

   Navigate to `http://localhost:5000/api-docs` to view the API documentation.

## API Endpoints

### GIFs

- **Get Trending GIFs**

  - **Endpoint:** `GET /api/giphy/trending`
  - **Description:** Retrieve a list of trending GIFs.

- **Search GIFs**

  - **Endpoint:** `GET /api/giphy/search`
  - **Description:** Search for GIFs based on a query parameter.
  - **Query Parameters:**
    - `q` (string): Search query

### Payments

- **Process Payment**

  - **Endpoint:** `POST /api/payment/pay`
  - **Description:** Process a payment for a GIF.
  - **Request Body:**
    - `gif` (object): GIF details including title and image URL

### CRM

- **Log Payment**

  - **Endpoint:** `GET /api/data`
  - **Description:** Get payment details in the CRM.
  - **Data:**
    - `userId` (string): ID of the user making the payment
    - `gifId` (string): ID of the GIF being purchased
    - `amount` (number): Amount of the payment
    - `currency` (string): Currency of the payment
    - `paymentStatus` (string): Status of the payment
    - `paymentDate` (string): Date of the payment
    - `errorMessage` (string, optional): Error message if any

## Role-Based Access

- **Manage CRM Data**

  - **Endpoint:** `/manage`
  - **Description:** Access restricted to users with the manager role (role 0).
  - **Implementation:** The "Manage" tab is only visible to managers in the frontend, and backend routes check user roles before granting access.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Stripe](https://stripe.com) for payment processing.
- [Swagger](https://swagger.io) for API documentation.
- [React](https://reactjs.org) and [Bootstrap](https://getbootstrap.com) for frontend development.
- [Node.js](https://nodejs.org) and [Express](https://expressjs.com) for backend development.
```

This `README.md` provides a comprehensive overview of your application, including its features, setup instructions, and API details. Adjust the content as needed based on the specific details of your project.


demo users :

// Example user array (for demonstration purposes only)
const users = [
    {
        id: 0,
        username: "manger",
        passwordHash:
            "$2b$10$G4sNLTajBrT/NVdL5zURY.LQk0Dld2o40JYCjEFjngE3fppMJQIy6",
        role: 0
    },
    {
        id: 1,
        username: "user1",
        passwordHash:
            "$2b$10$G4sNLTajBrT/NVdL5zURY.LQk0Dld2o40JYCjEFjngE3fppMJQIy6",
        role: 1
    }
];

password : test