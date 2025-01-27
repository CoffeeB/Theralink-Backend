import { Router } from "express";
import { TreatmentInterventionController } from "../controllers/treatmentIntervention.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { treatmentInterventionSchema } from "../validators/treatmentIntervaention.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { treatmentInterventionSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new TreatmentInterventionController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createTreatmentIntervention(req, res)
);

// Route to get all Treatment Intervention for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentInterventions(req, res)
);

// Route to get a specific treatmentIntervention by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentInterventionById(req, res)
);

// Route to Update specific treatmentIntervention
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentInterventionSchema),
  (req, res) => controller.updateTreatmentIntervention(req, res)
);

// Route to delete a specific treatmentIntervention
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteTreatmentIntervention(req, res)
);

export default router;

/**
 * @swagger
 * /api/treatmentIntervention/{treatmentobjectiveId}:
 *   get:
 *     tags: [TreatmentIntervention]
 *     summary: Get all treatmentIntervention records for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentobjectiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient whose treatmentIntervention records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient treatmentIntervention records retrieved successfully
 *
 *   post:
 *     tags: [TreatmentIntervention]
 *     summary: Create new treatmentIntervention for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentobjectiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient for whom treatmentIntervention is being created
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
 *               stepdownServices:
 *                 type: string
 *               dischargeInterventionning:
 *                 type: string
 *               agencies:
 *                 type: string
 *               endTime:
 *                 type: string
 *               abilites:
 *                 type: string
 *               preferences:
 *                 type: string
 *               endTime:
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
 *         description: TreatmentIntervention record created successfully
 *
 * /api/treatmentIntervention/{id}/{treatmentobjectiveId}:
 *   get:
 *     tags: [TreatmentIntervention]
 *     summary: Get a specific treatmentIntervention record by patient ID and treatmentIntervention ID
 *     parameters:
 *       - in: path
 *         name: treatmentobjectiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatmentIntervention record
 *     responses:
 *       200:
 *         description: TreatmentIntervention record retrieved successfully
 *
 *   put:
 *     tags: [TreatmentIntervention]
 *     summary: Update treatmentIntervention record for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentobjectiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID  of the treatmentIntervention record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TreatmentInterventionType:
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
 *                 enum: [PRIMARY, COPAY]
 *               eligibilityStatus:
 *                 type: string
 *                 enum: [PENDING, ELIGIBLE,INELIGIBLE,UNDER_REVIEW, EXPIRED, REVOKED]
 *     responses:
 *       200:
 *         description: TreatmentIntervention record updated successfully
 *
 *   delete:
 *     tags: [TreatmentIntervention]
 *     summary: Delete a specific treatmentIntervention record
 *     parameters:
 *       - in: path
 *         name: treatmentobjectiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID  of the treatmentIntervention record to be deleted
 *     responses:
 *       204:
 *         description: TreatmentIntervention record deleted successfully
 */
