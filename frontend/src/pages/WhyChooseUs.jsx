import { NavLink } from "react-router-dom";
import styles from "./WhyChooseUs.module.css";

function WhyChooseUs() {
  return (
    <div className={styles.sec}>
      <div className={styles.intro}>
        <h1>Why choose us ?</h1>
        <p>
          At Digital Services, we are committed to delivering excellence by
          leveraging the latest technology and industry best practices. Here's
          what sets us apart
        </p>
      </div>
      <div className={styles.grid}>
        <div className={styles.left}>
          <div className={styles.card}>
            <img src="/images/inovative.png" alt="inovative image" />
            <div className={styles.card_det}>
              <h2>Innovative Technology Solutions</h2>
              <p>
                We stay ahead of the curve by embracing modern, state-of-the-art
                technologies to ensure your solutions are not just functional
                but future-ready.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/images/outdated.png" alt="no outdated technology" />
            <div className={styles.card_det}>
              <h2>No Outdated Platforms</h2>
              <p>
                Unlike many others, we steer clear of outdated platforms like
                WordPress and Shopify. Instead, we focus on building custom
                solutions that are scalable, secure, and tailored to your unique
                needs.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/images/customer.png" alt="client centric approach" />
            <div className={styles.card_det}>
              <h2>Client-Centric Approach</h2>
              <p>
                Your success is our priority. We work closely with you to
                understand your requirements and transform your ideas into
                impactful digital solutions.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/images/exp_team.png" alt="experienced team" />
            <div className={styles.card_det}>
              <h2>Experienced Team</h2>
              <p>
                Our team of skilled developers, designers, and digital
                strategists are passionate about creating innovative,
                user-friendly, and result-oriented solutions.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/images/etoe_sup.png" alt="end to end support" />
            <div className={styles.card_det}>
              <h2>End-to-End Support</h2>
              <p>
                From the initial concept to final deployment and beyond, we’re
                with you at every step, offering seamless support to ensure your
                project’s success.
              </p>
            </div>
          </div>
        </div>
        <video
          src="/video/why_choose.mp4"
          className={styles.right}
          loop
          autoPlay
          muted
        ></video>
      </div>

      <button className={styles.btn}>
        <NavLink to={"/contact-us"} className={styles.cta}>
          Contact us
        </NavLink>
      </button>
    </div>
  );
}

export default WhyChooseUs;
