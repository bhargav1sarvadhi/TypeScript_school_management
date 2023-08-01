import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Shedule } from '../utils/interface';

export const sheduleModel = sequelize.define<Shedule>('shedule', {
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
    weekday: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
},{
    indexes: [{
        unique: true,
        fields: [ 'date','time' ],
    }],
});
