import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { userSchema } from "../validators/user.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new UserController();
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "STAFF", "CLIENT"),
  (req, res) => void controller.getUsers(req, res)
);

// Route to get all Users
router.get(
  "/:userId",
  authenticate,
  authorize("ADMIN", "STAFF"),
  (req, res) => void controller.getUserById(req, res)
);

// Route to Update specific user
router.put(
  "/:userId",
  authenticate,
  authorize("ADMIN", "STAFF"),
  validateRequest(userSchema),
  (req, res) => void controller.updateUser(req, res)
);

// Route to delete a specific user
router.delete(
  "/:userId",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.deleteUser(req, res)
);

export default router;

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get a list of users with optional filters and pagination
 *     description: Retrieves a paginated list of users, optionally filtered by username, role, and email.
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter users by username
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ADMIN, STAFF, CLIENT]
 *         required: false
 *         description: Filter users by role
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter users by email
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *           default: "9"
 *         required: false
 *         description: Number of users per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *           default: "1"
 *         required: false
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user's ID
 *                       username:
 *                         type: string
 *                         description: The user's username
 *                       email:
 *                         type: string
 *                         description: The user's email
 *                       role:
 *                         type: string
 *                         enum: [ADMIN, STAFF, CLIENT]
 *                         description: The user's role
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date the user was created
 *       500:
 *         description: Failed to fetch users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to fetch Users
 *
 * /api/users/{userId}:
 *   get:
 *     tags: [Users]
 *     summary: Get a specific Users by his or her ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Users record
 *     responses:
 *       200:
 *         description: Users record retrieved successfully
 *
 *   put:
 *     tags: [Users]
 *     summary: Update Users record
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Users record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - STAFF
 *                   - CLIENT
 *     responses:
 *       200:
 *         description: Users record updated successfully
 *
 *   delete:
 *     tags: [Users]
 *     summary: Delete a specific Users record
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Users record to be deleted
 *     responses:
 *       204:
 *         description: Users record deleted successfully
 */
