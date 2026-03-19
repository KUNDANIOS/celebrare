import { Navigate } from "react-router-dom";
import { loadUser } from "../utils/authStorage";

export default function ProtectedRoute({ children }) {
  const user = loadUser();
  if (!user) return <Navigate to="/" replace />;
  return children;
}