"use client";

import { useState } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ success: string[]; failed: string[] }>({ success: [], failed: [] });
  const [extractedData, setExtractedData] = useState<Record<string, any>>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      setResults({ success: [], failed: [] });
      setExtractedData({});
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (files.length === 0) {
      alert("Please select files or a folder first.");
      return;
    }

    setProcessing(true);

    const successFiles: string[] = [];
    const failedFiles: string[] = [];
    const combinedData: Record<string, any> = {};
    const votes: Record<string, Record<string, number>> = {};

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("files", file);

        const extractionApiUrl = "https://081ee904e6a2.ngrok-free.app/extract";
        const res = await fetch(extractionApiUrl, { method: "POST", body: formData });

        if (!res.ok) throw new Error("Failed to extract data");

        const json = await res.json();

        if (json.person_data && Array.isArray(json.person_data) && json.person_data[0]) {
          const item = json.person_data[0];
          if (item.extracted_data) {
            let rawTextData: Record<string, any> = {};
            if (item.extracted_data.raw_text) {
              try {
                rawTextData = JSON.parse(item.extracted_data.raw_text);
              } catch {}
            }

            const allKeys = new Set([...Object.keys(item.extracted_data), ...Object.keys(rawTextData)]);
            allKeys.forEach((key) => {
              if (key === "raw_text") return;

              const value = item.extracted_data[key] ?? rawTextData[key];
              if (value !== null && value !== undefined && value !== "") {
                const valueKey = typeof value === "object" ? JSON.stringify(value) : String(value);

                if (!votes[key]) votes[key] = {};
                votes[key][valueKey] = (votes[key][valueKey] || 0) + 1;

                const bestValueKey = Object.entries(votes[key]).sort((a, b) => b[1] - a[1])[0][0];

                try {
                  combinedData[key] = JSON.parse(bestValueKey);
                } catch {
                  combinedData[key] = bestValueKey;
                }
              }
            });

            successFiles.push(file.name);
          } else {
            failedFiles.push(file.name);
          }
        } else {
          failedFiles.push(file.name);
        }
      } catch {
        failedFiles.push(file.name);
      }
    }

    setExtractedData(combinedData);
    setProcessing(false);
    setResults({ success: successFiles, failed: failedFiles });

    // Send extracted data to API for Playwright
    try {
      await fetch("/api/getExtractedData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(combinedData),
      });
      console.log("Extracted data sent to API for Playwright.");
    } catch (err) {
      console.error("Failed to send data to API:", err);
    }

    // After sending data to API, trigger Playwright script
    try {
      await fetch("/api/runPlaywright", { method: "POST" });
      console.log("Playwright script triggered");
    } catch (err) {
      console.error("Failed to trigger Playwright:", err);
    }
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  };

  const buttonStyle = (disabled: boolean) => ({
    padding: "10px 20px",
    backgroundColor: disabled ? "#a0aec0" : "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
        Upload File(s) or Folder
      </h1>

      <form onSubmit={handleSubmit} style={cardStyle}>
        <div>
          <label style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "5px" }}>Upload a single file</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div>
          <label style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "5px" }}>Upload a folder</label>
          <input
            type="file"
            onChange={handleFileChange}
            //@ts-ignore
            webkitdirectory="true"
            directory=""
            multiple
          />
        </div>

        {files.length > 0 && (
          <div style={{ backgroundColor: "#f9fafb", padding: "10px", borderRadius: "8px" }}>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>Selected files:</p>
            <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#555" }}>
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" style={buttonStyle(processing)} disabled={processing}>
          {processing ? "Processing..." : "Upload & Extract"}
        </button>
      </form>

      {results.success.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#d4edda",
            borderRadius: "8px",
            color: "#155724",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Successfully processed:</h2>
          <ul style={{ paddingLeft: "20px", fontSize: "14px" }}>
            {results.success.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {results.failed.length > 0 && (
        <div
          style={{
            marginTop: "10px",
            padding: "15px",
            backgroundColor: "#f8d7da",
            borderRadius: "8px",
            color: "#721c24",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Failed to process:</h2>
          <ul style={{ paddingLeft: "20px", fontSize: "14px" }}>
            {results.failed.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {Object.keys(extractedData).length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e9ecef",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "5px" }}>Extracted Data:</h2>
          <pre style={{ fontSize: "13px", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(extractedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
