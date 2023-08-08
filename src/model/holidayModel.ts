import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Holiday } from '../utils/interface';

export const holidayModel = sequelize.define<Holiday>('holidays', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    holidayname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        unique: true,
        allowNull: false,
    },
});