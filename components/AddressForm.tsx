"use client";

import React from "react";

export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type AddressFormProps = {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
};

export default function AddressForm({ address, setAddress }: AddressFormProps) {
  return (
    <>
      <h2 className="form-title">Address</h2>
      <div className="address-form">
        <div className="form-group">
          <label htmlFor="street">Street *</label>
          <input
            id="street"
            required
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) =>
              setAddress((prev) => ({ ...prev, street: e.target.value }))
            }
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="city">City *</label>
            <input
              id="city"
              required
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>

          <div className="form-group half-width">
            <label htmlFor="state">State *</label>
            <input
              id="state"
              required
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, state: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="postalCode">Postal Code *</label>
            <input
              id="postalCode"
              required
              type="text"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, postalCode: e.target.value }))
              }
            />
          </div>

          <div className="form-group half-width">
            <label htmlFor="country">Country *</label>
            <input
              id="country"
              required
              type="text"
              placeholder="Country"
              value={address.country}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, country: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #333;
          font-weight: 600;
        }
        .address-form {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
          max-width: 600px;
        }
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
          flex: 1;
        }
        .half-width {
          flex: 1;
        }
        label {
          font-weight: 500;
          margin-bottom: 0.4rem;
          color: #555;
        }
        input {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          transition: border-color 0.2s ease;
        }
        input:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 5px #0070f3aa;
        }
      `}</style>
    </>
  );
}
