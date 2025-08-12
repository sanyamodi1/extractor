"use client";

import React from "react";

export type Insurance = {
  policyNumber: string;
  provider: string;
  startDate: string;
  endDate: string;
  premiumAmount: string;
  coverageDetails: string;
};

export type Vehicle = {
  registrationNo: string;
  make: string;
  model: string;
  year: number;
  chassisNo: string;
  engineNo: string;
  color: string;
  insurance: Insurance;
};

type VehiclesFormProps = {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
};

export default function VehiclesForm({ vehicles, setVehicles }: VehiclesFormProps) {
  const handleVehicleChange = (
    index: number,
    field: keyof Vehicle,
    value: string | number | Insurance
  ) => {
    const newVehicles = [...vehicles];
    (newVehicles[index] as any)[field] = value;
    setVehicles(newVehicles);
  };

  const handleInsuranceChange = (
    vehicleIndex: number,
    field: keyof Insurance,
    value: string
  ) => {
    const newVehicles = [...vehicles];
    newVehicles[vehicleIndex].insurance[field] = value;
    setVehicles(newVehicles);
  };

  const removeVehicle = (index: number) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        registrationNo: "",
        make: "",
        model: "",
        year: 0,
        chassisNo: "",
        engineNo: "",
        color: "",
        insurance: {
          policyNumber: "",
          provider: "",
          startDate: "",
          endDate: "",
          premiumAmount: "",
          coverageDetails: "",
        },
      },
    ]);
  };

  return (
    <>
      <h2 className="form-title">Vehicles</h2>
      {vehicles.map((v, idx) => (
        <div key={idx} className="section-card">
          <div className="header-row">
            <h3>Vehicle {idx + 1}</h3>
            {vehicles.length > 1 && (
              <button
                type="button"
                className="small-button"
                onClick={() => removeVehicle(idx)}
                aria-label={`Remove vehicle ${idx + 1}`}
              >
                Remove
              </button>
            )}
          </div>

          <div className="form-group">
            <label htmlFor={`regNo-${idx}`}>Registration Number *</label>
            <input
              id={`regNo-${idx}`}
              required
              placeholder="Registration Number"
              value={v.registrationNo}
              onChange={(e) =>
                handleVehicleChange(idx, "registrationNo", e.target.value)
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor={`make-${idx}`}>Make *</label>
              <input
                id={`make-${idx}`}
                required
                placeholder="Make"
                value={v.make}
                onChange={(e) => handleVehicleChange(idx, "make", e.target.value)}
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor={`model-${idx}`}>Model *</label>
              <input
                id={`model-${idx}`}
                required
                placeholder="Model"
                value={v.model}
                onChange={(e) => handleVehicleChange(idx, "model", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={`year-${idx}`}>Year *</label>
            <input
              id={`year-${idx}`}
              required
              placeholder="Year"
              type="number"
              min={1886}
              max={new Date().getFullYear() + 1}
              value={v.year}
              onChange={(e) =>
                handleVehicleChange(idx, "year", Number(e.target.value))
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor={`chassisNo-${idx}`}>Chassis Number *</label>
              <input
                id={`chassisNo-${idx}`}
                required
                placeholder="Chassis Number"
                value={v.chassisNo}
                onChange={(e) =>
                  handleVehicleChange(idx, "chassisNo", e.target.value)
                }
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor={`engineNo-${idx}`}>Engine Number *</label>
              <input
                id={`engineNo-${idx}`}
                required
                placeholder="Engine Number"
                value={v.engineNo}
                onChange={(e) =>
                  handleVehicleChange(idx, "engineNo", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={`color-${idx}`}>Color</label>
            <input
              id={`color-${idx}`}
              placeholder="Color"
              value={v.color}
              onChange={(e) => handleVehicleChange(idx, "color", e.target.value)}
            />
          </div>

          <h3 className="insurance-title">Insurance</h3>

          <div className="form-group">
            <label htmlFor={`policyNumber-${idx}`}>Policy Number *</label>
            <input
              id={`policyNumber-${idx}`}
              required
              placeholder="Policy Number"
              value={v.insurance.policyNumber}
              onChange={(e) =>
                handleInsuranceChange(idx, "policyNumber", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor={`provider-${idx}`}>Provider *</label>
            <input
              id={`provider-${idx}`}
              required
              placeholder="Provider"
              value={v.insurance.provider}
              onChange={(e) => handleInsuranceChange(idx, "provider", e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor={`startDate-${idx}`}>Start Date</label>
              <input
                id={`startDate-${idx}`}
                type="date"
                value={v.insurance.startDate}
                onChange={(e) => handleInsuranceChange(idx, "startDate", e.target.value)}
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor={`endDate-${idx}`}>End Date</label>
              <input
                id={`endDate-${idx}`}
                type="date"
                value={v.insurance.endDate}
                onChange={(e) => handleInsuranceChange(idx, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={`premiumAmount-${idx}`}>Premium Amount *</label>
            <input
              id={`premiumAmount-${idx}`}
              required
              placeholder="Premium Amount"
              type="number"
              step="0.01"
              min="0"
              value={v.insurance.premiumAmount}
              onChange={(e) =>
                handleInsuranceChange(idx, "premiumAmount", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor={`coverageDetails-${idx}`}>Coverage Details</label>
            <textarea
              id={`coverageDetails-${idx}`}
              placeholder="Coverage Details"
              value={v.insurance.coverageDetails}
              onChange={(e) =>
                handleInsuranceChange(idx, "coverageDetails", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button type="button" className="add-button" onClick={addVehicle}>
        Add Vehicle
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
          max-width: 700px;
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
        .insurance-title {
          margin-top: 1.5rem;
          font-weight: 600;
          color: #333;
          border-bottom: 1px solid #ddd;
          padding-bottom: 0.3rem;
          margin-bottom: 1rem;
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
        input[type="number"],
        input[type="date"],
        textarea {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        input[type="text"]:focus,
        input[type="number"]:focus,
        input[type="date"]:focus,
        textarea:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 5px #0070f3aa;
        }
        textarea {
          min-height: 80px;
          resize: vertical;
        }
        .form-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .half-width {
          flex: 1;
          min-width: 150px;
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
          max-width: 700px;
        }
        .add-button:hover {
          background: #005bb5;
        }
      `}</style>
    </>
  );
}
