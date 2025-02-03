import { Router } from "express";
import { TreatmentGoalsController } from "../controllers/treatmentPlanGoals.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { treatmentGoalsSchema } from "../validators/treatmentGoals.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { treatmentGoalsSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new TreatmentGoalsController();
router.post(
  "/:treatmentplanId",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentGoalsSchema),
  (req, res) => controller.createTreatmentGoals(req, res)
);

// Route to get all Treatment Goals for a patient
router.get("/:treatmentplanId", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentGoalss(req, res)
);

// Route to get a specific treatmentGoals by ID
router.get(
  "/:id/:treatmentplanId",
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.getTreatmentGoalsById(req, res)
);

// Route to Update specific treatmentGoals
router.put(
  "/:id/:treatmentplanId",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentGoalsSchema),
  (req, res) => controller.updateTreatmentGoals(req, res)
);

// Route to delete a specific treatmentGoals
router.delete(
  "/:id/:treatmentplanId",
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.deleteTreatmentGoals(req, res)
);

export default router;
/**
 * @swagger
 * /api/treatmentGoals/{treatmentplanId}:
 *   get:
 *     tags: [TreatmentGoals]
 *     summary: Get all treatment Goals records for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient whose treatment Goals records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient treatment Goals records retrieved successfully
 *
 *   post:
 *     tags: [TreatmentGoals]
 *     summary: Create new treatment Goals for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient for whom treatment Goals is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               comments:
 *                 type: string
 *               targetDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *               startDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [COMPLETE, DEFERRED, DIS_CONTINUED, NEW_GOAL_CREATED, NOT_ACHIEVED, NOT_YET_BEGUN, ON_GOING]
 *     responses:
 *       201:
 *         description: Treatment Goals record created successfully
 *
 * /api/treatmentGoals/{id}/{treatmentplanId}:
 *   get:
 *     tags: [TreatmentGoals]
 *     summary: Get a specific treatment Goals record by patient ID and treatment Goals ID
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatment Goals record
 *     responses:
 *       200:
 *         description: Treatment Goals record retrieved successfully
 *
 *   put:
 *     tags: [TreatmentGoals]
 *     summary: Update treatment Goals record for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatment Goals record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:    
 *               name:
 *                 type: string
 *               comments:
 *                 type: string
 *               targetDate:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *               startDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [COMPLETE, DEFERRED, DIS_CONTINUED, NEW_GOAL_CREATED, NOT_ACHIEVED, NOT_YET_BEGUN, ON_GOING]    
 *     responses:
 *       200:
 *         description: Treatment Goals record updated successfully
 *
 *   delete:
 *     tags: [TreatmentGoals]
 *     summary: Delete a specific treatment Goals record
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatment Goals record to be deleted
 *     responses:
 *       204:
 *         description: Treatment Goals record deleted successfully
 */
