# Packing Supply Manager app

## Overview

The **Packing Supply Manager app** is a high-performance, scalable, and modular web application built using modern frontend technologies. The project follows industry best practices, adhering to **clean architecture, feature-sliced design (FSD)**, and **enterprise-grade TypeScript and React development standards**.

It is designed for **product and inventory management**, providing extensive capabilities such as **dynamic filtering, pagination, sorting, role-based access control, API-driven data interactions**, and **real-time updates**. The system ensures an intuitive UI/UX through **Ant Design components**, **theme customization**, and **globalization (i18n support)**.

---

## Quick Start

1. Install dependencies  
   yarn install

2. Start the development server
   yarn run dev

---

## 📌 Key Features

### 🏗 **Architecture & Code Quality**

-   **Feature-Sliced Design (FSD)** - The codebase is structured into feature domains, ensuring **scalability, maintainability, and separation of concerns**.
-   **Redux Toolkit (RTK Query) for State Management** - Provides efficient API caching, request deduplication, and auto-refetching of data.
-   **Strict TypeScript Implementation** - Enhances **type safety, predictability, and maintainability**.
-   **Ant Design UI Kit** - Ensures **consistency, accessibility, and responsiveness**.
-   **Dark Mode & Theme Customization** - Allows users to switch themes dynamically via a **global theme provider**.
-   **Localization & Internationalization (i18n)** - Supports multiple languages via **react-i18next**.

---

### ⚡ **Performance & Optimization**

-   **Efficient API Calls with RTK Query** - Reduces unnecessary requests and improves **network performance**.
-   **Virtualized Tables & Lists** - Handles large datasets with optimized rendering.
-   **Code Splitting & Lazy Loading** - Speeds up the initial page load by dynamically loading resources.
-   **Debounced Search & Filtering** - Prevents excessive API requests for a smoother user experience.

---

### 🔐 **Security & Authentication**

-   **JWT-Based Authentication** - Secure login/logout using **access and refresh tokens**.
-   **Protected Routes** - Restricts access based on authentication state using **React Router guards**.
-   **Session & Local Storage Management** - Supports **"Remember Me" functionality** with secure token storage.

---

### 📊 **Data Management & Features**

-   **Product Management** - CRUD operations for products with support for **categories, materials, colors, and packaging types**.
-   **Dynamic Filtering & Sorting** - Users can **filter by multiple criteria** (e.g., price, material, color, type).
-   **Excel Exporting** - Allows **downloading data in Excel format** for reporting.
-   **Analytics & Statistics** - Displays **visual insights using charts and graphs**.

---

### 🚀 **Developer Experience**

-   **Storybook Integration** - Documents UI components for **better collaboration and testing**.
-   **E2E Testing with Cypress** - Ensures **robust, bug-free user flows**.
-   **Unit & Integration Testing** - Written using **Jest and React Testing Library**.
-   **Linting & Formatting** - Uses **ESLint and Prettier** to enforce consistent coding standards.
-   **Custom Hooks & Utilities** - Centralized logic for **reusability and maintainability**.

---

## 🏛 **Project Structure**

### **Application Core (`app/`)**

-   **`providers/`** – Global providers (Theme, Auth, Collapse, etc.).
-   **`store/`** – Redux Toolkit store configuration.
-   **`styles/`** – Global styles and theme variables.
-   **`App.tsx`** – Root component handling routing.

### **Entities (`entities/`)**

Reusable domain-specific components and logic:

-   **`auth/`** – authentication state management.
-   **`product/`** – product management (CRUD operations, API, UI).
-   **`material/`** – material entity and data handling.
-   **`color/`** – color entity and filtering.
-   **`pack/`** – packaging entity.
-   **`chart/`** – analytics and statistics.
-   **`profile/`** – user profile and settings.

### **Features (`features/`)**

Self-contained functionalities:

-   **`login/`** – login logic and UI.
-   **`register/`** – user registration form.
-   **`logout/`** – logout functionality.
-   **`themeSwitcher/`** – dark mode switch.
-   **`langSwitcher/`** – language switcher.
-   **`columnManager/`** – column visibility and ordering controls.
-   **`filter/`** – filtering options for data tables.
-   **`rowDensity/`** – table row spacing adjustment.

### **Shared Utilities (`shared/`)**

Common utilities and UI components:

-   **`api/`** – RTK Query API setup.
-   **`config/`** – Application configuration settings.
-   **`const/`** – Global constants (Routes, Theme variables).
-   **`lib/`** – Helper functions and hooks.
-   **`types/`** – Shared TypeScript types.
-   **`ui/`** – Common UI components (Button, Table, etc.).

### **Widgets (`widgets/`)**

High-level UI components combining multiple entities:

-   **`Chart/`** – Statistics and visualization widget.
-   **`Color/`** – Color management widget.
-   **`Details/`** – Product details display widget.
-   **`ErrorScreen/`** – Fallback error handling screen.
-   **`Material/`** – Material management widget.
-   **`Navbar/`** – Top navigation bar.
-   **`Pack/`** – Packaging management widget.
-   **`Product/`** – Full-featured product management UI.
-   **`Profile/`** – User profile display, edit and password settings.
-   **`Sidebar/`** – Collapsible sidebar with menu navigation.

### **Pages (`pages/`)**

Page-level components:

-   **`ChartPage/`** – Analytics and statistics page.
-   **`ColorPage/`** – Color management page.
-   **`MaterialPage/`** – Material management page.
-   **`ProductPage/`** – Product management page.
-   **`DetailsPage/`** – Product details page.
-   **`LoginPage/`** – User login page.
-   **`RegisterPage/`** – User registration page.
-   **`ProfilePage/`** – User profile page.
-   **`PackPage/`** – Packaging management page.
-   **`NotFoundPage/`** – 404 error page.

## Contributing

We welcome your contributions! To get started, please follow these steps:

1. **Fork the repository**  
   Click “Fork” in the top-right corner of this page to create your own copy.

2. **Clone your fork**
    ```bash
    git clone https://github.com/Iskanderovulan/Supply-manager-app.git
    cd packing-supply-manager
    ```
