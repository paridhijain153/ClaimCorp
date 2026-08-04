# 🎨 ClaimCorp Frontend

> Frontend for **ClaimCorp – Enterprise Expense Management System**

ClaimCorp is a modern role-based Enterprise Expense Management System designed to simplify expense submission, approval workflows, and reimbursement tracking within organizations.

The frontend is built with **React**, **Vite**, and **Tailwind CSS**, providing dedicated dashboards and workflows for **Admins**, **Managers**, and **Employees** with a clean, responsive, and intuitive user experience.

---

# ✨ Features

## 🔐 Authentication

- Secure Login
- JWT Authentication
- Protected Routes
- Role-Based Navigation
- Automatic Session Persistence

---

## 👤 Admin Portal

Admins can:

- Dashboard Overview
- Manage Users
- Activate / Deactivate Users
- Create Employees
- Create Managers
- Manage Expense Categories
- Activate / Deactivate Categories
- View Organization Analytics

---

## 👨‍💼 Manager Portal

Managers can:

- Dashboard Overview
- Review Submitted Expenses
- Approve Expense Claims
- Reject Expense Claims
- Add Rejection Comments
- View Team Analytics

---

## 👩‍💻 Employee Portal

Employees can:

- Dashboard Overview
- Create Expense Claims
- Upload Receipts
- AI Receipt Autofill
- View Expense Details
- Submit Expenses
- Track Expense Status
- View Reimbursement Summary

---

# 📊 Dashboards

Each role has a dedicated dashboard.

### Admin Dashboard

- User Statistics
- Expense Statistics
- Financial Summary
- Organization Overview

### Manager Dashboard

- Pending Approvals
- Approved Expenses
- Team Spending
- Monthly Overview

### Employee Dashboard

- Draft Claims
- Submitted Claims
- Approved Claims
- Total Reimbursed
- Recent Expenses
- Quick Actions

---

# 🔍 Search & Filters

The application includes modern data management features.

### Users

- Search by Name
- Search by Email
- Filter by Role
- Filter by Status
- Sort A–Z / Z–A

### Categories

- Active / Inactive Categories

### Expenses

- Status Tracking
- Detailed Expense View

---

# 📄 Expense Workflow

```text
Draft
   │
   ▼
Submitted
   │
   ▼
Manager Review
   │
   ├───────────────┐
   ▼               ▼
Approved      Rejected
```

Employees can monitor the complete lifecycle of every expense claim.

---

# 🧾 Receipt Management

Employees can

- Upload Receipts
- View Uploaded Receipts
- AI OCR Autofill Support
- Automatic Expense Information Extraction

---

# 📈 Analytics

The frontend visualizes analytics for administrators and managers.

Includes

- Dashboard Metrics
- Monthly Expense Trends
- Category-wise Analytics
- Employee Spending Analytics

---

# 🎨 UI Highlights

- Modern Enterprise Dashboard
- Responsive Layout
- Sidebar Navigation
- Dynamic Navbar
- Global Footer
- Status Badges
- Reusable Cards
- Data Tables
- Search & Filtering
- Empty States
- Professional Typography
- Soft Shadows
- Rounded Components

---

# 🛠 Tech Stack

## Core

- React 19
- Vite

## Styling

- Tailwind CSS

## Routing

- React Router DOM

## HTTP Client

- Axios

## Notifications

- React Hot Toast

## Icons

- Lucide React

---

# 📁 Project Structure

```text
src
│
├── assets
│
├── components
│   ├── common
│   ├── expense
│   ├── forms
│   ├── layout
│   ├── tables
│   └── ui
│
├── constants
│
├── contexts
│
├── hooks
│
├── layouts
│
├── pages
│   ├── admin
│   ├── auth
│   ├── employee
│   └── manager
│
├── routes
│
├── services
│
└── utils
```

---

# 🔐 Role-Based Access

| Role | Permissions |
|------|-------------|
| Admin | User Management, Categories, Analytics |
| Manager | Expense Approval, Team Analytics |
| Employee | Expense Submission, Receipt Upload, Dashboard |

---

# 🚀 Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 📜 Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Builds the application for production.

```bash
npm run preview
```

Runs the production build locally.

```bash
npm run lint
```

Runs ESLint.

---

# 🌟 Key Highlights

- Enterprise-style User Interface
- Role-Based Dashboards
- Expense Approval Workflow
- AI Receipt Autofill
- Search & Filtering
- Responsive Design
- Reusable Component Architecture
- Clean Folder Structure
- Modern React Best Practices

---

# 🚧 Future Enhancements

- Dark Mode
- Pagination
- Export Reports
- Email Notifications
- Real-Time Updates
- Push Notifications
- Advanced Analytics
- Accessibility Improvements
- Internationalization (i18n)

---

# 👩‍💻 Author

**Paridhi Jain**

B.Tech Computer Science Engineering  
Lovely Professional University

GitHub: https://github.com/paridhijain153

LinkedIn: https://www.linkedin.com/in/paridhijain153/

---

# 📄 License

This project has been developed for educational and internship purposes.