import { Router } from "express";
import { TreatmentPlanController } from "../controllers/treatmentPlan.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { treatmentPlanSchema } from "../validators/treatmentPlan.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { treatmentPlanSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new TreatmentPlanController();
router.post(
  "/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentPlanSchema),
  (req, res) => controller.createTreatmentPlan(req, res)
);

// Route to get all TreatmentPlans for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentPlans(req, res)
);

// Route to get a specific treatmentPlan by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentPlanById(req, res)
);

// Route to Update specific treatmentPlan
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentPlanSchema),
  (req, res) => controller.updateTreatmentPlan(req, res)
);

// Route to delete a specific treatmentPlan
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteTreatmentPlan(req, res)
);

export default router;
/**
 * @swagger
 * /api/treatmentPlan/{patientId}:
 *   get:
 *     tags: [TreatmentPlan]
 *     summary: Get all treatmentPlan records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose treatmentPlan records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient treatmentPlan records retrieved successfully
 *
 *   post:
 *     tags: [TreatmentPlan]
 *     summary: Create a new treatmentPlan for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom the treatmentPlan is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               stepdownServices:
 *                 type: string
 *               dischargeObjective:
 *                 type: string
 *               agencies:
 *                 type: string
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               abilities:
 *                 type: string
 *               preferences:
 *                 type: string
 *               service:
 *                 type: string
 *               placeOfService:
 *                 type: string
 *               maintenanceRecommendation:
 *                 type: string
 *               strength:
 *                 type: string
 *               needs:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: TreatmentPlan record created successfully
 *
 * /api/treatmentPlan/{id}/{patientId}:
 *   get:
 *     tags: [TreatmentPlan]
 *     summary: Get a specific treatmentPlan record by patient ID and treatmentPlan ID
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
 *         description: ID of the treatmentPlan record
 *     responses:
 *       200:
 *         description: TreatmentPlan record retrieved successfully
 *
 *   put:
 *     tags: [TreatmentPlan]
 *     summary: Update a treatmentPlan record for a patient
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
 *         description: ID of the treatmentPlan record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               stepdownServices:
 *                 type: string
 *               dischargeObjective:
 *                 type: string
 *               agencies:
 *                 type: string
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               abilities:
 *                 type: string
 *               preferences:
 *                 type: string
 *               service:
 *                 type: string
 *               placeOfService:
 *                 type: string
 *               maintenanceRecommendation:
 *                 type: string
 *               strength:
 *                 type: string
 *               needs:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: TreatmentPlan record updated successfully
 *
 *   delete:
 *     tags: [TreatmentPlan]
 *     summary: Delete a specific treatmentPlan record
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
 *         description: ID of the treatmentPlan record to be deleted
 *     responses:
 *       204:
 *         description: TreatmentPlan record deleted successfully
 */
