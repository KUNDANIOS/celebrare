import { loadUser } from "../utils/authStorage";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { clearUser } from "../utils/authStorage";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = loadUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    navigate("/");
  };

  const expireDate = new Date(user?.expiry).toLocaleString();
  const timeLeft = Math.round((user?.expiry - Date.now()) / 3600000);

  return (
    <div style={s.root}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.navLogo}>⬡ AuthApp</span>
        <div style={s.navRight}>
          <img src={user?.photo} alt="avatar" style={s.avatar} />
          <button style={s.logoutBtn} onClick={handleLogout}
            onMouseEnter={e => { e.currentTarget.style.background="#0071e3"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#000"; e.currentTarget.style.color="#fff"; }}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={s.hero}>
        <p style={s.heroEye}>DASHBOARD — PERSONAL</p>
        <h1 style={s.heroH1}>
          Hello,<br />
          <span style={s.heroName}>{user?.name?.split(" ")[0]}.</span>
        </h1>
        <p style={s.heroSub}>{user?.email}</p>
        <div style={s.heroCTA}>
          <div style={s.chip}>● Session Active</div>
          <div style={s.chipGhost}>{timeLeft}h remaining</div>
        </div>
      </section>

      {/* Grid */}
      <section style={s.grid}>
        {/* Auth card */}
        <div style={{...s.tile, background:"#fff"}}>
          <p style={s.tileEye}>AUTHENTICATION</p>
          <p style={s.tileTitle}>Google<br/>OAuth 2.0</p>
          <p style={s.tileSub}>Secured via Firebase</p>
          <div style={s.tileIcon}>🔐</div>
        </div>

        {/* Storage card */}
        <div style={{...s.tile, background:"#fff"}}>
          <p style={s.tileEye}>STORAGE</p>
          <p style={s.tileTitle}>Local<br/>Storage</p>
          <p style={s.tileSub}>TTL · 24 hours · Auto-clears on expiry</p>
          <div style={s.tileIcon}>🗄</div>
        </div>

        {/* Session card */}
        <div style={{...s.tile, background:"#fff"}}>
          <p style={s.tileEye}>SESSION EXPIRES</p>
          <p style={{...s.tileTitle, fontSize:"15px", lineHeight:1.6}}>{expireDate}</p>
          <div style={s.tileIcon}>⏱</div>
          <div style={s.progressWrap}>
            <div style={{...s.progressFill, width:`${Math.min(100,timeLeft/24*100)}%`}} />
          </div>
          <p style={{...s.tileSub, marginTop:"8px"}}>{timeLeft}h of 24h used</p>
        </div>

        {/* Wide card */}
        <div style={{...s.tile, ...s.tileWide, background:"#fff"}}>
          <p style={s.tileEye}>PROTECTED ROUTE</p>
          <p style={s.tileTitle}>Auto-redirect on expiry</p>
          <p style={{...s.tileSub, maxWidth:"500px"}}>
            ProtectedRoute.jsx calls loadUser() on every page load.
            If TTL has expired, localStorage is cleared and user is
            redirected to /login automatically.
          </p>
          <div style={{...s.tileIcon, fontSize:"40px"}}>🛡</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={s.footer}>
        <span>Built with React · Vite · Firebase</span>
        <span>·</span>
        <span> React Auth + Protected Routes + Local Storage</span>
      </footer>
    </div>
  );
}

const s = {
  root: {
    minHeight: "100vh",
    background: "#f5f5f7",
    color: "#1d1d1f",
    fontFamily: "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif",
  },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 48px", height: "52px",
    background: "rgba(245,245,247,0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid #d2d2d7",
    position: "sticky", top: 0, zIndex: 100,
  },
  navLogo: { fontSize: "17px", fontWeight: 600, letterSpacing: "-0.3px", color: "#1d1d1f" },
  navRight: { display: "flex", alignItems: "center", gap: "14px" },
  avatar: { width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid #d2d2d7" },
  logoutBtn: {
    padding: "6px 16px", fontSize: "12px", fontWeight: 500,
    background: "#000", border: "none",
    color: "#fff", borderRadius: "20px", cursor: "pointer",
    transition: "all 0.2s ease",
  },
  hero: {
    maxWidth: "980px", margin: "0 auto",
    padding: "80px 48px 60px",
  },
  heroEye: {
    fontSize: "11px", letterSpacing: "4px", color: "#6e6e73",
    margin: "0 0 16px", fontWeight: 500,
  },
  heroH1: {
    fontSize: "clamp(56px, 9vw, 96px)",
    fontWeight: 700, letterSpacing: "-3px",
    lineHeight: 0.95, margin: "0 0 20px", color: "#1d1d1f",
  },
  heroName: { color: "#0071e3" },
  heroSub: { fontSize: "17px", color: "#6e6e73", margin: "0 0 32px" },
  heroCTA: { display: "flex", gap: "10px", flexWrap: "wrap" },
  chip: {
    padding: "7px 16px", borderRadius: "20px",
    background: "rgba(52,199,89,0.1)", border: "1px solid rgba(52,199,89,0.3)",
    color: "#1a7f37", fontSize: "13px", fontWeight: 500,
  },
  chipGhost: {
    padding: "7px 16px", borderRadius: "20px",
    background: "#fff", border: "1px solid #d2d2d7",
    color: "#6e6e73", fontSize: "13px",
  },
  grid: {
    maxWidth: "980px", margin: "0 auto",
    padding: "0 48px 80px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  tile: {
    borderRadius: "18px",
    padding: "32px 28px",
    position: "relative", overflow: "hidden",
    border: "1px solid #d2d2d7",
    minHeight: "200px",
    display: "flex", flexDirection: "column", justifyContent: "flex-end",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  tileWide: { gridColumn: "span 2" },
  tileEye: {
    fontSize: "10px", letterSpacing: "3px", color: "#6e6e73",
    margin: "0 0 10px", fontWeight: 500,
  },
  tileTitle: {
    fontSize: "22px", fontWeight: 700, color: "#1d1d1f",
    margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-0.5px",
  },
  tileSub: { fontSize: "13px", color: "#6e6e73", margin: 0, lineHeight: 1.5 },
  tileIcon: {
    position: "absolute", top: "24px", right: "24px",
    fontSize: "28px", opacity: 0.5,
  },
  progressWrap: {
    height: "3px", background: "#e8e8ed",
    borderRadius: "2px", overflow: "hidden", marginTop: "12px",
  },
  progressFill: {
    height: "100%",
    background: "#0071e3",
    borderRadius: "2px",
  },
  footer: {
    borderTop: "1px solid #d2d2d7",
    padding: "20px 48px",
    display: "flex", gap: "16px",
    fontSize: "12px", color: "#6e6e73",
    background: "#f5f5f7",
  },
};