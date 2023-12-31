import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { TeacherClass } from '../utils/interface';

export const teacherClasstModel = sequelize.define<TeacherClass>(
    'teacherclass',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'classes',
                key: 'id',
            },
        },
        studentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id',
            },
        },
    },
    {
        indexes: [{
            unique: true,
            fields: ['studentId'],
        }]
    }
);
