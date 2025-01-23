import { Router } from 'express';
import { MedicalHistoryController } from '../controllers/medicalHistory.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { medicalHistorySchema } from '../validators/medicalHistory.validator';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new MedicalHistoryController();

router.post('/', validateRequest(medicalHistorySchema), (req, res) => void controller.createMedicalHistory(req, res));
router.get('/', (req, res) => void controller.getMedicalHistorys(req, res));
router.get('/:id', (req, res) => void controller.getMedicalHistoryById(req, res));
router.put('/:id', validateRequest(medicalHistorySchema), (req, res) => void controller.updateMedicalHistory(req, res));
router.delete('/:id', (req, res) => void controller.deleteMedicalHistory(req, res));

export default router;

/**
 * @swagger
 * /api/medicalHistory/{patientId}:
 *   get:
 *     tags: [MedicalHistory]
 *     summary: Get all medicalHistory records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose medicalHistory records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient medicalHistory records retrieved successfully
 * 
 *   post:
 *     tags: [MedicalHistory]
 *     summary: Create new medicalHistory for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom medicalHistory is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               policyNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACTIVE, CANCELLED]
 *     responses:
 *       201:
 *         description: MedicalHistory record created successfully
 * 
 * /api/medicalHistory/{patientId}/{id}:
 *   get:
 *     tags: [MedicalHistory]
 *     summary: Get a specific medicalHistory record by patient ID and medicalHistory ID
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the medicalHistory record
 *     responses:
 *       200:
 *         description: MedicalHistory record retrieved successfully
 * 
 *   put:
 *     tags: [MedicalHistory]
 *     summary: Update an medicalHistory record for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the medicalHistory record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               policyNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACTIVE, CANCELLED]
 *     responses:
 *       200:
 *         description: MedicalHistory record updated successfully
 * 
 *   delete:
 *     tags: [MedicalHistory]
 *     summary: Delete a specific medicalHistory record
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the medicalHistory record to be deleted
 *     responses:
 *       204:
 *         description: MedicalHistory record deleted successfully
 */
