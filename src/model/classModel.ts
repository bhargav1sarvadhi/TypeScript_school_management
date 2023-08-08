import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Class } from '../utils/interface';
// import { teacherClasstModel } from './teacherClassModel';
// import { sheduleModel } from './scheduleModel';

export const classModel = sequelize.define<Class>('class', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    classTeacher: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
},{
    indexes: [{
        unique: true,
        fields: [ 'className','grade' ],
    }],
});

// classModel.hasMany(teacherClasstModel, { foreignKey: 'classId' });
// teacherClasstModel.belongsTo(classModel, { foreignKey: 'classId' });
// classModel.hasMany(sheduleModel, { foreignKey: 'classId' });
// sheduleModel.belongsTo(classModel, { foreignKey: 'classId' });
