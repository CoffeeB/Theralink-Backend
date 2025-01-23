import { Router } from 'express';
import { InsuranceController } from '../controllers/insurance.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { insuranceSchema } from 'src/validators/insurance.validator';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new InsuranceController();

router.post('/', validateRequest(insuranceSchema), (req, res) => void controller.createInsurance(req, res));
router.get('/', (req, res) => void controller.getInsurances(req, res));
router.get('/:id', (req, res) => void controller.getInsuranceById(req, res));
router.put('/:id', validateRequest(insuranceSchema), (req, res) => void controller.updateInsurance(req, res));
router.delete('/:id', (req, res) => void controller.deleteInsurance(req, res));

export default router;

/**
 * @swagger
 * /api/insurance/{patientId}:
 *   get:
 *     tags: [Insurance]
 *     summary: Get all insurance records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose insurance records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient insurance records retrieved successfully
 * 
 *   post:
 *     tags: [Insurance]
 *     summary: Create new insurance for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom insurance is being created
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
 *         description: Insurance record created successfully
 * 
 * /api/insurance/{patientId}/{id}:
 *   get:
 *     tags: [Insurance]
 *     summary: Get a specific insurance record by patient ID and insurance ID
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
 *         description: ID of the insurance record
 *     responses:
 *       200:
 *         description: Insurance record retrieved successfully
 * 
 *   put:
 *     tags: [Insurance]
 *     summary: Update an insurance record for a patient
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
 *         description: ID of the insurance record to be updated
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
 *         description: Insurance record updated successfully
 * 
 *   delete:
 *     tags: [Insurance]
 *     summary: Delete a specific insurance record
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
 *         description: ID of the insurance record to be deleted
 *     responses:
 *       204:
 *         description: Insurance record deleted successfully
 */
