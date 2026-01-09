import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";

/* -------------------- Validation Schema -------------------- */
const registrationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  prn: z.string().min(1, "PRN is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  department: z.string().min(1, "Please select a department"),
  year: z.string().min(1, "Please select a year"),
  eventName: z.string().min(1, "Please select an event"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const departmentOptions = [
    { value: "", label: "Select Dept" },
    { value: "CSE", label: "Computer Science Engineering (CSE)" },
    { value: "CSIT", label: "Computer Science and Information Technology (CSIT)" },
    { value: "MECH", label: "Mechanical Engineering (MECH)" },
    { value: "METR", label: "Mechatronics (METR)" },
    { value: "ENTC", label: "Electronics and Telecommunication Engineering (ENTC)" },
    { value: "CIVIL", label: "Civil Engineering (CIVIL)" },
    { value: "AIML", label: "Artificial Intelligence and Machine Learning (AIML)" },
    { value: "ROBOTICS", label: "Robotics (ROBOTICS)" },
    { value: "BSC", label: "Bachelor of Science (BSC)" },
    { value: "BCS", label: "Bachelor of Computer Science (BCS)" },
    { value: "BCA", label: "Bachelor of Computer Applications (BCA)" },
    { value: "MCA", label: "Master of Computer Applications (MCA)" },
    { value: "Other", label: "Other" },
  ];

  const yearOptions = [
    { value: "", label: "Select Year" },
    { value: "FY", label: "First Year" },
    { value: "SY", label: "Second Year" },
    { value: "TY", label: "Third Year" },
    { value: "Final", label: "Final Year" },
  ];

  const eventOptions = [
    { value: "", label: "Select Event" },
    { value: "CODING", label: "CODING" },
    { value: "CODE-DUET", label: "CODE-DUET" },
    { value: "GROUP DISCUSSION", label: "GROUP DISCUSSION" },
  ];

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
          REGISTER HERE
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
              <div>
                <label htmlFor="department" className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Department</label>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="department"
                      name="department"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={departmentOptions}
                      placeholder="Select Dept"
                      error={errors.department}
                    />
                  )}
                />
              </div>

              <div>
                <label htmlFor="year" className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Year of Study</label>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="year"
                      name="year"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={yearOptions}
                      placeholder="Select Year"
                      error={errors.year}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label htmlFor="eventName" className="input-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Event Name</label>
              <Controller
                name="eventName"
                control={control}
                render={({ field }) => (
                  <Select
                    id="eventName"
                    name="eventName"
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={eventOptions}
                    placeholder="Select Event"
                    error={errors.eventName}
                  />
                )}
              />
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
