const express = require('express');
const router = express.Router();

const transactionController = require('../../controller/transaction.controller.js');

router.get('/all', transactionController.getAllTransactions);
router.get('/user/:id', transactionController.getTransactionsByUserId);
router.get('/:id', transactionController.getTransactionById);
router.post('/', transactionController.createTransaction);
router.put('/:id', transactionController.updateTransactionById);
router.delete('/:id', transactionController.deleteTransactionById);

module.exports = router;

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a transaction
 *     description: Only admins can create other transaction.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - botId
 *               - amount
 *               - fee
 *               - type
 *               - hash
 *             properties:
 *               userId:
 *                 type: string
 *               botId:
 *                type: string
 *               amount:
 *                type: string
 *               fee:
 *                type: string
 *               type:
 *                 type: string
 *               hash:
 *                 type: string
 *             example:
 *               userId: 1
 *               botId: 1
 *               amount: 100
 *               fee: 1
 *               type: typ1
 *               hash: xyz
 *
 *     responses:
 *       200:
 *         description: Success
 *       409:
 *         description: User already exists!
 */

/**
 * @swagger
 * /transaction/all:
 *   get:
 *     summary: Get all Transactions
 *     description: Only admins can create other users.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /transaction/user/{id}:
 *   get:
 *     summary: Get Transaction by passing userId
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Transactions]
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
 */

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Get Transaction but transactionId
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Transactions]
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
 *         description: Transaction Id
 *     responses:
 *       200:
 *         description: Success
 *
 *
 *   put:
 *     summary: Update Transaction
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - botId
 *               - amount
 *               - fee
 *               - type
 *               - hash
 *             properties:
 *               userId:
 *                 type: string
 *               botId:
 *                type: string
 *               amount:
 *                type: string
 *               fee:
 *                type: string
 *               type:
 *                 type: string
 *               hash:
 *                 type: string
 *             example:
 *               userId: 1
 *               botId: 1
 *               amount: 100
 *               fee: 1
 *               type: typ1
 *               hash: xyz
 *     responses:
 *       200:
 *         description: Success
 *
 *
 *   delete:
 *     summary: Delete Transaction
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction id
 *     responses:
 *       200:
 *         description: Success
 */