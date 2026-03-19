import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { saveUser } from "../utils/authStorage";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../utils/authStorage";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (loadUser()) navigate("/dashboard");
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      saveUser(result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  return (
    <div style={s.root}>
      <div style={s.card}>
        <h1 style={s.heading}>Sign In</h1>
        <p style={s.sub}>Access your dashboard securely</p>

        <button style={s.btn} onClick={handleGoogleLogin}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#0071e3"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#d2d2d7"}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            width="18" height="18" alt="G"
          />
          Continue with Google
        </button>

        <p style={s.footer}>Protected by Firebase Authentication</p>
      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#f5f5f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
  },
  card: {
    background: "#fff",
    border: "1px solid #d2d2d7",
    borderRadius: "18px",
    padding: "48px 40px",
    width: "340px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1d1d1f",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  sub: {
    fontSize: "14px",
    color: "#6e6e73",
    margin: "0 0 32px",
  },
  btn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "13px",
    fontSize: "15px",
    fontWeight: 500,
    background: "#fff",
    border: "1.5px solid #d2d2d7",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#1d1d1f",
    transition: "border-color 0.2s ease",
  },
  footer: {
    fontSize: "11px",
    color: "#aeaeb2",
    marginTop: "20px",
  },
};