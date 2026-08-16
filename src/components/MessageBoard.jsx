import { useState } from "react";

export function MessageBoard({ isOpen }) {
  const [inquiry, setInquiry] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section
      className={`message-board${isOpen ? " is-visible" : ""}`}
      aria-hidden={!isOpen}
      aria-label="Contact"
    >
      <div className="contact-memo">
        <img className="contact-memo-surface" src="/assets/wii-contact-card.png" alt="" aria-hidden="true" />
        <h1 className="contact-memo-title">Send Me A Message!</h1>
        <form className="contact-memo-form" onSubmit={handleSubmit}>
          <div className="contact-memo-row">
            <label>
              <span className="visually-hidden">Name</span>
              <input name="name" type="text" autoComplete="name" placeholder="Name" required />
            </label>
            <label>
              <span className="visually-hidden">Email Address</span>
              <input name="email" type="email" autoComplete="email" placeholder="Email Address" required />
            </label>
          </div>
          <div className={`contact-memo-inquiry${inquiry === "other" ? " has-other" : ""}`}>
            <label>
              <span className="visually-hidden">Inquiry</span>
              <select
                name="inquiry"
                value={inquiry}
                onChange={(event) => setInquiry(event.target.value)}
                required
              >
                <option value="" disabled>Select an inquiry</option>
                <option value="project">Project Inquiry</option>
                <option value="freelance">Freelance Opportunity</option>
                <option value="collaboration">Collaboration</option>
                <option value="job">Job Opportunity</option>
                <option value="feedback">Feedback</option>
                <option value="general">General Message</option>
                <option value="other">Other</option>
              </select>
            </label>
            {inquiry === "other" && (
              <label>
                <span className="visually-hidden">Specify your inquiry</span>
                <input name="inquiryOther" type="text" placeholder="Please specify" required />
              </label>
            )}
          </div>
          <label className="contact-memo-message">
            <span className="visually-hidden">Message</span>
            <textarea name="message" placeholder="Message" required />
          </label>
          <button className="contact-memo-submit" type="submit">
            <img src="/assets/wii-send-button.png" alt="" aria-hidden="true" />
            <span>Send Message</span>
          </button>
        </form>
        <span className="contact-memo-brand" aria-hidden="true">
          <img src="/assets/ron-button-logo.png" alt="" />
        </span>
      </div>
    </section>
  );
}
