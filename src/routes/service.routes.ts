import { Router } from "express";
import { ServiceController } from "../controllers/service.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { serviceSchema } from "../validators/service.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { serviceSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new ServiceController();
router.post(
  "/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(serviceSchema),
  (req, res) => controller.createService(req, res)
);

// Route to get all Services for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getServices(req, res)
);

// Route to get a specific Services by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getServiceById(req, res)
);

// Route to Update specific Services
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(serviceSchema),
  (req, res) => controller.updateService(req, res)
);

// Route to delete a specific Services
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteService(req, res)
);

export default router;

/**
 * @swagger
 * /api/service/{patientId}:
 *   get:
 *     tags: [Service]
 *     summary: Get all Services records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose Services records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient Services records retrieved successfully
 *
 *   post:
 *     tags: [Service]
 *     summary: Create new Services for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom Services is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Service record created successfully
 *
 * /api/service/{id}/{patientId}:
 *   get:
 *     tags: [Service]
 *     summary: Get a specific Services record by patient ID and Services ID
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
 *         description: ID of the Services record
 *     responses:
 *       200:
 *         description: Service record retrieved successfully
 *
 *   put:
 *     tags: [Service]
 *     summary: Update Services record for a patient
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
 *         description: ID of the Services record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Service record updated successfully
 *
 *   delete:
 *     tags: [Service]
 *     summary: Delete a specific Services record
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
 *         description: ID of the Services record to be deleted
 *     responses:
 *       204:
 *         description: Service record deleted successfully
 */
