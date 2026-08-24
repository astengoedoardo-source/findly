const WORKER_URL = "https://shrill-firefly-79b6.astengoedoardo.workers.dev/";

const findButton = document.getElementById("findButton");
const results = document.getElementById("results");
const recommendations = document.getElementById("recommendations");
const requestInput = document.getElementById("request");
const categoryInput = document.getElementById("category");
const budgetInput = document.getElementById("budget");
const priorities = document.querySelectorAll(".priority");

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

const quickSearch = document.getElementById("quickSearch");
const quickSearchButton = document.getElementById("quickSearchButton");

const dynamicFilters = document.getElementById("dynamicFilters");

const themeSelect = document.getElementById("themeSelect");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const settingsLanguage = document.getElementById("settingsLanguage");

const suggestButton = document.getElementById("suggestButton");
const localButton = document.getElementById("localButton");
const goalButton = document.getElementById("goalButton");

const aiSummary = document.getElementById("aiSummary");
const aiSummaryText = document.getElementById("aiSummaryText");
const matchCount = document.querySelector(".match-count");

let selectedPriority = "price";

const categoryFilters = {

  products: [
    {
      label: "Condizione",
      options: [
        ["any", "Qualsiasi"],
        ["new", "Nuovo"],
        ["used", "Usato"]
      ]
    }
  ],

  tech: [
    {
      label: "Condizione",
      options: [
        ["any", "Qualsiasi"],
        ["new", "Nuovo"],
        ["used", "Usato"]
      ]
    }
  ],

  fashion: [
    {
      label: "Condizione",
      options: [
        ["any", "Qualsiasi"],
        ["new", "Nuovo"],
        ["like-new", "Come nuovo"],
        ["used", "Usato"]
      ]
    },
    {
      label: "Taglia",
      options: [
        ["any", "Qualsiasi"],
        ["XS", "XS"],
        ["S", "S"],
        ["M", "M"],
        ["L", "L"],
        ["XL", "XL"]
      ]
    }
  ],

  movies: [
    {
      label: "Disponibilità",
      options: [
        ["any", "Qualsiasi"],
        ["free", "Gratis"],
        ["subscription", "Abbonamento"],
        ["rent", "Noleggio"],
        ["buy", "Acquisto"]
      ]
    }
  ],

  books: [
    {
      label: "Formato",
      options: [
        ["any", "Qualsiasi"],
        ["paper", "Cartaceo"],
        ["ebook", "E-book"],
        ["audio", "Audiolibro"]
      ]
    }
  ],

  travel: [
    {
      label: "Tipo",
      options: [
        ["any", "Qualsiasi"],
        ["flight", "Volo"],
        ["hotel", "Hotel"],
        ["package", "Viaggio completo"]
      ]
    }
  ],

  sport: [
    {
      label: "Tipo",
      options: [
        ["any", "Qualsiasi"],
        ["field", "Campo"],
        ["gym", "Palestra"],
        ["activity", "Attività"]
      ]
    }
  ],

  places: [
    {
      label: "Distanza",
      options: [
        ["any", "Qualsiasi"],
        ["near", "Vicino"],
        ["very-near", "Molto vicino"]
      ]
    }
  ]
};


/* =========================
   PRIORITÀ
========================= */

priorities.forEach(button => {

  button.addEventListener("click", () => {

    priorities.forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");

    selectedPriority =
      button.dataset.value || "price";
  });

});


/* =========================
   MENU
========================= */

function showMenu() {

  sideMenu.classList.add("open");
  menuOverlay.classList.add("open");
}

function hideMenu() {

  sideMenu.classList.remove("open");
  menuOverlay.classList.remove("open");
}

openMenu?.addEventListener("click", showMenu);
closeMenu?.addEventListener("click", hideMenu);
menuOverlay?.addEventListener("click", hideMenu);


/* =========================
   SEZIONI
========================= */

const sections = [
  "homeSection",
  "suggestSection",
  "localSection",
  "discoverSection",
  "favoritesSection",
  "historySection",
  "goalsSection",
  "profileSection",
  "settingsSection"
];

function showSection(sectionName) {

  sections.forEach(id => {

    const section =
      document.getElementById(id);

    if (section) {
      section.classList.add("hidden");
    }

  });

  const selected =
    document.getElementById(sectionName);

  if (selected) {
    selected.classList.remove("hidden");
  }

  hideMenu();
}

document.querySelectorAll(".menu-item").forEach(item => {

  item.addEventListener("click", () => {

    const section =
      item.dataset.section;

    const map = {
      home: "homeSection",
      search: "homeSection",
      suggest: "suggestSection",
      local: "localSection",
      discover: "discoverSection",
      favorites: "favoritesSection",
      history: "historySection",
      goals: "goalsSection",
      profile: "profileSection",
      settings: "settingsSection"
    };

    document.querySelectorAll(".menu-item")
      .forEach(button =>
        button.classList.remove("active")
      );

    item.classList.add("active");

    showSection(map[section] || "homeSection");
  });

});


/* =========================
   FILTRI DINAMICI
========================= */

function updateDynamicFilters() {

  if (!dynamicFilters) return;

  const category =
    categoryInput.value;

  const filters =
    categoryFilters[category] || [];

  dynamicFilters.innerHTML = "";

  filters.forEach((filter, index) => {

    const wrapper =
      document.createElement("div");

    wrapper.className = "field";

    const label =
      document.createElement("label");

    label.textContent =
      filter.label;

    const select =
      document.createElement("select");

    select.dataset.dynamicFilter =
      `filter-${index}`;

    filter.options.forEach(option => {

      const element =
        document.createElement("option");

      element.value = option[0];
      element.textContent = option[1];

      select.appendChild(element);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    dynamicFilters.appendChild(wrapper);
  });
}

categoryInput?.addEventListener(
  "change",
  updateDynamicFilters
);

updateDynamicFilters();


/* =========================
   RACCOLTA FILTRI
========================= */

function collectFilters() {

  const filters = {};

  if (!dynamicFilters) {
    return filters;
  }

  dynamicFilters
    .querySelectorAll("select")
    .forEach(select => {

      filters[select.dataset.dynamicFilter] =
        select.value;
    });

  return filters;
}


/* =========================
   RICERCA
========================= */

async function searchFindly(queryOverride = null) {

  const query =
    queryOverride ||
    requestInput.value.trim();

  if (!query) {

    requestInput.focus();

    return;
  }

  findButton.disabled = true;

  findButton.querySelector("span:first-child")
    .textContent = "Findly sta cercando...";

  results.classList.remove("hidden");

  recommendations.innerHTML = "";

  aiSummary.classList.add("hidden");

  const payload = {

    query,

    category:
      categoryInput.value,

    budget:
      budgetInput.value,

    priority:
      selectedPriority,

    filters:
      collectFilters()
  };

  saveHistory(query);

  try {

    const response =
      await fetch(WORKER_URL, {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(payload)
      });

    if (!response.ok) {
      throw new Error(
        "Worker error"
      );
    }

    const data =
      await response.json();

    renderResults(data);

  } catch (error) {

    recommendations.innerHTML = `
      <div class="result-card">
        <div class="result-source">ERRORE</div>
        <h3>Non riesco a completare la ricerca.</h3>
        <p>
          Controlla che il Worker sia online
          e riprova.
        </p>
      </div>
    `;

    console.error(error);

  } finally {

    findButton.disabled = false;

    findButton.querySelector("span:first-child")
      .textContent = "Findly Suggest";
  }

  results.scrollIntoView({
    behavior: "smooth"
  });
}

findButton?.addEventListener(
  "click",
  () => searchFindly()
);


/* =========================
   QUICK SEARCH
========================= */

function runQuickSearch() {

  const query =
    quickSearch.value.trim();

  if (!query) return;

  requestInput.value = query;

  showSection("homeSection");

  searchFindly(query);
}

quickSearchButton?.addEventListener(
  "click",
  runQuickSearch
);

quickSearch?.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      event.preventDefault();
      runQuickSearch();
    }

  }
);


/* =========================
   RISULTATI
========================= */

function renderResults(data) {

  const resultList =
    Array.isArray(data.results)
      ? data.results
      : [];

  matchCount.textContent =
    `${resultList.length} risultati`;

  if (!resultList.length) {

    recommendations.innerHTML = `
      <div class="result-card">
        <h3>Nessun risultato</h3>
        <p>
          Prova a descrivere meglio quello che stai cercando.
        </p>
      </div>
    `;

    return;
  }

  recommendations.innerHTML =
    resultList.map((result, index) => {

      const score =
        Math.round(
          (result.score || 0.7) * 100
        );

      return `
        <article class="result-card">

          <div class="result-source">
            ${escapeHTML(result.source || "Fonte")}
          </div>

          <h3>
            ${index + 1}. 
            ${escapeHTML(result.title || "Risultato")}
          </h3>

          <p>
            ${escapeHTML(
              result.description ||
              "Risultato selezionato da Findly."
            )}
          </p>

          <p style="margin-top:10px;">
            Match Findly: <strong>${score}%</strong>
          </p>

          <a
            class="result-link"
            href="${safeURL(result.url)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vedi risultato →
          </a>

        </article>
      `;

    }).join("");

}


/* =========================
   SUGGEST
========================= */

suggestButton?.addEventListener(
  "click",
  () => {

    const input =
      document.getElementById(
        "suggestRequest"
      );

    const value =
      input?.value.trim();

    if (!value) {
      input?.focus();
      return;
    }

    requestInput.value = value;

    showSection("homeSection");

    searchFindly(value);
  }
);


/* =========================
   LOCALE
========================= */

localButton?.addEventListener(
  "click",
  () => {

    const input =
      document.getElementById(
        "localRequest"
      );

    const value =
      input?.value.trim();

    if (!value) {
      input?.focus();
      return;
    }

    requestInput.value =
      value;

    categoryInput.value =
      "places";

    updateDynamicFilters();

    showSection(
      "homeSection"
    );

    searchFindly(value);
  }
);


/* =========================
   TEMA
========================= */

function applyTheme(theme) {

  document.body.classList.remove(
    "light"
  );

  if (theme === "light") {
    document.body.classList.add(
      "light"
    );
  }

  if (theme === "system") {

    const prefersLight =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    if (prefersLight) {
      document.body.classList.add(
        "light"
      );
    }
  }

  localStorage.setItem(
    "findly-theme",
    theme
  );
}

themeSelect?.addEventListener(
  "change",
  () => applyTheme(
    themeSelect.value
  )
);

const savedTheme =
  localStorage.getItem(
    "findly-theme"
  ) || "dark";

if (themeSelect) {
  themeSelect.value =
    savedTheme;
}

applyTheme(savedTheme);


/* =========================
   ACCESSIBILITÀ
========================= */

function applyFontSize(size) {

  document.body.classList.remove(
    "font-large",
    "font-xlarge"
  );

  if (size === "large") {
    document.body.classList.add(
      "font-large"
    );
  }

  if (size === "xlarge") {
    document.body.classList.add(
      "font-xlarge"
    );
  }

  localStorage.setItem(
    "findly-font-size",
    size
  );
}

fontSizeSelect?.addEventListener(
  "change",
  () => applyFontSize(
    fontSizeSelect.value
  )
);

const savedFontSize =
  localStorage.getItem(
    "findly-font-size"
  ) || "normal";

if (fontSizeSelect) {
  fontSizeSelect.value =
    savedFontSize;
}

applyFontSize(
  savedFontSize
);


/* =========================
   LINGUA
========================= */

function setLanguage(language) {

  localStorage.setItem(
    "findly-language",
    language
  );

  document.documentElement.lang =
    language;

  document.querySelectorAll(
    ".language"
  ).forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.lang === language
    );

  });

  if (settingsLanguage) {
    settingsLanguage.value =
      language;
  }

  /*
    La traduzione completa
    verrà collegata nel prossimo
    aggiornamento di script.js.
  */
}

document.querySelectorAll(
  ".language"
).forEach(button => {

  button.addEventListener(
    "click",
    () => setLanguage(
      button.dataset.lang
    )
  );

});

settingsLanguage?.addEventListener(
  "change",
  () => setLanguage(
    settingsLanguage.value
  )
);

setLanguage(
  localStorage.getItem(
    "findly-language"
  ) || "it"
);


/* =========================
   CRONOLOGIA
========================= */

function saveHistory(query) {

  const history =
    JSON.parse(
      localStorage.getItem(
        "findly-history"
      ) || "[]"
    );

  const updated =
    [
      query,
      ...history.filter(
        item => item !== query
      )
    ].slice(0, 20);

  localStorage.setItem(
    "findly-history",
    JSON.stringify(updated)
  );

  renderHistory();
}

function renderHistory() {

  const container =
    document.getElementById(
      "historyList"
    );

  if (!container) return;

  const history =
    JSON.parse(
      localStorage.getItem(
        "findly-history"
      ) || "[]"
    );

  if (!history.length) {

    container.innerHTML =
      "<p>Nessuna ricerca recente.</p>";

    return;
  }

  container.innerHTML =
    history.map(query => `
      <button
        class="secondary-button"
        style="width:100%; margin-bottom:8px; text-align:left;"
        onclick="useHistory('${escapeAttribute(query)}')"
      >
        ⌕ ${escapeHTML(query)}
      </button>
    `).join("");
}

window.useHistory =
  function(query) {

    requestInput.value =
      query;

    showSection(
      "homeSection"
    );

    searchFindly(query);
  };


/* =========================
   PREFERITI
========================= */

function getFavorites() {

  return JSON.parse(
    localStorage.getItem(
      "findly-favorites"
    ) || "[]"
  );
}

function renderFavorites() {

  const container =
    document.getElementById(
      "favoritesList"
    );

  if (!container) return;

  const favorites =
    getFavorites();

  if (!favorites.length) {

    container.innerHTML =
      "<p>Nessun preferito salvato.</p>";

    return;
  }

  container.innerHTML =
    favorites.map(item => `
      <div class="result-card">
        <h3>
          ${escapeHTML(item.title)}
        </h3>
        <p>
          ${escapeHTML(item.source)}
        </p>
      </div>
    `).join("");
}


/* =========================
   OBIETTIVI
========================= */

goalButton?.addEventListener(
  "click",
  () => {

    const input =
      document.getElementById(
        "goalRequest"
      );

    const container =
      document.getElementById(
        "goalsResults"
      );

    const value =
      input?.value.trim();

    if (!value) {
      input?.focus();
      return;
    }

    container.innerHTML = `
      <div class="ai-summary" style="margin-top:20px;">
        <div class="ai-summary-header">
          <span>✦</span>
          <strong>Findly Suggest</strong>
        </div>

        <p>
          Obiettivo ricevuto.
          Nel prossimo aggiornamento Findly
          costruirà automaticamente un percorso
          personalizzato per raggiungerlo.
        </p>
      </div>
    `;
  }
);


/* =========================
   DISCOVER DEMO
========================= */

function renderDiscover() {

  const grid =
    document.getElementById(
      "discoverGrid"
    );

  if (!grid) return;

  const items = [
    "🌊 Una destinazione che potresti amare",
    "🎬 Un film che potrebbe diventare il tuo preferito",
    "🍜 Un posto dove mangiare vicino a te",
    "🏃 Un'attività che potresti provare",
    "✈️ Un viaggio da salvare",
    "🎧 Qualcosa da ascoltare oggi"
  ];

  grid.innerHTML =
    items.map(item => `
      <div class="discover-card">
        <strong>${item}</strong>
      </div>
    `).join("");
}


/* =========================
   UTILITY
========================= */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {

  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");
}

function safeURL(value) {

  try {

    const url =
      new URL(value);

    if (
      url.protocol === "http:" ||
      url.protocol === "https:"
    ) {
      return url.href;
    }

  } catch (error) {}

  return "#";
}


/* =========================
   INIT
========================= */

renderHistory();
renderFavorites();
renderDiscover();

showSection(
  "homeSection"
);