import { useRef, useState } from "react";
import { Upload, FileText } from "lucide-react";

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
      await autofillExpense(expense.id);

      await refreshExpense();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Receipts
        </h2>

        {!readOnly &&
          expense.status === "DRAFT" && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                disabled={uploading}
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-slate-400"
              >
                <Upload size={18} />

                {uploading
                  ? "Uploading..."
                  : "Upload Receipt"}
              </button>
            </>
          )}
      </div>

      {receipts.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed p-12 text-center">
          <FileText
            size={40}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-4 text-lg font-medium">
            No receipts uploaded
          </h3>

          <p className="mt-2 text-slate-500">
            Upload a receipt before submitting this expense.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {receipt.fileName}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    OCR Status:{" "}
                    {receipt.processingStatus}
                  </p>
                </div>

                <a
                  href={receipt.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border px-4 py-2 hover:bg-slate-100"
                >
                  View
                </a>
              </div>

              {receipt.processingStatus === "COMPLETED" && (
                <>
                  <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                    <Info
                      label="Merchant"
                      value={
                        receipt.merchantName ||
                        "-"
                      }
                    />

                    <Info
                      label="Invoice"
                      value={
                        receipt.invoiceNumber ||
                        "-"
                      }
                    />

                    <Info
                      label="Detected Amount"
                      value={
                        receipt.detectedAmount != null
                          ? `₹${receipt.detectedAmount}`
                          : "-"
                      }
                    />

                    <Info
                      label="Detected Tax"
                      value={
                        receipt.detectedTax != null
                          ? `₹${receipt.detectedTax}`
                          : "-"
                      }
                    />
                  </div>

                  {!readOnly &&
                    expense.status === "DRAFT" && (
                      <>
                        <p className="mt-4 text-sm text-slate-500">
                          If multiple receipts are uploaded, the most recently
                          uploaded receipt will be used for Autofill.
                        </p>

                        <div className="mt-5 flex justify-end">
                          <button
                            onClick={handleAutofill}
                            className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                          >
                            Autofill Expense
                          </button>
                        </div>
                      </>
                    )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}

export default ReceiptSection;