# Attendance API Security

A secure REST API built using **Node.js**, **Express.js**, and **MySQL** for managing employee attendance and payroll-related information. The project implements **session-based authentication**, ensuring that all protected APIs are accessible only after successful login.

## Features

### Authentication & Security
- Session-based authentication using `express-session`
- Login using credentials stored in the `adminusers` table
- Password verification with `bcrypt`
- Protected API middleware
- Session destruction on logout
- Unauthorized access prevention

### Employee APIs
- Monthly Employee Salary API
- Employee Apply Leave Details API
- Employee Salary Slip API

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** express-session, bcrypt
- **Version Control:** Git & GitHub

## Project Structure

```
attendance-api-security/
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── auth.js
│   ├── monthlySalary.js
│   ├── employeeLeave.js
│   └── salarySlip.js
│
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── LICENSE
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/aryanbt107-star/attendance-api-security.git
```

### 2. Move into the project directory

```bash
cd attendance-api-security
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the database

Update your MySQL connection details inside **db.js**.

Example:

```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD',
    database: 'autocalhr'
});

module.exports = pool;
```

### 5. Start the server

```bash
node server.js
```

The API will run at:

```
http://localhost:3000
```

---

# Authentication

## Login

**POST**

```
/auth/login
```

### Request Body

```json
{
    "username": "test",
    "password": "your_password"
}
```

### Response

```json
{
    "message": "Login successful",
    "user": {
        "id": 1,
        "username": "test",
        "roleId": 2
    }
}
```

---

## Logout

**GET**

```
/auth/logout
```

Response

```json
{
    "message": "Logout successful"
}
```

---

# Protected APIs

After successful login, the session allows access to protected APIs.

## 1. Monthly Employee Salary

```
GET /salary/:employeeId/:month
```

Example:

```
GET /salary/21/2024-11
```

---

## 2. Employee Apply Leave Details

```
GET /leave/:employeeId
```

Example:

```
GET /leave/21
```

---

## 3. Employee Salary Slip

```
GET /salary-slip/:employeeId/:month
```

Example:

```
GET /salary-slip/21/2024-11
```

---

# Security Features

- Session-based authentication
- Password hashing using bcrypt
- Credentials stored securely in MySQL
- Protected routes via middleware
- Session destruction on logout
- Unauthorized requests return **401 Unauthorized**

---

# API Testing

You can test the APIs using:

- Postman
- Thunder Client (VS Code)
- Bruno
- Insomnia

---

# Future Enhancements

- Role-Based Access Control (RBAC)
- JWT Authentication
- HTTPS Support
- Session Expiry
- Rate Limiting
- Audit Logging
- Refresh Tokens
- Input Validation

---

# Author

**Aryan Thakur**

GitHub: https://github.com/aryanbt107-star

---

## License

This project is licensed under the **MIT License**.# attendance-api-security
Secure Employee Attendance API with Session-Based Authentication using Express.js, MySQL, and bcrypt.
