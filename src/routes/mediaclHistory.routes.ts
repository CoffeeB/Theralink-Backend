import { Router } from "express";
import { MedicalHistoryController } from "../controllers/medicalHistory.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { medicalHistorySchema } from "../validators/medicalHistory.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new MedicalHistoryController();
router.post(
  "/:patientid",
  validateRequest(medicalHistorySchema),
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.createMedicalHistory(req, res)
);

// Route to get all MedicalHistorys for a patient
router.get(
  "/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.getMedicalHistorys(req, res)
);

// Route to get a specific medicalHistory by ID
router.get(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.getMedicalHistoryById(req, res)
);

// Route to Update specific medicalHistory
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(medicalHistorySchema),
  (req, res) => void controller.updateMedicalHistory(req, res)
);

// Route to delete a specific medicalHistory
router.delete(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.deleteMedicalHistory(req, res)
);

export default router;

/**
 * @swagger
 * /api/medicalHistory/{patientId}:
 *   get:
 *     tags: [MedicalHistory]
 *     summary: Get all MedicalHistory records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose MedicalHistory records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient MedicalHistory records retrieved successfully
 *
 *   post:
 *     tags: [MedicalHistory]
 *     summary: Create new MedicalHistory for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom MedicalHistory is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               history:
 *                 type: string
 *               addictionDetails:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               allergies:
 *                 type: boolean
 *               sexualAbuse:
 *                 type: boolean
 *               pregnantBefore:
 *                 type: boolean
 *               expectingPregnancy:
 *                 type: boolean
 *               abortion:
 *                 type: boolean
 *               breastCancer:
 *                 type: boolean
 *               substances:
 *                 type: array
 *                 enum: [ALCOHOL, NICOTINE, MARIJUANA, OPOIDS, STIMULANTS, HALLUCINOGENS, INHALANTS, SEDATIVES, OTHER]
 *               behaviours:
 *                 type: array
 *                 enum: [GAMBLING_DISORDER, FOOD_ADDICTION, SEX_ADDICTION, SHOPPING_ADDICTION, EXCERCISE_ADDICTION, WORK_ADDICTION]
 *     responses:
 *       201:
 *         description: MedicalHistory record created successfully
 *
 * /api/medicalHistory/{id}/{patientId}:
 *   get:
 *     tags: [MedicalHistory]
 *     summary: Get a specific MedicalHistory record by patient ID and MedicalHistory ID
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
 *         description: ID of the MedicalHistory record
 *     responses:
 *       200:
 *         description: MedicalHistory record retrieved successfully
 *
 *   put:
 *     tags: [MedicalHistory]
 *     summary: Update MedicalHistory record for a patient
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
 *         description: ID of the MedicalHistory record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               history:
 *                 type: string
 *               addictionDetails:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               allergies:
 *                 type: boolean
 *               sexualAbuse:
 *                 type: boolean
 *               pregnantBefore:
 *                 type: boolean
 *               expectingPregnancy:
 *                 type: boolean
 *               abortion:
 *                 type: boolean
 *               breastCancer:
 *                 type: boolean
 *               substances:
 *                 type: array
 *                 enum: [ALCOHOL, NICOTINE, MARIJUANA, OPOIDS, STIMULANTS, HALLUCINOGENS, INHALANTS, SEDATIVES, OTHER]
 *               behaviours:
 *                 type: array
 *                 enum: [GAMBLING_DISORDER, FOOD_ADDICTION, SEX_ADDICTION, SHOPPING_ADDICTION, EXCERCISE_ADDICTION, WORK_ADDICTION]
 *     responses:
 *       200:
 *         description: MedicalHistory record updated successfully
 *
 *   delete:
 *     tags: [MedicalHistory]
 *     summary: Delete a specific MedicalHistory record
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
 *         description: ID of the MedicalHistory record to be deleted
 *     responses:
 *       204:
 *         description: MedicalHistory record deleted successfully
 */
