# School Management System

School Management System is a web application that allows users to manage various aspects of a school, including user roles, class management, attendance, lecture scheduling, reporting, and more.

## Features

- User Roles:
  - Principal: Full access to all functionalities, including managing classes, teachers, and viewing reports. Cannot access individual student data.
  - Teacher: Access to manage students' records for their assigned class, including marking attendance, scheduling lectures, and reporting issues with specific students.
  - Student: Access to view their own data, including attendance records, class schedules, and today's schedule.

- User Management:
  - User registration and login functionality using Node.js and Express.js.
  - Secure authentication using hashed passwords.
  - Session management or JWT (JSON Web Tokens) for user sessions and secure communication.

- Role-Based Access Control:
  - Middleware to enforce role-based access control on relevant routes.

- Class Management:
  - Principal can create and manage classes through API endpoints.
  - Add class details like class name, grade, and assign class teachers.
  - Principal can add and remove classes and teachers.

- Attendance Management:
  - Teachers can mark attendance for their class through API endpoints.
  - Store attendance records in the "attendance" table with fields like `student_id`, `date`, and `status` (present/absent).

- Lecture Schedule:
  - Teachers can schedule lectures for their classes through API endpoints.
  - Store the lecture schedule in the "schedule" table with fields like `class_id`, `weekday`,`date` and `time`.

- Reporting:
  - Teachers can report issues with specific students through API endpoints.
  - Store reports in the "reports" table with fields like `teacher_id`, `student_id`, `description`, and `timestamp`.

- Teacher Adding/Removing Students:
  - Teachers with the appropriate privileges can add and remove students from their assigned class through API endpoints.

- Viewing Today's Schedule:
  - Students can view their schedule for the current day through an API endpoint.
  - The endpoint returns the list of lectures or activities scheduled for the student's class on that particular day.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/bhargav1sarvadhi/TypeScript_school_management.git
```


| Endpoint                            | Method | Description                                                             | Authorization   |
|-------------------------------------|--------|-------------------------------------------------------------------------|------------------|
| /auth/singup                       | POST   | Register a new user with the application.                               | Not required     |
| /auth/login                          | POST   | Log in an existing user.                                                | Not required     |
| /class                        | POST   | Create a new class.                                                     | Bearer Token (Principal role required) |
| /class                        | GET    | Get a list of all classes.                                              | Bearer Token (Principal role required) |
| /class/:id                        | DELETE    | Delete a  class                                             | Bearer Token (Principal role required) |
| /attendance                     | POST   | Mark attendance for a student.                                          | Bearer Token (Teacher role required)   |
| /schedule                       | POST   | Schedule a lecture for a class.                                         | Bearer Token (Teacher role required)   |
| /schedule                       | GET    | Get the schedule for a class.                                           | Bearer Token (Teacher role required)   |
| /report                       | POST   | Report an issue with a student.                                         | Bearer Token (Teacher role required)   |
| /teacherclass    | POST   | Add a student to a class.                                               | Bearer Token (Teacher role required)   |
| /teacherclass/:student_id | DELETE | Remove a student from a class.                                      | Bearer Token (Teacher role required)   |
| /api/student/shedule/:date?        | GET    | Get today's schedule for a student.                                     | Bearer Token (Student role required)   |





school-management-system/
```
|-- src/
|   |-- controllers/      # Contains the route handlers (controllers) for different API endpoints
|   |   |-- userController.ts        # Controller for user-related endpoints (e.g., register, login)
|   |   |-- classController.ts       # Controller for class management endpoints
|   |   |-- attendanceController.ts  # Controller for attendance management endpoints
|   |   |-- lectureController.ts     # Controller for lecture scheduling endpoints
|   |   |-- reportController.ts      # Controller for reporting issues with students
|   |
|   |-- routes/           # Contains the API route definitions
|   |   |-- userRoutes.ts             # Route definitions for user-related endpoints
|   |   |-- classRoutes.ts            # Route definitions for class management endpoints
|   |   |-- attendanceRoutes.ts       # Route definitions for attendance management endpoints
|   |   |-- lectureRoutes.ts          # Route definitions for lecture scheduling endpoints
|   |   |-- reportRoutes.ts           # Route definitions for reporting issues with students
|   |
|   |-- models/           # Contains the database models and schemas
|   |   |-- User.ts                   # Model for user schema
|   |   |-- Class.ts                  # Model for class schema
|   |   |-- Attendance.ts             # Model for attendance schema
|   |   |-- Lecture.ts                # Model for lecture schema
|   |   |-- Report.ts                 # Model for report schema
|   |
|   |-- middleware/       # Contains custom middleware functions
|   |   |-- authMiddleware.ts         # Authentication middleware
|   |   |-- roleMiddleware.ts         # Role-based access control middleware
|   |
|   |-- utils/            # Contains utility functions and helper modules
|   |   |-- passwordUtils.ts          # Utility functions for password hashing
|   |   |-- dateUtils.ts              # Utility functions for handling date and time
|   |
|   |
|   |-- config/           # Configuration files for the application
|   |   |-- database.ts   # Database connection configuration
|   |   |-- auth.ts       # Authentication middleware and JWT configuration
|   |
|   |-- app.ts            # Entry point of the back-end application
|-- package.json          # Node.js project configuration file
|-- .gitignore            # List of files/folders to ignore in version control
```
