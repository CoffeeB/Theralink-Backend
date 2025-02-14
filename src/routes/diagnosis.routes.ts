import { Router } from "express";
import { DiagnosisController } from "../controllers/diagnosis.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { diagnosisSchema } from "../validators/diagnosis.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new DiagnosisController();
router.post(
  "/:patientid",
  validateRequest(diagnosisSchema),
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.createDiagnosis(req, res)
);

// Route to get all Diagnosiss for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getDiagnosiss(req, res)
);

// Route to get a specific Diagnosis by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getDiagnosisById(req, res)
);

// Route to Update specific Diagnosis
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(diagnosisSchema),
  (req, res) => controller.updateDiagnosis(req, res)
);

// Route to delete a specific Diagnosis
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteDiagnosis(req, res)
);

export default router;

/**
 * @swagger
 * /api/Diagnosis/{patientId}:
 *   get:
 *     tags: [Diagnosis]
 *     summary: Get all Diagnosis records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Diagnosis records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Diagnosis records retrieved successfully
 *
 *   post:
 *     tags: [Diagnosis]
 *     summary: Create new Diagnosis for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Diagnosis is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               diagnosisCode:
 *                 type: string
 *               diagnosisDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Diagnosis record created successfully
 *
 * /api/Diagnosis/{id}/{patientId}:
 *   get:
 *     tags: [Diagnosis]
 *     summary: Get a specific Diagnosis record by patient ID and Diagnosis ID
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
 *         description: ID of the Diagnosis record
 *     responses:
 *       200:
 *         description: Diagnosis record retrieved successfully
 *
 *   put:
 *     tags: [Diagnosis]
 *     summary: Update Diagnosis record for a patient
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
 *         description: ID of the Diagnosis record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               diagnosisCode:
 *                 type: string
 *               diagnosisDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Diagnosis record updated successfully
 *
 *   delete:
 *     tags: [Diagnosis]
 *     summary: Delete a specific Diagnosis record
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
 *         description: ID of the Diagnosis record to be deleted
 *     responses:
 *       204:
 *         description: Diagnosis record deleted successfully
 */
