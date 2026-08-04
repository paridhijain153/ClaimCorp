# 🚀 ClaimCorp Backend

> Backend API for **ClaimCorp – Enterprise Expense Management System**

ClaimCorp is a role-based enterprise expense management platform that streamlines the reimbursement workflow within organizations. The backend provides secure authentication, expense processing, approval workflows, receipt management, analytics, and role-based authorization using a clean layered architecture.

---

## 📌 Features

### 👤 Authentication & Authorization

- JWT-based Authentication
- Secure Password Hashing using bcrypt
- Role-Based Access Control (RBAC)
- Protected API Routes
- User Session Validation

---

### 👥 User Management

- Create Employees
- Create Managers
- Activate / Deactivate Users
- Assign Employees to Managers
- Fetch Organization Users

---

### 💳 Expense Management

- Create Draft Expenses
- Update Existing Expenses
- Submit Expenses for Approval
- Expense Validation
- View Expense Details
- Employee Expense History

---

### 📄 Receipt Management

- Upload Expense Receipts
- Receipt Storage
- AI OCR Autofill Support
- Fraud Detection Flag Support
- Receipt Preview

---

### ✅ Approval Workflow

Managers can:

- Review Submitted Expenses
- Approve Expense Claims
- Reject Expense Claims
- Add Rejection Comments
- Track Pending Approvals

---

### 📊 Analytics

Admin Analytics

- Dashboard Summary
- User Statistics
- Expense Statistics
- Financial Summary

Manager Analytics

- Monthly Expense Trends
- Category-wise Spending
- Employee-wise Spending

---

### 📂 Category Management

- Create Categories
- Activate Categories
- Deactivate Categories
- Retrieve Available Categories

---

## 🏗 Architecture

The backend follows a layered architecture to ensure maintainability and scalability.

```
Routes
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

Each layer has a single responsibility:

| Layer | Responsibility |
|--------|----------------|
| Routes | API Endpoints |
| Controllers | Handle Requests & Responses |
| Services | Business Logic |
| Repositories | Database Operations |
| Prisma | ORM |
| PostgreSQL | Database |

---

## 🛠 Tech Stack

### Runtime

- Node.js
- Express.js

### Database

- PostgreSQL
- Prisma ORM

### Authentication

- JWT
- bcrypt

### Validation

- Zod

### File Handling

- Multer

### AI Integration

- OCR Autofill Support

### Development

- Nodemon

---

## 📁 Project Structure

```
src
│
├── config
│
├── middleware
│
├── modules
│   ├── analytics
│   ├── auth
│   ├── categories
│   ├── expenses
│   ├── receipts
│   └── users
│
├── routes
│
├── utils
│
└── server.js
```

Each module follows:

```
module
│
├── controller
├── service
├── repository
├── routes
└── schema
```

---

## 🔐 Roles

### Admin

- Manage Users
- Manage Categories
- View Organization Analytics

---

### Manager

- Review Submitted Expenses
- Approve / Reject Claims
- View Team Analytics

---

### Employee

- Create Expenses
- Upload Receipts
- Submit Claims
- Track Expense Status

---

## 📡 API Modules

| Module | Description |
|---------|-------------|
| Authentication | Login & JWT Authentication |
| Users | Employee & Manager Management |
| Categories | Expense Categories |
| Expenses | Expense CRUD |
| Receipts | Receipt Upload & OCR |
| Analytics | Dashboard & Reports |

---

## 🗄 Database

Main entities include:

- Users
- Expenses
- Categories
- Receipts

Relationships are managed using **Prisma ORM** with PostgreSQL.

---

## ⚙ Environment Variables

Create a `.env` file inside the project root.

```env
PORT=

DATABASE_URL=

JWT_SECRET=

JWT_EXPIRES_IN=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

---

## 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

Start Development Server

```bash
npm run dev
```

---

## 📜 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm start
```

Starts the production server.

```bash
npx prisma studio
```

Open Prisma Studio.

```bash
npx prisma migrate dev
```

Run database migrations.

```bash
npx prisma generate
```

Generate Prisma Client.

---

## 🔒 Security

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Input Validation
- Secure API Responses

---

## 🚧 Future Improvements

- Email Notifications
- Audit Logs
- Pagination
- Advanced Filtering
- Export Reports (CSV / PDF)
- Real-time Notifications
- Docker Support
- Unit & Integration Tests

---

## 👩‍💻 Author

**Paridhi Jain**

B.Tech Computer Science Engineering  
Lovely Professional University

GitHub: https://github.com/paridhijain153

LinkedIn: https://www.linkedin.com/in/paridhijain153/

---

## 📄 License

This project is developed for educational and internship purposes.