import { useState } from "react";
import styles from "./AdminLogin.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "./../context/LoginContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminLogin() {
  const { login } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      await login(password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Failed to log in.");
      toast.error(err.message || "Failed to log in.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.login}>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.l_i}>
          <label htmlFor="">
            Enter password <span className={styles.star}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={hide ? "password" : "text"}
              style={{ width: "100%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={{
                fontSize: "2rem",
                position: "absolute",
                right: "5px",
                top: "8px",
              }}
              onClick={() => setHide((e) => !e)}
            >
              {hide ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {error && <p style={{ color: "black", fontSize: "1.6rem" }}>{error}</p>}
        <button className={styles.btn}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
