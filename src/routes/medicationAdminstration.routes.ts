import { Router } from "express";
import { MedicationAdminstrationController } from "../controllers/medicationAdminstration.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { medicationAdminstrationSchema } from "../validators/medicationAdminstration.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new MedicationAdminstrationController();
router.post("/:patientid", validateRequest(medicationAdminstrationSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createMedicationAdminstration(req, res)
);

// Route to get all MedicationAdminstrations for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getMedicationAdminstrations(req, res)
);

// Route to get a specific medicationAdminstration by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getMedicationAdminstrationById(req, res)
);

// Route to Update specific medicationAdminstration
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(medicationAdminstrationSchema),
  (req, res) => controller.updateMedicationAdminstration(req, res)
);

// Route to delete a specific medicationAdminstration
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteMedicationAdminstration(req, res)
);

export default router;

/**
 * @swagger
 * /api/medicationAdminstration/{patientId}:
 *   get:
 *     tags: [MedicationAdminstration]
 *     summary: Get all medicationAdminstration records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose medicationAdminstration records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient medicationAdminstration records retrieved successfully
 *
 *   post:
 *     tags: [MedicationAdminstration]
 *     summary: Create new medicationAdminstration for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom medicationAdminstration is being created
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
 *               notes:
 *                 type: string 
 *               initials:
 *                 type: string
 *               administeredDate:
 *                 type: string
 *                 format: date
 *               frequency:
 *                 type: number
 *     responses:
 *       201:
 *         description: MedicationAdminstration record created successfully
 *
 * /api/medicationAdminstration/{id}/{patientId}:
 *   get:
 *     tags: [MedicationAdminstration]
 *     summary: Get a specific medicationAdminstration record by patient ID and medicationAdminstration ID
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
 *         description: ID of the medicationAdminstration record
 *     responses:
 *       200:
 *         description: MedicationAdminstration record retrieved successfully
 *
 *   put:
 *     tags: [MedicationAdminstration]
 *     summary: Update medicationAdminstration record for a patient
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
 *         description: ID of the medicationAdminstration record to be updated
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
 *               notes:
 *                 type: string 
 *               initials:
 *                 type: string
 *               administeredDate:
 *                 type: string
 *                 format: date
 *               frequency:
 *                 type: number
 *     responses:
 *       200:
 *         description: MedicationAdminstration record updated successfully
 *
 *   delete:
 *     tags: [MedicationAdminstration]
 *     summary: Delete a specific medicationAdminstration record
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
 *         description: ID of the medicationAdminstration record to be deleted
 *     responses:
 *       204:
 *         description: MedicationAdminstration record deleted successfully
 */
