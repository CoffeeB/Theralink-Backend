import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { validateRequest } from '../middleware/validate.middleware';
import { patientSchema } from '../validators/patient.validator';

const router = Router();
const controller = new PatientController();

router.post('/', validateRequest(patientSchema), (req, res) => void controller.createPatient(req, res));
router.get('/', (req, res) => void controller.getPatients(req, res));
router.get('/:id', (req, res) => void controller.getPatientById(req, res));
router.put('/:id', validateRequest(patientSchema), (req, res) => void controller.updatePatient(req, res));
router.delete('/:id', (req, res) => void controller.deletePatient(req, res));

export default router;

/**
 * @swagger
 * /api/patients:
 *   get:
 *     tags: [Patients]
 *     summary: Get all patients
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *
 *   post:
 *     tags: [Patients]
 *     summary: Create a new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               middleName:
 *                 type: string
 *               nickName:
 *                 type: string
 *               suffix:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               race:
 *                 type: string
 *                 enum: [AFRICAN, WHITE, ASIAN, HISPANIC, OTHER]
 *               startDate:
 *                 type: string
 *                 format: date
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Patient created successfully
 *
 * /api/patients/{id}:
 *   get:
 *     tags: [Patients]
 *     summary: Get a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *   
 *   put:
 *     tags: [Patients]
 *     summary: Update patient information
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               race:
 *                 type: string
 *                 enum: [AFRICAN, WHITE, ASIAN, HISPANIC, OTHER]
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               medicalHistory:
 *                 type: object
 *                 additionalProperties: true
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *
 *   delete:
 *     tags: [Patients]
 *     summary: Delete a patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 */

