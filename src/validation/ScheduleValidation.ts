/* eslint-disable max-len */

import { AppError } from '../utils';

/* eslint-disable multiline-ternary */

export function checkvalidationShedule(time, dayOfWeek, teacherStd) {
    const isSaturday = dayOfWeek === 6;
    const isWeekend = dayOfWeek === 0;
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    let allowedTimeRange;
    if (isSaturday) {
        allowedTimeRange = (teacherStd <= 7)? { startTime: '07:00', endTime: '10:00' }: { startTime: '12:00', endTime: '15:00' };
    } else {
        allowedTimeRange = (teacherStd <= 7)? { startTime: '07:00', endTime: '11:00' }: { startTime: '12:00', endTime: '16:00' };
    }
    if (!isSaturday && (isWeekend || dayOfWeek < currentDayOfWeek || (dayOfWeek === currentDayOfWeek && time < currentTime))) {
        throw new AppError('Cannot schedule lectures for past times.', 'invalid_request');
    }
    if (time < allowedTimeRange.startTime || time > allowedTimeRange.endTime) {
        throw new AppError('Invalid time for your class schedule.', 'invalid_request');
    }
    if (dayOfWeek === 0) {
        throw new AppError('Weekend (Saturday/Sunday) schedules are not allowed.', 'invalid_request');
    }
    return { isValid: true };
}