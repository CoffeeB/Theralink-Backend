import { Router } from "express";
import { EducationBackgroundController } from "../controllers/educationBackground.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { educationBackgroundSchema } from "../validators/educationBackground.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new EducationBackgroundController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createEducationBackground(req, res)
);

// Route to get all EducationBackgrounds for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getEducationBackgrounds(req, res)
);

// Route to get a specific educationBackground by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getEducationBackgroundById(req, res)
);

// Route to Update specific educationBackground
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(educationBackgroundSchema),
  (req, res) => controller.updateEducationBackground(req, res)
);

// Route to delete a specific educationBackground
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteEducationBackground(req, res)
);

export default router;

/**
 * @swagger
 * /api/educationBackgrounds/{patientId}:
 *   get:
 *     tags: [Education Background]
 *     summary: Get all Education Backgrounds records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Education Backgrounds records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Education Backgrounds records retrieved successfully
 *
 *   post:
 *     tags: [Education Background]
 *     summary: Create new Education Backgrounds for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Education Backgrounds is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               grade:
 *                 type: string
 *               yearOfPassing:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *                 enum: [ELEMENTARY, PRIMARY,HIGHSCHOOL,TERTIARY]
 *     responses:
 *       201:
 *         description: EducationBackground record created successfully
 *
 * /api/educationBackgrounds/{id}/{patientId}:
 *   get:
 *     tags: [EducationBackground]
 *     summary: Get a specific Education Backgrounds record by patient ID and Education Backgrounds ID
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
 *         description: ID of the Education Backgrounds record
 *     responses:
 *       200:
 *         description: EducationBackground record retrieved successfully
 *
 *   put:
 *     tags: [Education Background]
 *     summary: Update Education Backgrounds record for a patient
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
 *         description: ID of the Education Backgrounds record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               degree:
 *                 type: string
 *               grade:
 *                 type: string
 *               yearOfPassing:
 *                 type: string
 *               educationLevel:
 *                 type: string
 *                 enum: [ELEMENTARY, PRIMARY,HIGHSCHOOL,TERTIARY]
 *     responses:
 *       200:
 *         description: EducationBackground record updated successfully
 *
 *   delete:
 *     tags: [Education Background]
 *     summary: Delete a specific Education Backgrounds record
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
 *         description: ID of the Education Backgrounds record to be deleted
 *     responses:
 *       204:
 *         description: EducationBackground record deleted successfully
 */
