import { Router } from "express";
import { DischargeController } from "../controllers/discharge.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { dischargeSchema } from "../validators/discharge.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new DischargeController();
router.post("/:patientid", validateRequest(dischargeSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createDischarge(req, res)
);

// Route to get all Discharges for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getDischarges(req, res)
);

// Route to get a specific Discharge by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getDischargeById(req, res)
);

// Route to Update specific Discharge
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(dischargeSchema),
  (req, res) => controller.updateDischarge(req, res)
);

// Route to delete a specific Discharge
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteDischarge(req, res)
);

export default router;

/**
 * @swagger
 * /api/discharge/{patientId}:
 *   get:
 *     tags: [Discharge]
 *     summary: Get all Discharge records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Discharge records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Discharge records retrieved successfully
 *
 *   post:
 *     tags: [Discharge]
 *     summary: Create new Discharge for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Discharge is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               summary:
 *                 type: string
 *               linkDocument:
 *                 type: string
 *               dischargeDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *                 enum: [DECLINED, NO_IMPROVEMENT, REFERRED_OUT, REFUSED_TREATMENT, SUCCESSFULL_DISCHARGE, OTHER]
 *     responses:
 *       201:
 *         description: Discharge record created successfully
 *
 * /api/discharge/{id}/{patientId}:
 *   get:
 *     tags: [Discharge]
 *     summary: Get a specific Discharge record by patient ID and Discharge ID
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
 *         description: ID of the Discharge record
 *     responses:
 *       200:
 *         description: Discharge record retrieved successfully
 *
 *   put:
 *     tags: [Discharge]
 *     summary: Update Discharge record for a patient
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
 *         description: ID of the Discharge record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               summary:
 *                 type: string
 *               linkDocument:
 *                 type: string
 *               dischargeDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *                 enum: [DECLINED, NO_IMPROVEMENT, REFERRED_OUT, REFUSED_TREATMENT, SUCCESSFULL_DISCHARGE, OTHER
 *     responses:
 *       200:
 *         description: Discharge record updated successfully
 *
 *   delete:
 *     tags: [Discharge]
 *     summary: Delete a specific Discharge record
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
 *         description: ID of the Discharge record to be deleted
 *     responses:
 *       204:
 *         description: Discharge record deleted successfully
 */
