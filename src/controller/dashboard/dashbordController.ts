/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryTypes } from 'sequelize';
import { sequelize } from '../../config/db';
import { Roles } from '../../middleware';
import { attendanceModel } from '../../model/attendanceModel';
import { db } from '../../model/index';
import { sheduleModel } from '../../model/scheduleModel';
import { classModel } from '../../model/classModel';
import { StudentModel } from '../../model/studentModel';
const UserModel = db.UserModel;
const studentModel = db.StudentModel;
const teacherclass = db.teacherClasstModel;

export class DashboardController {

    async PrincipalDashboard(req, res, next) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const { body: { year }} = req;
        const student = await studentModel.count();
        const male_student = await studentModel.count({ where: { gender: 'Male' }});
        const female_student = await studentModel.count({ where: { gender: 'Female' }});
        const teacher = await UserModel.count({ where: { role: Roles.TEACHER }});
        const malePercentage = Number((male_student / student) * 100);
        const femalePercentage = Number((female_student / student) * 100);
        const attendanceData = await sequelize.query(`
            SELECT generate_series,
                   SUM(CASE WHEN "status" = 'Present' THEN 1 ELSE 0 END) AS presentCount,
                   SUM(CASE WHEN "status" = 'Absent' THEN 1 ELSE 0 END) AS absentCount
            FROM (
                SELECT generate_series(
                    date('${year || currentYear}-01-01'),
                    date('${year || currentYear}-12-31'),
                    interval '1 month'
                )::date AS generate_series
            ) AS months
            LEFT JOIN "attendances" ON EXTRACT(YEAR FROM "date") = :year
                                  AND EXTRACT(MONTH FROM "date") = EXTRACT(MONTH FROM generate_series)
            GROUP BY generate_series
            ORDER BY generate_series;
        `, {
            replacements: { year: year || currentYear },
            type: QueryTypes.SELECT,
        });
        res.status(200).json({ success: true, StatusCode: 200, data: { student, teacher,malePercentage,femalePercentage,attendanceData }, message: 'Data  Finded Successfully' });
    }

    async TeacherDashboard(req, res, next) {
        const { body: { date }} = req;
        const today = new Date();
        const Tdate = today.toISOString().split('T')[0];
        const scheduleData = await sheduleModel.findAll({ where: { teacherId: req.user.id, date: date || Tdate }});
        const profile = await UserModel.findAll({ where: { id: req.user.id }});
        res.status(200).json({ success: true, StatusCode: 200, data: { scheduleData, profile }, message: 'Data  Finded Successfully' });
    }

    async studentDashboard(req, res, next) {
        const { params: { date }} = req;
        const today = new Date();
        const Tdate = today.toISOString().split('T')[0];
        const studentId = req.user.id;
        const IncludeOption = [{
            model: classModel,
            attributes: [ 'className', 'grade' ],
            include: [{
                model: sheduleModel,
                attributes: [ 'date', 'time' ],
                where: { date: date || Tdate }
            }]
        }];
        const schedule = await teacherclass.findAll({ include: IncludeOption, where: { studentId: studentId }});
        const profile = await StudentModel.findAll({ where: { id: req.user.id }});
        return res.status(200).json({ success: true, StatusCode: 200, data: { profile,schedule }, message: 'Data Finded Successfully' });
    }
}

// create long  method and using javasciprt logic build

// const startDate = new Date(`${year}-01-01`);
// const endDate = new Date(`${year}-12-31`);
// const attendanceData = await db.attendanceModel.findAll({
//             where: {
//                 Date: {
//                     [Op.between]: [startDate, endDate],
//                 },
//             },
//         });

// Initialize the monthlyAttendance array with null values

// const monthlyAttendance = Array(11).fill(null);
// let month;
// let arr = [];
// attendanceData.forEach((attendance) => {
//     month = new Date(attendance.Date).getMonth() + 1;
//     arr.push(month)
//     if (!monthlyAttendance[month]) {
//         monthlyAttendance[month] = { present: 0, absent: 0 };
//     }
//     if (attendance.Status === 'present') {
//       monthlyAttendance[month].present++;
//     } else if (attendance.Status === 'absent') {
//         monthlyAttendance[month].absent++;
//     }
// });
// for (let index = 1; index <= 12; index++) {
//     if (!arr.includes(index)) {
//         monthlyAttendance[index] = { present: 0, absent: 0 }
//     }
// }
