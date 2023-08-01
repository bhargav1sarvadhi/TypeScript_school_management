import { Model } from 'sequelize';

export interface UserAttributes extends Model {
  id: number;
  userName: string;
  email: string;
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
  weekday: string;
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
