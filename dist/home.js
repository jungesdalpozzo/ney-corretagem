(() => {
  const { properties, WHATSAPP } = window.NEY;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const wa = text => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = n => String(n).padStart(2, "0");
  const forSale = properties.filter(p => p.mode === "Venda");
  const season = properties.find(p => p.mode === "Temporada");
  const withVideo = properties.find(p => p.video && p.video.src);

  /* ---------- Hero ---------- */
  const slides = properties.slice(0, 6);
  $("#hero-slides").innerHTML = slides.map((p, i) => `<figure class="${i ? "" : "on"}"><img src="${p.cover}" alt="${esc(p.title)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></figure>`).join("");
  $("#hero-dots").innerHTML = slides.map((p, i) => `<button type="button" class="${i ? "" : "on"}" aria-label="${esc(p.title)}"><i></i></button>`).join("");
  $("#hero-facts").innerHTML = [[pad(properties.length), "propriedades"], ["Serra", "de Cunha e região"], ["1:1", "atendimento direto"]].map(([a, b]) => `<li><strong>${a}</strong><span>${b}</span></li>`).join("");
  let slide = 0, timer;
  function showSlide(i) {
    slide = (i + slides.length) % slides.length;
    $$("#hero-slides figure").forEach((f, k) => f.classList.toggle("on", k === slide));
    $$("#hero-dots button").forEach((b, k) => { b.classList.remove("on"); if (k === slide) { void b.offsetWidth; b.classList.add("on"); } });
    const p = slides[slide];
    $("#hero-caption").href = p.url;
    $("#hero-caption-n").textContent = `N° ${pad(slide + 1)} · ${p.mode === "Temporada" ? "Temporada" : p.type}`;
    $("#hero-caption-t").textContent = p.title;
    $("#hero-caption-p").textContent = `${p.city} · ${p.region}`;
    clearTimeout(timer);
    if (!reduced) timer = setTimeout(() => showSlide(slide + 1), 6500);
  }
  $$("#hero-dots button").forEach((b, i) => b.addEventListener("click", () => showSlide(i)));

  /* ---------- Letreiro ---------- */
  const words = ["Cunha-SP", "Serra do Mar", "Nascentes", "Serra da Mantiqueira", "Campos de Cunha", "Campos Novos de Cunha", "Vale do Paraíba", "Altitude", "Serra da Bocaina"];
  $("#marquee").innerHTML = [...words, ...words].map(w => `<span>${w}</span>`).join("");

  /* ---------- Manifesto ---------- */
  const man = $("#manifesto-text");
  man.innerHTML = man.textContent.split(" ").map(w => `<span class="w">${esc(w)}</span>`).join(" ");
  const manWords = [...man.querySelectorAll(".w")];

  /* ---------- Coleção (vitrine em miniaturas) ---------- */
  const num = s => parseFloat(String(s).replace(/\./g, "").replace(",", "."));
  function priceValue(p) {
    const s = (p.price || "").toLowerCase();
    const m = s.match(/([\d.,]+)\s*(milh|mil\b)?/);
    if (!/r\$/.test(s) || !m) return null;
    const v = num(m[1]);
    return m[2] === "milh" ? v * 1e6 : m[2] ? v * 1e3 : v;
  }
  function areaValue(p) {
    const f = p.cardFeatures.map(([, t]) => t).join(" ");
    const m = f.match(/([\d.,]+)\s*alqueires/i);
    return m ? num(m[1]) : 0;
  }
  function card(p, i) {
    const tags = [`<span>${esc(p.mode === "Temporada" ? "Temporada" : p.type)}</span>`];
    if (p.tour) tags.push('<span class="gold">Tour 360°</span>');
    if (p.video && p.video.src) tags.push('<span class="gold">Vídeo</span>');
    const facts = p.cardFeatures.map(([, t]) => `<li>${esc(t)}</li>`).join("");
    return `<a class="card" href="${p.url}" data-title="${esc(p.title)}" style="--i:${i % 12}">
      <div class="card-media"><img class="a" src="${p.coverThumb}" alt="${esc(p.title)}, ${esc(p.city)}" loading="lazy"><img class="b" src="${p.thumb(p.alt.split("/").pop())}" alt="" loading="lazy">
        <div class="card-tags">${tags.join("")}</div><span class="card-count">${p.images.length} fotos</span></div>
      <div class="card-body">
        <p class="card-place">${[...new Set([p.zona || p.city, p.region])].map(esc).join(" · ")}</p>
        <h3>${esc(p.title)}</h3>
        <ul class="card-facts">${facts}</ul>
        <div class="card-foot"><div><small>${esc(p.priceLabel)}</small><strong>${esc(p.price)}</strong></div><span class="card-go" aria-hidden="true">→</span></div>
      </div></a>`;
  }
  const CATS = {
    all: () => true,
    sitios: p => p.type === "Sítio" && p.mode === "Venda",
    fazendas: p => p.type === "Fazenda",
    casas: p => p.type === "Casa" || p.mode === "Temporada",
    lotes: p => p.type === "Lote",
    campos: p => /Campos Novos/i.test(p.zona || "")
  };
  const SORTS = {
    destaque: (a, b) => a._i - b._i,
    "preco-asc": (a, b) => (a._price == null ? Infinity : a._price) - (b._price == null ? Infinity : b._price) || a._i - b._i,
    "preco-desc": (a, b) => (b._price == null ? -Infinity : b._price) - (a._price == null ? -Infinity : a._price) || a._i - b._i,
    "area-desc": (a, b) => b._area - a._area || a._i - b._i,
    fotos: (a, b) => b.images.length - a.images.length,
    az: (a, b) => a.title.localeCompare(b.title, "pt-BR")
  };
  properties.forEach((p, i) => { p._i = i; p._price = priceValue(p); p._area = areaValue(p); });
  const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const params = new URLSearchParams(location.search);
  let filter = CATS[params.get("f")] ? params.get("f") : "all";
  const toggles = new Set();
  const qInput = $("#market-q"), sortSel = $("#market-sort");
  function renderEstates() {
    const q = norm(qInput.value.trim());
    const list = properties.filter(CATS[filter] || CATS.all)
      .filter(p => !toggles.has("tour") || p.tour)
      .filter(p => !toggles.has("video") || (p.video && p.video.src))
      .filter(p => !toggles.has("price") || p._price != null)
      .filter(p => !q || norm([p.title, p.type, p.city, p.region, p.zona, p.kicker, p.subtitle, ...p.cardFeatures.map(f => f[1])].join(" ")).includes(q))
      .sort(SORTS[sortSel.value] || SORTS.destaque);
    const grid = $("#estates");
    grid.innerHTML = list.map(card).join("");
    $("#market-empty").hidden = list.length > 0;
    $("#market-count").textContent = `${list.length} ${list.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}`;
    $$("#filters button").forEach(b => b.classList.toggle("on", b.dataset.f === filter));
    requestAnimationFrame(() => grid.classList.add("ready"));
    $$(".card").forEach(el => io.observe(el));
  }
  $$("[data-count]").forEach(el => { el.textContent = pad(properties.filter(CATS[el.dataset.count] || CATS.all).length); });
  $$(".path").forEach(b => {
    const n = properties.filter(CATS[b.dataset.go] || CATS.all).length;
    b.querySelector("em").innerHTML = `${pad(n)} ${n === 1 ? "disponível" : "disponíveis"} <i>→</i>`;
  });
  $$("#filters button").forEach(b => b.addEventListener("click", () => { filter = b.dataset.f; renderEstates(); }));
  $$(".market-toggles button").forEach(b => b.addEventListener("click", () => {
    const on = !toggles.has(b.dataset.t);
    on ? toggles.add(b.dataset.t) : toggles.delete(b.dataset.t);
    b.setAttribute("aria-pressed", String(on));
    renderEstates();
  }));
  let qTimer;
  qInput.addEventListener("input", () => { clearTimeout(qTimer); qTimer = setTimeout(renderEstates, 120); });
  sortSel.addEventListener("change", renderEstates);
  $("#market-reset").addEventListener("click", () => {
    filter = "all"; toggles.clear(); qInput.value = ""; sortSel.value = "destaque";
    $$(".market-toggles button").forEach(b => b.setAttribute("aria-pressed", "false"));
    renderEstates();
  });
  $$("[data-go]").forEach(b => b.addEventListener("click", () => {
    filter = b.dataset.go; renderEstates();
    $("#colecao").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }));

  /* ---------- Atalhos de WhatsApp ---------- */
  const waLinks = {
    "#hero-wa": "Olá Ney! Vi o site e quero falar com um especialista em imóveis rurais em Cunha.",
    "#paths-lote": "Olá Ney! Procuro um lote ou terreno em Cunha para construir. Quais opções você tem?",
    "#chance-wa": "Olá Ney! Quero receber oportunidades de imóveis em Campos Novos de Cunha.",
    "#seller-wa": "Olá Ney! Tenho um imóvel rural na região e gostaria de uma avaliação."
  };
  Object.entries(waLinks).forEach(([sel, msg]) => { const a = $(sel); if (a) a.href = wa(msg); });
  const chance = properties.find(p => CATS.campos(p));
  if (chance && $("#chance-img")) $("#chance-img").src = chance.tour ? (chance.tour.scenes.find(s => s.partial) || {}).src || chance.cover : chance.cover;

  /* ---------- Temporada ---------- */
  if (season) {
    $("#season-img").src = season.img(season.chapters[season.chapters.length - 1].img);
    $("#season-text").textContent = `${season.title}: ${season.subtitle}`;
    $("#season-link").href = season.url;
    $("#season-wa").href = wa(season.whatsapp);
  } else $("#temporada").remove();

  /* ---------- Vídeo ---------- */
  if (withVideo) {
    const v = $("#film-video");
    v.poster = withVideo.video.poster;
    v.src = withVideo.video.src;
    $("#film-text").textContent = `${withVideo.video.title}: da casa-sede às pastagens, um passeio completo pela ${withVideo.title}, em ${withVideo.city}.`;
    $("#film-link").href = withVideo.url;
    $("#film-play").addEventListener("click", () => { v.controls = true; v.play(); $(".film-frame").classList.add("playing"); });
  } else $("#video").remove();

  /* ---------- Formulário e rodapé ---------- */
  $("#form-imovel").innerHTML += properties.map(p => `<option>${esc(p.title)}</option>`).join("");
  $("#footer-list").innerHTML = properties.map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join("");
  $("#contact-bg").src = properties[0].img(properties[0].quote.img);
  $("#contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const nome = (f.get("nome") || "").trim(), imovel = f.get("imovel"), msg = (f.get("msg") || "").trim();
    let text = `Olá Ney! ${nome ? `Meu nome é ${nome}. ` : ""}Vim pelo site e quero: ${f.get("interesse").toLowerCase()}.`;
    if (imovel) text += `\nImóvel de interesse: ${imovel}.`;
    if (msg) text += `\n${msg}`;
    window.open(wa(text), "_blank", "noopener");
  });

  /* ---------- Revelações ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal, .chance").forEach(el => io.observe(el));

  /* ---------- Rolagem ---------- */
  const nav = $("#nav"), progress = $("#progress"), floatWa = $("#float-wa"), seasonMedia = $(".season-media");
  let pars = [], lastY = scrollY, vh = innerHeight;
  function collectParallax() { pars = $$(".estate-par"); }
  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - vh;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("solid", y > vh * .85);
    nav.classList.toggle("hide", y > lastY && y > vh * 1.2 && !menu.classList.contains("open"));
    floatWa.classList.toggle("show", y > vh * .7);
    lastY = y;
    if (reduced) { manWords.forEach(w => w.classList.add("on")); return; }
    const r = man.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (vh * .9 - r.top) / (vh * .7)));
    const n = Math.round(k * manWords.length);
    manWords.forEach((w, i) => w.classList.toggle("on", i < n));
    pars.forEach(el => {
      const b = el.parentElement.getBoundingClientRect();
      if (b.bottom < -80 || b.top > vh + 80) return;
      el.style.transform = `translate3d(0, ${((b.top + b.height / 2 - vh / 2) / vh) * -7}%, 0)`;
    });
    if (seasonMedia) {
      const s = seasonMedia.parentElement.getBoundingClientRect();
      if (s.bottom > 0 && s.top < vh) seasonMedia.style.transform = `translate3d(0, ${(s.top + s.height / 2 - vh / 2) * -.18}px, 0)`;
    }
  }
  let ticking = false;
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener("resize", () => { vh = innerHeight; onScroll(); });

  /* ---------- Menu móvel ---------- */
  const menu = $("#menu"), menuBtn = $("#nav-menu");
  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("open")); document.body.style.overflow = "hidden"; nav.style.color = "var(--ivory)"; nav.style.background = "transparent"; }
    else { menu.classList.remove("open"); document.body.style.overflow = ""; nav.style.color = ""; nav.style.background = ""; setTimeout(() => { if (!menu.classList.contains("open")) menu.hidden = true; }, 800); }
  }
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

  /* ---------- Cursor ---------- */
  const cursor = $("#cursor");
  let moved = false;
  const hoverable = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (hoverable) addEventListener("mousemove", e => { moved = true; cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; }, { passive: true });
  function bindCursor() {
    if (!hoverable) return;
    $$(".estate-media").forEach(el => {
      el.style.cursor = "none";
      el.addEventListener("mouseenter", () => moved && cursor.classList.add("on"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("on"));
    });
  }

  /* ---------- Transição para a página do imóvel ---------- */
  const curtain = $(".curtain");
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="imovel.html"]');
    if (!a || reduced || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault();
    cursor.classList.remove("on");
    $("#curtain-title").textContent = a.dataset.title || (properties.find(p => a.getAttribute("href") === p.url) || {}).title || "";
    curtain.classList.add("on");
    setTimeout(() => { location.href = a.href; }, 750);
  });
  addEventListener("pageshow", () => curtain.classList.remove("on"));

  /* ---------- Início ---------- */
  renderEstates();
  showSlide(0);
  onScroll();
  const start = performance.now();
  const go = () => setTimeout(() => { document.body.classList.add("is-ready"); setTimeout(() => document.body.classList.remove("is-loading"), 900); }, reduced ? 0 : Math.max(0, 1500 - (performance.now() - start)));
  const first = $("#hero-slides img");
  if (first.complete) go(); else { first.addEventListener("load", go, { once: true }); first.addEventListener("error", go, { once: true }); setTimeout(go, 3200); }
})();
