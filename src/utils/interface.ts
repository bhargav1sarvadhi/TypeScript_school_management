import { Model } from 'sequelize';

export interface UserAttributes extends Model {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}
export interface Student extends Model {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  grId: number;
  phone: string;
  role: string;
  password: string;
}

export interface Class extends Model {
  id: number;
  className: string;
  grade: string;
  classTeacher: string;
}

export interface Attendance extends Model {
  id: number;
  studentId: string;
  date: string;
  status: string;
}

export interface Shedule extends Model {
  id: number;
  classId: string;
  time: string;
  date: string;
  teacherId: string;
}
export interface Report extends Model {
  id: number;
  teacherId: string;
  studentId: string;
  description: string;
  timestamp: string;
}
export interface TeacherClass extends Model {
  class: any;
  id: number;
  classId: string;
  studentId: string;
}
export interface Subject extends Model {
  id: number;
  subjectname: string;
  teacherId: string;
}
export interface Holiday extends Model {
  id: number;
  holidayname: string;
  date: number;
}

export interface Leave extends Model {
  id: number;
  startdate: number;
  enddate: number;
  studentId: string;
  teacherId: string;
  status: string;
  role: string;
}

export interface Homeworks extends Model {
  id: number;
  homework: string;
  discription: number;
  classId: number;
  teacherId: string;
  date: string;
  subjectId: number;
}

