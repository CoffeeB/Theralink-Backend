import { Router } from "express";
import { SocialDeterminantsController } from "../controllers/socialDeterminants.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { socialDeterminantSchema } from "../validators/socialDeterminant.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new SocialDeterminantsController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createSocialDeterminants(req, res)
);

// Route to get all SocialDeterminants for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getSocialDeterminants(req, res)
);

// Route to get a specific socialDeterminants by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getSocialDeterminantsById(req, res)
);

// Route to Update specific socialDeterminants
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(socialDeterminantSchema),
  (req, res) => controller.updateSocialDeterminants(req, res)
);

// Route to delete a specific socialDeterminants
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteSocialDeterminants(req, res)
);

export default router;

/**
 * @swagger
 * /api/socialDeterminants/{patientId}:
 *   get:
 *     tags: [SocialDeterminant]
 *     summary: Get all SocialDeterminants records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose SocialDeterminants records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient SocialDeterminants records retrieved successfully
 *
 *   post:
 *     tags: [SocialDeterminant]
 *     summary: Create new SocialDeterminants for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom SocialDeterminants is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               finance:
 *                 type: string
 *               food:
 *                 type: string
 *               transportation:
 *                 type: string
 *               activity:
 *                 type: string
 *     responses:
 *       201:
 *         description: SocialDeterminant record created successfully
 *
 * /api/socialDeterminants/{id}/{patientId}:
 *   get:
 *     tags: [SocialDeterminant]
 *     summary: Get a specific SocialDeterminants record by patient ID and SocialDeterminants ID
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
 *         description: ID of the SocialDeterminants record
 *     responses:
 *       200:
 *         description: SocialDeterminant record retrieved successfully
 *
 *   put:
 *     tags: [SocialDeterminant]
 *     summary: Update SocialDeterminants record for a patient
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
 *         description: ID of the SocialDeterminants record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*               finance:
 *                 type: string
 *               food:
 *                 type: string
 *               transportation:
 *                 type: string
 *               activity:
 *                 type: string
 *     responses:
 *       200:
 *         description: SocialDeterminant record updated successfully
 *
 *   delete:
 *     tags: [SocialDeterminant]
 *     summary: Delete a specific SocialDeterminants record
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
 *         description: ID of the SocialDeterminants record to be deleted
 *     responses:
 *       204:
 *         description: SocialDeterminant record deleted successfully
 */
