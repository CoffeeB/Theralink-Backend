import { Router } from "express";
import { PhysicianController } from "../controllers/physician.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { physicianSchema } from "../validators/physician.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { physicianSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new PhysicianController();
router.post("/:patientid", authenticate, authorize("ADMIN"),  validateRequest(physicianSchema), (req, res) =>
  controller.createPhysician(req, res)
);

// Route to get all Physicians for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getPhysicians(req, res)
);

// Route to get a specific Physicians by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getPhysicianById(req, res)
);

// Route to Update specific Physicians
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(physicianSchema),
  (req, res) => controller.updatePhysician(req, res)
);

// Route to delete a specific Physicians
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deletePhysician(req, res)
);

export default router;

/**
 * @swagger
 * /api/physician/{patientId}:
 *   get:
 *     tags: [Physician]
 *     summary: Get all Physicians records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Physicians records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Physicians records retrieved successfully
 *
 *   post:
 *     tags: [Physician]
 *     summary: Create new Physicians for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Physicians is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               cost:
 *                 type: string
 *               address:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Physician record created successfully
 *
 * /api/physician/{id}/{patientId}:
 *   get:
 *     tags: [Physician]
 *     summary: Get a specific Physicians record by patient ID and Physicians ID
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
 *         description: ID of the Physicians record
 *     responses:
 *       200:
 *         description: Physician record retrieved successfully
 *
 *   put:
 *     tags: [Physician]
 *     summary: Update Physicians record for a patient
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
 *         description: ID of the Physicians record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               cost:
 *                 type: string
 *               address:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Physician record updated successfully
 *
 *   delete:
 *     tags: [Physician]
 *     summary: Delete a specific Physicians record
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
 *         description: ID of the Physicians record to be deleted
 *     responses:
 *       204:
 *         description: Physician record deleted successfully
 */
