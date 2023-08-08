import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Leave } from '../utils/interface';

export const LeaveModel = sequelize.define<Leave>('leaves', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    startdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    enddate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
            model: 'students',
            key: 'id',
        },
    },
    teacherId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
            model: 'users',
            key: 'id',
        },
    },
});