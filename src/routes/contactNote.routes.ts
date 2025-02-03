import { Router } from "express";
import { ContactNoteController } from "../controllers/contactNote.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { contactNoteSchema } from "../validators/contactNote.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new ContactNoteController();
router.post("/:patientid", validateRequest(contactNoteSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createContactNote(req, res)
);

// Route to get all ContactNotes for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getContactNotes(req, res)
);

// Route to get a specific contactNote by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getContactNoteById(req, res)
);

// Route to Update specific contactNote
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(contactNoteSchema),
  (req, res) => controller.updateContactNote(req, res)
);

// Route to delete a specific contactNote
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteContactNote(req, res)
);

export default router;

/**
 * @swagger
 * /api/contactNotes/{patientId}:
 *   get:
 *     tags: [ContactNote]
 *     summary: Get all ContactNotes records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose ContactNotes records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient ContactNotes records retrieved successfully
 *
 *   post:
 *     tags: [ContactNote]
 *     summary: Create new ContactNotes for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom ContactNotes is being created
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
 *         description: ContactNote record created successfully
 *
 * /api/contactNotes/{id}/{patientId}:
 *   get:
 *     tags: [ContactNote]
 *     summary: Get a specific ContactNotes record by patient ID and ContactNotes ID
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
 *         description: ID of the ContactNotes record
 *     responses:
 *       200:
 *         description: ContactNote record retrieved successfully
 *
 *   put:
 *     tags: [ContactNote]
 *     summary: Update ContactNotes record for a patient
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
 *         description: ID of the ContactNotes record to be updated
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
 *         description: ContactNote record updated successfully
 *
 *   delete:
 *     tags: [ContactNote]
 *     summary: Delete a specific ContactNotes record
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
 *         description: ID of the ContactNotes record to be deleted
 *     responses:
 *       204:
 *         description: ContactNote record deleted successfully
 */
