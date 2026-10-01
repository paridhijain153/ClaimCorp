# CLAIMCORP
## LOW-LEVEL DESIGN (LLD) DOCUMENT

**Project Name:** ClaimCorp – Enterprise Expense Management System  
**Document Type:** Low-Level Design (LLD)  
**Version:** 1.0  
**Architecture Style:** Layered Modular Monolith  
**Frontend:** React.js + Vite  
**Backend:** Node.js + Express.js  
**Database:** PostgreSQL  
**ORM:** Prisma  
**Authentication:** JWT  
**Validation:** Zod  

---

# 1. INTRODUCTION

## 1.1 Purpose

This document describes the Low-Level Design (LLD) of ClaimCorp.

The purpose of this document is to define the internal technical implementation of the system, including:

- Backend module structure.
- Frontend module structure.
- Database entities.
- Entity relationships.
- API endpoints.
- Authentication flow.
- Authorization flow.
- Validation strategy.
- Expense lifecycle.
- Manager approval workflow.
- Receipt processing.
- Analytics processing.
- Error handling.
- Service and repository responsibilities.

The LLD serves as a technical reference for developers implementing, maintaining, testing, and extending the ClaimCorp application.

---

# 2. SYSTEM ARCHITECTURE

ClaimCorp follows a layered modular architecture.

```text
                         CLIENT
                           |
                           v
                  +----------------+
                  | React Frontend |
                  +-------+--------+
                          |
                       Axios
                          |
                          v
                  +----------------+
                  | Express Router |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |  Middleware    |
                  | Auth / Role /  |
                  | Validation     |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |   Controller   |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |    Service     |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |   Repository   |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  | Prisma Client  |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |   PostgreSQL   |
                  +----------------+
```

---

# 3. BACKEND PROJECT STRUCTURE

The backend follows a modular structure.

```text
backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   │
│   ├── config/
│   │
│   ├── middleware/
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │
│   │   ├── users/
│   │   │
│   │   ├── expenses/
│   │   │
│   │   ├── categories/
│   │   │
│   │   ├── receipts/
│   │   │
│   │   └── analytics/
│   │
│   ├── routes/
│   │
│   ├── utils/
│   │
│   └── server.js
│
└── package.json
```

---

# 4. MODULE STRUCTURE

Each major backend module follows the layered pattern:

```text
Module
│
├── Routes
├── Controller
├── Service
├── Repository
└── Validation Schema
```

For example:

```text
expenses/
│
├── expense.routes.js
├── expense.controller.js
├── expense.service.js
├── expense.repository.js
└── expense.schema.js
```

---

# 5. LAYER RESPONSIBILITIES

## 5.1 Route Layer

The route layer:

- Defines API endpoints.
- Connects endpoints to controllers.
- Applies authentication middleware.
- Applies authorization middleware.
- Applies request validation where required.

Example:

```text
POST /expenses
       |
       v
Authentication
       |
       v
Authorization
       |
       v
Expense Controller
```

---

# 6. CONTROLLER LAYER

Controllers are responsible for HTTP-level operations.

Responsibilities:

- Read request parameters.
- Read request body.
- Read authenticated user information.
- Call the appropriate service.
- Return the HTTP response.
- Forward errors to the error-handling layer.

Controllers should not contain complex business rules.

Example:

```text
Request
   |
   v
Controller
   |
   v
Expense Service
   |
   v
Response
```

---

# 7. SERVICE LAYER

The service layer contains business logic.

Responsibilities include:

- Expense validation.
- Expense state transitions.
- Permission-related business rules.
- User-manager relationship validation.
- Expense calculations.
- Approval rules.
- Rejection rules.
- Analytics calculations.

Example:

```text
Expense Controller
       |
       v
Expense Service
       |
       +---- Validate Expense
       +---- Validate User
       +---- Apply Business Rules
       |
       v
Expense Repository
```

---

# 8. REPOSITORY LAYER

The repository layer handles database operations.

Responsibilities:

- Create records.
- Find records.
- Update records.
- Delete records where applicable.
- Execute filtered queries.
- Handle Prisma database operations.

The repository should not contain HTTP-specific logic.

```text
Service
   |
   v
Repository
   |
   v
Prisma
   |
   v
PostgreSQL
```

---

# 9. MIDDLEWARE ARCHITECTURE

ClaimCorp uses middleware for cross-cutting concerns.

Major middleware responsibilities:

```text
Middleware
│
├── Authentication
├── Role Authorization
├── Request Validation
└── Error Handling
```

---

# 10. AUTHENTICATION MODULE

## 10.1 Login Flow

```text
User
 |
 v
Login Page
 |
 v
POST /login
 |
 v
Auth Controller
 |
 v
Auth Service
 |
 +---- Find User
 |
 +---- Verify Password
 |
 +---- Generate JWT
 |
 v
Response
```

---

# 11. PASSWORD VERIFICATION

Passwords are never compared as plain text.

The flow is:

```text
User Password
      |
      v
bcrypt Verification
      |
      +---- Invalid
      |       |
      |       v
      |     Error
      |
      +---- Valid
              |
              v
          Generate JWT
```

Passwords stored in the database are hashed.

---

# 12. JWT AUTHENTICATION

