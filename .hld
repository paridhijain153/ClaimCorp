# CLAIMCORP
## HIGH-LEVEL DESIGN (HLD) DOCUMENT

**Project Name:** ClaimCorp – Enterprise Expense Management System  
**Document Type:** High-Level Design (HLD)  
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

This document presents the High-Level Design (HLD) of ClaimCorp, an enterprise expense management system designed to digitize and streamline the employee expense claim and reimbursement process.

ClaimCorp provides a centralized platform where employees can create and submit expense claims, managers can review and process submitted claims, and administrators can manage users, expense categories, and organizational analytics.

The system follows a role-based architecture to ensure that each user can access only the functionality permitted by their assigned role.

---

# 2. PROJECT OVERVIEW

ClaimCorp is a web-based enterprise application that manages the complete lifecycle of employee expenses.

The primary workflow is:

```text
Employee
    |
    | Create Expense
    v
Draft Expense
    |
    | Submit
    v
Submitted Expense
    |
    | Manager Review
    v
+------------------+
|                  |
v                  v
Approved         Rejected
|
| Reimbursement
v
Reimbursed
```

The system consists of three primary roles:

- Employee
- Manager
- Administrator

---

# 3. OBJECTIVES

The main objectives of ClaimCorp are:

1. Digitize the employee expense claim process.
2. Reduce manual expense management.
3. Provide a structured approval workflow.
4. Implement secure role-based access control.
5. Centralize expense-related information.
6. Provide organizational and employee-level analytics.
7. Support receipt upload and processing.
8. Provide a scalable and maintainable software architecture.
9. Improve visibility into organizational spending.
10. Maintain data integrity through a relational database.

---

# 4. SYSTEM USERS

## 4.1 Employee

Employees are responsible for creating and managing their own expense claims.

### Responsibilities

- Create expense claims.
- Save expenses as drafts.
- Edit draft expenses.
- Upload receipts.
- Submit expenses.
- View submitted expenses.
- Track expense status.

---

## 4.2 Manager

Managers are responsible for reviewing expenses submitted by employees under their supervision.

### Responsibilities

- View pending expenses.
- Review expense details.
- Approve expenses.
- Reject expenses.
- Provide rejection comments.
- Monitor team expenses.
- View team-level analytics.

---

## 4.3 Administrator

Administrators are responsible for organization-wide management.

### Responsibilities

- Manage users.
- Create users.
- Assign user roles.
- Assign employees to managers.
- Activate and deactivate users.
- Manage expense categories.
- View organization-wide analytics.

---

# 5. FUNCTIONAL REQUIREMENTS

## 5.1 Authentication

The system shall provide:

- User login.
- Password verification.
- JWT-based authentication.
- Secure session handling.
- Protected application routes.
- Role-based authorization.

---

## 5.2 User Management

Administrators shall be able to:

- View users.
- Create users.
- Assign roles.
- Assign managers to employees.
- Activate users.
- Deactivate users.

---

## 5.3 Expense Management

Employees shall be able to:

- Create an expense.
- Select an expense category.
- Enter amount and tax information.
- Enter expense date.
- Add descriptions.
- Save expenses as drafts.
- Edit draft expenses.
- Submit expenses.
- View expense history.
- View expense status.

---

## 5.4 Expense Approval

Managers shall be able to:

- View pending expense claims.
- Open expense details.
- Review employee expenses.
- Approve expenses.
- Reject expenses.
- Add comments when rejecting an expense.

---

## 5.5 Category Management

Administrators shall be able to:

- View expense categories.
- Create categories.
- Manage category availability.

---

## 5.6 Receipt Management

The system supports receipt-related functionality including:

- Receipt upload.
- Receipt storage.
- Receipt processing.
- OCR-based information extraction.
- Expense information autofill.

---

## 5.7 Analytics

The system provides analytics for:

- Overall expense statistics.
- Monthly expense trends.
- Category-wise spending.
- Employee-wise spending.
- Organization-level metrics.

---

# 6. NON-FUNCTIONAL REQUIREMENTS

## 6.1 Security

The system shall provide:

- JWT-based authentication.
- Password hashing.
- Role-based access control.
- Backend request validation.
- Protected APIs.
- Secure handling of environment variables.
- Database constraints.

---

## 6.2 Scalability

The application follows a modular monolithic architecture.

Major business domains are separated into modules so that they can be developed and maintained independently.

The architecture can later be extended to support:

- Redis caching.
- Background processing.
- Notification services.
- Independent microservices.
- Load balancing.

---

## 6.3 Maintainability

The backend follows a layered architecture:

```text
Controller
     |
     v
Service
     |
     v
Repository
     |
     v
Database
```

This separation ensures that:

- HTTP handling remains separate from business logic.
- Business logic remains separate from database operations.
- Database access remains centralized.
- Individual modules can be tested independently.

---

## 6.4 Reliability

The system should:

- Validate user input.
- Validate authorization.
- Maintain database relationships.
- Prevent invalid expense state transitions.
- Handle API failures.
- Maintain data consistency.

---

## 6.5 Performance

The system is designed to support:

- Efficient database queries.
- API-level filtering.
- Pagination.
- Database
