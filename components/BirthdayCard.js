// ============================================================
//  BIRTHDAY CARD COMPONENT
//  Props received from App: onBack()
//  Global deps: React, html2canvas (loaded by index HTML)
// ============================================================

function BirthdayCard({ onBack }) {
  const { useState } = React;

  /* ---------- FORM STATE ---------- */
  const [step, setStep] = useState("form"); // "form" | "card"
  const [form, setForm] = useState({
    guestName: "",
    birthdayPerson: "",
    age: "",
    date: "",
    venue: "",
    venueAddress: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState({ text: "", show: false });

  /* ---------- PARTICLES ---------- */
  const particles = Array.from({ length: 22 }, (_, i) => ({
    icon: ["🎈", "🎊", "⭐", "✨", "🎉"][i % 5],
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
    if (!form.guestName.trim())      e.guestName = "Guest name is required";
    if (!form.birthdayPerson.trim()) e.birthdayPerson = "Birthday person name is required";
    if (!form.age.trim())            e.age = "Which birthday? (age) is required";
    if (!form.date.trim())           e.date = "Date is required";
    if (!form.venue.trim())          e.venue = "Venue name is required";
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
    const el = document.getElementById("bday-card-print");
    if (!el) return;
    setDownloading(true);
    html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null, logging: false })
      .then(canvas => {
        const link = document.createElement("a");
        link.download = `Birthday_Card_${form.birthdayPerson.replace(/\s+/g, "_")}.png`;
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
      <div className="form-screen bday-form-bg">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
            {p.icon}
          </div>
        ))}

        <div className="form-card">
          <div className="form-header bday-form-header">
            <span className="form-header-icon">🎂</span>
            <h2>Birthday Card Details</h2>
            <p>Fill in the details to generate your personalised birthday invitation card</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">

              <div className="form-group">
                <label>Guest Name <span className="req">*</span></label>
                <input name="guestName" value={form.guestName} onChange={handleChange} placeholder="Who is this card for?" className={errors.guestName ? "error" : ""} />
                {errors.guestName && <span className="err-msg">{errors.guestName}</span>}
              </div>

              <div className="form-group">
                <label>Birthday Person's Name <span className="req">*</span></label>
                <input name="birthdayPerson" value={form.birthdayPerson} onChange={handleChange} placeholder="e.g. Priya Sharma" className={errors.birthdayPerson ? "error" : ""} />
                {errors.birthdayPerson && <span className="err-msg">{errors.birthdayPerson}</span>}
              </div>

              <div className="form-group">
                <label>Which Birthday? (Age) <span className="req">*</span></label>
                <input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} placeholder="e.g. 25" className={errors.age ? "error" : ""} />
                {errors.age && <span className="err-msg">{errors.age}</span>}
              </div>

              <div className="form-group">
                <label>Date of Celebration <span className="req">*</span></label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className={errors.date ? "error" : ""} />
                {errors.date && <span className="err-msg">{errors.date}</span>}
              </div>

              <div className="form-group span-2">
                <label>Venue Name <span className="req">*</span></label>
                <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. The Grand Ballroom, Hotel Taj" className={errors.venue ? "error" : ""} />
                {errors.venue && <span className="err-msg">{errors.venue}</span>}
              </div>

              <div className="form-group span-2">
                <label>Venue Address</label>
                <input name="venueAddress" value={form.venueAddress} onChange={handleChange} placeholder="e.g. 12, MG Road, New Delhi – 110001" />
              </div>

              <div className="form-group span-2">
                <label>Personal Message <span className="optional">(optional)</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Add a personal birthday wish or note for your guest..." rows="3" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-back" onClick={onBack}>← Back</button>
              <button type="submit" className="btn-generate bday-btn">🎂 Generate Card</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* ============================
     CARD VIEW
  ============================ */
  return (
    <div className="card-screen bday-bg">
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
          {p.icon}
        </div>
      ))}

      <div className="card-wrapper">
        <div className="bday-card" id="bday-card-print">

          {/* Shimmer top bar via ::before */}
          <span className="bday-deco" style={{ top:16,left:16 }}>🎀</span>
          <span className="bday-deco" style={{ top:16,right:16 }}>🎀</span>
          <span className="bday-deco" style={{ bottom:16,left:16 }}>⭐</span>
          <span className="bday-deco" style={{ bottom:16,right:16 }}>⭐</span>

          {/* To guest */}
          <div className="card-to-guest">
            <span>Dear</span> <strong>{form.guestName}</strong>
          </div>

          <div className="bday-balloons">
            <span className="bday-balloon">🎈</span>
            <span className="bday-balloon">🎊</span>
            <span className="bday-balloon">🎈</span>
          </div>

          <div className="bday-badge">✨ You're Invited ✨</div>
          <div className="bday-title">Happy Birthday!</div>
          <div className="bday-subtitle">Join us to celebrate</div>

          <div className="bday-name">🎉 {form.birthdayPerson} 🎉</div>

          <div className="bday-age-row">
            <div className="bday-age-badge">{ordinal(parseInt(form.age))}</div>
            <div className="bday-age-label">Birthday Celebration</div>
          </div>

          <div className="bday-cake-wrap">
            <div className="sparkles">
              {["✨","⭐","💫","✨","⭐"].map((s,i)=><span key={i} className="sparkle">{s}</span>)}
            </div>
            <span className="bday-cake">🎂</span>
          </div>

          {/* Event details */}
          <div className="card-event-box bday-event-box">
            <div className="card-event-row">
              <span className="card-event-icon">📅</span>
              <span>{formatDate(form.date)}</span>
            </div>
            <div className="card-event-row">
              <span className="card-event-icon">📍</span>
              <span><strong>{form.venue}</strong>{form.venueAddress ? `, ${form.venueAddress}` : ""}</span>
            </div>
          </div>

          {(form.message || (!form.message)) && (
            <div className="bday-message">
              {form.message
                ? <><em>"{form.message}"</em><br/><br/></>
                : null}
              May your day be filled with laughter, love &amp; joy! 🥂<br/>
              <strong>We look forward to celebrating with you.</strong>
            </div>
          )}

          <div className="bday-footer">🎶🌟🎶🌟🎶</div>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-back-card" onClick={() => setStep("form")}>✏️ Edit Details</button>
        <button className="btn-back-card outline" onClick={onBack}>← Choose Another</button>
        <button className="btn-download bday-dl-btn" disabled={downloading} onClick={handleDownload}>
          {downloading ? "⏳ Preparing..." : "⬇️ Download Card"}
        </button>
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.text}</div>
    </div>
  );
}
