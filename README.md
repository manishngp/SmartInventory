# SmartInventory


## Introduction
SmartInventory App is a modern inventory management system built with React, Redux, and Chakra UI. It helps businesses and individuals efficiently manage their inventory with features like real-time stock tracking, expiration alerts, and advanced filtering capabilities.

## Project Type
Frontend 

## Features

### 1. Inventory Management
- Create, read, update, and delete inventory items
- Track item details including name, category, quantity, and expiry date
- Set minimum quantity thresholds for automatic alerts

### 2. Smart Alerts
- Low stock notifications when items fall below minimum quantity
- Expiration alerts for items nearing expiry date
- Real-time alert dashboard

### 3. Advanced Search and Filtering
- Search items by name, category, or location
- Filter by:
  - Category
  - Location
  - Availability status (In Stock, Low Stock, Out of Stock)
- Group items by various attributes

### 4. User Interface
- Clean and intuitive design using Chakra UI
- Responsive layout for all device sizes
- Real-time updates

## Technology Stack
- **Frontend Framework**: React
- **State Management**: Redux + Redux Thunk
- **UI Library**: Chakra UI
- **Styling**: Chakra UI + Custom CSS
- **Build Tool**: Vite

## Installation & Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd smartinventory-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### Adding Items
1. Click "Add New Item" button
2. Fill in the item details:
   - Name
   - Category
   - Quantity
   - Minimum Quantity
   - Expiry Date (optional)
   - Location (optional)
3. Submit the form

### Managing Items
- Edit items by clicking the "Edit" button on any item card
- Delete items using the "Delete" button
- View item status through color-coded badges

### Searching and Filtering
- Use the search bar to find items by name, category, or location
- Apply filters using the dropdown menus for category, location, and availability
- Combine search and filters for precise results
