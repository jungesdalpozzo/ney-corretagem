(() => {
  const { properties } = window.NEY;
  const params = new URLSearchParams(location.search);
  const index = Math.max(0, properties.findIndex(p => p.slug === params.get("id")));
  const p = properties[index];
  const next = properties[(index + 1) % properties.length];
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTemporada = p.mode === "Temporada";
  let lightboxOpen = false;

  /* ---------- Conteúdo ---------- */
  document.title = `${p.title} · ${p.city} — Portal dos Sonhos`;
  $("#curtain-title").textContent = p.title;
  const hero = $("#hero-img");
  hero.src = p.cover; hero.alt = `${p.title}, ${p.city}`;
  $("#hero-kicker").textContent = p.kicker;
  $("#hero-kicker").classList.add("fade-up");
  $("#hero-title").innerHTML = p.tagline.map(l => `<span class="line"><span>${esc(l)}</span></span>`).join("");
  $("#hero-sub").textContent = p.subtitle;
  $("#hero-sub").classList.add("fade-up");
  $("#hero-meta").innerHTML = [p.title, `${p.city} · ${p.region}`, isTemporada ? "Temporada" : p.price].map(t => `<span>${esc(t)}</span>`).join("");
  $("#hero-meta").classList.add("fade-up");
  $("#hero-index").textContent = `N° ${String(index + 1).padStart(2, "0")} / ${String(properties.length).padStart(2, "0")}`;
  if (p.video && !reduced) {
    const loop = document.createElement("video");
    Object.assign(loop, { src: p.video.loop, poster: p.video.poster, muted: true, loop: true, autoplay: true, playsInline: true });
    loop.setAttribute("muted", ""); loop.setAttribute("playsinline", ""); loop.setAttribute("aria-hidden", "true");
    loop.className = "hero-video";
    $("#hero-media").appendChild(loop);
    loop.play().catch(() => {});
  }
  if (p.video && p.video.src) {
    const reel = $("#video"), rv = $("#reel-video");
    reel.hidden = false;
    rv.poster = p.video.poster; rv.src = p.video.src;
    $("#reel-text").textContent = `${p.video.title}. Assista para percorrer a casa-sede, a estrutura e as pastagens antes mesmo da visita.`;
    $("#reel-play").addEventListener("click", () => { rv.controls = true; rv.play(); reel.classList.add("playing"); });
  }

  $("#intro-eyebrow").textContent = p.title;
  $("#intro-text").innerHTML = p.intro.split(" ").map(w => `<span class="w">${esc(w)}</span>`).join(" ");

  $("#stats").innerHTML = p.stats.map(s => `<div class="stat reveal"><strong data-v="${esc(s.v)}">${esc(s.v)}</strong><span>${esc(s.l)}</span></div>`).join("");

  $("#historia").innerHTML = p.chapters.map((c, i) => {
    const label = (p.images.find(im => im.file === c.img) || {}).label || c.t;
    return `<article class="chapter">
      <figure class="ch-media${/simula/i.test(label) ? " sim" : ""}" data-img="${esc(c.img)}"><div class="ch-par"><img src="${p.img(c.img)}" alt="${esc(label)}" loading="lazy"></div><figcaption>${esc(label)}</figcaption></figure>
      <div class="ch-copy"><span class="ch-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
        <p class="eyebrow reveal">${esc(c.k)}</p><h3 class="reveal d1">${esc(c.t)}</h3><p class="reveal d2">${esc(c.x)}</p></div>
    </article>`;
  }).join("");

  $("#quote-img").src = p.img(p.quote.img);
  $("#quote-side").src = p.images[Math.min(p.images.length - 1, 3)].src;
  $("#quote-text").textContent = p.quote.t;

  $("#gallery-count").textContent = p.images.length;
  $("#gallery-track").innerHTML = p.images.map((im, i) => `<button type="button" class="g-item${/simula/i.test(im.label) ? " sim" : ""}" data-i="${i}" aria-label="Ampliar: ${esc(im.label)}"><img src="${im.src}" alt="${esc(im.label)}" loading="lazy"><figcaption><span>${esc(im.label)}</span><b>${String(i + 1).padStart(2, "0")}</b></figcaption></button>`).join("");

  $("#highlights").innerHTML = p.highlights.map(h => `<li class="reveal">${esc(h)}</li>`).join("");

  $("#local-img").src = p.img(p.location.img);
  $("#local-img").alt = `Localização: ${p.title}`;
  $("#local-title").textContent = p.location.title;
  $("#local-text").textContent = p.location.text;
  $("#local-points").innerHTML = p.location.points.map(([k, t, d]) => `<div class="reveal"><small>${esc(k)}</small><div><strong>${esc(t)}</strong><span>${esc(d)}</span></div></div>`).join("");

  $("#contact-img").src = p.images[Math.min(2, p.images.length - 1)].src;
  $("#contact-eyebrow").textContent = isTemporada ? "Reservas · temporada" : "Contato · agende sua visita";
  $("#contact-title").innerHTML = `${esc(p.cta.title[0])}<span class="l2">${esc(p.cta.title[1])}</span>`;
  $("#contact-text").textContent = p.cta.text;
  $("#contact-button").textContent = p.cta.button;
  $("#contact-msg").placeholder = p.whatsapp;
  $("#booking-fields").hidden = !p.cta.booking;
  $("#bar-cta").textContent = isTemporada ? "Reservar" : "Agendar visita";

  const nextLink = $("#next");
  nextLink.href = next.url;
  $("#next-img").src = next.cover;
  document.querySelector('meta[name="description"]').content = `${p.title} · ${p.city}. ${p.subtitle}`;
  $("#next-title").textContent = next.title;
  $("#next-place").textContent = `${next.city} · ${next.mode === "Temporada" ? "Temporada" : next.type}`;
  $("#float-wa").href = p.whatsappUrl();

  /* ---------- Entrada ---------- */
  const start = performance.now();
  let ready = false;
  const go = () => {
    if (ready) return; ready = true;
    const wait = Math.max(0, 1100 - (performance.now() - start));
    setTimeout(() => { document.body.classList.add("is-ready"); setTimeout(() => document.body.classList.remove("is-loading"), 900); }, reduced ? 0 : wait);
  };
  if (hero.complete) go(); else { hero.addEventListener("load", go); hero.addEventListener("error", go); setTimeout(go, 2500); }
  setTimeout(go, 2600);

  /* ---------- Revelações ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    if (e.target.classList.contains("stat")) countUp(e.target.querySelector("strong"));
    io.unobserve(e.target);
  }), { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".chapter, .stat, .highlights-list li, .local-points > div, .contact").forEach(el => io.observe(el));
  document.querySelectorAll(".ch-media").forEach(el => el.closest(".chapter") && io.observe(el.closest(".chapter")));

  function countUp(el) {
    const m = el.dataset.v.match(/^([~+]?)([\d.]+)(.*)$/);
    if (!m || reduced) return;
    const [, pre, num, suf] = m, target = Number(num.replace(/\./g, ""));
    const t0 = performance.now(), dur = 1600;
    const tick = t => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + Math.round(target * e).toLocaleString("pt-BR") + suf;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Rolagem ---------- */
  const bar = $("#bar"), progress = $("#progress"), heroMedia = $(".hero-media"), heroInner = $(".hero-inner");
  const words = [...document.querySelectorAll("#intro-text .w")], introText = $("#intro-text");
  const quoteMedia = $(".quote-media"), quote = $("#quote"), localImg = $("#local-img"), local = $("#local");
  const pars = [...document.querySelectorAll(".ch-par")];
  const pin = $("#gallery-pin"), track = $("#gallery-track");
  const floatWa = $("#float-wa");
  const desktop = matchMedia("(min-width: 901px)");
  let lastY = scrollY, vh = innerHeight, trackMax = 0;

  function measure() {
    vh = innerHeight;
    if (desktop.matches && !reduced) {
      track.style.transform = "";
      trackMax = Math.max(0, track.scrollWidth - innerWidth);
      pin.classList.toggle("pinned", trackMax > 0);
      pin.style.setProperty("--pin-h", `${trackMax + vh}px`);
    } else {
      pin.classList.remove("pinned"); track.style.transform = ""; trackMax = 0;
    }
    onScroll();
  }

  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    bar.classList.toggle("solid", y > vh * 0.82);
    bar.classList.toggle("hide", y > lastY && y > vh * 1.1 && !lightboxOpen);
    floatWa.classList.toggle("show", y > vh * 0.6);
    lastY = y;
    if (reduced) { words.forEach(w => w.classList.add("on")); return; }

    if (y < vh * 1.2) {
      heroMedia.style.transform = `translate3d(0, ${y * 0.38}px, 0)`;
      heroInner.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
      heroInner.style.opacity = Math.max(0, 1 - y / (vh * 0.75));
    }

    const r = introText.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (vh * 0.62)));
    const n = Math.round(k * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < n));

    pars.forEach(el => {
      const b = el.parentElement.getBoundingClientRect();
      if (b.bottom < -100 || b.top > vh + 100) return;
      const off = (b.top + b.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${off * -9}%, 0)`;
    });

    const q = quote.getBoundingClientRect();
    if (q.bottom > 0 && q.top < vh) quoteMedia.style.transform = `translate3d(0, ${(q.top + q.height / 2 - vh / 2) * -0.22}px, 0)`;
    const l = local.getBoundingClientRect();
    if (l.bottom > 0 && l.top < vh) localImg.style.transform = `translate3d(0, ${(l.top + l.height / 2 - vh / 2) * -0.12}px, 0)`;

    if (trackMax > 0) {
      const pr = pin.getBoundingClientRect();
      const kk = Math.min(1, Math.max(0, -pr.top / (pr.height - vh)));
      track.style.transform = `translate3d(${-kk * trackMax}px, 0, 0)`;
    }
  }

  let ticking = false;
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener("resize", measure);
  addEventListener("load", measure);
  track.querySelectorAll("img").forEach(im => im.addEventListener("load", measure, { once: true }));
  measure();

  /* ---------- Tour 360° (Pannellum) ---------- */
  if (p.tour && p.tour.scenes && p.tour.scenes.length) {
    const sec = $("#tour"), stage = $("#tour-viewer"), cover = $("#tour-cover"), tabs = $("#tour-scenes");
    sec.hidden = false; $("#nav-tour").hidden = false;
    $("#tour-text").textContent = p.tour.text;
    cover.style.backgroundImage = `url("${p.cover}")`;
    tabs.innerHTML = p.tour.scenes.map((s, i) => `<button type="button" role="tab" data-id="${s.id}" aria-selected="${i === 0}">${String(i + 1).padStart(2, "0")} · ${esc(s.title)}</button>`).join("");
    let viewer = null, loading = null;
    const loadLib = () => loading || (loading = new Promise((res, rej) => {
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = "assets/vendor/pannellum/pannellum.css"; document.head.appendChild(css);
      const js = document.createElement("script"); js.src = "assets/vendor/pannellum/pannellum.js"; js.onload = res; js.onerror = rej; document.head.appendChild(js);
    }));
    const scenes = {};
    const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;
    // hfov máximo para que um panorama parcial preencha a tela na vertical
    const fitHfov = vaov => deg(2 * Math.atan(Math.tan(rad(vaov * 0.9 / 2)) * stage.clientWidth / Math.max(stage.clientHeight, 1)));
    p.tour.scenes.forEach(s => {
      scenes[s.id] = Object.assign({ type: "equirectangular", panorama: s.src, title: s.title, preview: s.preview, yaw: s.yaw || 0, pitch: s.pitch || 0, hfov: s.partial ? 80 : 100 },
        s.partial ? { haov: s.haov || 360, vaov: s.vaov || 180, vOffset: s.vOffset || 0, minYaw: -(s.haov || 360) / 2, maxYaw: (s.haov || 360) / 2, minPitch: (s.vOffset || 0) - (s.vaov || 180) / 2, maxPitch: (s.vOffset || 0) + (s.vaov || 180) / 2 } : Object.assign({ maxPitch: s.maxPitch == null ? 60 : s.maxPitch }, s.minPitch == null ? {} : { minPitch: s.minPitch }));
      if (s.hotspots) scenes[s.id].hotSpots = s.hotspots.map(h => ({
        pitch: h.pitch, yaw: h.yaw, cssClass: h.below ? "pds-hs below" : "pds-hs",
        createTooltipFunc: (div, label) => { const t = document.createElement("span"); t.textContent = label; div.appendChild(t); div.setAttribute("aria-label", label); },
        createTooltipArgs: h.label
      }));
      if (s.partial) { const f = Math.min(100, fitHfov(s.vaov || 180)); Object.assign(scenes[s.id], { hfov: Math.min(70, f), maxHfov: f, minHfov: Math.min(30, f * .6) }); }
    });
    const select = id => tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.id === id)));
    async function start(id) {
      await loadLib();
      if (!viewer) {
        viewer = window.pannellum.viewer(stage, {
          default: { firstScene: id || p.tour.scenes[0].id, autoLoad: true, sceneFadeDuration: 900, autoRotate: reduced ? 0 : -1.6, autoRotateInactivityDelay: 4000,
            compass: false, showControls: true, showZoomCtrl: true, showFullscreenCtrl: true, mouseZoom: false, keyboardZoom: true, minHfov: 40, maxHfov: 120,
            strings: { loadingLabel: "Carregando…", loadButtonLabel: "Clique para carregar", bylineLabel: "", genericWebGLError: "Seu navegador não conseguiu exibir o 360°.", noPanoramaError: "Panorama não encontrado." } },
          scenes
        });
        viewer.on("scenechange", select);
        viewer.on("mousedown", () => $("#tour-hint").classList.add("gone"));
        viewer.on("touchstart", () => $("#tour-hint").classList.add("gone"));
        sec.classList.add("live");
      } else if (id) viewer.loadScene(id);
      if (id) select(id);
    }
    $("#tour-start").addEventListener("click", () => start());
    tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) start(b.dataset.id); });
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { loadLib(); o.disconnect(); } }), { rootMargin: "600px" }).observe(sec);
  }

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox"), lbImg = $("#lb-img");
  let cur = 0;
  function show(i) {
    cur = (i + p.images.length) % p.images.length;
    const im = p.images[cur];
    lbImg.classList.remove("shown");
    const img = new Image();
    img.onload = img.onerror = () => { lbImg.src = im.src; lbImg.alt = im.label; requestAnimationFrame(() => lbImg.classList.add("shown")); };
    img.src = im.src;
    $("#lb-caption").textContent = im.label;
    $("#lb-count").textContent = `${cur + 1} / ${p.images.length}`;
  }
  function open(i) { lightboxOpen = true; lb.hidden = false; document.body.style.overflow = "hidden"; show(i); requestAnimationFrame(() => lb.classList.add("open")); $("#lb-close").focus(); }
  function close() { lb.classList.remove("open"); lightboxOpen = false; document.body.style.overflow = ""; setTimeout(() => { lb.hidden = true; }, 400); }
  track.addEventListener("click", e => { const b = e.target.closest(".g-item"); if (b) open(Number(b.dataset.i)); });
  document.querySelectorAll(".ch-media").forEach(f => f.addEventListener("click", () => open(Math.max(0, p.images.findIndex(im => im.file === f.dataset.img)))));
  $("#lb-close").addEventListener("click", close);
  $("#lb-prev").addEventListener("click", () => show(cur - 1));
  $("#lb-next").addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", e => { if (e.target === lb || e.target.tagName === "FIGURE") close(); });
  addEventListener("keydown", e => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "ArrowLeft") show(cur - 1);
  });
  let sx = null;
  lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 45) show(cur + (dx < 0 ? 1 : -1)); sx = null; });

  /* ---------- Cursor "Ver" ---------- */
  const cursor = $("#cursor");
  if (matchMedia("(hover: hover)").matches) {
    let moved = false;
    addEventListener("mousemove", e => { moved = true; cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; }, { passive: true });
    document.querySelectorAll(".g-item, .ch-media").forEach(el => {
      el.addEventListener("mouseenter", () => moved && cursor.classList.add("on"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("on"));
    });
    document.querySelectorAll(".ch-media").forEach(el => el.style.cursor = "none");
    track.querySelectorAll(".g-item").forEach(el => el.style.cursor = "none");
  }

  /* ---------- Formulário ---------- */
  const fmt = d => d ? d.split("-").reverse().join("/") : "";
  $("#contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const nome = (f.get("nome") || "").trim();
    let msg = (f.get("msg") || "").trim() || p.whatsapp;
    if (nome) msg = `${msg}\n\nMeu nome é ${nome}.`;
    if (p.cta.booking) {
      const extra = [f.get("chegada") && `Chegada: ${fmt(f.get("chegada"))}`, f.get("saida") && `Saída: ${fmt(f.get("saida"))}`, f.get("pessoas") && `Pessoas: ${f.get("pessoas")}`].filter(Boolean);
      if (extra.length) msg += "\n" + extra.join(" · ");
    }
    window.open(p.whatsappUrl(msg), "_blank", "noopener");
  });

  /* ---------- Transição para o próximo imóvel ---------- */
  [nextLink, ...document.querySelectorAll('a[href^="index.html"]')].forEach(a => a.addEventListener("click", e => {
    if (reduced || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    const c = document.querySelector(".curtain");
    $("#curtain-title").textContent = a === nextLink ? next.title : "Todos os imóveis";
    c.style.transition = "transform .8s cubic-bezier(.22,.8,.2,1)";
    c.style.transform = "translateY(100%)";
    document.body.classList.remove("is-ready");
    requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transform = "translateY(0)"; }));
    setTimeout(() => { location.href = a.href; }, 750);
  }));
  addEventListener("pageshow", e => { if (e.persisted) { document.body.classList.add("is-ready"); document.body.classList.remove("is-loading"); const c = document.querySelector(".curtain"); c.style.transform = ""; c.style.transition = ""; } });
})();

/* ---------- Barra de ação fixa no celular (UX mobile-first) ---------- */
(() => {
  const params = new URLSearchParams(location.search);
  const list = (window.NEY && window.NEY.properties) || [];
  const p = list.find(x => x.slug === params.get("id")) || list[0];
  if (!p) return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const dock = document.createElement("div");
  dock.className = "dock"; dock.setAttribute("role", "region"); dock.setAttribute("aria-label", "Ações rápidas");
  const visit = p.mode === "Temporada" ? "Reservar" : "Visitar";
  dock.innerHTML = `<div class="dock-price"><small>${esc(p.priceLabel)}</small><strong>${esc(p.price)}</strong></div>
    <a class="dock-visit" href="#contato">${visit}</a>
    <a class="dock-wa" href="${p.whatsappUrl()}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>WhatsApp</a>`;
  document.body.appendChild(dock);
  const contact = document.getElementById("contato");
  let contactVisible = false;
  if (contact && "IntersectionObserver" in window) new IntersectionObserver(es => { contactVisible = es[0].isIntersecting; update(); }, { threshold: .15 }).observe(contact);
  function update() { dock.classList.toggle("show", scrollY > innerHeight * .55 && !contactVisible); }
  addEventListener("scroll", update, { passive: true });
  update();
})();
