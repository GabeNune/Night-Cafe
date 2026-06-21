import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";

export function Topbar() {
  return (
    <nav className={styles.topbar}>
      <span className={styles.logo}>Night Cafe</span>
      <NavLink
        to={"/"}
        end
        className={({ isActive }) =>
          isActive ? styles.navLinkAtivo : styles.navLink
        }
      >
        Weekly
      </NavLink>

      <NavLink
        to={"/tasks"}
        className={({ isActive }) =>
          isActive ? styles.navLinkAtivo : styles.navLink
        }
      >
        Tasks
      </NavLink>
      <NavLink
        to={"/pomodoro"}
        className={({ isActive }) =>
          isActive ? styles.navLinkAtivo : styles.navLink
        }
      >
        Pomodoro
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? styles.navLinkAtivo : styles.navLink
        }
      >
        Settings
      </NavLink>
    </nav>
  );
}
