import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Token } from '../utils/interface';

export const tokenModel = sequelize.define<Token>('tokens', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
});
