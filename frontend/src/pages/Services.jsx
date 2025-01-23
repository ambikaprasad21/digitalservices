import ServiceCard from "../components/ServiceCard";
import styles from "./Services.module.css";

const allServices = [
  {
    type: "Web Development",
    desc: "Designing responsive, scalable, and innovative websites.",
    img: "web_dev.jpg",
    color: "#00b8c535",
  },
  {
    type: "App Development",
    desc: "Building high-performance mobile applications for Android and iOS platforms.",
    img: "app_dev.jpg",
    color: "#93dbfc35",
  },
  {
    type: "UI/UX Design",
    desc: "Creating seamless, visually captivating user experiences and interfaces.",
    img: "ui_ux.jpg",
    color: "#d8b5af36",
  },
  {
    type: "Search Engine Optimization (SEO)",
    desc: "optimizing websites to achieve superior search engine rankings.",
    img: "seo.jpg",
    color: "#a3b1b930",
  },
  {
    type: "Digital Marketing",
    desc: "Crafting and executing impactful online marketing strategies.",
    img: "digital_marketing.jpg",
    color: "#0030672f",
  },
];

function Services() {
  return (
    <div>
      <div className={styles.hero}>
        <img
          src="/images/hero.jpg"
          alt="service page hero image"
          width={"100%"}
        />
        <p>
          The <span>Best</span> place <br /> for all your digital solutions
        </p>
      </div>
      <div className={styles.ser}>
        <h1>Our Services</h1>
        <div className={styles.cards}>
          {allServices.map((item, index) => {
            return (
              <div
                key={item.type}
                className={`${styles.item} ${index === 3 && styles.item_3} `}
              >
                <ServiceCard item={item} key={item.type} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Services;
