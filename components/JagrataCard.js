// ============================================================
//  KHATUSHYAM JI JAGRATA CARD COMPONENT
//  Props received from App: onBack()
//  Global deps: React, html2canvas (loaded by index HTML)
// ============================================================

function JagrataCard({ onBack }) {
  const { useState } = React;

  /* ---------- FORM STATE ---------- */
  const [step, setStep] = useState("form"); // "form" | "card"
  const [form, setForm] = useState({
    guestName: "",
    organizerName: "",
    jagrataTitle: "",
    purpose: "",
    date: "",
    startTime: "",
    venue: "",
    venueAddress: "",
    prasad: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState({ text: "", show: false });

  /* ---------- PARTICLES ---------- */
  const particles = Array.from({ length: 22 }, (_, i) => ({
    icon: ["🪔", "🌸", "✨", "🪷", "⭐"][i % 5],
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
    if (!form.guestName.trim())     e.guestName = "Guest name is required";
    if (!form.organizerName.trim()) e.organizerName = "Organizer name is required";
    if (!form.jagrataTitle.trim())  e.jagrataTitle = "Jagrata title / name is required";
    if (!form.purpose.trim())       e.purpose = "Purpose of Jagrata is required";
    if (!form.date.trim())          e.date = "Date is required";
    if (!form.venue.trim())         e.venue = "Venue name is required";
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
    const el = document.getElementById("jagrata-card-print");
    if (!el) return;
    setDownloading(true);
    html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null, logging: false })
      .then(canvas => {
        const link = document.createElement("a");
        link.download = `Jagrata_Card_${form.jagrataTitle.replace(/\s+/g,"_")}.png`;
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("✅ Card downloaded to your Downloads folder!");
      })
      .catch(() => showToast("⚠️ Download failed. Please try again."))
      .finally(() => setDownloading(false));
  }

  const formatDate = d => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  };

  const formatTime = t => {
    if (!t) return "Ratri 9:00 Baje Se";
    const [h, m] = t.split(":");
    const hr = parseInt(h);
    const ampm = hr >= 12 ? "PM" : "AM";
    return `${hr % 12 || 12}:${m} ${ampm}`;
  };

  /* ============================
     FORM VIEW
  ============================ */
  if (step === "form") {
    return (
      <div className="form-screen jagrata-form-bg">
        {particles.map((p, i) => (
          <div key={i} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
            {p.icon}
          </div>
        ))}

        <div className="form-card">
          <div className="form-header jagrata-form-header">
            <span className="form-header-icon">🪔</span>
            <h2>Khatushyam Jagrata Card</h2>
            <p>Fill in the details to generate your Jagrata invitation card — Jai Shree Khatu Shyam!</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">

              <div className="form-group">
                <label>Guest Name <span className="req">*</span></label>
                <input name="guestName" value={form.guestName} onChange={handleChange} placeholder="Who is this card for?" className={errors.guestName ? "error" : ""} />
                {errors.guestName && <span className="err-msg">{errors.guestName}</span>}
              </div>

              <div className="form-group">
                <label>Organizer / Family Name <span className="req">*</span></label>
                <input name="organizerName" value={form.organizerName} onChange={handleChange} placeholder="e.g. Sharma Parivaar" className={errors.organizerName ? "error" : ""} />
                {errors.organizerName && <span className="err-msg">{errors.organizerName}</span>}
              </div>

              <div className="form-group span-2">
                <label>Jagrata Title / Name <span className="req">*</span></label>
                <input name="jagrataTitle" value={form.jagrataTitle} onChange={handleChange} placeholder="e.g. Shri Khatu Shyam Baba Ki Jagrata, Annual Shyam Bhajan Ratri" className={errors.jagrataTitle ? "error" : ""} />
                {errors.jagrataTitle && <span className="err-msg">{errors.jagrataTitle}</span>}
              </div>

              <div className="form-group span-2">
                <label>Purpose of Jagrata <span className="req">*</span></label>
                <textarea name="purpose" value={form.purpose} onChange={handleChange} rows="2"
                  placeholder="e.g. Mangal Kamna, Baba ke Ashirwad ke liye, Vivah Upalaksha mein, Navgrah Shanti hetu..."
                  className={errors.purpose ? "error" : ""} />
                {errors.purpose && <span className="err-msg">{errors.purpose}</span>}
              </div>

              <div className="form-group">
                <label>Date of Jagrata <span className="req">*</span></label>
                <input name="date" type="date" value={form.date} onChange={handleChange} className={errors.date ? "error" : ""} />
                {errors.date && <span className="err-msg">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label>Start Time</label>
                <input name="startTime" type="time" value={form.startTime} onChange={handleChange} />
              </div>

              <div className="form-group span-2">
                <label>Venue Name <span className="req">*</span></label>
                <input name="venue" value={form.venue} onChange={handleChange} placeholder="e.g. Shri Ram Mandir Parisar, Community Hall" className={errors.venue ? "error" : ""} />
                {errors.venue && <span className="err-msg">{errors.venue}</span>}
              </div>

              <div className="form-group span-2">
                <label>Venue Address</label>
                <input name="venueAddress" value={form.venueAddress} onChange={handleChange} placeholder="e.g. Sector 12, Dwarka, New Delhi – 110075" />
              </div>

              <div className="form-group span-2">
                <label>Prasad / Bhandara Details <span className="optional">(optional)</span></label>
                <input name="prasad" value={form.prasad} onChange={handleChange} placeholder="e.g. Prasad Vitran, Langar Seva, Bhandara" />
              </div>

              <div className="form-group span-2">
                <label>Personal Message / Satsang Note <span className="optional">(optional)</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="3"
                  placeholder="Add a personal note or devotional message for your guests..." />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-back" onClick={onBack}>← Back</button>
              <button type="submit" className="btn-generate jagrata-btn">🪔 Generate Card</button>
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
    <div className="card-screen jagrata-bg">
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize:`${p.size}px`, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }}>
          {p.icon}
        </div>
      ))}

      {/* Glow orbs */}
      <div className="jagrata-glow" style={{ top:"20%", left:"10%" }} />
      <div className="jagrata-glow" style={{ bottom:"20%", right:"10%", animationDelay:"1.5s" }} />

      <div className="card-wrapper">
        <div className="jagrata-card" id="jagrata-card-print">

          <div className="jagrata-border" />

          <span className="jagrata-deco" style={{ top:22,left:20 }}>🪷</span>
          <span className="jagrata-deco" style={{ top:22,right:20 }}>🪷</span>
          <span className="jagrata-deco" style={{ bottom:30,left:20 }}>🌸</span>
          <span className="jagrata-deco" style={{ bottom:30,right:20 }}>🌸</span>

          {/* To guest */}
          <div className="card-to-guest jagrata-to-guest">
            <span>🙏 Pranam,</span> <strong>{form.guestName}</strong>
          </div>

          <div className="jagrata-diyas">
            <span className="jagrata-diya">🪔</span>
            <span className="jagrata-diya">🪔</span>
            <span className="jagrata-diya">🪔</span>
          </div>

          <span className="jagrata-om">ॐ</span>

          <div className="jagrata-badge">🙏 श्री खाटू श्याम जी 🙏</div>
          <div className="jagrata-title">Jai Shree Khatu Shyam!</div>
          <div className="jagrata-title-hindi">जय श्री खाटू श्याम जी</div>

          <div className="jagrata-subtitle">— आपको सादर आमंत्रण है —</div>

          {/* Jagrata title */}
          <div className="jagrata-organizer">
            <div style={{ fontSize:14, marginBottom:4, color:"#8b3a00" }}>Aayojit Kar Rahe Hain</div>
            <strong>{form.organizerName}</strong>
          </div>

          <span className="jagrata-lotus">🪷</span>

          <div className="jagrata-divider">🌸 ✦ 🌸</div>

          {/* Main jagrata name */}
          <div style={{ fontSize:16, fontWeight:800, color:"#8b3a00", marginBottom:8, fontStyle:"italic" }}>
            "{form.jagrataTitle}"
          </div>

          {/* Purpose */}
          <div className="jagrata-purpose-box">
            <div className="jagrata-purpose-label">🌺 Uddeshya (Purpose)</div>
            <div className="jagrata-purpose-text">{form.purpose}</div>
          </div>

          <div className="jagrata-divider">🪔 ✦ 🪔</div>

          {/* Event details */}
          <div className="card-event-box jagrata-event-box">
            <div className="card-event-row">
              <span className="card-event-icon">📅</span>
              <span>{formatDate(form.date)}</span>
            </div>
            <div className="card-event-row">
              <span className="card-event-icon">⏰</span>
              <span>{formatTime(form.startTime)} Se Prabhat Tak</span>
            </div>
            <div className="card-event-row">
              <span className="card-event-icon">📍</span>
              <span><strong>{form.venue}</strong>{form.venueAddress ? `, ${form.venueAddress}` : ""}</span>
            </div>
            {form.prasad && (
              <div className="card-event-row">
                <span className="card-event-icon">🍛</span>
                <span>{form.prasad}</span>
              </div>
            )}
          </div>

          <div className="jagrata-divider">🌸 ✦ 🌸</div>

          <div className="jagrata-message">
            {form.message
              ? <><em>"{form.message}"</em><br/><br/></>
              : null}
            <strong>Shyam Baba ka Ashirwad</strong> aap par sada bana rahe. 🙏<br/>
            <em>"Hare ka Sahara, Baba Shyam Hamara"</em> 🪔<br/>
            Sadar Nimantran — Parivaar sahit padharen.
          </div>

          <div className="jagrata-divider">🌸 ✦ 🌸</div>
          <div className="jagrata-footer">🪔🌸🙏🌸🪔</div>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn-back-card" onClick={() => setStep("form")}>✏️ Edit Details</button>
        <button className="btn-back-card outline" onClick={onBack}>← Choose Another</button>
        <button className="btn-download jagrata-dl-btn" disabled={downloading} onClick={handleDownload}>
          {downloading ? "⏳ Preparing..." : "⬇️ Download Card"}
        </button>
      </div>

      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.text}</div>
    </div>
  );
}
