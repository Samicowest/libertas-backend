# Local Setup Guide - Libertas Alpha Refactored

This guide will help you set up and run the refactored Libertas Alpha project on your local system using a pure SQL database.

## Prerequisites

- **Node.js**: Version 18 or higher.
- **MySQL**: A local MySQL server running.
- **Package Manager**: `npm`.

## Step 1: Database Setup

1.  **Start your MySQL server**.
2.  **Create a new database**:
    ```sql
    CREATE DATABASE libertas_alpha;
    ```

## Step 2: Environment Configuration

1.  Navigate to the `server/` directory.
2.  Create a `.env` file with your database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=libertas_alpha
    JWT_SECRET=your_random_secret_string
    PORT=3000
    ```

## Step 3: Install Dependencies

From the **project root** directory, run:

```bash
npm install
```

This will install all necessary dependencies for both the client and server.

## Step 4: Running the Application

To start both the backend server and the frontend client, run:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`

The server will **automatically create the database tables** on the first run using the `schema.sql` file.

## Step 5: Logging In (Local Auth)

1.  Open the frontend in your browser.
2.  Enter any email and name to log in.
3.  The system will automatically create a user in your local SQL database.
