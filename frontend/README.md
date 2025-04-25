# User Management Frontend

This is a simple user management frontend application built with HTML, CSS, and JavaScript. It allows users to perform CRUD operations (Create, Read, Update, Delete) on user data by interacting with a backend API.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Ensure you have a backend API running. The default API endpoint is `http://127.0.0.1:8000/api/users`.

3. Open the `index.html` file in your browser to run the application.

## How to Run the Application

1. Start the backend server (refer to the backend documentation for setup instructions).
2. Open the `index.html` file in any modern web browser.
3. Use the interface to:
   - Add a new user.
   - Edit an existing user.
   - Delete a user.
   - View the list of users.

## API Workflow

The application interacts with the backend API using the following endpoints:

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
      "age": 30
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
    "age": 25
  }
  ```
- **Response Example:**
  ```json
  {
    "message": "User added successfully."
  }
  ```

### 3. Update an Existing User
- **Endpoint:** `PUT /api/users/{id}`
- **Description:** Updates an existing user's details.
- **Request Body Example:**
  ```json
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 26
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
frontend/
├── index.html       # Main HTML file
├── style.css        # CSS for styling
├── script.js        # JavaScript for functionality
└── README.md        # Documentation
```

## Notes

- Ensure the backend API is running and accessible at `http://127.0.0.1:8000/api/users`.
- Modify the API URL in `script.js` if your backend is hosted on a different URL or port.
