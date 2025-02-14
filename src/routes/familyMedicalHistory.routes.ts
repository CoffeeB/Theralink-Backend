import { Router } from "express";
import { FamilyMedicalHistoryController } from "../controllers/familyMedicalHistory.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { familyMedicalHistorySchema } from "../validators/familyMedicalHistory.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new FamilyMedicalHistoryController();
router.post(
  "/:patientid",
  validateRequest(familyMedicalHistorySchema),
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.createFamilyMedicalHistory(req, res)
);

// Route to get all FamilyMedicalHistorys for a patient
router.get(
  "/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.getFamilyMedicalHistorys(req, res)
);

// Route to get a specific familyFamilyMedicalHistory by ID
router.get(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.getFamilyMedicalHistoryById(req, res)
);

// Route to Update specific familyFamilyMedicalHistory
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(familyMedicalHistorySchema),
  (req, res) => void controller.updateFamilyMedicalHistory(req, res)
);

// Route to delete a specific familyFamilyMedicalHistory
router.delete(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  (req, res) => void controller.deleteFamilyMedicalHistory(req, res)
);

export default router;

/**
 * @swagger
 * /api/familyMedicalHistory/{patientId}:
 *   get:
 *     tags: [FamilyMedicalHistory]
 *     summary: Get all FamilyMedicalHistory records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose FamilyMedicalHistory records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient FamilyMedicalHistory records retrieved successfully
 *
 *   post:
 *     tags: [FamilyMedicalHistory]
 *     summary: Create new FamilyMedicalHistory for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom FamilyMedicalHistory is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               familyhistory:
 *                 type: string
 *     responses:
 *       201:
 *         description: FamilyMedicalHistory record created successfully
 *
 * /api/familyMedicalHistory/{id}/{patientId}:
 *   get:
 *     tags: [FamilyMedicalHistory]
 *     summary: Get a specific FamilyMedicalHistory record by patient ID and FamilyMedicalHistory ID
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
 *         description: ID of the FamilyMedicalHistory record
 *     responses:
 *       200:
 *         description: FamilyMedicalHistory record retrieved successfully
 *
 *   put:
 *     tags: [FamilyMedicalHistory]
 *     summary: Update FamilyMedicalHistory record for a patient
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
 *         description: ID of the FamilyMedicalHistory record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               familyhistory:
 *                 type: string
 *     responses:
 *       200:
 *         description: FamilyMedicalHistory record updated successfully
 *
 *   delete:
 *     tags: [FamilyMedicalHistory]
 *     summary: Delete a specific FamilyMedicalHistory record
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
 *         description: ID of the FamilyMedicalHistory record to be deleted
 *     responses:
 *       204:
 *         description: FamilyMedicalHistory record deleted successfully
 */
