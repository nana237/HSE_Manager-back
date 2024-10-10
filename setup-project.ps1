# Step 1: Prompt for database and project configuration
$postgresUser = Read-Host "Enter your PostgreSQL username (e.g., postgres)"
$postgresPassword = Read-Host "Enter your PostgreSQL password"
$postgresDatabase = Read-Host "Enter the name of the PostgreSQL database"
$dockerContainerName = Read-Host "Enter Docker container name (default: postgres-db)"
if (-not $dockerContainerName) { $dockerContainerName = "postgres-db" }

# Step 2: Run Docker container for PostgreSQL
Write-Host "Starting PostgreSQL Docker container..."
$dockerRunCommand = "docker run --name $dockerContainerName -e POSTGRES_USER=$postgresUser -e POSTGRES_PASSWORD=$postgresPassword -e POSTGRES_DB=$postgresDatabase -p 5432:5432 -d postgres"
Invoke-Expression $dockerRunCommand

# Step 3: Wait a few seconds to ensure the container starts
Start-Sleep -Seconds 5

# Step 4: Generate JWT secret using Node.js
$jwtSecret = node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

if (-not $jwtSecret) {
    Write-Host "Error: Node.js is required to generate the JWT secret. Please install Node.js."
    exit 1
}

# Step 5: Generate .env file
$jwtExpiration = "1h"  # Default JWT expiration time

$envContent = @"
# JWT Secret
SECRET=$jwtSecret
JWT_EXPIRATION=$jwtExpiration

# Database credentials
DB_HOST=localhost
DB_USER=$postgresUser
DB_PASS=$postgresPassword
DB_NAME=$postgresDatabase
DB_PORT=5432
"@

$envPath = ".\.env"

# Write the .env file
Set-Content -Path $envPath -Value $envContent

Write-Host ".env file has been created successfully!"
Write-Host "Here are the contents of your .env file:"
Write-Host $envContent

# Step 6: Install NPM dependencies
Write-Host "Running npm install to install dependencies..."
npm install

Write-Host "Project setup completed successfully!"
