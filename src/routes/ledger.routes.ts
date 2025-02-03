import { Router } from "express";
import { LedgerController } from "../controllers/ledger.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { ledgerSchema } from "../validators/ledger.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new LedgerController();
router.post("/:patientid", validateRequest(ledgerSchema), authenticate, authorize("ADMIN"), (req, res) =>
  controller.createLedger(req, res)
);

// Route to get all Ledgers for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getLedgers(req, res)
);

// Route to get a specific ledger by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getLedgerById(req, res)
);

// Route to Update specific ledger
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(ledgerSchema),
  (req, res) => controller.updateLedger(req, res)
);

// Route to delete a specific ledger
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteLedger(req, res)
);

export default router;

/**
 * @swagger
 * /api/ledger/{patientId}:
 *   get:
 *     tags: [Ledger]
 *     summary: Get all ledger records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose ledger records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient ledger records retrieved successfully
 *
 *   post:
 *     tags: [Ledger]
 *     summary: Create new ledger for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom ledger is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               paymentType:
 *                 type: string
 *                 enum: [CASH, CHECK, CREDITCARD, DEBITCARD PAYMENT]
 *               amount:
 *                 type: number
 *               ledgerDate:
 *                 type: string
 *                 format: date
 *               ledgerType:
 *                 type: string
 *                 enum: [CHARGE, PAYMENT]
 *     responses:
 *       201:
 *         description: Ledger record created successfully
 *
 * /api/ledger/{id}/{patientId}:
 *   get:
 *     tags: [Ledger]
 *     summary: Get a specific ledger record by patient ID and ledger ID
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
 *         description: ID of the ledger record
 *     responses:
 *       200:
 *         description: Ledger record retrieved successfully
 *
 *   put:
 *     tags: [Ledger]
 *     summary: Update ledger record for a patient
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
 *         description: ID of the ledger record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               paymentType:
 *                 type: string
 *                 enum: [CASH, CHECK, CREDITCARD, DEBITCARD PAYMENT]
 *               amount:
 *                 type: number
 *               ledgerDate:
 *                 type: string
 *                 format: date
 *               ledgerType:
 *                 type: string
 *                 enum: [CHARGE, PAYMENT]
 *     responses:
 *       200:
 *         description: Ledger record updated successfully
 *
 *   delete:
 *     tags: [Ledger]
 *     summary: Delete a specific ledger record
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
 *         description: ID of the ledger record to be deleted
 *     responses:
 *       204:
 *         description: Ledger record deleted successfully
 */
