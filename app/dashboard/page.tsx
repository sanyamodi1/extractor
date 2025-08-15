"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import UserInfo from "../../components/UserInfo";
import AddressForm, { Address } from "../../components/AddressForm";
import IdentityDocsForm, { IdentityDoc } from "../../components/IdentityDocsForm";
import VehiclesForm, { Vehicle } from "../../components/VehiclesForm";

// UserData type
export type UserData = {
  email: string;
  password: string;
  phone: string;

  // Identity Card
  id_number: string;
  name: string;
  date_of_birth: string;
  nationality: string;
  issuing_date: string;
  expiry_date: string;
  sex: string;
  authority: string;
  card_number: string;
  occupation: string;
  employer: string;
  issuing_place: string;

  // Vehicle License
  traffic_plate_number: string;
  vehicle_place_of_issue: string;
  vehicle_owner: string;
  vehicle_tc_number: string;
  vehicle_card_expiry_date: string;
  insurance_expiry_date: string;
  policy_number: string;
  registration_date: string;

  // Driving License
  license_number: string;
  license_place_of_issue: string;
  licensing_authority_number: string;
};

export default function UserForm() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    phone: "",

    id_number: "",
    name: "",
    date_of_birth: "",
    nationality: "",
    issuing_date: "",
    expiry_date: "",
    sex: "",
    authority: "",
    card_number: "",
    occupation: "",
    employer: "",
    issuing_place: "",

    traffic_plate_number: "",
    vehicle_place_of_issue: "",
    vehicle_owner: "",
    vehicle_tc_number: "",
    vehicle_card_expiry_date: "",
    insurance_expiry_date: "",
    policy_number: "",
    registration_date: "",

    license_number: "",
    license_place_of_issue: "",
    licensing_authority_number: "",
  });

  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [identityDocs, setIdentityDocs] = useState<IdentityDoc[]>([
    { type: "", documentNumber: "", issueDate: "", expiryDate: "" },
  ]);

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

  const [extracting, setExtracting] = useState(false);
  const [extractedRaw, setExtractedRaw] = useState<any>(null);

  // File upload & extraction
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setExtracting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const extractionApiUrl = "https://92938c5cc7cc.ngrok-free.app/extract";
      const res = await fetch(extractionApiUrl, { method: "POST", body: formData });

      if (!res.ok) throw new Error(`Failed to extract data (${res.status})`);

      const json = await res.json();
      const extractedData = typeof json.output === "string" ? JSON.parse(json.output) : json.output;

      console.log("Extracted:", extractedData);
      setExtractedRaw(extractedData);

      // Map extracted data to userData safely
      setUserData((prev) => ({
        ...prev,
        email: extractedData.email || "",
        password: extractedData.password || "",
        phone: extractedData.phone || "",
        id_number: extractedData.id_number || "",
        name: extractedData.name || "",
        date_of_birth: extractedData.date_of_birth || "",
        nationality: extractedData.nationality || "",
        issuing_date: extractedData.issuing_date || "",
        expiry_date: extractedData.expiry_date || "",
        sex:
          extractedData.sex?.toLowerCase() === "male" ||
          extractedData.sex?.toLowerCase() === "m"
            ? "male"
            : extractedData.sex?.toLowerCase() === "female" ||
              extractedData.sex?.toLowerCase() === "f"
            ? "female"
            : extractedData.sex
            ? "other"
            : "",
        authority: extractedData.authority || "",
        card_number: extractedData.card_number || "",
        occupation: extractedData.occupation || "",
        employer: extractedData.employer || "",
        issuing_place: extractedData.issuing_place || "",
        traffic_plate_number: extractedData.traffic_plate_number || "",
        vehicle_place_of_issue: extractedData.vehicle_place_of_issue || "",
        vehicle_owner: extractedData.vehicle_owner || "",
        vehicle_tc_number: extractedData.vehicle_tc_number || "",
        vehicle_card_expiry_date: extractedData.vehicle_card_expiry_date || "",
        insurance_expiry_date: extractedData.insurance_expiry_date || "",
        policy_number: extractedData.policy_number || "",
        registration_date: extractedData.registration_date || "",
        license_number: extractedData.license_number || "",
        license_place_of_issue: extractedData.license_place_of_issue || "",
        licensing_authority_number: extractedData.licensing_authority_number || "",
      }));

      setAddress((prev) => ({
        ...prev,
        country: extractedData.nationality || "",
      }));

      setIdentityDocs([
        {
          type: extractedData.authority || "",
          documentNumber: extractedData.id_number || "",
          issueDate: extractedData.issuing_date || "",
          expiryDate: extractedData.expiry_date || "",
        },
      ]);
    } catch (error) {
      console.error("Extraction error:", error);
      alert("Error extracting data: " + (error as Error).message);
    } finally {
      setExtracting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Optional validation here
    router.push("/onboard");
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h2>Upload Document Image</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} disabled={extracting} />
      {extracting && <p>Extracting data from document...</p>}

      <UserInfo data={userData} setData={setUserData} />

      <AddressForm address={address} setAddress={setAddress} />

      <IdentityDocsForm identityDocs={identityDocs} setIdentityDocs={setIdentityDocs} />

      <VehiclesForm vehicles={vehicles} setVehicles={setVehicles} />

      <button
        type="submit"
        className="submit-button"
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit & Continue
      </button>
    </form>
  );
}
