import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Student } from '../utils/interface';
import { hashSync } from 'bcrypt';
import AppError from '../utils/genrateError';

export const StudentModel = sequelize.define<Student>('students', {
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
    grId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
        defaultValue: 'Student',
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