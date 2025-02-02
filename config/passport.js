const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jsonwebtoken');
const { tokenTypes } = require('./token');
const db = require("../models");
const { application } = require('express');
const User = db.user;

const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET || 'security',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await User.findByPk(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
