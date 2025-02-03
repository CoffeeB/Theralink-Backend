import { Router } from "express";
import { TreatmentObjectiveController } from "../controllers/treatmentObjective.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { treatmentObjectiveSchema } from "../validators/treatmentObjective.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { treatmentObjectiveSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new TreatmentObjectiveController();
router.post(
  "/:treatmentgoalsId",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentObjectiveSchema),
  (req, res) => controller.createTreatmentObjective(req, res)
);

// Route to get all TreatmentObjectives for a patient
router.get("/:treatmentgoalsId", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentObjectives(req, res)
);

// Route to get a specific treatmentObjective by ID
router.get(
  "/:id/:treatmentgoalsId",
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.getTreatmentObjectiveById(req, res)
);

// Route to Update specific treatmentObjective
router.put(
  "/:id/:treatmentgoalsId",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentObjectiveSchema),
  (req, res) => controller.updateTreatmentObjective(req, res)
);

// Route to delete a specific treatmentObjective
router.delete(
  "/:id/:treatmentgoalsId",
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.deleteTreatmentObjective(req, res)
);

export default router;
/**
 * @swagger
 * /api/treatmentObjective/{treatmentgoalsId}:
 *   get:
 *     tags: [TreatmentObjective]
 *     summary: Get all treatmentObjective records for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentgoalsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the patient whose treatmentObjective records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient treatmentObjective records retrieved successfully
 *
 *   post:
 *     tags: [TreatmentObjective]
 *     summary: Create new treatmentObjective for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentgoalsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the patient for whom the treatmentObjective is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               objective:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               targetDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: TreatmentObjective record created successfully
 *
 * /api/treatmentObjective/{id}/{treatmentgoalsId}:
 *   get:
 *     tags: [TreatmentObjective]
 *     summary: Get a specific treatmentObjective record by patient ID and treatmentObjective ID
 *     parameters:
 *       - in: path
 *         name: treatmentgoalsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment objective ID of the record
 *     responses:
 *       200:
 *         description: TreatmentObjective record retrieved successfully
 *
 *   put:
 *     tags: [TreatmentObjective]
 *     summary: Update a treatmentObjective record for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentgoalsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment objective ID of the record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               objective:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               targetDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: TreatmentObjective record updated successfully
 *
 *   delete:
 *     tags: [TreatmentObjective]
 *     summary: Delete a specific treatmentObjective record
 *     parameters:
 *       - in: path
 *         name: treatmentgoalsId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment objective ID of the record to be deleted
 *     responses:
 *       204:
 *         description: TreatmentObjective record deleted successfully
 */
