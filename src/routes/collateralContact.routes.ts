import { Router } from "express";
import { CollateralContactController } from "../controllers/collateralContact.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { collateralContactSchema } from "../validators/collateralContact.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new CollateralContactController();
router.post("/:patientid", validateRequest(collateralContactSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createCollateralContact(req, res)
);

// Route to get all CollateralContacts for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getCollateralContacts(req, res)
);

// Route to get a specific collateralContact by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getCollateralContactById(req, res)
);

// Route to Update specific collateralContact
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(collateralContactSchema),
  (req, res) => controller.updateCollateralContact(req, res)
);

// Route to delete a specific collateralContact
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteCollateralContact(req, res)
);

export default router;

/**
 * @swagger
 * /api/collateralContacts/{patientId}:
 *   get:
 *     tags: [CollateralContact]
 *     summary: Get all CollateralContacts records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose CollateralContacts records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient CollateralContacts records retrieved successfully
 *
 *   post:
 *     tags: [CollateralContact]
 *     summary: Create new CollateralContacts for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom CollateralContacts is being created
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
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: CollateralContact record created successfully
 *
 * /api/collateralContacts/{id}/{patientId}:
 *   get:
 *     tags: [CollateralContact]
 *     summary: Get a specific CollateralContacts record by patient ID and CollateralContacts ID
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
 *         description: ID of the CollateralContacts record
 *     responses:
 *       200:
 *         description: CollateralContact record retrieved successfully
 *
 *   put:
 *     tags: [CollateralContact]
 *     summary: Update CollateralContacts record for a patient
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
 *         description: ID of the CollateralContacts record to be updated
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
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: CollateralContact record updated successfully
 *
 *   delete:
 *     tags: [CollateralContact]
 *     summary: Delete a specific CollateralContacts record
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
 *         description: ID of the CollateralContacts record to be deleted
 *     responses:
 *       204:
 *         description: CollateralContact record deleted successfully
 */
