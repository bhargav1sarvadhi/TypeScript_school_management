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
| /auth/singup/bulkcreate                      | POST   | Register a new user with bulk the application.                               | Not required     |
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
|   |   |-- UserController.ts        # Controller for user-related endpoints (e.g., register, login)
|   |   |-- ClassController.ts       # Controller for class management endpoints
|   |   |-- AttendanceController.ts  # Controller for attendance management endpoints
|   |   |-- SheduleController.ts     # Controller for lecture scheduling endpoints
|   |   |-- ReportController.ts      # Controller for reporting issues with students
|   |
|   |-- routes/           # Contains the API route definitions
|   |   |-- userRoutes.ts             # Route definitions for user-related endpoints
|   |   |-- classRoutes.ts            # Route definitions for class management endpoints
|   |   |-- attendanceRoutes.ts       # Route definitions for attendance management endpoints
|   |   |-- sheduleRoutes.ts          # Route definitions for lecture scheduling endpoints
|   |   |-- reportRoutes.ts           # Route definitions for reporting issues with students
|   |
|   |-- models/           # Contains the database models and schemas
|   |   |-- UserModel.ts                   # Model for user schema
|   |   |-- classModel.ts                  # Model for class schema
|   |   |-- attendanceModel.ts             # Model for attendance schema
|   |   |-- sheduleModel.ts                # Model for lecture schema
|   |   |-- reportModel.ts                 # Model for report schema
|   |
|   |-- middleware/       # Contains custom middleware functions
|   |   |-- authMiddleware.ts         # Authentication middleware
|   |   |-- checkPermission.ts         # Role-based access control middleware
|   |
|   |-- utils/            # Contains utility functions and helper modules
|   |   |-- interface.ts          # Utility functions for Interface define typescript
|   |   |-- dateFormate.ts              # Utility functions for handling date and time
|   |
|   |
|   |-- config/           # Configuration files for the application
|   |   |-- db.ts   # Database connection configuration
|   |   |-- passwordJwt.ts       # Authentication middleware and JWT configuration
|   |
|   |-- app.ts            # Entry point of the back-end application
|-- package.json          # Node.js project configuration file
|-- .gitignore            # List of files/folders to ignore in version control
```




<!-- Auth Routes 

* localhost:8000/auth/signup  --- post ---  teacher and pricipal singup 
* localhost:8000/auth/login.  —-post —  teacher student principal login
* localhost:8000/auth/signup/bulkcreate —post — bulk create user 


User Routes 
-only use principal 

* localhost:8000/user/id. —delete— delete user
* localhost:8000/user/id. —put— update user
* localhost:8000/user get get all  user

Class  Routes 
-only use principal 

 localhost:8000/class --get-- get all  class
* localhost:8000/class —post— create class
* localhost:8000/class/id --delete-- delete class
* localhost:8000/class/id —put— update class


Attendance  Routes 
-only use Teacher

  localhost:8000/attendance/id --get-- get student  attendance
* localhost:8000/attendance —post— create attendance
* localhost:8000/attendance/id --delete-- delete attendance
* localhost:8000/attendance/id —put— update clattendanceass

Schedule  Routes 
-only use Teacher

  localhost:8000/schedule --get-- get   schedule
* localhost:8000/schedule —post— create schedule
* localhost:8000/schedule/id --delete-- delete schedule
* localhost:8000/schedule/id —put— update schedule


Report  Routes 
-only use Teacher

  localhost:8000/report --get-- get   report
* localhost:8000/report —post— create report
* localhost:8000/report/id --delete-- delete report
* localhost:8000/report/id —put— update report

Teacher insert student in classs  Routes 
-only use Teacher

 localhost:8000/teacherclass --get-- get   teacherclass
* localhost:8000/teacherclass —post— create teacherclass
* localhost:8000/teacherclass/id --delete-- delete teacherclass
* localhost:8000/teacherclass/id —put— update teacherclass

Student  Routes 
-only use Teacher

  localhost:8000/student --get-- get   student
* localhost:8000/student —post— create student
* localhost:8000/student/id --delete-- delete student
* localhost:8000/student/id —put— update student


Subject  Routes 
-only use Teacher

  localhost:8000/subject --get-- get   subject
* localhost:8000/subject —post— create subject
* localhost:8000/subject/id --delete-- delete subject
* localhost:8000/subject/id —put— update subject

Holiday  Routes 
-only access Principal

  localhost:8000/holiday --get-- get   holiday
* localhost:8000/holiday —post— create holiday
* localhost:8000/holiday/id --delete-- delete holiday
* localhost:8000/holiday/id —put— update holiday

Leave  Routes 
-only access Teacher and Student

  localhost:8000/leave --get-- get   leave
* localhost:8000/leave —post— create leave
* localhost:8000/leave/id --delete-- delete leave
* localhost:8000/leave/id —put— update holileaveday

Teachers leaves show pricipal
- acess only principal
* localhost:8000/api/showleaves   -- get --  showleaves only teacher
* localhost:8000/api/aproveleave/1   -- patch --  principal aprove teacher leaves
* localhost:8000/api/rejectleave/1   -- get --  showleaves only teacher

student  leaves show Techers
- acess only Teacher
* localhost:8000/api/teacher/showleaves   -- get --  showleaves only student 
* localhost:8000/api/teacher/aproveleave/1   -- patch --  teacher aprove student  leaves
* localhost:8000/api/teacher/rejectleave/1   -- get --  showleaves only students -->





# API Routes

## Auth Routes

- `POST` /auth/signup
  - Teacher and Principal signup

- `POST` /auth/login
  - Teacher, Student, and Principal login

- `POST` /auth/signup/bulkcreate
  - Bulk create users

## User Routes

- `DELETE` /user/id
  - Delete user (Principal only)

- `PUT` /user/id
  - Update user (Principal only)

- `GET` /user
  - Get all users (Principal only)

## Class Routes

- `GET` /class
  - Get all classes (Principal only)

- `POST` /class
  - Create a class (Principal only)

- `DELETE` /class/id
  - Delete a class (Principal only)

- `PUT` /class/id
  - Update a class (Principal only)

## Attendance Routes

- `GET` /attendance/id
  - Get student attendance (Teacher only)

- `POST` /attendance
  - Create attendance (Teacher only)

- `DELETE` /attendance/id
  - Delete attendance (Teacher only)

- `PUT` /attendance/id
  - Update attendance (Teacher only)

## Schedule Routes

- `GET` /schedule
  - Get schedules (Teacher only)

- `POST` /schedule
  - Create a schedule (Teacher only)

- `DELETE` /schedule/id
  - Delete a schedule (Teacher only)

- `PUT` /schedule/id
  - Update a schedule (Teacher only)

## Report Routes

- `GET` /report
  - Get reports (Teacher only)

- `POST` /report
  - Create a report (Teacher only)

- `DELETE` /report/id
  - Delete a report (Teacher only)

- `PUT` /report/id
  - Update a report (Teacher only)

## Teacher-Student Class Routes

- `GET` /teacherclass
  - Get teacher-student class assignments (Teacher only)

- `POST` /teacherclass
  - Create a teacher-student class assignment (Teacher only)

- `DELETE` /teacherclass/id
  - Delete a teacher-student class assignment (Teacher only)

- `PUT` /teacherclass/id
  - Update a teacher-student class assignment (Teacher only)

## Student Routes

- `GET` /student
  - Get students (Teacher only)

- `POST` /student
  - Create a student (Teacher only)

- `DELETE` /student/id
  - Delete a student (Teacher only)

- `PUT` /student/id
  - Update a student (Teacher only)

## Subject Routes

- `GET` /subject
  - Get subjects (Teacher only)

- `POST` /subject
  - Create a subject (Teacher only)

- `DELETE` /subject/id
  - Delete a subject (Teacher only)

- `PUT` /subject/id
  - Update a subject (Teacher only)

## Holiday Routes

- `GET` /holiday
  - Get holidays (Principal only)

- `POST` /holiday
  - Create a holiday (Principal only)

- `DELETE` /holiday/id
  - Delete a holiday (Principal only)

- `PUT` /holiday/id
  - Update a holiday (Principal only)

## Leave Routes

- `GET` /leave
  - Get leaves (Teacher and Student)

- `POST` /leave
  - Create a leave (Teacher and Student)

- `DELETE` /leave/id
  - Delete a leave (Teacher and Student)

- `PUT` /leave/id
  - Update a leave (Teacher and Student)

## Principal-Teacher Interaction

- `GET` /api/showleaves
  - Show leaves of teachers (Principal only)

- `PATCH` /api/aproveleave/1
  - Approve teacher leaves (Principal only)

- `GET` /api/rejectleave/1
  - Reject teacher leaves (Principal only)

## Teacher-Student Interaction

- `GET` /api/teacher/showleaves
  - Show leaves of students (Teacher only)

- `PATCH` /api/teacher/aproveleave/1
  - Approve student leaves (Teacher only)

- `GET` /api/teacher/rejectleave/1
  - Reject student leaves (Teacher only)

