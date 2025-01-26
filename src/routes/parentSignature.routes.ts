import { Router } from 'express';
import { ParentSignatureController } from '../controllers/parentSignature.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { parentSignatureSchema } from '../validators/parentSignature.validator';

const router = Router();
const controller = new ParentSignatureController();

router.post('/', validateRequest(parentSignatureSchema), (req, res) => void controller.createParentSignature(req, res));
router.get('/', (req, res) => void controller.getParentSignatures(req, res));
router.get('/:id', (req, res) => void controller.getParentSignatureById(req, res));
router.put('/:id', validateRequest(parentSignatureSchema), (req, res) => void controller.updateParentSignature(req, res));
router.delete('/:id', (req, res) => void controller.deleteParentSignature(req, res));

export default router;

/**
 * @swagger
 * /api/parentSignature:
 *   get:
 *     tags: [Parent Signature]
 *     summary: Get all parent Signature
 *     responses:
 *       200:
 *         description: List of parentSignature retrieved successfully
 * 
 *   post:
 *     tags: [Parent Signature]
 *     summary: Create new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               signature:
 *                 type: string
 *               pin:
 *                 type: string
 * 
 * /api/parentSignature/{id}:
 *   get:
 *     tags: [Parent Signature]
 *     summary: Get patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   put:
 *     tags: [Parent Signature]
 *     summary: Update patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   delete:
 *     tags: [Parent Signature]
 *     summary: Delete patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */

