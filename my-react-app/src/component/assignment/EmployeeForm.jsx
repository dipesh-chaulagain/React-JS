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
Task: Employee Registration Form
=================================================
*/
import "./EmployeeForm.css";
import React, { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  department: "IT",
  designation: "Intern",
  employmentType: "Full Time",
  salary: "",
  joiningDate: "",
  workFrom: "Office",
  skills: [],
  emergencyContact: "",
  active: false,
};

const skillOptions = ["JavaScript", "React", "Node.js", "Python", "SQL"];

export default function EmployeeForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "skills") {
      setForm((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name || !form.email || !form.phone || !form.dob ||
        !form.salary || !form.joiningDate || !form.emergencyContact) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

    if (Number(form.salary) <= 0) {
      setStatus({ type: "error", message: "Salary must be greater than 0." });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", message: "Employee registered successfully!" });
      setForm(initialForm);
    }, 1000);
  };

  return (
    <section className="card">
      <h2>Employee Registration / Onboarding</h2>

      {loading && <p className="loading">Submitting employee...</p>}
      {status.message && (
        <p className={status.type === "success" ? "success" : "error"}>
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Employee Name *
          <input name="name" value={form.name} onChange={updateField} />
        </label>

        <label>Email *
          <input type="email" name="email" value={form.email} onChange={updateField} />
        </label>

        <label>Phone *
          <input type="tel" name="phone" value={form.phone} onChange={updateField} />
        </label>

        <label>Date of Birth *
          <input type="date" name="dob" value={form.dob} onChange={updateField} />
        </label>

        <label>Department *
          <select name="department" value={form.department} onChange={updateField}>
            {["IT", "HR", "Finance", "Marketing", "Management"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>

        <label>Designation *
          <select name="designation" value={form.designation} onChange={updateField}>
            {["Intern", "Junior Developer", "Senior Developer", "Manager", "Accountant"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>

        <fieldset>
          <legend>Employment Type *</legend>
          {["Full Time", "Part Time", "Contract"].map((x) => (
            <label className="inline" key={x}>
              <input type="radio" name="employmentType" value={x}
                checked={form.employmentType === x} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        <label>Monthly Salary *
          <input type="number" min="1" name="salary" value={form.salary} onChange={updateField} />
        </label>

        <p className="salary">Annual Salary: {form.salary ? Number(form.salary) * 12 : 0}</p>

        <label>Joining Date *
          <input type="date" name="joiningDate" value={form.joiningDate} onChange={updateField} />
        </label>

        <fieldset>
          <legend>Work From *</legend>
          {["Office", "Remote", "Hybrid"].map((x) => (
            <label className="inline" key={x}>
              <input type="radio" name="workFrom" value={x}
                checked={form.workFrom === x} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Skills</legend>
          {skillOptions.map((x) => (
            <label className="inline" key={x}>
              <input type="checkbox" name="skills" value={x}
                checked={form.skills.includes(x)} onChange={updateField} />
              {x}
            </label>
          ))}
        </fieldset>

        <label>Emergency Contact *
          <input name="emergencyContact" value={form.emergencyContact} onChange={updateField} />
        </label>

        <label className="inline">
          <input type="checkbox" name="active" checked={form.active} onChange={updateField} />
          Active Employee
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register Employee"}
        </button>
      </form>
    </section>
  );
}
