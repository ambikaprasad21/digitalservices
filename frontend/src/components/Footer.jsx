import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaFacebook, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { API_URL } from "../utility/constant";

function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/subscribe`, {
        mail: email,
      });

      toast.success("Successfully subscribed!");
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.footer}>
      <div className={styles.f_g}>
        <div className={styles.lo_ser}>
          <div className={styles.logo}>
            <Link to={"/"}>
              <img
                src="/images/logo-name.png"
                alt="company logo"
                height={"60rem"}
              />
            </Link>

            <p>The best place for all your digital solutions</p>
            <p style={{ marginTop: "2rem", fontWeight: "400" }}>
              <span className={styles.email}>Email address:</span>
              digitalservices@gmail.com
            </p>
          </div>
          <div className={styles.f_ser}>
            <h2 className={styles.g_h}>Services</h2>
            <div className={styles.f_ser_item}>
              <p>Web Development</p>
              <p>App Development</p>
              <p>UI/UX Design</p>
              <p>Search Engine Optimization (SEO)</p>
              <p>Digital Marketing</p>
            </div>
          </div>
        </div>
        <div className={styles.f_sub}>
          <h2 className={styles.g_h}>Subscribe to newsletter</h2>
          <div className={styles.f_sub_form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <button onClick={handleSubscribe}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.f_social}>
        <p>Follow us on:</p>
        <div className={styles.f_social_icons}>
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/" target="_blank">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <FaInstagramSquare />
          </a>
        </div>
      </div>
      <p className={styles.f_copy}>
        © {new Date().getFullYear()} Digital Services. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
