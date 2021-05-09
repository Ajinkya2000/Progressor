// Styles Import
import styles from "./Dashboard.module.css";

// Image Import
import logo from "../../images/logo.png";

const Sidebar = () => {
  return <div className={styles.sideBar}>
  <div className={styles.logoWrapper}>
    <img src={logo} alt="logo" />
    <h2>Progressor</h2>
  </div>
</div>
};

export default Sidebar;
