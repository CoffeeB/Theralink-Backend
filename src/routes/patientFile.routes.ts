import { Router } from "express";
import { PatientFileController } from "../controllers/patientFile.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { patientFileSchema } from "../validators/patientFile.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new PatientFileController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createPatientFile(req, res)
);

// Route to get all PatientFiles for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getPatientFiles(req, res)
);

// Route to get a specific patientFile by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getPatientFileById(req, res)
);

// Route to update a specific patientFiles
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(patientFileSchema),
  (req, res) => controller.updatePatientFile(req, res)
);

// Route to delete a specific patientFile
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deletePatientFile(req, res)
);

export default router;
/**
 * @swagger
 * /api/patientFile/{patientId}:
 *   get:
 *     tags: [PatientFile]
 *     summary: Get all patientFile records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose patientFile records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient patientFile records retrieved successfully
 *
 *   post:
 *     tags: [PatientFile]
 *     summary: Create new patientFile for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom patientFile is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filePath:
 *                 type: string
 *               fileType:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: PatientFile record created successfully
 *
 * /api/patientFile/{patientId}/{id}:
 *   get:
 *     tags: [PatientFile]
 *     summary: Get a specific patientFile record by patient ID and patientFile ID
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
 *         description: ID of the patientFile record
 *     responses:
 *       200:
 *         description: PatientFile record retrieved successfully
 *
 *   put:
 *     tags: [PatientFile]
 *     summary: Update a patientFile record for a patient
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
 *         description: ID of the patientFile record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filePath:
 *                 type: string
 *               fileType:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: PatientFile record updated successfully
 *
 *   delete:
 *     tags: [PatientFile]
 *     summary: Delete a specific patientFile record
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
 *         description: ID of the patientFile record to be deleted
 *     responses:
 *       204:
 *         description: PatientFile record deleted successfully
 */
