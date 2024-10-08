# Fork & Flavor

[Live URL](URL)

## Introduction

Fork & Flavor is a full-stack recipe-sharing community that connects cooking enthusiasts. Users can share, discover, and organize recipes, contribute ingredient checklists, and engage with others through commenting, rating, and following. The platform also offers premium features via a subscription model for exclusive content access.
## Features

- **User Authentication & Authorization**:
  - User Registration
  - Login with JWT-Based Authentication
  - Role-Based Access Control (Admin and User)
  - Secure Password Change

- **User Profile Management**:
  - Profile Customization
  - Social Connectivity
  - Premium Membership Subscription

- **Recipe Management**:
  - My Recipes
  - Recipe Creation & Update
  - Recipe Deletion

- **Rating, Commenting & Upvote/Downvote System**:
  - Rate Recipes
  - Commenting on Recipes
  - Upvote/Downvote System

- **Validation**:
  - Input Validation using Zod

- **Recipe Feed**:
  - Recipe Display
  - Advanced Search & Filter
  - Infinite Scroll

- **User Management**:
  - Admins can block/unblock users
  - Publish/Unpublish Recipes
  - Manage User Accounts
  - CRUD Operations on Recipes and Admin Accounts

## Technology Stack

- Next.js
- TypeScript
- NextUI
- TanStack Query
- Tailwind CSS
- DaisyUI

## Installation Guideline

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above) or yarn (version 1.22 or above)

### Installation Steps

1. **Clone the repository**

   ```sh
   https://github.com/kazirauf/Fork-Flavor-Client-Side
   ```

   2. **Navigate to the project directory**

   ```sh
   cd Fork-Flavor-Client-Side

   ```

   3. **Install the dependencies**

   ```sh
   npm install
   ```

### Configuration

1.  **Replace base URL according to your local machine**

```sh
const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});
```

## Usage

1.  **Start the development server**

```sh
npm run dev

```
