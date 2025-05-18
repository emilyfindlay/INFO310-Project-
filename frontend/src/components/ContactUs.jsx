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
        setStatus("Sending...");

        try {
            const response = await fetch("http://localhost:8080/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("Message sent!");
                setFormData({ name: "", email: "", contact: "", title: "", message: "" });
            } else {
                setStatus("Failed to send. Try again later.");
            }
        } catch (error) {
            console.error("Error sending contact message:", error);
            setStatus("An error occurred.");
        }
    };

    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Your Email" required value={formData.email} onChange={handleChange} />
                <input type="text" name="contact" placeholder="Contact Number (optional)" value={formData.contact} onChange={handleChange} />
                <input type="text" name="title" placeholder="Subject" required value={formData.title} onChange={handleChange} />
                <textarea name="message" placeholder="Message" required value={formData.message} onChange={handleChange} />
                <button type="submit">Send</button>
            </form>
            <p>{status}</p>
        </div>
    );
}
