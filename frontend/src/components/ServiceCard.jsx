import styles from "./ServiceCard.module.css";
import PropTypes from "prop-types";

function ServiceCard({ item }) {
  return (
    <div className={styles.card} style={{ backgroundColor: `${item.color}` }}>
      <h2>{item.type}</h2>
      <p>{item.desc}</p>
      <div className={styles.img_cont}>
        <img src={`/images/${item.img}`} alt={`${item.type} image`} />
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

export default ServiceCard;
