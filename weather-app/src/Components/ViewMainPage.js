import styles from "./MainPage.module.css";

function ViewMainPage() {
  return (
    <>
      <article className={styles.widget}>
        <div className={styles.weatherIcon}>
          <i className="wi wi-day-cloudy"></i>
        </div>
        <div className={styles.weatherInfo}>
          <div className={styles.temperature}>
            <span>25&deg;</span>
          </div>
          <div className={styles.description}>
            <div className={styles.weatherCondition}>CLOUDY</div>
            <div className={styles.place}>New York, New York</div>
          </div>
        </div>
        <div className={styles.date}>1st Jan</div>
      </article>
      <p>
        <a href="https://codepen.io/nerios/full/jWjmby/">
          Inspired by: https://codepen.io/nerios/full/jWjmby/. Implemented using
          FlexBox.
        </a>
      </p>
    </>
  );
}

export default ViewMainPage;
