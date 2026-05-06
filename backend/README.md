# Backend - Spring Boot ToDo API

REST API backend for the Full Stack ToDo Application built with Spring Boot, PostgreSQL, and JWT Authentication.

---

# 🚀 Features

- User Registration & Login
- JWT Authentication & Authorization
- Secure Password Hashing with BCrypt
- Protected API Endpoints
- Task CRUD Operations
- Pagination Support
- Search & Filtering
- Sorting Support
- Validation Handling
- Global Exception Handling
- Swagger/OpenAPI Documentation

---

# 🛠️ Tech Stack

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (JSON Web Token)
- Maven
- Swagger / OpenAPI

---

# 📂 Project Structure

```bash
src/main/java/com/example/todoapp
│
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
└── service
```

---

# ⚙️ Database Setup

Create PostgreSQL database:

```sql
CREATE DATABASE todo_db;
```

---

# 🔐 Configure Application Properties

Create:

```text
src/main/resources/application.properties
```

Example configuration:

```properties
spring.application.name=todoapp

spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=your_super_secret_key
jwt.expiration=86400000
```

---

# ▶️ Run Application

## Using Maven Wrapper

Linux / macOS:

```bash
./mvnw spring-boot:run
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

---

Application runs on:

```text
http://localhost:8080
```

---

# 📘 Swagger API Documentation

Open Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

---

# 🔑 Authentication Flow

```text
Client Login Request
        ↓
Spring Security
        ↓
JWT Token Generated
        ↓
Frontend Stores Token
        ↓
Protected Requests with Bearer Token
        ↓
JWT Filter Validates Token
        ↓
Access Granted
```

---

# 📡 Main API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current authenticated user |

---

## Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{id}` | Get task by ID |
| POST | `/tasks` | Create task |
| PUT | `/tasks/{id}` | Update task |
| DELETE | `/tasks/{id}` | Delete task |

---

# 🧠 Backend Architecture

```text
Controller Layer
        ↓
Service Layer
        ↓
Repository Layer
        ↓
Database
```

---

# 🔒 Security

This project uses:

- JWT Authentication
- Stateless Authentication
- BCrypt Password Hashing
- Spring Security Filter Chain
- Protected Routes

---

# 🧪 Validation & Exception Handling

The application includes:

- Request validation using Jakarta Validation
- Global exception handling
- Custom error responses
- Validation error mapping

---

# 📈 Future Improvements

Potential improvements for production:

- Refresh Tokens
- Role-Based Authorization
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline
- Redis Caching
- Email Verification
- Monitoring & Logging

---

# 👨‍💻 Author

Your Name

GitHub:
https://github.com/yourusername

LinkedIn:
https://linkedin.com/in/yourprofile

---

# 📄 License

This project is licensed under the MIT License.
