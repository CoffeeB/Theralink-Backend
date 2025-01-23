import { Router } from "express";
import { MedicationController } from "../controllers/medication.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { medicationSchema } from "../validators/medication.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { medicationSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new MedicationController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createMedication(req, res)
);

// Route to get all Medications for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getMedications(req, res)
);

// Route to get a specific medication by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getMedicationById(req, res)
);

// Route to update a specific medication
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(medicationSchema),
  (req, res) => controller.updateMedication(req, res)
);

// Route to delete a specific medication
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteMedication(req, res)
);

export default router;

/**
 * @swagger
 * /api/medication/{patientId}:
 *   get:
 *     tags: [Medication]
 *     summary: Get all medication records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose medication records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient medication records retrieved successfully
 *
 *   post:
 *     tags: [Medication]
 *     summary: Create new medication for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom medication is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               route:
 *                 type: string
 *               purpose:
 *                 type: string 
 *               prescriber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               frequency:
 *                 type: number
 *     responses:
 *       201:
 *         description: Medication record created successfully
 *
 * /api/medication/{patientId}/{id}:
 *   get:
 *     tags: [Medication]
 *     summary: Get a specific medication record by patient ID and medication ID
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
 *         description: ID of the medication record
 *     responses:
 *       200:
 *         description: Medication record retrieved successfully
 *
 *   put:
 *     tags: [Medication]
 *     summary: Update an medication record for a patient
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
 *         description: ID of the medication record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               route:
 *                 type: string
 *               purpose:
 *                 type: string 
 *               prescriber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               frequency:
 *                 type: number
 *     responses:
 *       200:
 *         description: Medication record updated successfully
 *
 *   delete:
 *     tags: [Medication]
 *     summary: Delete a specific medication record
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
 *         description: ID of the medication record to be deleted
 *     responses:
 *       204:
 *         description: Medication record deleted successfully
 */
