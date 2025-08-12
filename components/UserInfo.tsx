"use client";

import React from "react";

type UserInfoProps = {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
};

export default function UserInfo({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  phone,
  setPhone,
  dateOfBirth,
  setDateOfBirth,
  gender,
  setGender,
}: UserInfoProps) {
  return (
    <>
      <div className="section-card">
        <h2 className="form-title">User Info</h2>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <style jsx>{`
        .section-card {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 0 8px rgb(0 0 0 / 0.1);
          max-width: 500px;
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
