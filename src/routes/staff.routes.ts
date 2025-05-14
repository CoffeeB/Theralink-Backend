import { Router } from 'express';
import { StaffController } from '../controllers/staff.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { staffSchema } from '../validators/staff.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const controller = new StaffController();

router.post('/', authenticate, validateRequest(staffSchema), (req, res) => void controller.createStaff(req, res));
router.get('/',authenticate, (req, res) => void controller.getStaffs(req, res));
router.get('/:id',authenticate, (req, res) => void controller.getStaffById(req, res));
router.put('/:id',authenticate, validateRequest(staffSchema), (req, res) => void controller.updateStaff(req, res));
router.delete('/:id',authenticate, (req, res) => void controller.deleteStaff(req, res));

export default router;

/**
 * @swagger
 * /api/staffs:
 *   get:
 *     tags: [Staffs]
 *     summary: Get all staffs
 *     responses:
 *       200:
 *         description: List of staffs retrieved successfully
 *
 *   post:
 *     tags: [Staffs]
 *     summary: Create a new staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prefix:
 *                 type: string
 *               ssn:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               middleName:
 *                 type: string
 *               userName:
 *                 type: string
 *               suffix:
 *                 type: string
 *               phone:
 *                 type: string
 *               accessLevel:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               race:
 *                 type: string
 *                 enum: [AFRICAN, WHITE, ASIAN, HISPANIC, OTHER]
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               positionEffectiveDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Staff created successfully
 *
 * /api/staffs/{id}:
 *   get:
 *     tags: [Staffs]
 *     summary: Get a staff by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Staff retrieved successfully
 *   
 *   put:
 *     tags: [Staffs]
 *     summary: Update staff information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prefix:
 *                 type: string
 *               ssn:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               middleName:
 *                 type: string
 *               userName:
 *                 type: string
 *               suffix:
 *                 type: string
 *               phone:
 *                 type: string
 *               accessLevel:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               race:
 *                 type: string
 *                 enum: [AFRICAN, WHITE, ASIAN, HISPANIC, OTHER]
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               positionEffectiveDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *
 *   delete:
 *     tags: [Staffs]
 *     summary: Delete a staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Staff deleted successfully
 */

