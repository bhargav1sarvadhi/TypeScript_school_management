import { Model } from 'sequelize';

export interface UserAttributes extends Model {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}
export interface Student extends Model {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  grId: number;
  phone: string;
  role: string;
  password: string;
}

export interface Token extends Model {
  id: number;
  token: string;
  userId: number;
}
export interface Class extends Model {
  id: number;
  className: string;
  grade: string;
  classTeacher: number;
}

export interface Attendance extends Model {
  id: number;
  studentId: number;
  date: string;
  status: string;
}

export interface Shedule extends Model {
  id: number;
  classId: number;
  time: string;
  date: string;
}
export interface Report extends Model {
  id: number;
  teacherId: number;
  studentId: number;
  description: string;
  timestamp: string;
}
export interface TeacherClass extends Model {
  class: any;
  id: number;
  classId: number;
  studentId: number;
}
export interface Subject extends Model {
  id: number;
  subjectname: string;
  teacherId: number;
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
  studentId: number;
  teacherId: number;
}

