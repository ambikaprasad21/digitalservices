import { useState } from "react";
import styles from "./ContactUs.module.css";
import { AiOutlineMail } from "react-icons/ai";
import countryCode from "../utility/allCountryCodes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../utility/constant";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ccode, setCCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState(5000);
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");

  async function submitMutation(formData) {
    await axios.post(
      `${API_URL}/contact/create`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { isLoading, mutate } = useMutation({
    mutationKey: ["contactus"],
    mutationFn: submitMutation,
    onSuccess: () => {
      toast.success("Contact information saved successfully!");
      setName("");
      setEmail("");
      setCCode("+91");
      setPhone("");
      setBudget(5000);
      setDeadline("");
      setMessage("");
    },
    onError: (error) => {
      console.error("Error saving contact information:", error);
      toast.error("Failed to save contact information.");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name,
      email,
      countryCode: ccode,
      phone,
      budget: String(budget),
      deadline,
      message,
    };

    mutate(formData);
  }

  return (
    <div>
      <div className={styles.hero}>
        <img
          src="/images/contact us.jpg"
          alt="contact us hero image"
          width={"100%"}
        />
        <p>Contact Us</p>
      </div>

      <div className={styles.c_g}>
        <div className={styles.left}>
          <div className={styles.r_h}>
            <AiOutlineMail />
            <h2>Get in Touch with Us</h2>
          </div>
          <p>
            We’re here to bring your ideas to life! Whether you’re looking to
            develop a cutting-edge website, a mobile app, or any digital
            solution, our team is ready to assist. Share your requirements, ask
            questions, or simply say hello—our experts will respond promptly.
            Let’s collaborate to create innovative and impactful solutions
            tailored just for you!
          </p>
        </div>
        <div className={styles.right}>
          <h2>Get in touch</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.f_d}>
              <label htmlFor="">
                Name <span className={styles.star}>*</span>
              </label>
              <input
                type="text"
                placeholder="John doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.f_d}>
              <label htmlFor="">
                Email <span className={styles.star}>*</span>
              </label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.f_d}>
              <label htmlFor="">
                Phone number <span className={styles.star}>*</span>
              </label>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flexBasis: "10%",
                  }}
                >
                  <select
                    style={{
                      height: "3.5rem",
                      padding: "0.5rem",
                      borderRadius: "0.4rem",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      outline: "none",
                      width: "10rem",
                    }}
                    required
                    value={ccode}
                    onChange={(e) => setCCode(e.target.value)}
                  >
                    {countryCode.map((code) => (
                      <option key={code.iso} value={`+${code.code}`}>
                        +{code.code} ({code.country})
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="7905194692"
                  required
                  style={{ flexBasis: "90%" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.f_d}>
              <label htmlFor="">
                Project budget <span className={styles.star}>*</span>
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="range"
                  id="project-budget"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
                <span>₹{budget}</span>
              </div>
            </div>
            <div className={styles.f_d}>
              <label htmlFor="">
                Project deadline <span className={styles.star}>*</span>
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className={`${styles.f_d}`}>
              <label htmlFor="">Message</label>
              <div className={styles.mes}>
                <textarea
                  type="text"
                  placeholder="Write your message here..."
                  style={{ width: "100%" }}
                  value={message}
                  onChange={(e) => {
                    if (e.target.value.length < 1000) {
                      setMessage(e.target.value);
                    }
                  }}
                />
                <span className={styles.char}>{message.length}/1000</span>
              </div>
            </div>

            <button className={styles.btn} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
