const properties = [
  { id: "TN-001", type: "Fazenda", title: "Fazenda Vale do Café", city: "Cunha, SP", price: 6800000, displayPrice: "R$ 6.800.000", area: "124 ha", beds: "5 suítes", feature: "Café", image: "assets/fazenda-cafe.jpg", description: "Propriedade produtiva com cafezal formado, sede histórica restaurada e vista aberta para a serra. Estrutura completa para uma operação rural sofisticada." },
  { id: "TN-002", type: "Haras", title: "Haras Serra Clara", city: "São Bento do Sapucaí, SP", price: 4900000, displayPrice: "R$ 4.900.000", area: "36 ha", beds: "4 suítes", feature: "12 baias", image: "assets/haras-serra.jpg", description: "Casa contemporânea em meio à paisagem da Mantiqueira, lago, mata preservada e estrutura versátil para criação e treinamento." },
  { id: "TN-003", type: "Sítio", title: "Sítio Águas da Mata", city: "Paraty, RJ", price: 1850000, displayPrice: "R$ 1.850.000", area: "18 ha", beds: "3 quartos", feature: "Nascente", image: "assets/fazenda-cafe.jpg", description: "Refúgio cercado por mata, água abundante e clima ameno, com casa acolhedora e acesso reservado." },
  { id: "TN-004", type: "Fazenda", title: "Fazenda Horizonte", city: "Guaratinguetá, SP", price: 8200000, displayPrice: "R$ 8.200.000", area: "210 ha", beds: "6 suítes", feature: "Pecuária", image: "assets/hero-rural.png", description: "Área ampla, topografia aproveitável e sede de alto padrão em uma das regiões mais estratégicas do Vale do Paraíba." },
  { id: "TN-005", type: "Chácara", title: "Chácara Campo Alto", city: "Lagoinha, SP", price: 980000, displayPrice: "R$ 980.000", area: "2,4 ha", beds: "3 quartos", feature: "Pomar", image: "assets/haras-serra.jpg", description: "Uma chácara prática e acolhedora, com pomar formado, vista para as montanhas e excelente acesso urbano." },
  { id: "TN-006", type: "Sítio", title: "Sítio Pedra Grande", city: "Silveiras, SP", price: 2400000, displayPrice: "R$ 2.400.000", area: "42 ha", beds: "4 quartos", feature: "Cachoeira", image: "assets/hero-rural.png", description: "Natureza exuberante, cachoeira privativa e áreas abertas para lazer ou pequena produção, em cenário de rara beleza." }
];

const grid = document.querySelector("#property-grid");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const typeFilter = document.querySelector("#type-filter");
const priceFilter = document.querySelector("#price-filter");
let activeCategory = "all";

const icons = {
  area: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h6M4 4v6m16-6h-6m6 0v6M4 20h6m-6 0v-6m16 6h-6m6 0v-6"/></svg>',
  bed: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 18v-7m18 7v-5a2 2 0 0 0-2-2H8a3 3 0 0 0-3 3v4m0-7V7h5a3 3 0 0 1 3 3v1M3 16h18"/></svg>',
  leaf: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 4C11 4 5 8 5 15c0 2 1 4 3 5M5 19c2-5 6-8 12-11"/></svg>'
};

function propertyCard(property) {
  return `<article class="property-card" tabindex="0" data-id="${property.id}" aria-label="Ver detalhes de ${property.title}">
    <div class="property-image"><img src="${property.image}" alt="${property.title}, ${property.city}" loading="lazy"><span class="property-badge">${property.type}</span><span class="property-code">Cód. ${property.id}</span></div>
    <div class="property-body"><span class="property-place">${property.city}</span><h3>${property.title}</h3><div class="property-features"><span>${icons.area}${property.area}</span><span>${icons.bed}${property.beds}</span><span>${icons.leaf}${property.feature}</span></div><div class="property-price"><div><small>Valor</small><strong>${property.displayPrice}</strong></div><button type="button" aria-label="Ver ${property.title}">↗</button></div></div>
  </article>`;
}

function matchesPrice(property, filter) {
  if (filter === "to2") return property.price <= 2000000;
  if (filter === "2to5") return property.price > 2000000 && property.price <= 5000000;
  if (filter === "over5") return property.price > 5000000;
  return true;
}

function renderProperties() {
  const term = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const type = typeFilter.value;
  const result = properties.filter(p => {
    const searchable = `${p.title} ${p.city} ${p.type} ${p.feature}`.toLocaleLowerCase("pt-BR");
    return (!term || searchable.includes(term)) && (type === "all" || p.type === type) && (activeCategory === "all" || p.type === activeCategory) && matchesPrice(p, priceFilter.value);
  });
  grid.innerHTML = result.map(propertyCard).join("");
  emptyState.hidden = result.length > 0;
  document.querySelector("#show-all").hidden = result.length === properties.length;
}

document.querySelector("#property-search").addEventListener("submit", event => { event.preventDefault(); renderProperties(); document.querySelector("#imoveis").scrollIntoView({ behavior: "smooth" }); });
[typeFilter, priceFilter].forEach(el => el.addEventListener("change", renderProperties));
searchInput.addEventListener("input", renderProperties);
document.querySelectorAll(".category-tabs button[data-category]").forEach(button => button.addEventListener("click", () => { document.querySelectorAll(".category-tabs button").forEach(b => b.classList.remove("active")); button.classList.add("active"); activeCategory = button.dataset.category; typeFilter.value = activeCategory; renderProperties(); }));
document.querySelector("#clear-filters").addEventListener("click", () => { searchInput.value = ""; typeFilter.value = "all"; priceFilter.value = "all"; activeCategory = "all"; document.querySelectorAll(".category-tabs button").forEach(b => b.classList.toggle("active", b.dataset.category === "all")); renderProperties(); });
document.querySelector("#show-all").addEventListener("click", () => document.querySelector("#clear-filters").click());

const modal = document.querySelector("#property-modal");
function openProperty(id) {
  const property = properties.find(p => p.id === id); if (!property) return;
  document.querySelector("#modal-image").src = property.image; document.querySelector("#modal-image").alt = property.title;
  document.querySelector("#modal-tag").textContent = `${property.type} · CÓD. ${property.id}`;
  document.querySelector("#modal-title").textContent = property.title; document.querySelector("#modal-location").textContent = property.city;
  document.querySelector("#modal-features").innerHTML = `<span>${property.area}</span><span>${property.beds}</span><span>${property.feature}</span>`;
  document.querySelector("#modal-description").textContent = property.description; document.querySelector("#modal-price").textContent = property.displayPrice;
  document.querySelector("#modal-whatsapp").href = `https://wa.me/5500000000000?text=${encodeURIComponent(`Olá, tenho interesse no imóvel ${property.title}, código ${property.id}.`)}`;
  modal.showModal();
}
grid.addEventListener("click", event => { const card = event.target.closest(".property-card"); if (card) openProperty(card.dataset.id); });
grid.addEventListener("keydown", event => { const card = event.target.closest(".property-card"); if (card && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openProperty(card.dataset.id); } });
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => { if (event.target === modal) modal.close(); });

const toggle = document.querySelector(".menu-toggle");
toggle.addEventListener("click", () => { const isOpen = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!isOpen)); document.querySelector("#mobile-menu").classList.toggle("open", !isOpen); });
document.querySelectorAll(".mobile-menu a").forEach(a => a.addEventListener("click", () => { toggle.setAttribute("aria-expanded", "false"); document.querySelector("#mobile-menu").classList.remove("open"); }));

renderProperties();
