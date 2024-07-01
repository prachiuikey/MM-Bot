const express = require('express');
const router = express.Router();

const botController = require('../../controller/bot.controller.js');

router.post('/', botController.createBot);
router.get('/all', botController.getAllBots);
router.get('/:id', botController.getBotById);
router.put('/:id', botController.updateBotById);
router.delete('/:id', botController.deleteBotById);

module.exports = router;

/**
 * @swagger
 * /bot:
 *   post:
 *     summary: Create a Bot
 *     description: Only admins can create other users.
 *     tags: [Bot]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - isDeleted
 *               - isActive
 *               - botType
 *               - thresholdPrice
 *               - createdAt
 *               - address
 *             properties:
 *               token:
 *                 type: string
 *               isDeleted:
 *                type: string
 *               isActive:
 *                type: string
 *               botType:
 *                type: string
 *               thresholdPrice:
 *                 type: string
 *               createdAt:
 *                 type: integer
 *               address:
 *                type: string
 *             example:
 *               token: token1
 *               isDeleted: false
 *               isActive: false
 *               botType: type1
 *               thresholdPrice: 10
 *               createdAt: password1
 *               address: address1
 *
 *     responses:
 *       200:
 *         description: Success
 *       409:
 *         description: User already exists!
 */
 
/**
 * @swagger
 * /bot/all:
 *   get:
 *     summary: Get all Bots
 *     description: Only admins can create other users.
 *     tags: [Bot]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */


/**
 * @swagger
 * /bot/{id}:
 *   get:
 *     summary: Get Bot
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Bot]
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 *
 *
 *   put:
 *     summary: Update Bot
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Bot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDeleted:
 *                 type: string
 *               isActive:
 *                 type: string
 *               botType:
 *                 type: string
 *               thresholdPrice:
 *                 type: string
 *               createdAt:
 *                 type: integer
 *             example:
 *               isDeleted: 0
 *               isActive: 0
 *               botType: bot2
 *               thresholdPrice: 10
 *               createdAt: 0
 *     responses:
 *       200:
 *         description: Success
 *
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Bot]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       200:
 *         description: Success
 */