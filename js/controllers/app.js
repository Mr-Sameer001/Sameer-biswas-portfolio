/* CONTROLLER — wires events, updates Model, asks View to re-render. */
(function () {
  const M = Biogi.Model, V = Biogi.View;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Animated counters / rings (play once when visible) */
  function countTo(el, to, cb) {
    if (reduce) return cb(to);
    const t0 = performance.now(), D = 1400;
    (function f(t) { const k = Math.min((t - t0) / D, 1); cb(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(f); })(t0);
  }
  function initObservers() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target); const el = e.target;
      if (el.dataset.ring) countTo(el, +el.dataset.ring, v => { el.style.setProperty("--p", v); el.firstElementChild.textContent = v + "%"; });
      else if (el.dataset.count) countTo(el, +el.dataset.count, v => el.textContent = v + "%");
      else el.classList.add("in");
    }), { threshold: .3 });
    $$("[data-ring],[data-count],.tl-item,.plan,.post,.svc").forEach(el => io.observe(el));
  }

  /* Scroll spy */
  function initSpy() {
    const links = $$("[data-nav]");
    const map = { skills: "resume", awards: "resume" };
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; const id = map[e.target.id] || e.target.id;
      links.forEach(l => { const on = l.dataset.nav === id; l.classList.toggle("active", on); on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"); });
    }), { rootMargin: "-40% 0px -55% 0px" });
    $$("main section").forEach(s => io.observe(s));
  }

  /* Delegated clicks */
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-filter]");
    if (f) { M.state.filter = f.dataset.filter; V.portfolioGrid(M); return; }
    const d = e.target.closest("[data-slide]");
    if (d) { M.state.slide = +d.dataset.slide; V.slides(M); return; }
    const n = e.target.closest("#sidebar a[href^='#']");
    if (n) { const oc = bootstrap.Offcanvas.getInstance($("#sidebar")); oc && oc.hide(); }
    if (e.target.closest("[data-action='cv']")) { e.preventDefault(); V.toast("CV download will start soon (connect your PDF file)."); }
    const p = e.target.closest("[data-plan]");
    if (p) { const s = $("#subject"); if (s) s.value = p.dataset.plan; }
  });

  /* Form validation + mock submit */
  function validate(f) {
    let ok = true;
    ["name", "email", "subject", "message"].forEach(k => {
      const i = f[k], v = i.value.trim(); let msg = "";
      if (!v) msg = "Please enter your " + k + ".";
      else if (k === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = "Enter a valid email, like name@example.com.";
      $("#" + k + "-e").textContent = msg; i.setAttribute("aria-invalid", !!msg); i.classList.toggle("bad", !!msg);
      i.setAttribute("aria-describedby", k + "-e"); if (msg) ok = false;
    });
    return ok;
  }
  document.addEventListener("submit", e => {
    if (e.target.id !== "form") return; e.preventDefault();
    const f = e.target; if (!validate(f)) { f.querySelector("[aria-invalid='true']").focus(); return; }
    const b = f.querySelector("button"); b.disabled = true; b.querySelector(".lbl").textContent = "Sending…";
    setTimeout(() => { b.disabled = false; b.querySelector(".lbl").textContent = "Submit Now"; f.reset(); V.toast("Message sent. I'll reply within 24 hours."); }, 900); // replace with fetch() to your backend
  });

  /* Auto slide testimonials (paused on hover/focus & reduced motion) */
  let timer; const slider = () => { if (reduce) return; clearInterval(timer); timer = setInterval(() => { const pages = $$("#dots button").length; M.state.slide = (M.state.slide + 1) % pages; V.slides(M); }, 5000); };
  document.addEventListener("mouseover", e => e.target.closest("#slides") && clearInterval(timer));
  document.addEventListener("mouseout", e => e.target.closest("#slides") && slider());
  addEventListener("resize", () => V.slides(M));

  /* Boot */
  V.renderAll(M); initObservers(); initSpy(); slider();
  document.body.classList.add("ready");
})();
