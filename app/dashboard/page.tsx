"use client";

import React, { useState } from "react";

import UserInfo from "../../components/UserInfo";
import AddressForm, { Address } from "../../components/AddressForm";
import IdentityDocsForm, { IdentityDoc } from "../../components/IdentityDocsForm";
import VehiclesForm, { Vehicle } from "../../components/VehiclesForm";

export default function UserForm() {
  // User info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  // Address
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // Identity documents
  const [identityDocs, setIdentityDocs] = useState<IdentityDoc[]>([
    { type: "", documentNumber: "", issueDate: "", expiryDate: "" },
  ]);

  // Vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([
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

  // Loading state for extraction
  const [extracting, setExtracting] = useState(false);

  // Handle document image upload & extraction
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Your actual API endpoint
      const extractionApiUrl = "https://5c29e818f535.ngrok-free.app/extract";

      const res = await fetch(extractionApiUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to extract data");
      const json = await res.json();
      console.log("Extracted JSON:", json);

      // Parse the output string into an object
      const extractedData = json.output ? JSON.parse(json.output) : {};

      console.log("Extracted Data:", extractedData);

      // Map extracted fields to your form state properly:
      setEmail(""); // No email in extraction, so empty or keep current if preferred
      setName(extractedData.name || "");
      setPhone(""); // No phone in extraction, keep empty or current
      setDateOfBirth(extractedData.date_of_birth || "");
      setGender(extractedData.sex || "");

      // Address fields not extracted, keep empty or current
      setAddress({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });

      // Identity docs — fill from extraction or reset to empty
      setIdentityDocs([
        {
          type: extractedData.authority || "",
          documentNumber: extractedData.id_number || "",
          issueDate: extractedData.issuing_date || "",
          expiryDate: extractedData.expiry_date || "",
        },
      ]);

      // Vehicles — no data from extraction, reset or keep current
      setVehicles([
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
    } catch (error) {
      alert("Error extracting data: " + (error as Error).message);
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
      name,
      phone: phone || null,
      dateOfBirth: dateOfBirth || null,
      gender: gender || null,
      address: {
        ...address,
      },
      identityDocs: identityDocs.map((doc) => ({
        ...doc,
        issueDate: doc.issueDate || null,
        expiryDate: doc.expiryDate || null,
      })),
      vehicles: vehicles.map((v) => ({
        registrationNo: v.registrationNo,
        make: v.make,
        model: v.model,
        year: Number(v.year),
        chassisNo: v.chassisNo,
        engineNo: v.engineNo,
        color: v.color || null,
        insurance: {
          policyNumber: v.insurance.policyNumber,
          provider: v.insurance.provider,
          startDate: v.insurance.startDate,
          endDate: v.insurance.endDate,
          premiumAmount: Number(v.insurance.premiumAmount),
          coverageDetails: v.insurance.coverageDetails,
        },
      })),
    };

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save user");

      alert("User saved successfully!");
      // Optionally reset form here
    } catch (err) {
      alert("Error saving user: " + (err as Error).message);
    }
  };

  return (
    <>
      <style>{`
        /* Add your styles here or import CSS */
      `}</style>

      <form onSubmit={handleSubmit} noValidate>
        <h2>Upload Document Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={extracting}
        />
        {extracting && <p>Extracting data from document...</p>}

        <UserInfo
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          gender={gender}
          setGender={setGender}
        />

        <AddressForm address={address} setAddress={setAddress} />

        <IdentityDocsForm
          identityDocs={identityDocs}
          setIdentityDocs={setIdentityDocs}
        />

        <VehiclesForm vehicles={vehicles} setVehicles={setVehicles} />

        <div style={{ marginTop: 30 }}>
          <button type="submit" disabled={extracting}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
