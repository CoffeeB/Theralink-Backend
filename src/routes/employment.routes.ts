import { Router } from "express";
import { EmploymentController } from "../controllers/employment.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { employmentSchema } from "../validators/employment.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new EmploymentController();
router.post("/:patientid",  validateRequest(employmentSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createEmployment(req, res)
);

// Route to get all Employments for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getEmployments(req, res)
);

// Route to get a specific employment by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getEmploymentById(req, res)
);

// Route to Update specific employment
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(employmentSchema),
  (req, res) => controller.updateEmployment(req, res)
);

// Route to delete a specific employment
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteEmployment(req, res)
);

export default router;

/**
 * @swagger
 * /api/employment/{patientId}:
 *   get:
 *     tags: [Employment]
 *     summary: Get all Employments records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Employments records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Employments records retrieved successfully
 *
 *   post:
 *     tags: [Employment]
 *     summary: Create new Employments for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Employments is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *               designation:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employment record created successfully
 *
 * /api/employment/{id}/{patientId}:
 *   get:
 *     tags: [Employment]
 *     summary: Get a specific Employments record by patient ID and Employments ID
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
 *         description: ID of the Employments record
 *     responses:
 *       200:
 *         description: Employment record retrieved successfully
 *
 *   put:
 *     tags: [Employment]
 *     summary: Update Employments record for a patient
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
 *         description: ID of the Employments record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *               designation:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employment record updated successfully
 *
 *   delete:
 *     tags: [Employment]
 *     summary: Delete a specific Employments record
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
 *         description: ID of the Employments record to be deleted
 *     responses:
 *       204:
 *         description: Employment record deleted successfully
 */
