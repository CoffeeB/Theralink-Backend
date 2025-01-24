import { Router } from "express";
import { ImmunizationController } from "../controllers/immunization.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { immunizationSchema } from "../validators/immunization.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new ImmunizationController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createImmunization(req, res)
);

// Route to get all Immunizations for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getImmunizations(req, res)
);

// Route to get a specific immunization by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getImmunizationById(req, res)
);

// Route to update a specific immunization
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(immunizationSchema),
  (req, res) => controller.updateImmunization(req, res)
);

// Route to delete a specific immunization
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteImmunization(req, res)
);

export default router;
/**
 * @swagger
 * /api/immunization/{patientId}:
 *   get:
 *     tags: [Immunization]
 *     summary: Get all immunization records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose immunization records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient immunization records retrieved successfully
 *
 *   post:
 *     tags: [Immunization]
 *     summary: Create new immunization for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom immunization is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vaccineName:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               temperature:
 *                 type: string
 *               comments:
 *                 type: string
 *               rejectedReason:
 *                 type: string
 *               immunization:
 *                 type: string
 *               dose:
 *                 type: number
 *               isRejected:
 *                 type: boolean
 *               lotNumber:
 *                 type: number
 *               administrationSite:
 *                 type: string
 *               administeredBy:
 *                 type: string
 *               dateAdministered:
 *                 type: string
 *                 format: date
 *               dateExpired:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Immunization record created successfully
 *
 * /api/immunization/{patientId}/{id}:
 *   get:
 *     tags: [Immunization]
 *     summary: Get a specific immunization record by patient ID and immunization ID
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
 *         description: ID of the immunization record
 *     responses:
 *       200:
 *         description: Immunization record retrieved successfully
 *
 *   put:
 *     tags: [Immunization]
 *     summary: Update an immunization record for a patient
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
 *         description: ID of the immunization record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vaccineName:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               temperature:
 *                 type: string
 *               comments:
 *                 type: string
 *               rejectedReason:
 *                 type: string
 *               immunization:
 *                 type: string
 *               dose:
 *                 type: number
 *               isRejected:
 *                 type: boolean
 *               lotNumber:
 *                 type: number
 *               administrationSite:
 *                 type: string
 *               administeredBy:
 *                 type: string
 *               dateAdministered:
 *                 type: string
 *                 format: date
 *               dateExpired:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Immunization record updated successfully
 *
 *   delete:
 *     tags: [Immunization]
 *     summary: Delete a specific immunization record
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
 *         description: ID of the immunization record to be deleted
 *     responses:
 *       204:
 *         description: Immunization record deleted successfully
 */
