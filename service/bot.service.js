const httpStatus = require('http-status');
const db = require("../models");
const Bot = db.bot;
const User = db.user;
const ApiError = require('../utils/ApiError');
//TODO- change address to user id
const createBot = async ({ token, isDeleted, isActive, botType, thresholdPrice, createdAt, address }) => {
    try{
        const user = await User.findOne({
            where: { address }
        });
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Can not find user');
        }
        const botData = { 
            token, 
            userId: user.id, 
            isDeleted, 
            isActive, 
            botType, 
            thresholdPrice, 
            createdAt 
        }
    
        const bot = await Bot.create({ 
                token : botData.token, 
                userId: botData.userId, 
                isDeleted: botData.isDeleted, 
                isActive: botData.isActive, 
                botType: botData.botType, 
                thresholdPrice: botData.thresholdPrice, 
                createdAt: botData.createdAt
            });
    
        return bot;
    }
    catch(ex)
    {
        throw ex
    }

};

const getAllBots = async (filter, options) => {
    const bots = await Bot.findAll();
    return bots;
};

const getBotById = async (id) => {
    return Bot.findOne({ where: { id } });
};

const updateBot = async (id, updateBody) => {
    const bot = await Bot.findOne({ where: { id } })
    if (!bot) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not Found Bot');
    }
    const { isDeleted = bot.isDeleted, isActive = bot.isActive, botType = bot.botType, thresholdPrice = bot.thresholdPrice, createdAt = bot.createdAt } = updateBody
    const updateData = {
        isDeleted,
        isActive,
        botType,
        thresholdPrice,
        createdAt
    }
    const row = await Bot.update(updateData, {
        where: { id },
    });
    return row;
};


const deleteBotById = async (botId) => {
    const bot = await getBotById(botId);
    if (!bot) return null
    await bot.destroy();
    return bot;
};

module.exports = {
    createBot,
    getAllBots,
    getBotById,
    deleteBotById,
    updateBot
};
