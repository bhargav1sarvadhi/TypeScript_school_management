/* eslint-disable no-use-before-define */
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Leave } from '../utils/interface';
import { Op } from 'sequelize';
import { AppError } from '../utils';
import { holidayModel } from './holidayModel';
import { teacherClasstModel } from './teacherClassModel';

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
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: [ 'Pending','Approve','Reject' ],
        defaultValue: 'Pending',
        allowNull: false,
    },
    studentId: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
            model: 'students',
            key: 'id',
        },
    },
    teacherId: {
        type: DataTypes.UUID,
        defaultValue: null,
        references: {
            model: 'users',
            key: 'id',
        },
    },
});

LeaveModel.addHook('beforeCreate', async leave => {
    await validateAndPreventDuplicate(leave);
});

LeaveModel.addHook('beforeUpdate', async leave => {
    await validateAndPreventDuplicate(leave);
});

async function validateAndPreventDuplicate(leave): Promise<void> {
    const { startdate, enddate, studentId, teacherId } = leave;
    const currentDate = new Date();
    if (enddate < startdate) {
        throw new AppError('End date must be after start date', 'invalid_request');
    }
    if (startdate < currentDate) {
        throw new AppError('Leave start date cannot be in the past', 'invalid_request');
    }
    const existingLeave = await LeaveModel.findOne({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { studentId },
                        { teacherId }
                    ]
                },
                {
                    startdate: { [Op.between]: [ startdate, enddate ] },
                    enddate: { [Op.between]: [ startdate, enddate ] }
                }
            ],
        }

    });
    const checkHoliday = await holidayModel.findOne({ where: {
        [Op.or]: [
            { date: startdate },
            { date: enddate }
        ]
    }});
    if (checkHoliday) {
        throw new AppError(`${startdate||enddate } Already Holiday`, 'conflict');
    }
    if (existingLeave) {
        throw new AppError('Leave Already Exist', 'conflict');
    }
}

teacherClasstModel.hasMany(LeaveModel, { foreignKey: 'studentId' });
LeaveModel.belongsTo(teacherClasstModel, { foreignKey: 'studentId' });