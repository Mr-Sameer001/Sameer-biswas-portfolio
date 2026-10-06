/* VIEW — turns Model data into DOM. No business logic, no event wiring (except via data-* hooks). */
Biogi.View = (function () {
  const $ = (s, r = document) => r.querySelector(s);
  const h = (id, html) => { $("#" + id).innerHTML = html; };
  const grad = g => `linear-gradient(135deg,${g[0]},${g[1]})`;
  const title = t => `<h2 class="sec-title">${t}<span>.</span></h2>`;
  const avatar = (cls = "") => `<div class="avatar ${cls}" role="img" aria-label="Portrait of Jessica Biogi">${Biogi.Model.profile.name.split(" ").map(w => w[0]).join("")}</div>`;

  function sidebar(m) {
    $("#sidebar").innerHTML = `
      <div class="offcanvas-body flex-column p-3 p-lg-4">
        <button class="btn-close d-lg-none ms-auto mb-2" data-bs-dismiss="offcanvas" data-bs-target="#sidebar" aria-label="Close menu"></button>
        ${avatar("avatar-sm")}
        <h1 class="side-name">${m.profile.name}</h1><p class="side-role">${m.profile.role}</p>
        <nav class="side-nav" aria-label="Sections">${m.nav.map(n => `<a href="#${n[0]}" data-nav="${n[0]}"><i class="bi bi-${n[1]}"></i>${n[2]}</a>`).join("")}</nav>
        <a class="btn btn-pink mt-auto" href="assets/Sameer_Biswas_CV.pdf" download><i class="bi bi-download me-2"></i>Download CV</a>
      </div>`;
  }

  function hero(m) {
    const p = m.profile;
    h("home", `<div class="hero container-xl">
      <div class="row align-items-center g-4">
        <div class="col-lg-6 hero-copy">
          <h2 class="hero-name"><span class="hl">${p.first}</span><br><span class="hl2">${p.last}</span></h2>
          <p class="hero-tag">${p.tag}</p>
          <p class="text-muted-2">${p.intro}</p>
          <div class="d-flex gap-2 flex-wrap"><a href="#portfolio" class="btn btn-brand">View Work</a><a href="#contact" class="btn btn-yellow">Contact Me</a></div>
        </div>
        <div class="col-lg-6 hero-art">
          <div class="art-blob"></div><div class="art-tri"></div>
          ${avatar("avatar-lg")}
          <svg class="badge-spin" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs><text><textPath href="#c">WORDPRESS • PHP • LARAVEL • MYSQL •</textPath></text></svg>
          <div class="glass"><p class="mb-1">${p.worked}</p><div class="d-flex align-items-center gap-2"><span class="faces"><i></i><i></i><i></i></span><small>${p.years}<br>Years</small></div></div>
        </div>
      </div>
      <p class="mt-5 mb-3 small text-muted-2">Where I have worked and what I build with</p>
      <div class="row g-3">${p.brands.map(b => `<div class="col-6 col-md-3"><div class="brand-pill">${b}</div></div>`).join("")}</div>
    </div>`);
  }

  function about(m) {
    const p = m.profile;
    h("about", `<div class="container-xl">${title("About Me")}<p class="text-muted-2 mw">${p.bio}</p>
      <dl class="info">${p.info.map(i => `<div><dt>${i[0]}</dt><dd>${i[1]}</dd></div>`).join("")}</dl></div>`);
  }

  const tl = arr => arr.map(e => `<li class="tl-item"><h4>${e.t}</h4><small>${e.s}</small><p>${e.d}</p></li>`).join("");
  function resume(m) {
    h("resume", `<div class="container-xl"><div class="row g-5">
      <div class="col-md-6">${title("Education")}<ul class="tl">${tl(m.education)}</ul></div>
      <div class="col-md-6">${title("Experience")}<ul class="tl">${tl(m.experience)}</ul></div></div></div>`);
  }

  function skills(m) {
    h("skills", `<div class="container-xl">${title("Coding Skills")}
      <div class="d-flex flex-wrap gap-4 mb-5">${m.coding.map((s, i) => `<div class="ring" data-ring="${s[1]}" style="--c:${["#ffe14d","#ff6b9d","#00cc97","#31a8ff","#6c3df4","#ff8a5b"][i]}" role="img" aria-label="${s[0]} ${s[1]} percent"><b>0%</b></div>`).join("")}</div>
      ${title("Tools & Platforms")}
      <div class="d-flex flex-wrap gap-3">${m.design.map(d => `<div class="chip" style="--c:${d[2]}"><i class="dot"></i><b data-count="${d[1]}">0%</b><small>${d[0]}</small></div>`).join("")}</div></div>`);
  }

  function awards(m) {
    h("awards", `<div class="container-xl">${title("Achievements")}<div class="row g-3">${m.awards.map(a => `
      <div class="col-md-6"><article class="card-d award"><small class="yr">${a.y}</small><i class="bi bi-trophy fs-2"></i>
      <h3>${a.n}</h3><span class="win">${a.s}</span></article></div>`).join("")}</div></div>`);
  }

  function services(m) {
    h("services", `<div class="container-xl">${title("Services")}
      <p class="eyebrow">Fast, structured and search-friendly web builds</p>
      <p class="text-muted-2 mw">From WordPress and WooCommerce sites to Laravel applications, I build responsive, database-driven products and tune them for speed and SEO.</p>
      <div class="row g-4 mt-1">${m.services.map(s => `<div class="col-6 col-lg-3"><article class="svc"><span class="svc-i" style="--c:${s.c}"><i class="bi bi-${s.i}"></i></span>
      <h3>${s.t}</h3><p>${s.d}</p><a href="#contact" aria-label="Ask about ${s.t}"><i class="bi bi-arrow-down-right"></i></a></article></div>`).join("")}</div></div>`);
  }

  function portfolio(m) {
    h("portfolio", `<div class="container-xl">${title("Portfolio")}
      <div class="filters" role="group" aria-label="Filter projects">${m.filters.map(f => `<button class="btn btn-sm btn-filter${f[0] === m.state.filter ? " active" : ""}" data-filter="${f[0]}" aria-pressed="${f[0] === m.state.filter}">${f[1]}</button>`).join("")}</div>
      <div class="row g-3" id="grid"></div>
      <p id="empty" class="text-muted-2 d-none">No projects in this category yet.</p></div>`);
    portfolioGrid(m);
  }
  function portfolioGrid(m) {
    const list = m.portfolio.filter(p => m.state.filter === "all" || p.cat === m.state.filter);
    $("#grid").innerHTML = list.map(p => `<div class="col-6 col-lg-4 pf-item"><a href="#contact" class="pf" aria-label="${p.t}"><div class="pf-img" style="background:${grad(p.g)}"><i class="bi bi-plus-lg"></i></div><h3>${p.t}</h3><small>${(m.filters.find(f => f[0] === p.cat) || [])[1] || p.cat}</small></a></div>`).join("");
    $("#empty").classList.toggle("d-none", list.length > 0);
    document.querySelectorAll("[data-filter]").forEach(b => { const on = b.dataset.filter === m.state.filter; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on); });
  }

  function pricing(m) {
    h("pricing", `<div class="container-xl">${title("Packages")}${m.pricing.map(p => `
      <article class="plan"><div class="plan-head" style="background:${p.c}"><i class="bi bi-${p.i} fs-3"></i><span>${p.n}</span>
        <div class="price">${p.p}</div></div>
        <ul class="plan-list">${p.f.map(f => `<li><i class="bi bi-check2-all"></i>${f}</li>`).join("")}</ul>
        <div class="plan-cta"><a href="#contact" class="btn btn-brand" data-plan="${p.n}">Get a Quote</a><small>Final quote after reviewing your requirements</small></div></article>`).join("")}</div>`);
  }

  function testimonials(m) {
    h("blog", `<div class="container-xl">${title("How I Work")}
      <p class="text-muted-2 mw">The principles behind my projects, drawn from my client and backend work.</p>
      <div class="slides" id="slides" aria-live="polite"></div><div class="dots" id="dots"></div></div>
      <div class="container-xl mt-5" id="blogs"></div>`);
    slides(m);
    $("#blogs").innerHTML = `${title("Blogs")}${m.blogs.map(b => `<article class="post"><div class="post-img" style="background:${grad(b.g)}"><span class="date"><b>${b.d}</b>${b.m}</span></div>
      <div><small class="text-muted-2">${b.d} ${b.m} ${b.y} / ${b.cat}</small><h3>${b.t}</h3><p class="text-muted-2">${b.x}</p><a href="#blogs" class="btn btn-brand btn-sm">Read More <i class="bi bi-arrow-right"></i></a></div></article>`).join("")}`;
  }
  function slides(m) {
    const per = innerWidth >= 768 ? 2 : 1, pages = Math.ceil(m.testimonials.length / per), s = Math.min(m.state.slide, pages - 1);
    $("#slides").innerHTML = m.testimonials.slice(s * per, s * per + per).map(t => `<blockquote class="quote"><i class="bi bi-quote"></i><p>${t.q}</p><footer><b>${t.n}</b><small>${t.r}</small></footer></blockquote>`).join("");
    $("#dots").innerHTML = Array.from({length: pages}, (_, i) => `<button data-slide="${i}" class="${i === s ? "on" : ""}" aria-label="Show testimonials ${i + 1}"></button>`).join("");
  }

  function contact(m) {
    const c = m.contact;
    h("contact", `<div class="container-xl">${title("Get In Touch")}<p class="eyebrow">Available for WordPress, PHP and Laravel projects</p>
      <div class="row g-3 mb-4"><div class="col-md-6"><a class="card-d ct" href="mailto:${c.email}"><i class="bi bi-envelope-fill"></i><span><small>Email</small>${c.email}</span></a></div>
      <div class="col-md-6"><a class="card-d ct" href="tel:${c.phone.replace(/\s/g, "")}"><i class="bi bi-telephone-fill"></i><span><small>Phone</small>${c.phone}</span></a></div></div>
      <form id="form" novalidate class="row g-4">
        ${[["name","Name","text","Your name"],["email","Email","email","Your email"],["subject","Subject","text","Your subject"]].map(f => `<div class="col-md-6"><label for="${f[0]}">${f[1]}</label><input class="line" id="${f[0]}" name="${f[0]}" type="${f[2]}" placeholder="${f[3]}" required><div class="err" id="${f[0]}-e"></div></div>`).join("")}
        <div class="col-md-6"><label for="message">Message</label><textarea class="line" id="message" name="message" rows="1" placeholder="Write your text..." required></textarea><div class="err" id="message-e"></div></div>
        <div class="col-12"><button class="btn btn-brand" type="submit"><span class="lbl">Submit Now</span></button></div></form>
      <div class="map mt-5"><iframe title="Office location map" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=77.5,28.7,81.1,31.5"></iframe></div></div>`);
  }

  function toast(msg) { $("#toastMsg").textContent = msg; bootstrap.Toast.getOrCreateInstance($("#toast"), {delay: 3000}).show(); }

  function renderAll(m) { sidebar(m); hero(m); about(m); resume(m); skills(m); awards(m); services(m); portfolio(m); pricing(m); testimonials(m); contact(m); $("#year").textContent = new Date().getFullYear(); }

  return { renderAll, portfolioGrid, slides, toast };
})();
