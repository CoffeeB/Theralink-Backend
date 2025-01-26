import { Router } from 'express';
import { ClientSignatureController } from '../controllers/clientSignature.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { clientSignatureSchema } from '../validators/clientSignature.validator';

const router = Router();
const controller = new ClientSignatureController();

router.post('/', validateRequest(clientSignatureSchema), (req, res) => void controller.createClientSignature(req, res));
router.get('/', (req, res) => void controller.getClientSignatures(req, res));
router.get('/:id', (req, res) => void controller.getClientSignatureById(req, res));
router.put('/:id', validateRequest(clientSignatureSchema), (req, res) => void controller.updateClientSignature(req, res));
router.delete('/:id', (req, res) => void controller.deleteClientSignature(req, res));

export default router;

/**
 * @swagger
 * /api/clientSignature:
 *   get:
 *     tags: [Client Signature]
 *     summary: Get all clientSignature
 *     responses:
 *       200:
 *         description: List of clientSignature retrieved successfully
 * 
 *   post:
 *     tags: [Client Signature]
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
 * /api/clientSignature/{id}:
 *   get:
 *     tags: [Client Signature]
 *     summary: Get patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   put:
 *     tags: [Client Signature]
 *     summary: Update patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *   
 *   delete:
 *     tags: [Client Signature]
 *     summary: Delete patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */

