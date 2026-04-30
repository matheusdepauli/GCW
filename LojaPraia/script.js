const equipmentItems = [
  {
    name: "Prancha Softboard 8.0",
    category: "surf",
    price: "R$ 70/dia",
    condition: "Ideal para iniciantes",
    image:
      "https://images.unsplash.com/photo-1621951753015-740c699ab970?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Prancha Performance 6.2",
    category: "surf",
    price: "R$ 95/dia",
    condition: "Nível intermediário",
    image:
      "https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Kit Cadeira + Guarda-sol",
    category: "conforto",
    price: "R$ 50/dia",
    condition: "2 cadeiras e 1 guarda-sol",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Stand Up Paddle",
    category: "aventura",
    price: "R$ 90/dia",
    condition: "Inclui colete e remo",
    image:
      "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Caiaque Duplo",
    category: "aventura",
    price: "R$ 120/dia",
    condition: "Até 2 pessoas",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Bicicleta Beach Cruiser",
    category: "mobilidade",
    price: "R$ 45/dia",
    condition: "Passeio na orla",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Longboard Clássica 9.0",
    category: "surf",
    price: "R$ 100/dia",
    condition: "Remada estável",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Cooler Térmico 30L",
    category: "conforto",
    price: "R$ 25/dia",
    condition: "Bebidas geladas por horas",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80",
  },
];

const surfClasses = [
  {
    level: "Iniciante",
    title: "Primeira Onda",
    description:
      "Postura, segurança, leitura básica do mar e prática inicial com prancha softboard.",
    duration: "1h30",
    value: "R$ 140",
  },
  {
    level: "Intermediário",
    title: "Evolução Técnica",
    description:
      "Correção de base, viradas e escolha de ondas para melhorar consistência e performance.",
    duration: "1h30",
    value: "R$ 180",
  },
  {
    level: "Grupo",
    title: "Surf Experience",
    description:
      "Aula coletiva para amigos e família com dinâmica prática, diversão e suporte dedicado.",
    duration: "2h",
    value: "R$ 110/pessoa",
  },
];

const equipmentGrid = document.getElementById("equipmentGrid");
const classesGrid = document.getElementById("classesGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const bookingForm = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");
const weatherContent = document.getElementById("weatherContent");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

const storageKey = "lojaDaPraiaBookings";

function renderEquipment(items) {
  equipmentGrid.innerHTML = "";

  if (!items.length) {
    equipmentGrid.innerHTML = "<p>Nenhum equipamento encontrado com esse filtro.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="card-body">
        <h3>${item.name}</h3>
        <div class="card-meta">
          <span>${item.price}</span>
          <span>${item.category}</span>
        </div>
        <p>${item.condition}</p>
      </div>
    `;
    equipmentGrid.appendChild(card);
  });

  setupTiltEffects(".card");
}

function renderClasses() {
  classesGrid.innerHTML = "";

  surfClasses.forEach((plan) => {
    const classCard = document.createElement("article");
    classCard.className = "class-card";
    classCard.innerHTML = `
      <span class="class-badge">${plan.level}</span>
      <h3>${plan.title}</h3>
      <p>${plan.description}</p>
      <p><strong>Duração:</strong> ${plan.duration}</p>
      <p><strong>Valor:</strong> ${plan.value}</p>
    `;
    classesGrid.appendChild(classCard);
  });

  setupTiltEffects(".class-card");
}

function applyEquipmentFilters() {
  const selectedCategory = categoryFilter.value;
  const query = searchInput.value.trim().toLowerCase();

  const filtered = equipmentItems.filter((item) => {
    const byCategory = selectedCategory === "all" || item.category === selectedCategory;
    const byName = item.name.toLowerCase().includes(query);
    return byCategory && byName;
  });

  renderEquipment(filtered);
}

function getBookings() {
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
}

function saveBookings(bookings) {
  localStorage.setItem(storageKey, JSON.stringify(bookings));
}

function renderBookings() {
  const bookings = getBookings();
  bookingList.innerHTML = "";

  if (!bookings.length) {
    bookingList.innerHTML = "<li>Nenhuma reserva registrada ainda.</li>";
    return;
  }

  bookings.slice(0, 6).forEach((booking) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${booking.name}</strong><br>
      ${booking.serviceType} - ${booking.serviceName}<br>
      ${booking.date} às ${booking.time}<br>
      ${booking.deliveryType}
    `;
    bookingList.appendChild(li);
  });
}

