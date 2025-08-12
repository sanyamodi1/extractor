"use client";

import React, { useState } from "react";

export type IdentityDoc = {
  type: string;
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
};

type IdentityDocsFormProps = {
  identityDocs: IdentityDoc[];
  setIdentityDocs: React.Dispatch<React.SetStateAction<IdentityDoc[]>>;
};

export default function IdentityDocsForm({
  identityDocs,
  setIdentityDocs,
}: IdentityDocsFormProps) {
  const [loading, setLoading] = useState(false);

  const handleIdentityDocChange = (
    index: number,
    field: keyof IdentityDoc,
    value: string
  ) => {
    const newDocs = [...identityDocs];
    newDocs[index][field] = value;
    setIdentityDocs(newDocs);
  };

  const removeIdentityDoc = (index: number) => {
    setIdentityDocs(identityDocs.filter((_, i) => i !== index));
  };

  const addIdentityDoc = () => {
    setIdentityDocs([
      ...identityDocs,
      { type: "", documentNumber: "", issueDate: "", expiryDate: "" },
    ]);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("https://5c29e818f535.ngrok-free.app/extract", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to extract data");

      const result = await res.json();

      if (result.output) {
        const extractedData = JSON.parse(result.output);

        const newDocs = [...identityDocs];
        newDocs[index] = {
          type: extractedData.authority || newDocs[index].type || "",
          documentNumber: extractedData.id_number || newDocs[index].documentNumber || "",
          issueDate: extractedData.issuing_date || newDocs[index].issueDate || "",
          expiryDate: extractedData.expiry_date || newDocs[index].expiryDate || "",
        };
        setIdentityDocs(newDocs);

        alert("Identity document data extracted and filled!");
      } else {
        alert("No data extracted from image.");
      }
    } catch (error) {
      alert("Error extracting data: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-title">Identity Documents</h2>
      {identityDocs.map((doc, idx) => (
        <div key={idx} className="section-card">
          <div className="header-row">
            <h3>Document {idx + 1}</h3>
            {identityDocs.length > 1 && (
              <button
                type="button"
                className="small-button"
                onClick={() => removeIdentityDoc(idx)}
                aria-label={`Remove identity document ${idx + 1}`}
              >
                Remove
              </button>
            )}
          </div>

          <div className="file-upload-group">
            <label htmlFor={`id-upload-${idx}`} className="file-upload-label">
              Upload Document Image
            </label>
            <input
              id={`id-upload-${idx}`}
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) => handleFileUpload(e, idx)}
            />
            {loading && <p className="loading-text">Extracting data...</p>}
          </div>

          <div className="form-group">
            <label htmlFor={`type-${idx}`}>Type *</label>
            <input
              id={`type-${idx}`}
              required
              placeholder="Passport, Aadhar, etc."
              value={doc.type}
              onChange={(e) => handleIdentityDocChange(idx, "type", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor={`docNum-${idx}`}>Document Number *</label>
            <input
              id={`docNum-${idx}`}
              required
              placeholder="Document Number"
              value={doc.documentNumber}
              onChange={(e) =>
                handleIdentityDocChange(idx, "documentNumber", e.target.value)
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor={`issueDate-${idx}`}>Issue Date</label>
              <input
                id={`issueDate-${idx}`}
                type="date"
                value={doc.issueDate}
                onChange={(e) =>
                  handleIdentityDocChange(idx, "issueDate", e.target.value)
                }
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor={`expiryDate-${idx}`}>Expiry Date</label>
              <input
                id={`expiryDate-${idx}`}
                type="date"
                value={doc.expiryDate}
                onChange={(e) =>
                  handleIdentityDocChange(idx, "expiryDate", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-button" onClick={addIdentityDoc}>
        Add Identity Document
      </button>

      <style jsx>{`
        .form-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
          font-weight: 600;
        }
        .section-card {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
          margin-bottom: 1.5rem;
          max-width: 600px;
        }
        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        h3 {
          margin: 0;
          font-weight: 600;
          color: #222;
        }
        .small-button {
          background: #e53e3e;
          border: none;
          color: white;
          padding: 0.3rem 0.7rem;
          border-radius: 5px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .small-button:hover {
          background: #c53030;
        }
        .file-upload-group {
          margin-bottom: 1rem;
        }
        .file-upload-label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 500;
          color: #555;
        }
        input[type="file"] {
          display: block;
        }
        .loading-text {
          font-size: 0.9rem;
          color: #555;
          margin-top: 0.4rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
        }
        label {
          font-weight: 500;
          margin-bottom: 0.4rem;
          color: #555;
        }
        input[type="text"],
        input[type="date"] {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          transition: border-color 0.2s ease;
        }
        input[type="text"]:focus,
        input[type="date"]:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 5px #0070f3aa;
        }
        .form-row {
          display: flex;
          gap: 1rem;
        }
        .half-width {
          flex: 1;
        }
        .add-button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          max-width: 600px;
        }
        .add-button:hover {
          background: #005bb5;
        }
      `}</style>
    </>
  );
}
