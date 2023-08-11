/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryTypes, Sequelize } from 'sequelize';
import { sequelize } from '../../config/db';

import { Roles } from '../../middleware';
import { attendanceModel } from '../../model/attendanceModel';
import { db } from '../../model/index';
const UserModel = db.UserModel;
const studentModel = db.StudentModel;

export class PrincipalDashboardController {

    async datacountShow(req, res, next) {
        const { body: { year }} = req;
        const student = await studentModel.count();
        const male_student = await studentModel.count({ where: { gender: 'Male' }});
        const female_student = await studentModel.count({ where: { gender: 'Female' }});
        const teacher = await UserModel.count({ where: { role: 'Teacher' }});
        const malePercentage = Number((male_student / student) * 100);
        const femalePercentage = Number((female_student / student) * 100);
        const attendanceData = await sequelize.query(`
            SELECT generate_series,
                   SUM(CASE WHEN "status" = 'Present' THEN 1 ELSE 0 END) AS presentCount,
                   SUM(CASE WHEN "status" = 'Absent' THEN 1 ELSE 0 END) AS absentCount
            FROM (
                SELECT generate_series(
                    date('${year}-01-01'),
                    date('${year}-12-31'),
                    interval '1 month'
                )::date AS generate_series
            ) AS months
            LEFT JOIN "attendances" ON EXTRACT(YEAR FROM "date") = :year
                                  AND EXTRACT(MONTH FROM "date") = EXTRACT(MONTH FROM generate_series)
            GROUP BY generate_series
            ORDER BY generate_series;
        `, {
            replacements: { year: year },
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json({ success: true, StatusCode: 200, data: { student, teacher,malePercentage,femalePercentage,attendanceData }, message: 'Data  Finded Successfully' });
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
