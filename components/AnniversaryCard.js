// ============================================================
//  ANNIVERSARY CARD COMPONENT
//  Props received from App: onBack()
//  Global deps: React, html2canvas (loaded by index HTML)
// ============================================================

function AnniversaryCard({ onBack }) {
  const { useState } = React;

  /* ---------- FORM STATE ---------- */
  const [step, setStep] = useState("form"); // "form" | "card"
  const [form, setForm] = useState({
    guestName: "",
    partner1: "",
    partner2: "",
    years: "",
    date: "",
    venue: "",
    venueAddress: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState({ text: "", show: false });

  /* ---------- PARTICLES ---------- */
  const particles = Array.from({ length: 22 }, (_, i) => ({
    icon: ["❤️", "💕", "🌹", "💖", "✨"][i % 5],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 14 + Math.random() * 16,
    dur: 5 + Math.random() * 5,
    delay: Math.random() * 4,
  }));

  /* ---------- HELPERS ---------- */
  function showToast(msg) {
    setToast({ text: msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
  }

  function validate() {
    const e = {};
    if (!form.guestName.trim()) e.guestName = "Guest name is required";
    if (!form.partner1.trim())  e.partner1 = "Partner 1 name is required";
    if (!form.partner2.trim())  e.partner2 = "Partner 2 name is required";
    if (!form.years.trim())     e.years = "Anniversary year is required";
    if (!form.date.trim())      e.date = "Date is required";
    if (!form.venue.trim())     e.venue = "Venue name is required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep("card");
  }

  function handleDownload() {
    const el = document.getElementById("anniv-card-print");
    if (!el) return;
    setDownloading(true);
    html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null, logging: false })
      .then(canvas => {
        const link = document.createElement("a");
        link.download = `Anniversary_Card_${form.partner1.replace(/\s+/g,"_")}_${form.partner2.replace(/\s+/g,"_")}.png`;
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("✅ Card downloaded to your Downloads folder!");
      })
      .catch(() => showToast("⚠️ Download failed. Please try again."))
      .finally(() => setDownloading(false));
  }

  const ordinal = n => {
    const s = ["th","st","nd","rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const formatDate = d => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  };

  /* ============================
     FORM VIEW
  ============================ */
  if (step === "form") {
    return (
      <div className="form-screen anniv-form-bg">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
            {p.icon}
          </div>
        ))}

        <div className="form-card">
          <div className="form-header anniv-form-header">
            <span className="form-header-icon">💍</span>
            <h2>Anniversary Card Details</h2>
            <p>Fill in the details to generate your personalised anniversary invitation card</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">

              <div className="form-group">
                <label>Guest Name <span className="req">*</span></label>
                <input name="guestName" value={form.guestName} onChange={handleChange} placeholder="Who is this card for?" className={errors.guestName ? "error" : ""} />
                {errors.guestName && <span className="err-msg">{errors.guestName}</span>}
              </div>

              <div className="form-group">
                <label>Which Anniversary? (Years) <span className="req">*</span></label>
                <input name="years" type="number" min="1" max="100" value={form.years} onChange={handleChange} placeholder="e.g. 25" className={errors.years ? "error" : ""} />
                {errors.years && <span className="err-msg">{errors.years}</span>}
              </div>

              <div className="form-group">
                <label>Partner 1 – Name <span className="req">*</span></label>
                <input name="partner1" value={form.partner1} onChange={handleChange} placeholder="e.g. Rahul Sharma" className={errors.partner1 ? "error" : ""} />
                {errors.partner1 && <span className="err-msg">{errors.partner1}</span>}
              </div>

              <div className="form-group">
                <label>Partner 2 – Name <span className="req">*</span></label>
                <input name="partner2" value={form.partner2} onChange={handleChange} placeholder="e.g. Priya Sharma" className={errors.partner2 ? "error" : ""} />
                {errors.partner2 && <span className="err-msg">{errors.partner2}</span>}
              </div>

              <div className="form-group">
                <label>Date of Celebration <span className="req">*</span></label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className={errors.date ? "error" : ""} />
                {errors.date && <span className="err-msg">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label>Time of Event</label>
                <input name="time" type="time" value={form.time} onChange={handleChange} />
              </div>

              <div className="form-group span-2">
                <label>Venue Name <span className="req">*</span></label>
                <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. The Imperial Banquet, Hotel Grand" className={errors.venue ? "error" : ""} />
                {errors.venue && <span className="err-msg">{errors.venue}</span>}
              </div>

              <div className="form-group span-2">
                <label>Venue Address</label>
                <input name="venueAddress" value={form.venueAddress} onChange={handleChange} placeholder="e.g. 22, Connaught Place, New Delhi – 110001" />
              </div>

              <div className="form-group span-2">
                <label>Personal Message <span className="optional">(optional)</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Add a romantic or heartfelt note for your guests..." rows="3" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-back" onClick={onBack}>← Back</button>
              <button type="submit" className="btn-generate anniv-btn">💍 Generate Card</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* ============================
     CARD VIEW
  ============================ */
  const formatTime = t => {
    if (!t) return "";
    const [h, m] = t.split(":");
    const hr = parseInt(h), ampm = hr >= 12 ? "PM" : "AM";
    return `${hr % 12 || 12}:${m} ${ampm}`;
  };

  return (
    <div className="card-screen anniv-bg">
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
          {p.icon}
        </div>
      ))}

      <div className="card-wrapper">
        <div className="anniv-card" id="anniv-card-print">

          <span className="anniv-deco" style={{ top:20,left:18 }}>🌹</span>
          <span className="anniv-deco" style={{ top:20,right:18 }}>🌹</span>
          <span className="anniv-deco" style={{ bottom:28,left:18 }}>💕</span>
          <span className="anniv-deco" style={{ bottom:28,right:18 }}>💕</span>

          {/* To guest */}
          <div className="card-to-guest anniv-to-guest">
            <span>Dear</span> <strong>{form.guestName}</strong>
          </div>

          <div className="anniv-roses">
            <span className="anniv-rose">🌹</span>
            <span className="anniv-rose">💍</span>
            <span className="anniv-rose">🌹</span>
          </div>

          <div className="anniv-badge">💖 You're Invited 💖</div>
          <div className="anniv-title">Happy Anniversary!</div>
          <div className="anniv-subtitle">Join us in celebrating</div>

          <div className="anniv-names">💑 {form.partner1} &amp; {form.partner2} 💑</div>

          <span className="anniv-rings">💍</span>

          <div className="anniv-years-row">
            <div className="anniv-years">
              <span style={{ fontSize:26, fontWeight:900 }}>{ordinal(parseInt(form.years))}</span>
              <span className="anniv-years-sub">Anniversary</span>
            </div>
          </div>

          <div className="anniv-divider">❤️</div>

          {/* Event details */}
          <div className="card-event-box anniv-event-box">
            <div className="card-event-row">
              <span className="card-event-icon">📅</span>
              <span>{formatDate(form.date)}{form.time ? ` at ${formatTime(form.time)}` : ""}</span>
            </div>
            <div className="card-event-row">
              <span className="card-event-icon">📍</span>
              <span><strong>{form.venue}</strong>{form.venueAddress ? `, ${form.venueAddress}` : ""}</span>
            </div>
          </div>

          <div className="anniv-divider">🌹</div>

          <div className="anniv-message">
            {form.message
              ? <><em>"{form.message}"</em><br/><br/></>
              : null}
            Every love story is beautiful — <strong>but yours is our favourite. 🌹</strong><br/>
            We would be honoured to have you celebrate with us. 💕
          </div>

          <div className="anniv-divider">🌹</div>
          <div className="anniv-footer">💕🌹💍🌹💕</div>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-back-card" onClick={() => setStep("form")}>✏️ Edit Details</button>
        <button className="btn-back-card outline" onClick={onBack}>← Choose Another</button>
        <button className="btn-download anniv-dl-btn" disabled={downloading} onClick={handleDownload}>
          {downloading ? "⏳ Preparing..." : "⬇️ Download Card"}
        </button>
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.text}</div>
    </div>
  );
}
