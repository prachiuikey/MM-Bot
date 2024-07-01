const express = require('express');
const router = express.Router();
const userController = require('../../controller/user.controller.js');
const auth = require("../../middleware/auth");
const validate = require('../../middleware/validate');
const userValidation = require('../../validations/user.validation');
const authValidation = require('../../validations/auth.validation');

router
    .route('/')
    .post(auth('manageUsers'), validate(authValidation.register), userController.signUp)
    .get(auth('getUsers'), validate(userValidation.getUsers), userController.getAllUsers);

router
    .route('/:id')
    .get(auth('getUsers'), validate(userValidation.getUser), userController.getUserById)
    .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

// router.put('/setting/:id', userController.updateSetting);
router
    .route('/setting/:id')
    .get(auth('getSettings'), validate(userValidation.getSetting), userController.getUserSetting)
    .put(auth('manageSettings'), validate(userValidation.updateSetting), userController.updateSetting);

module.exports = router;




/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: Only admins can create other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - address
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                type: string
 *               address:
 *                type: string
 *               username:
 *                type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                type: string
 *             example:
 *               firstname: fakefirstname
 *               lastname: fakelastname
 *               address: address1
 *               username: username1
 *               email: fake@example.com
 *               password: password1
 *               role: user
 *
 *     responses:
 *       200:
 *         description: Success
 *       409:
 *         description: User already exists!
 *
 *   get:
 *     summary: Get all users
 *     description: Only admins can retrieve all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *         description: First name
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *         description: Last name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Success
 *
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Users]
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
 *   patch:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               firstname: asan
 *               lastname: chit
 *               email: asan@gmail.com
 *               password: password1
 *     responses:
 *       200:
 *         description: Success
 *
 *
 *   delete:
 *     summary: Delete a user
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Users]
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
 * /users/setting/{id}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Users]
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
 *   put:
 *     summary: Update a user
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tradeAmount:
 *                 type: integer
 *               limitOrders:
 *                 type: integer
 *               sellProfit:
 *                 type: integer
 *               stopLossAt:
 *                 type: integer
 *               wallet:
 *                 type: integer
 *             example:
 *               tradeAmount: 2
 *               limitOrders: 2
 *               sellProfit: 2
 *               stopLossAt: -16
 *               wallet: wallet
 *     responses:
 *       200:
 *         description: Success
 * 
 * 
 */