import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserAvatar,
  updateAccountDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *               otherField:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 */
router.route("/register").post(upload.single("avatar"), registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.route("/login").post(loginUser);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
router.route("/logout").post(verifyJWT, logoutUser);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: Access token refreshed successfully.
 */
router.route("/refresh-token").post(refreshAccessToken);

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change current password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully.
 */
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

/**
 * @swagger
 * /current-user:
 *   get:
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details.
 */
router.route("/current-user").get(verifyJWT, getCurrentUser);

/**
 * @swagger
 * /update-account:
 *   patch:
 *     summary: Update account details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *               field2:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account details updated successfully.
 */
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

/**
 * @swagger
 * /avatar:
 *   patch:
 *     summary: Update user avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User avatar updated successfully.
 */
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;
