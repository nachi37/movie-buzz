
import { Outlet } from "react-router-dom";
import styles from './home.module.css';
import APP_NAME  from '../constants/APP_CONSTANTS.js'

const Layout = () => {
  return (
    <>
        <div className={styles.appName}>{APP_NAME}</div>
        <Outlet />
    </>
  )
};

export default Layout;