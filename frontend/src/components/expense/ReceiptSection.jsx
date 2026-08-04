import { useRef, useState } from "react";
import { Upload, FileText, ExternalLink } from "lucide-react";

import Button from "../ui/Button";
import Card from "../ui/Card";

import { uploadReceipt } from "../../services/receipt.service";
import { autofillExpense } from "../../services/expense.service";

function ReceiptSection({
  expense,
  refreshExpense,
  readOnly = false,
}) {
  const receipts = expense.receipts || [];
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [autofilling, setAutofilling] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadReceipt(expense.id, file);
      await refreshExpense();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  async function handleAutofill() {
    try {
      setAutofilling(true);
      await autofillExpense(expense.id);
      await refreshExpense();
    } catch (error) {
      console.error(error);
    } finally {
      setAutofilling(false);
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-brand-900">
            Receipt Attachments
          </h2>
          <p className="text-xs text-brand-500">
            Upload bills or invoices for automated OCR extraction and verification.
          </p>
        </div>

        {!readOnly && expense.status === "DRAFT" && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            <Button
              variant="secondary"
              loading={uploading}
              onClick={() => fileInputRef.current.click()}
              className="gap-2"
            >
              <Upload size={16} />
              {uploading ? "Uploading..." : "Upload Receipt"}
            </Button>
          </div>
        )}
      </div>

      {receipts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center bg-surface">
          <FileText
            size={36}
            className="mx-auto text-brand-400"
          />
          <h3 className="mt-3 text-sm font-semibold text-brand-900">
            No receipts uploaded yet
          </h3>
          <p className="mt-1 text-xs text-brand-500">
            Attach a digital receipt or scanned invoice to support your reimbursement claim.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="rounded-xl border border-border bg-surface p-5 shadow-soft transition-all"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-brand-900">
                    {receipt.fileName}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-brand-500">
                    OCR Status:{" "}
                    <span className="font-semibold uppercase tracking-wider text-brand-700">
                      {receipt.processingStatus}
                    </span>
                  </p>
                </div>

                <a
                  href={receipt.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 self-start rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-brand-700 transition-colors hover:bg-brand-50 sm:self-auto"
                >
                  <ExternalLink size={14} />
                  View File
                </a>
              </div>

              {receipt.processingStatus === "COMPLETED" && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-background p-4 sm:grid-cols-4">
                    <Info
                      label="Merchant"
                      value={receipt.merchantName || "-"}
                    />

                    <Info
                      label="Invoice No."
                      value={receipt.invoiceNumber || "-"}
                    />

                    <Info
                      label="Detected Amount"
                      value={
                        receipt.detectedAmount != null
                          ? `₹${Number(receipt.detectedAmount).toLocaleString()}`
                          : "-"
                      }
                    />

                    <Info
                      label="Detected Tax"
                      value={
                        receipt.detectedTax != null
                          ? `₹${Number(receipt.detectedTax).toLocaleString()}`
                          : "-"
                      }
                    />
                  </div>

                  {!readOnly && expense.status === "DRAFT" && (
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-brand-400">
                        * Most recently uploaded receipt is used for AI form autofill.
                      </p>

                      <Button
                        variant="primary"
                        loading={autofilling}
                        onClick={handleAutofill}
                      >
                        Autofill Expense Form
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-brand-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold tabular-nums text-brand-900 truncate">
        {value}
      </p>
    </div>
  );
}

export default ReceiptSection;