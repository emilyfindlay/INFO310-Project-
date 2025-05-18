import React, { useState } from "react";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        title: "",
        message: ""
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", contact: "", title: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error sending contact message:", error);
            setStatus("error");
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case "sending":
                return "Sending your message...";
            case "success":
                return "Message sent successfully! We'll get back to you soon.";
            case "error":
                return "Failed to send message. Please try again later.";
            default:
                return "";
        }
    };

    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <p>Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact Number (Optional)</label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        className="form-control"
                        placeholder="Enter your phone number"
                        value={formData.contact}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Subject</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        placeholder="What is this regarding?"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        placeholder="Type your message here..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                    Send Message
                </button>
            </form>

            {status && (
                <div className={`form-status ${status}`}>
                    {getStatusMessage()}
                </div>
            )}
        </div>
    );
}
