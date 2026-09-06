/*
=================================================
Student Details
=================================================
Name : YOUR NAME
Roll No. : YOUR ROLL NO.
Contact No. : YOUR CONTACT NUMBER
Address : Hetauda, Nepal
Program : BSc CSIT
Semester : 2nd
=================================================
Task: College Event Registration Form
=================================================
*/

import React, { useState } from "react";

const initialForm = {
  participantName: "",
  email: "",
  phone: "",
  collegeName: "",
  faculty: "",
  semester: "",
  event: "Web Development Workshop",
  participationType: "Individual",
  teamMembers: "",
  foodPreference: "Vegetarian",
  requirements: [],
  comments: "",
  agree: false,
};

const requirementOptions = ["Certificate", "Lunch", "Workshop Materials"];

export default function EventRegistration() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "requirements") {
      setForm((prev) => ({
        ...prev,
        requirements: checked
          ? [...prev.requirements, value]
          : prev.requirements.filter((item) => item !== value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.participantName || !form.email || !form.phone ||
        !form.collegeName || !form.faculty || !form.semester || !form.event) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    if (form.participationType === "Team" &&
        (!form.teamMembers || Number(form.teamMembers) < 2)) {
      setStatus({ type: "error", message: "For team participation, enter at least 2 team members." });
      return;
    }

    if (!form.agree) {
      setStatus({ type: "error", message: "You must agree to the event rules." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Request failed");

      await response.json();

      setStatus({ type: "success", message: "Registration successful!" });
      setForm(initialForm);
    } catch {
      setStatus({ type: "error", message: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>College Event Registration</h2>

      {loading && <p className="loading">Submitting registration...</p>}
      {status.message && (
        <p className={status.type === "success" ? "success" : "error"}>
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Participant Name *
          <input name="participantName" value={form.participantName} onChange={updateField} />
        </label>

        <label>Email *
          <input type="email" name="email" value={form.email} onChange={updateField} />
        </label>

        <label>Phone *
          <input type="tel" name="phone" value={form.phone} onChange={updateField} />
        </label>

        <label>College Name *
          <input name="collegeName" value={form.collegeName} onChange={updateField} />
        </label>

        <label>Faculty *
          <input name="faculty" value={form.faculty} onChange={updateField} />
        </label>

        <label>Semester *
          <select name="semester" value={form.semester} onChange={updateField}>
            <option value="">Select Semester</option>
            {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map((x) =>
              <option key={x} value={x}>{x}</option>
            )}
          </select>
        </label>

        <label>Event *
          <select name="event" value={form.event} onChange={updateField}>
            {["Web Development Workshop", "AI Seminar", "Coding Competition", "UI/UX Workshop"].map((x) =>
              <option key={x}>{x}</option>
            )}
          </select>
        </label>

        <fieldset>
          <legend>Participation Type *</legend>
          {["Individual", "Team"].map((x) => (
            <label className="inline" key={x}>
              <input type="radio" name="participationType" value={x}
                checked={form.participationType === x} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        {form.participationType === "Team" && (
          <label>Number of Team Members *
            <input type="number" min="2" name="teamMembers"
              value={form.teamMembers} onChange={updateField} />
          </label>
        )}

        <fieldset>
          <legend>Food Preference *</legend>
          {["Vegetarian", "Non-Vegetarian"].map((x) => (
            <label className="inline" key={x}>
              <input type="radio" name="foodPreference" value={x}
                checked={form.foodPreference === x} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Requirements</legend>
          {requirementOptions.map((x) => (
            <label className="inline" key={x}>
              <input type="checkbox" name="requirements" value={x}
                checked={form.requirements.includes(x)} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        <label>Comments / Special Request
          <textarea name="comments" value={form.comments} onChange={updateField} />
        </label>

        <label className="inline">
          <input type="checkbox" name="agree" checked={form.agree} onChange={updateField} />
          Agree to Event Rules *
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
    </section>
  );
}
