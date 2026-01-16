import Card from "../components/ui/Card";
import { CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <Card className="glass-panel" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CheckCircle size={64} color="var(--accent-secondary)" style={{ marginBottom: 16 }} />
      <h2 style={{ marginBottom: 8 }}>Registration Successful</h2>
      <p style={{ color: "var(--text-muted)" }}>Thank you — we've recorded your registration.</p>
    </Card>
  );
}
