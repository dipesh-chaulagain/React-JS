import { useState } from "react";
import "./createassingmentForm.css";

const initialForm = {
  name: "",
  description: "",
  subject: "Web Development",
  difficulty: "Intermediate",
  dueDate: "",
  dueTime: "",
  points: "100",
  resourceUrl: "",
  published: false,
};

const CreateAssignment = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(`Updating field: ${name} = ${value}`);
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Creating assignment..." });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("The demo API could not create the assignment.");
      }

      const result = await response.json();
      setStatus({
        type: "success",
        message: `Assignment created successfully (demo id: ${result.id}).`,
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <main className="assignment-page">
      <section className="assignment-intro">
        <p className="eyebrow">Coursework studio</p>
        <h1>Create an assignment</h1>
        <p>
          Shape the brief, set the hand-in window, and send it to the demo
          service.
        </p>
      </section>

      <form className="assignment-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field field-wide">
            Assignment name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="e.g. Build a weather dashboard"
              required
            />
          </label>

          <label className="field field-wide">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="What should students make or investigate?"
              rows="5"
              required
            />
          </label>

          <label className="field">
            Subject
            <select name="subject" value={form.subject} onChange={updateField}>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>Design</option>
              <option>Writing</option>
            </select>
          </label>

          <label className="field">
            Maximum points
            <input
              type="number"
              name="points"
              min="1"
              max="1000"
              value={form.points}
              onChange={updateField}
              required
            />
          </label>

          <fieldset className="field field-wide">
            <legend>Difficulty</legend>
            <div className="radio-group">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <label className="radio-option" key={level}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={form.difficulty === level}
                    onChange={updateField}
                  />
                  {level}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            Due date
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={updateField}
              required
            />
          </label>

          <label className="field">
            Due time
            <input
              type="time"
              name="dueTime"
              value={form.dueTime}
              onChange={updateField}
              required
            />
          </label>

          <label className="field field-wide">
            Resource link <span className="optional">(optional)</span>
            <input
              type="url"
              name="resourceUrl"
              value={form.resourceUrl}
              onChange={updateField}
              placeholder="https://example.com/brief"
            />
          </label>
        </div>

        <label className="checkbox-option">
          <input
            type="checkbox"
            name="published"
            checked={form.published}
            onChange={updateField}
          />
          Publish immediately after creating
        </label>

        <div className="form-actions">
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Sending..." : "Create assignment"}
          </button>
          {status.message && (
            <p className={`form-status ${status.type}`} role="status">
              {status.message}
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateAssignment;
