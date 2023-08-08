import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Subject } from '../utils/interface';

export const subjectModel = sequelize.define<Subject>('subjects', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    subjectname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
},{
    indexes: [{
        unique: true,
        fields: [ 'subjectname','teacherId' ],
    }],
});