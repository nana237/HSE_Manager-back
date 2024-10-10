# Project Setup Instructions

This README provides instructions on how to set up the project environment using the provided PowerShell script `setup-project.ps1`.

## Prerequisites

Before running the script, ensure you have the following:

- **Windows OS**: The script is designed to run in a Windows environment.
- **Docker**: Make sure Docker is installed and running on your machine.
- **PowerShell**: The script is a PowerShell script, so you'll need PowerShell installed (which is included by default on Windows).

## Setup Steps

Follow these steps to set up the project:

### 1. Clone the Repository

First, clone the project repository to your local machine:

`git clone <repository-url>`

Navigate into the project directory:

`cd <project-directory>`

### 2. Create the `.env` File

The script will automatically create a `.env` file for you. However, you can manually create it if needed. Ensure that the file contains the following environment variables:

`SECRET=your_jwt_secret_key`

### 3. Run the PowerShell Script

To execute the `setup-project.ps1` script, open a PowerShell terminal and navigate to the directory where the script is located. Then, run the following command:

`.\setup-project.ps1`

### 4. What the Script Does

The script performs the following tasks:

- **Creates a Docker PostgreSQL database**: The script will run a Docker container for PostgreSQL with the specified user, password, and database name.
  
- **Generates a `.env` file**: It will generate a `.env` file if it doesn't exist, setting a secret for JWT authentication.
  
- **Installs Node.js dependencies**: After setting up the environment, the script runs `npm install` to install all required Node.js packages for the project.

### 5. Accessing PostgreSQL

Once the Docker container is running, you can access your PostgreSQL database using the following credentials:

- **Host**: localhost
- **Port**: 5432
- **User**: your_username (as specified in the script)
- **Password**: your_password (as specified in the script)
- **Database**: your_database (as specified in the script)

### 6. Running the Application

After setting up the database and installing dependencies, you can run the application using:

`npm start`

This will start the server, and you can access it at `http://localhost:<port>` (replace `<port>` with your configured port).

### 7. Stopping the Docker Container

To stop the PostgreSQL Docker container, you can run the following command in your terminal:

`docker stop postgres-db`

If you want to remove the container as well, run:

`docker rm postgres-db`
