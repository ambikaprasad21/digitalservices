import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { useLogin } from "./../context/LoginContext";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const { user, logout } = useLogin();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isNavOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isNavOpen]);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };
  return (
    <div className={styles.header}>
      <Link to={"/"}>
        <img src="/images/logo.png" alt="company logo" height={"40rem"} />
      </Link>
      {screenWidth > 675 ? (
        <>
          <ul className={`${styles.nav_items} ${isNavOpen ? styles.open : ""}`}>
            <NavLink to={"/"} className={styles.nav_link} onClick={toggleNav}>
              Services
            </NavLink>
            <span>|</span>
            <NavLink
              to={"/portfolio"}
              className={styles.nav_link}
              onClick={toggleNav}
            >
              Portfolio
            </NavLink>
            <span>|</span>
            <NavLink
              to={"/blogs"}
              className={styles.nav_link}
              onClick={toggleNav}
            >
              Blog
            </NavLink>
            <span>|</span>
            <NavLink
              to={"/why-choose-us"}
              className={styles.nav_link}
              onClick={toggleNav}
            >
              Why choose us
            </NavLink>
          </ul>
          <div className={`${styles.btns} ${isNavOpen ? styles.open : ""}`}>
            <NavLink to={"/contact-us"} onClick={toggleNav}>
              <button className={styles.btn}>Contact us</button>
            </NavLink>
            {user ? (
              <Link onClick={() => logout()} className={styles.login}>
                Logout
              </Link>
            ) : (
              <Link to="/admin/login" className={styles.login}>
                Admin Login
              </Link>
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.hamburger} onClick={toggleNav}>
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </div>
          <ResponsiveNav
            ref={navRef}
            isNavOpen={isNavOpen}
            toggleNav={toggleNav}
            user={user}
            logout={logout}
          />
        </>
      )}
    </div>
  );
}

function ResponsiveNav({ isNavOpen, toggleNav, user, logout }) {
  return (
    <div
      className={`${styles.res_nav} ${isNavOpen ? styles.open : ""}`}
      onClick={toggleNav}
    >
      <ul>
        <NavLink to={"/"} className={styles.nav_link}>
          Services
        </NavLink>

        <NavLink to={"/portfolio"} className={styles.nav_link}>
          Portfolio
        </NavLink>

        <NavLink to={"/blogs"} className={styles.nav_link}>
          Blog
        </NavLink>

        <NavLink to={"/why-choose-us"} className={styles.nav_link}>
          Why choose us
        </NavLink>
      </ul>
      <div className={`${styles.res_btn} ${isNavOpen ? styles.open : ""}`}>
        <NavLink to={"/contact-us"}>
          <button className={styles.btn}>Contact us</button>
        </NavLink>
        {user ? (
          <Link onClick={() => logout()} className={styles.login}>
            Logout
          </Link>
        ) : (
          <Link to="/admin/login" className={styles.login}>
            Admin Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
