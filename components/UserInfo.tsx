"use client";

import React from "react";
import { UserData } from "../app/types";

type UserInfoProps = {
  data: UserData;
  setData: React.Dispatch<React.SetStateAction<UserData>>;
};

export default function UserInfo({ data, setData }: UserInfoProps) {
  const handleChange = (key: keyof UserData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const normalizeGender = (g: string) => {
    if (!g) return "";
    const lower = g.toLowerCase();
    if (["male", "female", "other"].includes(lower)) return lower;
    return "";
  };

  // ✅ Properly type the field arrays
  const identityFields: { key: keyof UserData; label: string; type?: string }[] = [
    { key: "id_number", label: "ID Number" },
    { key: "name", label: "Name" },
    { key: "date_of_birth", label: "Date of Birth", type: "date" },
    { key: "nationality", label: "Nationality" },
    { key: "issuing_date", label: "Issuing Date", type: "date" },
    { key: "expiry_date", label: "Expiry Date", type: "date" },
    { key: "authority", label: "Authority" },
    { key: "card_number", label: "Card Number" },
    { key: "occupation", label: "Occupation" },
    { key: "employer", label: "Employer" },
    { key: "issuing_place", label: "Issuing Place" },
  ];

  const vehicleFields: { key: keyof UserData; label: string; type?: string }[] = [
    { key: "traffic_plate_number", label: "Traffic Plate Number" },
    { key: "vehicle_place_of_issue", label: "Place of Issue" },
    { key: "vehicle_owner", label: "Owner" },
    { key: "vehicle_tc_number", label: "TC Number" },
    { key: "vehicle_card_expiry_date", label: "Card Expiry Date", type: "date" },
    { key: "insurance_expiry_date", label: "Insurance Expiry Date", type: "date" },
    { key: "policy_number", label: "Policy Number" },
    { key: "registration_date", label: "Registration Date", type: "date" },
  ];

  const drivingFields: { key: keyof UserData; label: string }[] = [
    { key: "license_number", label: "License Number" },
    { key: "license_place_of_issue", label: "Place of Issue" },
    { key: "licensing_authority_number", label: "Authority Number" },
  ];

  return (
    <>
      <div className="section-card">
        <h2 className="form-title">Identity Card</h2>
        {identityFields.map(({ key, label, type }) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              type={type || "text"}
              value={data[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="sex">Gender</label>
          <select
            id="sex"
            value={normalizeGender(data.sex)}
            onChange={(e) => handleChange("sex", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="section-card">
        <h2 className="form-title">Vehicle License</h2>
        {vehicleFields.map(({ key, label, type }) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              type={type || "text"}
              value={data[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="section-card">
        <h2 className="form-title">Driving License</h2>
        {drivingFields.map(({ key, label }) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              id={key}
              type="text"
              value={data[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-card {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
          max-width: 600px;
          margin-bottom: 1.5rem;
        }
        .form-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
          font-weight: 600;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1.25rem;
        }
        label {
          font-weight: 500;
          margin-bottom: 0.4rem;
          color: #555;
        }
        input,
        select {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          transition: border-color 0.2s ease;
          font-family: inherit;
        }
        input:focus,
        select:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 5px #0070f3aa;
        }
      `}</style>
    </>
  );
}