function handleBookingSubmit(event) {
  event.preventDefault();
  const data = new FormData(bookingForm);

  const booking = {
    name: data.get("name"),
    phone: data.get("phone"),
    serviceType: data.get("serviceType"),
    serviceName: data.get("serviceName"),
    date: data.get("date"),
    time: data.get("time"),
    deliveryType: data.get("deliveryType"),
    notes: data.get("notes"),
    createdAt: Date.now(),
  };

  const bookings = getBookings();
  bookings.unshift(booking);
  saveBookings(bookings);
  bookingForm.reset();
  renderBookings();
  alert("Reserva realizada com sucesso. Entraremos em contato via WhatsApp.");
}

async function fetchWeatherAndSea() {
  try {
    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=-5.79&longitude=-35.21&current=temperature_2m,wind_speed_10m,weather_code&hourly=uv_index&timezone=auto";
    const marineUrl =
      "https://marine-api.open-meteo.com/v1/marine?latitude=-5.79&longitude=-35.21&current=wave_height,wave_direction,wave_period&timezone=auto";

    const [weatherRes, marineRes] = await Promise.all([fetch(weatherUrl), fetch(marineUrl)]);
    const weatherData = await weatherRes.json();
    const marineData = await marineRes.json();

    const temp = weatherData.current?.temperature_2m ?? "--";
    const wind = weatherData.current?.wind_speed_10m ?? "--";
    const waveHeight = marineData.current?.wave_height ?? "--";
    const wavePeriod = marineData.current?.wave_period ?? "--";

    weatherContent.innerHTML = `
      <div class="weather-item"><span>Temperatura</span><strong>${temp} °C</strong></div>
      <div class="weather-item"><span>Vento</span><strong>${wind} km/h</strong></div>
      <div class="weather-item"><span>Altura da onda</span><strong>${waveHeight} m</strong></div>
      <div class="weather-item"><span>Período da onda</span><strong>${wavePeriod} s</strong></div>
    `;
  } catch (error) {
    weatherContent.innerHTML =
      "<p class='error'>Não foi possível carregar o clima agora. Tente novamente em instantes.</p>";
  }
}

function setupMenu() {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

function setupFooterYear() {
  const year = document.getElementById("year");
  year.textContent = String(new Date().getFullYear());
}

function setupTopbarBlendWithHero() {
  const body = document.body;
  const toggleTopState = () => {
    if (window.scrollY < 36) {
      body.classList.add("is-at-top");
    } else {
      body.classList.remove("is-at-top");
    }

    if (window.scrollY > 70) {
      body.classList.add("is-scrolled");
    } else {
      body.classList.remove("is-scrolled");
    }
  };

  toggleTopState();
  window.addEventListener("scroll", toggleTopState, { passive: true });
}

function setupTiltEffects(selector) {
  const cards = document.querySelectorAll(selector);

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / 22;
      const rotateY = (x - centerX) / 22;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupHeroParallax() {
  const hero = document.querySelector(".hero");
  const heroScene = document.getElementById("heroScene");
  const stickers = document.querySelectorAll(".sticker");

  if (!hero || !heroScene) return;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroScene.style.transform = `rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
    heroScene.style.setProperty("--parallax-x", `${x * 16}px`);
    heroScene.style.setProperty("--parallax-y", `${y * 12}px`);
    stickers.forEach((sticker, index) => {
      sticker.style.setProperty("--depth", String((index + 1) * 2));
    });
  });

  hero.addEventListener("mouseleave", () => {
    heroScene.style.transform = "";
    heroScene.style.setProperty("--parallax-x", "0px");
    heroScene.style.setProperty("--parallax-y", "0px");
  });
}

function setupScrollReveal() {
  const revealSelectors = [
    ".stats article",
    ".card",
    ".class-card",
    ".booking-form",
    ".bookings-panel",
    ".gallery-grid img",
    ".contact-card",
    ".map-wrap",
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(","));
  revealElements.forEach((element) => element.classList.add("scroll-reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

categoryFilter.addEventListener("change", applyEquipmentFilters);
searchInput.addEventListener("input", applyEquipmentFilters);
bookingForm.addEventListener("submit", handleBookingSubmit);

renderEquipment(equipmentItems);
renderClasses();
renderBookings();
fetchWeatherAndSea();
setupMenu();
setupFooterYear();
setupTopbarBlendWithHero();
setupHeroParallax();
setupScrollReveal();
