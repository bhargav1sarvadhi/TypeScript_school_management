import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Attendance } from '../utils/interface';

export const attendanceModel = sequelize.define<Attendance>('attendance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [ 'Present', 'Absent' ],
    },
} ,{
    indexes: [{
        unique: true,
        fields: [ 'studentId', 'date' ],
    }],
});