After successful login, the server generates a JWT.

Conceptually, the token contains:

```json
{
  "userId": "USER_ID",
  "role": "EMPLOYEE"
}
```

The token is then used for protected API requests.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 13. AUTHENTICATION MIDDLEWARE

Protected request flow:

```text
HTTP Request
     |
     v
Authorization Header
     |
     v
JWT Middleware
     |
     +------ Invalid ------> 401 Unauthorized
     |
     v
Verify Token
     |
     v
Extract User Information
     |
     v
Attach User to Request
     |
     v
Next Middleware
```

---

# 14. ROLE AUTHORIZATION

After authentication, the user's role is checked.

```text
Authenticated User
        |
        v
Role Middleware
        |
   +----+----+
   |    |    |
 ADMIN MANAGER EMPLOYEE
```

Example:

```text
GET /users
```

may require:

```text
ADMIN
```

while:

```text
GET /expenses
```

can return information based on the authenticated user's role and access scope.

---

# 15. USER MODULE

## 15.1 User Entity

```text
User
--------------------------------
id
name
email
password
role
department
designation
managerId
isActive
createdAt
updatedAt
```

---

# 16. USER ROLES

```text
Role
----------------
ADMIN
MANAGER
EMPLOYEE
```

---

# 17. USER RELATIONSHIP

The User entity supports a self-referencing manager relationship.

```text
                 User
                  |
               Manager
                  |
        +---------+---------+
        |         |         |
        v         v         v
    Employee  Employee  Employee
```

Conceptually:

```text
managerId → User.id
```

This allows the system to associate employees with their managers.

---

# 18. USER MANAGEMENT APIs

## 18.1 List Users

```http
GET /users
```

Purpose:

Retrieve users for administrative management.

---

## 18.2 Create User

```http
POST /users
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "role": "EMPLOYEE",
  "department": "Engineering",
  "designation": "Software Engineer",
  "managerId": "MANAGER_ID"
}
```

---

## 18.3 Activate User

```http
PATCH /users/:id/activate
```

---

## 18.4 Deactivate User

```http
PATCH /users/:id/deactivate
```

---

# 19. USER CREATION FLOW

```text
Admin
  |
  v
Create User Form
  |
  v
Frontend Validation
  |
  v
POST /users
  |
  v
Authentication
  |
  v
ADMIN Authorization
  |
  v
User Controller
  |
  v
User Service
  |
  +---- Check Email
  +---- Validate Role
  +---- Validate Manager
  +---- Hash Password
  |
  v
User Repository
  |
  v
Prisma
  |
  v
PostgreSQL
```

---

# 20. CATEGORY MODULE

## 20.1 Category Entity

```text
Category
--------------------------------
id
name
description
isActive
createdAt
updatedAt
```

---

# 21. CATEGORY APIs

## Get Categories

```http
GET /categories
```

---

## Create Category

```http
POST /categories
```

Example:

```json
{
  "name": "Travel",
  "description": "Business travel expenses"
}
```

---

# 22. CATEGORY RELATIONSHIP

```text
Category
    |
    +---- Expense
    |
    +---- Expense
    |
    +---- Expense
```

Relationship:

```text
Category 1 : N Expense
```

A category can be associated with multiple expenses.

---

# 23. EXPENSE MODULE

The Expense module is the core business module.

## 23.1 Expense Entity

```text
Expense
--------------------------------
id
expenseNumber
employeeId
categoryId
title
description
expenseDate
amount
tax
totalAmount
status
managerComment
approvedById
submittedAt
approvedAt
createdAt
updatedAt
```

---

# 24. EXPENSE STATUS

The expense lifecycle uses the following states:

```text
DRAFT
SUBMITTED
APPROVED
REJECTED
REIMBURSED
```

---

# 25. EXPENSE STATE MACHINE

```text
              +---------+
              |  DRAFT  |
              +----+----+
                   |
                 Submit
                   |
                   v
             +-----------+
             | SUBMITTED |
             +-----+-----+
                   |
            Manager Review
              +----+----+
              |         |
           Approve     Reject
              |         |
              v         v
        +---------+ +----------+
        | APPROVED| | REJECTED |
        +----+----+ +----------+
             |
       Reimbursement
             |
             v
       +------------+
       | REIMBURSED |
       +------------+
```

---

# 26. EXPENSE API DESIGN

## Create Expense

```http
POST /expenses
```

---

## Get Expenses

```http
GET /expenses
```

---

## Get Expense by ID

```http
GET /expenses/:id
```

---

## Update Expense

```http
PATCH /expenses/:id
```

Used primarily for updating draft expenses.

---

## Submit Expense

```http
PATCH /expenses/:id/submit
```

Expected state transition:

```text
DRAFT → SUBMITTED
```

---

## Autofill Expense

```http
PATCH /expenses/:id/autofill
```

Used for automated expense data population.

---

# 27. CREATE EXPENSE FLOW

```text
Employee
    |
    v
Create Expense Form
    |
    v
React Hook Form
    |
    v
Zod Validation
    |
    v
Axios
    |
    v
POST /expenses
    |
    v
Authentication Middleware
    |
    v
Authorization Middleware
    |
    v
Expense Controller
    |
    v
Expense Service
    |
    +
