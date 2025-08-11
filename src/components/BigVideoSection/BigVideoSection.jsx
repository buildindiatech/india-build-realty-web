import React, { useState } from "react";
import { FiPhone, FiSend } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Button from "../Button";
import "./BigVideoSection.css";

// Reuse the ContactForm from your ContactSection
const ContactForm = ({ campaignId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log(campaignId);

    setIsSubmitting(true);
    try {
      // Prepare payload and API URL
      const apiUrl = `http://test.thebi.tech/api/leads/website?campaign=${campaignId}`;
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.mobile, // <-- map your field
        description: formData.message, // <-- map your field
      };

      // Call API
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit form.");

      // success
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        message: "",
        terms: false,
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-4 sm:gap-2 mob:gap-3">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="FIRST NAME*"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border text-sm mob:text-base px-4 py-3 rounded outline-none focus:ring-1 bg-white !text-black ${
              errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-black"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="LAST NAME*"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border text-sm mob:text-base px-4 py-3 rounded outline-none focus:ring-1 bg-white !text-black ${
              errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-black"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="mobile"
          placeholder="+91 | MOBILE NUMBER*"
          value={formData.mobile}
          onChange={handleChange}
          className={`w-full border text-sm mob:text-base px-4 py-3 rounded outline-none focus:ring-1 bg-white !text-black ${
            errors.mobile
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"
          }`}
        />
        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="EMAIL*"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border text-sm mob:text-base px-4 py-3 rounded outline-none focus:ring-1 bg-white !text-black ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="MESSAGE*"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className={`w-full border text-sm mob:text-base px-4 py-3 rounded outline-none focus:ring-1 bg-white resize-none !text-black ${
            errors.message
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-black"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-2 text-sm text-gray-600 mob:text-[0.875rem]">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className={`mt-1 w-4 h-4 ${errors.terms ? "border-red-500" : ""}`}
          />
          <label
            className={`leading-tight ${errors.terms ? "text-red-500" : ""}`}
          >
            By clicking this you agree to{" "}
            <a href="#" className="underline hover:text-black">
              terms & conditions
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-black">
              privacy policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full !bg-black !text-white hover:!bg-gray-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

const BigVideoSection = ({
  videos = [],
  title = "Let's Connect",
  description = "Have a question? We'd love to hear from you.",
  contactInfo,
  campaignId,
}) => {
  const bgImage =
    videos[0]?.thumbnail ||
    "https://raw.githubusercontent.com/KHUNTPRIYANSH/site_photos/refs/heads/main/bi-reality/yt.png";

  return (
    <section
      className="relative w-full h-auto bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 z-10 hidden sm:block bg-black/20 lg:bg-gradient-to-t lg:from-black/30 lg:via-transparent lg:to-transparent" />
      <div className="relative z-20">
        <div className="flex lg:p-36 flex-col lg:flex-row sm:flex-col-reverse overflow-hidden sm:p-16 sm:py-10 mob:px-5 mob:pt-10 mob:pb-14 mob:flex-col-reverse">
          {/* Left Info */}
          <div className="sm:p-10 lg:p-20 border-b md:border-b-0 lg:border-r lg:w-[45%] sm:w-full bg-white space-y-6  mob:p-8">
            <h2 className="text-xl sm:text-3xl mob:text-[1.25rem] font-bold text-gray-900 font-heading">
              {title}
            </h2>
            <p className="text-sm mob:text-[0.875rem] text-gray-600 font-sans">
              {description}
            </p>

            <div className="space-y-4 text-sm mob:text-[0.875rem] text-gray-700">
              <div className="flex items-start gap-3 mob:gap-2">
                <FiPhone className="mt-1 text-gray-900 text-lg" />
                <span>{contactInfo?.phone || "+91 98983 39903"}</span>
              </div>
              <div className="flex items-start gap-3 mob:gap-2">
                <FiSend className="mt-1 text-gray-900 text-lg" />
                <span>
                  {contactInfo?.email || "buildindiarealty@gmail.com"}
                </span>
              </div>
              <div className="flex items-start gap-3 mob:gap-2">
                <LocationOnOutlinedIcon className="mt-1 text-gray-900 text-xl" />
                <span className="leading-relaxed">
                  {contactInfo?.address ||
                    "Zion Z1, 907–908, nr. Maple County Road, off Sindhu Bhavan Marg, Bodakdev, Ahmedabad, Gujarat 380054"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-[#E7E5E2] sm:py-16 sm:px-10 lg:p-16 lg:w-[55%] sm:w-full mob:p-8 mob:pt-10">
            <ContactForm campaignId={campaignId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigVideoSection;
