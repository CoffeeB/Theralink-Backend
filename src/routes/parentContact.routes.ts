import { Router } from "express";
import { ParentContactController } from "../controllers/parentContact.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { parentContactSchema } from "../validators/parentContact.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new ParentContactController();
router.post(
  "/:patientid",
  validateRequest(parentContactSchema),
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.createParentContact(req, res)
);

// Route to get all ParentContacts for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getParentContacts(req, res)
);

// Route to get a specific parentContact by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getParentContactById(req, res)
);

// Route to Update specific parentContact
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(parentContactSchema),
  (req, res) => controller.updateParentContact(req, res)
);

// Route to delete a specific parentContact
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteParentContact(req, res)
);

export default router;

/**
 * @swagger
 * /api/parentContacts/{patientId}:
 *   get:
 *     tags: [ParentContact]
 *     summary: Get all parentContacts records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose parentContacts records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient parentContacts records retrieved successfully
 *
 *   post:
 *     tags: [ParentContact]
 *     summary: Create new parentContacts for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom parentContacts is being created
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
 *               relationship:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: ParentContact record created successfully
 *
 * /api/parentContacts/{id}/{patientId}:
 *   get:
 *     tags: [ParentContact]
 *     summary: Get a specific parentContacts record by patient ID and parentContacts ID
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
 *         description: ID of the parentContacts record
 *     responses:
 *       200:
 *         description: ParentContact record retrieved successfully
 *
 *   put:
 *     tags: [ParentContact]
 *     summary: Update parentContacts record for a patient
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
 *         description: ID of the parentContacts record to be updated
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
 *               relationship:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       200:
 *         description: ParentContact record updated successfully
 *
 *   delete:
 *     tags: [ParentContact]
 *     summary: Delete a specific parentContacts record
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
 *         description: ID of the parentContacts record to be deleted
 *     responses:
 *       204:
 *         description: ParentContact record deleted successfully
 */
