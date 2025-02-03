import { Router } from "express";
import { InsuranceController } from "../controllers/insurance.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { insuranceSchema } from "../validators/insurance.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { insuranceSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new InsuranceController();
router.post("/:patientid",  validateRequest(insuranceSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createInsurance(req, res)
);

// Route to get all insurances for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getInsurances(req, res)
);

// Route to get a specific insurance by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getInsuranceById(req, res)
);

// Route to Update specific insurance
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(insuranceSchema),
  (req, res) => controller.updateInsurance(req, res)
);

// Route to delete a specific insurance
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteInsurance(req, res)
);

export default router;
/**
 * @swagger
 * /api/insurance/{patientId}:
 *   get:
 *     tags: [Insurance]
 *     summary: Get all insurance records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose insurance records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient insurance records retrieved successfully
 *   post:
 *     tags: [Insurance]
 *     summary: Create new insurance for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom insurance is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               insuranceType:
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
 *                 enum: [PENDING, ELIGIBLE, INELIGIBLE, UNDER_REVIEW, EXPIRED, REVOKED]
 *     responses:
 *       201:
 *         description: Insurance record created successfully
 */
