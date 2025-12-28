import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

/* -------------------- Validation Schema -------------------- */
const registrationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  prn: z.string().min(1, "PRN is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  department: z.string().min(1, "Please select a department"),
  year: z.string().min(1, "Please select a year"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  /* -------------------- Submit Handler -------------------- */
  async function onSubmit(data) {
    try {
      await addDoc(collection(db, "registrations"), {
        ...data,
        createdAt: serverTimestamp(),
      });

      reset();
      toast.success("Registration Successful!", {
        description: "We'll see you at the event. Check your email for details."
      });

    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Registration Failed", {
        description: "Something went wrong. Please try again later."
      });
    }
  }

  /* -------------------- UI -------------------- */
  return (
    <Card className="glass-panel" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(255, 158, 100, 0.2)' }}>
      {/* Header - Vibrant Brand Gradient */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255, 77, 109, 0.08), transparent)',
        padding: '32px 32px 20px',
        textAlign: 'center'
      }}>
        <h2 className="text-gradient-primary" style={{ marginBottom: 12, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '-1px' }}>
          Joi&#x3396; The Squad
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '80%', margin: '0 auto' }}>
          Unlock exclusive workshops, mentorships, and hackathons.
        </p>
      </div>

      <div style={{ padding: '0 32px 32px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            <div className="input-group">
              <label htmlFor="name" className="input-label">Full Name</label>
              <input
                id="name"
                {...register("name")}
                className="input-field"
                placeholder="Ex. John Doe"
              />
              {errors.name && <span className="error-msg">{errors.name.message}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input
                id="email"
                {...register("email")}
                className="input-field"
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-msg">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone" className="input-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-muted)', fontSize: '0.95rem' }}>🇮🇳 +91</span>
                <input
                  id="phone"
                  {...register("phone")}
                  className="input-field"
                  style={{ paddingLeft: 64 }}
                  placeholder="98765 43210"
                />
              </div>
              {errors.phone && <span className="error-msg">{errors.phone.message}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 20 }}>
              <div className="input-group">
                <label htmlFor="department" className="input-label">Department</label>
                <select id="department" {...register("department")} className="input-field">
                  <option value="">Select Dept</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ENTC">EnTC</option>
                  <option value="MECH">Mech</option>
                </select>
                {errors.department && <span className="error-msg">{errors.department.message}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="year" className="input-label">Year of Study</label>
                <select id="year" {...register("year")} className="input-field">
                  <option value="">Select Year</option>
                  <option value="FY">First Year</option>
                  <option value="SY">Second Year</option>
                  <option value="TY">Third Year</option>
                  <option value="Final">Final Year</option>
                </select>
                {errors.year && <span className="error-msg">{errors.year.message}</span>}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="prn" className="input-label">PRN / ID Number</label>
              <input
                id="prn"
                {...register("prn")}
                className="input-field"
                placeholder="Enter your college PRN"
              />
              {errors.prn && <span className="error-msg">{errors.prn.message}</span>}
            </div>

          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 16 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ flex: 2, display: 'flex', justifyContent: 'center', gap: 8, fontSize: '1.1rem' }}
            >
              {isSubmitting ? "Processing..." : (
                <>
                  <span>Complete Registration</span>
                  <span>→</span>
                </>
              )}
            </Button>
            <button
              type="button"
              onClick={() => reset()}
              className="hover:text-white transition-all"
              style={{
                background: 'transparent',
                flex: 1,
                border: '1px solid var(--border-subtle)',
                borderRadius: 12,
                fontWeight: 600,
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = 'var(--text-muted)'}
              onMouseLeave={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}
