import { Router } from "express";
import { DocumentController } from "../controllers/document.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { documentSchema } from "../validators/document.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new DocumentController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createDocument(req, res)
);

// Route to get all Documents for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getDocuments(req, res)
);

// Route to get a specific document by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getDocumentById(req, res)
);

// Route to update a specific document
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(documentSchema),
  (req, res) => controller.updateDocument(req, res)
);

// Route to delete a specific document
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteDocument(req, res)
);

export default router;
/**
 * @swagger
 * /api/document/{patientId}:
 *   get:
 *     tags: [Document]
 *     summary: Get all document records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose document records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient document records retrieved successfully
 *
 *   post:
 *     tags: [Document]
 *     summary: Create new document for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom document is being created
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
 *         description: Document record created successfully
 *
 * /api/document/{patientId}/{id}:
 *   get:
 *     tags: [Document]
 *     summary: Get a specific document record by patient ID and document ID
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
 *         description: ID of the document record
 *     responses:
 *       200:
 *         description: Document record retrieved successfully
 *
 *   put:
 *     tags: [Document]
 *     summary: Update a document record for a patient
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
 *         description: ID of the document record to be updated
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
 *         description: Document record updated successfully
 *
 *   delete:
 *     tags: [Document]
 *     summary: Delete a specific document record
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
 *         description: ID of the document record to be deleted
 *     responses:
 *       204:
 *         description: Document record deleted successfully
 */
