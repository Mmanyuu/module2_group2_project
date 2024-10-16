// Carousel.js
import styles from "./Carousel.module.css";
import icon2 from "../assets/static svg set 1/medium/2.png";
import icon5 from "../assets/static svg set 1/medium/5.png";
import icon10 from "../assets/static svg set 1/medium/10.png";
import icon15 from "../assets/static svg set 1/medium/15.png";
import icon20 from "../assets/static svg set 1/medium/20.png";
import icon25 from "../assets/static svg set 1/medium/25.png";
import icon33 from "../assets/static svg set 1/medium/33.png";
import icon35 from "../assets/static svg set 1/medium/35.png";

function Carousel() {
  const images = [
    icon2,
    icon5,
    icon10,
    icon15,
    icon20,
    icon25,
    icon33,
    icon35,
  ];

  return (
    <div className={styles.logos}>
      <div className={styles.logo_slide}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`weather icon ${index + 1}`}
          />
        ))}
      </div>
      <div className={styles.logo_slide}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`weather icon ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
