import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAttributes } from '../utils/interface';
import { hashSync } from 'bcrypt';
import AppError from '../utils/genrateError';
// import { teacherClasstModel } from './teacherClassModel';

export const UserModel = sequelize.define<UserAttributes>('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM,
        values: [ 'Principal', 'Teacher' ],
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            set(this: any, value: any) {
                if (value.length >= 6) {
                    this.setDataValue('password', hashSync(value, 12));
                } else {
                    throw new AppError(
                        'please provide password minimum length 6 digits',
                        'validation_error',
                    );
                }
            },
        },
    },
});

// UserModel.hasMany(teacherClasstModel, { foreignKey: 'studentId' });
// teacherClasstModel.belongsTo(UserModel, { foreignKey: 'studentId' });
