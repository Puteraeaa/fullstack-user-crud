# User Management API (Laravel)

This is a user management API built with Laravel. It provides endpoints for performing CRUD operations (Create, Read, Update, Delete) on user data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Puteraeaa/fullstack-user-crud.git
   cd user-api
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Configure the database connection in the `.env` file.

4. Generate the application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. Seed the database (optional):
   ```bash
   php artisan db:seed
   ```

## Running the Application

1. Start the development server:
   ```bash
   php artisan serve
   ```

2. Access the API at `http://127.0.0.1:8000`.

## API Workflow

The API provides the following endpoints:

### 1. Get All Users
- **Endpoint:** `GET /api/users`
- **Description:** Fetches a list of all users.
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2023-01-01T00:00:00.000000Z",
      "updated_at": "2023-01-01T00:00:00.000000Z"
    }
  ]
  ```

### 2. Add a New User
- **Endpoint:** `POST /api/users`
- **Description:** Adds a new user.
- **Request Body Example:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "password123"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "User created successfully."
  }
  ```

### 3. Update an Existing User
- **Endpoint:** `PUT /api/users/{id}`
- **Description:** Updates an existing user's details.
- **Request Body Example:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "User updated successfully."
  }
  ```

### 4. Delete a User
- **Endpoint:** `DELETE /api/users/{id}`
- **Description:** Deletes a user by ID.
- **Response Example:**
  ```json
  {
    "message": "User deleted successfully."
  }
  ```

## Project Structure

```
user-api/
├── app/              # Application logic
├── database/         # Migrations and seeders
├── routes/           # API routes
├── .env.example      # Environment configuration example
├── composer.json     # Composer dependencies
└── README.md         # Documentation
```


## Notes on Testing

- Write your test cases in the `tests/` directory.
- Use the `tests/Feature` directory for API endpoint tests.
- Mock dependencies where necessary to isolate the functionality being tested.

Run the tests using PHPUnit:
   ```bash
   php artisan test
   ```

## Notes

- Ensure the database is properly configured and running.
- Use Postman or a similar tool to test the API endpoints.
- Modify the `.env` file to match your local environment settings.
