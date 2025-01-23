import styles from "./Portfolio.module.css";

function Portfolio() {
  return (
    <div>
      <div className={styles.hero}>
        <img src="/images/portfolio.jpg" alt="portfolio image" width={"100%"} />
        <p>Our Portfolio</p>
      </div>
      <div className={styles.detail}>
        <div className={`${styles.det_data} ${styles.det_box}`}>
          <img src="/images/school.jpg" alt="school related project" />
          <div className={`${styles.det_text}`}>
            <h2>School</h2>
            <div className={styles.det_para}>
              <p>
                Developed comprehensive websites and mobile apps to streamline
                administration and enhance student engagement.
              </p>
              <p>
                Features include student portals, online learning modules, and
                event management systems.
              </p>
            </div>
          </div>
        </div>
        <div className={` ${styles.det_data} ${styles.det_rev}`}>
          <img src="/images/hospital.jpg" alt="hospital related project" />
          <div className={`${styles.det_text}`}>
            <h2>Hospital</h2>
            <div className={styles.det_para}>
              <p>
                Designed secure and user-friendly platforms for healthcare
                providers.
              </p>
              <p>
                Highlights include online appointment booking, patient record
                management, and telemedicine capabilities.
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.det_data} ${styles.det_box}`}>
          <img src="/images/hotel.jpg" alt="hotel related project" />
          <div className={`${styles.det_text}`}>
            <h2>Hotel</h2>
            <div className={styles.det_para}>
              <p>
                Created advanced, visually appealing websites to improve guest
                experience and boost bookings.
              </p>
              <p>
                Includes features like online reservations, virtual tours, and
                loyalty programs.
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.det_data} ${styles.det_rev}`}>
          <img src="/images/salon.png" alt="salon related project" />
          <div className={`${styles.det_text}`}>
            <h2>Salon</h2>
            <div className={styles.det_para}>
              <p>
                Built sophisticated digital platforms for salons, focusing on
                seamless scheduling and personalized services.
              </p>
              <p>
                Features include appointment booking, service menus, and
                customer reviews.
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.det_data} ${styles.det_box}`}>
          <img src="/images/e_com.jpg" alt="e commerce related project" />
          <div className={`${styles.det_text}`}>
            <h2>E - commerce</h2>
            <div className={styles.det_para}>
              <p>
                Designed intuitive, feature-rich online stores to maximize sales
                and customer satisfaction.
              </p>
              <p>
                Includes secure payment gateways, product filters, and
                user-friendly interfaces.
              </p>
            </div>
          </div>
        </div>
        <div className={`${styles.det_data} ${styles.det_rev}`}>
          <img src="/images/gym.jpg" alt="fitness (gym) related project" />
          <div className={`${styles.det_text}`}>
            <h2>Fitness (GYM)</h2>
            <div className={styles.det_para}>
              <p>
                Developed motivational and engaging platforms for fitness
                centers.
              </p>
              <p>
                Features include class scheduling, trainer profiles, and
                membership management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
