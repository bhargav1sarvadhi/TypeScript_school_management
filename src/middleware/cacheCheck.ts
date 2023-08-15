import redis from 'ioredis';
import AppError from '../utils/genrateError';
const redisClient = new redis;

export const cacheCheck = async (req, res, next) => {
    const cacheKey = `user:${req.user.id}`;
    const expires = 1654665625;
    const getCache = await redisClient.get(cacheKey);
    try {
        if (getCache) {
            console.log('done fire this getcache');
            res.send(JSON.parse(getCache));
        } else {
            res.sendResponse = res.send;
            res.send = async (body) => {
                await redisClient.setex(cacheKey, expires, body);
                console.log('data seted');
                res.sendResponse(body);
            };
            next();
        }
    } catch (error) {
        return next(new AppError(' Something Went Wrong In Cache Management', 'not_found'));
    }
};