# Inventory Management System

A clean, professional web application for managing inventories. Built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (login and registration)
- Dashboard with inventory overview
- Detailed inventory management with categories and items
- Create, read, update, and delete operations for inventories, categories, and items
- Quantity adjustment with plus/minus buttons
- Responsive design for mobile and desktop

## Tech Stack

- React 18 with TypeScript
- React Router v6 for client-side routing
- Tailwind CSS for styling
- Lucide React for icons
- Vite as build tool

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # App header with navigation
│   └── Modal.tsx        # Reusable modal component
├── data/                # Mock data
│   └── mockData.ts      # Sample inventory data
├── pages/               # Page components
│   ├── LoginPage.tsx    # User login page
│   ├── RegisterPage.tsx # User registration page
│   ├── DashboardPage.tsx# Main dashboard with inventory list
│   └── InventoryDetailPage.tsx # Inventory detail view
├── App.tsx              # Main app with routing
├── main.tsx             # App entry point
└── index.css            # Tailwind CSS imports
```

## Pages

### Login (`/login`)
- Email and password input fields
- Form validation
- Navigation to dashboard on login
- Link to register page

### Register (`/register`)
- Email, password, and confirm password fields
- Password matching validation
- Navigation to dashboard on registration
- Link to login page

### Dashboard (`/dashboard`)
- Header with app name and logout button
- Section displaying user's inventories
- Inventory cards with:
  - Inventory name
  - Category count
  - Open button to view details
  - Delete button
- Create new inventory modal
- Empty state when no inventories exist

### Inventory Detail (`/inventory/:id`)
- Back navigation to dashboard
- Inventory name and category count
- Categories displayed as sections with:
  - Category name
  - Add item button
  - Delete category button
  - List of items with:
    - Item name
    - Quantity with plus/minus buttons
    - Delete item button
- Add new category modal
- Add new item modal (per category)
- Empty state for categories and items

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Notes

- This is a static frontend prototype with no backend connection
- All data is stored in component state and resets on page refresh
- Mock data is provided in `src/data/mockData.ts`
- Form validation is basic (password matching, required fields)
- No real authentication - navigation is unrestricted

## Color Scheme

- Primary: Blue (600/700)
- Background: Gray-50
- Cards: White with subtle borders
- Success: Green-600
- Danger: Red-600
- Text: Gray-900 (headings), Gray-600 (secondary)

## Responsive Design

- Mobile-friendly with appropriate padding and spacing
- Grid layout adjusts columns based on screen size
- Touch-friendly button sizes
- Readable font sizes across all devices
