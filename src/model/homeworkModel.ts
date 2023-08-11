import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Homeworks } from '../utils/interface';

export const homeworkModel = sequelize.define<Homeworks>('homeworks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    homework: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subjects',
            key: 'id',
        },
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'classes',
            key: 'id',
        },
    },
},{
    indexes: [{
        unique: true,
        fields: [ 'classId','teacherId','date' ],
    }],
});