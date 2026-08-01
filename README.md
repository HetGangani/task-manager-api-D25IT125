# Task Manager REST API

A RESTful Task Management API developed using **Node.js** and **Express.js**. The application demonstrates CRUD operations, middleware implementation, request validation, and centralized error handling using an in-memory data store.

---

## Features

- Create Task
- Read All Tasks
- Update Existing Task
- Delete Task
- Request Logging Middleware
- JSON Content-Type Validation
- Task ID Validation Middleware
- Global Error Handler
- Custom 404 Handler
- Proper HTTP Status Codes

---

## Technologies Used

- Node.js
- Express.js
- JavaScript (ES6+)
- Postman

---

## Project Structure

```
task-manager-api-D25IT125/
│
├── controllers/
│   └── taskController.js
│
├── middleware/
│   ├── logger.js
│   ├── errorHandler.js
│   ├── validateContentType.js
│   └── validateTaskId.js
│
├── routes/
│   └── taskRoutes.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/HetGangani/task-manager-api-D25IT125.git
```

Navigate to the project directory:

```bash
cd task-manager-api-D25IT125
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

The server will start at:

```
http://localhost:5000
```

---

## API Endpoints

### Get All Tasks

```
GET /tasks
```

---

### Create Task

```
POST /tasks
```

Sample Request

```json
{
    "title": "Complete AWDF Practical"
}
```

---

### Update Task

```
PUT /tasks/:id
```

Sample Request

```json
{
    "completed": true
}
```

---

### Delete Task

```
DELETE /tasks/:id
```

---

## Middleware

### Logger Middleware

Logs:

- HTTP Method
- Request URL
- Timestamp

---

### Content-Type Validation

Rejects POST and PUT requests without:

```
Content-Type: application/json
```

---

### Task ID Validation

Validates the task ID before update and delete operations.

---

### Global Error Handler

Returns a structured JSON response for server errors.

---

### Custom 404 Handler

Returns a JSON response for undefined routes.

---

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

## Testing

The API was tested using **Postman**.

Tested Operations:

- GET
- POST
- PUT
- DELETE
- Invalid Route
- Invalid Task ID
- Missing Content-Type

---

## Future Improvements

- MongoDB Integration
- JWT Authentication
- User Management
- Persistent Database
- Pagination
- Task Categories

---

## Author

**Het Gangani**

B.Tech Information Technology

CHARUSAT
