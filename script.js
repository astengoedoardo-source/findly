/* =========================================================
   FINDLY — SCRIPT.JS
   Compatibile con l'INDEX.HTML inviato
========================================================= */

const WORKER_URL =
  "https://shrill-firefly-79b6.astengoedoardo.workers.dev";

let currentCategory = "other";
let currentLanguage =
  localStorage.getItem("findlyLanguage") || "it";

let authMode = "login";


/* =========================================================
   START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  setupIntro();
  setupNavigation();
  setupSearch();
  setupCategories();
  setupGuided();
  setupCompare();
  setupExamples();
  setupLanguage();
  setupProfile();
  setupSettings();
  setupAuth();

  applyLanguage();
  refreshAuthUI();
  loadSettings();
});


/* =========================================================
   INTRO
========================================================= */

function setupIntro() {

  const intro =
    document.getElementById("introScreen");

  const app =
    document.getElementById("app");

  if (!intro || !app) return;

  setTimeout(() => {

    intro.classList.add("intro-hide");

    setTimeout(() => {

      intro.style.display = "none";
      app.classList.remove("hidden");

    }, 700);

  }, 1700);
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  const menuButton =
    document.getElementById("menuButton");

  const closeMenu =
    document.getElementById("closeMenu");

  const overlay =
    document.getElementById("menuOverlay");

  menuButton?.addEventListener(
    "click",
    openMenu
  );

  closeMenu?.addEventListener(
    "click",
    closeSideMenu
  );

  overlay?.addEventListener(
    "click",
    closeSideMenu
  );

  document
    .querySelectorAll("[data-page]")
    .forEach(button => {

      button.addEventListener("click", () => {

        showPage(button.dataset.page);
        closeSideMenu();

      });

    });

  document
    .getElementById("homeLogo")
    ?.addEventListener(
      "click",
      () => showPage("home")
    );

  document
    .getElementById("profileButton")
    ?.addEventListener(
      "click",
      () => showPage("profile")
    );
}


function openMenu() {

  document
    .getElementById("sideMenu")
    ?.classList.add("open");

  document
    .getElementById("menuOverlay")
    ?.classList.add("show");
}


function closeSideMenu() {

  document
    .getElementById("sideMenu")
    ?.classList.remove("open");

  document
    .getElementById("menuOverlay")
    ?.classList.remove("show");
}


function showPage(page) {

  document
    .querySelectorAll(".page")
    .forEach(item => {

      item.classList.remove("active-page");

    });

  const target =
    document.getElementById(
      page + "Page"
    );

  if (target) {

    target.classList.add("active-page");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  document
    .querySelectorAll(".menu-item")
    .forEach(item => {

      item.classList.toggle(
        "active",
        item.dataset.page === page
      );

    });
}


/* =========================================================
   CATEGORIES
========================================================= */

function setupCategories() {

  document
    .querySelectorAll("[data-category]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          currentCategory =
            button.dataset.category;

          const select =
            document.getElementById(
              "guidedCategory"
            );

          if (select) {
            select.value =
              currentCategory;
          }

          showPage("guided");

        }
      );

    });
}


/* =========================================================
   HOME SEARCH
========================================================= */

function setupSearch() {

  const input =
    document.getElementById("searchInput");

  const button =
    document.getElementById("searchButton");

  button?.addEventListener(
    "click",
    () => {

      const query =
        input?.value.trim();

      if (!query) {

        input?.focus();
        return;

      }

      search(
        query,
        currentCategory,
        {}
      );

    }
  );

  input?.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        button?.click();
      }

    }
  );


  const freeInput =
    document.getElementById(
      "freeSearchInput"
    );

  const freeButton =
    document.getElementById(
      "freeSearchButton"
    );

  freeButton?.addEventListener(
    "click",
    () => {

      const query =
        freeInput?.value.trim();

      if (!query) {

        freeInput?.focus();
        return;

      }

      search(
        query,
        "other",
        {}
      );

    }
  );

  freeInput?.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        freeButton?.click();
      }

    }
  );
}


/* =========================================================
   GUIDED SEARCH
========================================================= */

function setupGuided() {

  const button =
    document.getElementById(
      "guidedSearchButton"
    );

  button?.addEventListener(
    "click",
    () => {

      const category =
        document.getElementById(
          "guidedCategory"
        )?.value || "other";

      const query =
        document.getElementById(
          "guidedQuery"
        )?.value.trim();

      const preference =
        document.getElementById(
          "guidedPreference"
        )?.value.trim() || "";

      if (!query) {

        document
          .getElementById("guidedQuery")
          ?.focus();

        return;

      }

      currentCategory =
        category;

      search(
        query,
        category,
        {
          preference
        }
      );

    }
  );
}


/* =========================================================
   COMPARE
========================================================= */

function setupCompare() {

  document
    .getElementById("compareButton")
    ?.addEventListener(
      "click",
      compare
    );
}


async function compare() {

  const first =
    document
      .getElementById("compareFirst")
      ?.value.trim();

  const second =
    document
      .getElementById("compareSecond")
      ?.value.trim();

  const context =
    document
      .getElementById("compareContext")
      ?.value.trim() || "";

  const result =
    document.getElementById(
      "compareResult"
    );

  const button =
    document.getElementById(
      "compareButton"
    );

  if (!first || !second) {

    result.innerHTML = `
      <div class="error-card">
        ${
          currentLanguage === "it"
            ? "Inserisci entrambe le alternative."
            : currentLanguage === "es"
              ? "Introduce ambas alternativas."
              : currentLanguage === "fr"
                ? "Entrez les deux alternatives."
                : "Enter both alternatives."
        }
      </div>
    `;

    return;
  }

  if (button) {

    button.disabled = true;

    button.textContent =
      getText(
        "analyzing",
        "Analizzo..."
      );

  }

  try {

    const response =
      await fetch(
        `${WORKER_URL}/api/compare`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            first,
            second,
            context,
            language:
              currentLanguage
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok || !data.ok) {

      throw new Error(
        data.error ||
        getText(
          "searchError",
          "Errore nella ricerca"
        )
      );

    }

    const winner =
      data.winner === "option_a"
        ? first
        : second;

    result.innerHTML = `

      <div class="compare-result-card">

        <div class="winner-label">
          ${escapeHTML(
            getText(
              "findlyChooses",
              "FINDLY SCEGLIE"
            )
          )}
        </div>

        <h3>
          ${escapeHTML(winner)}
        </h3>

        <p>
          ${escapeHTML(
            data.answer || ""
          )}
        </p>

        <div class="reason-list">

          ${(data.reasons || [])
            .map(
              reason =>
                `<div>✓ ${escapeHTML(
                  reason
                )}</div>`
            )
            .join("")}

        </div>

      </div>
    `;

  } catch (error) {

    result.innerHTML = `
      <div class="error-card">
        ${escapeHTML(
          error.message ||
          getText(
            "searchError",
            "Errore"
          )
        )}
      </div>
    `;

  } finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        getText(
          "compareButtonText",
          "Confronta →"
        );

    }

  }
}


/* =========================================================
   SEARCH API
========================================================= */

async function search(
  query,
  category,
  fields
) {

  showPage("results");

  const title =
    document.getElementById(
      "resultsTitle"
    );

  const answer =
    document.getElementById(
      "resultsAnswer"
    );

  const list =
    document.getElementById(
      "resultsList"
    );

  const sources =
    document.getElementById(
      "sourcesList"
    );

  const availability =
    document.getElementById(
      "availabilitySection"
    );

  if (title) {

    title.textContent =
      getText(
        "searching",
        "Sto cercando il meglio per te..."
      );

  }

  if (answer) {
    answer.innerHTML = "";
  }

  if (list) {

    list.innerHTML = `

      <div class="loading">

        <div class="loader"></div>

        <span>
          ${escapeHTML(
            getText(
              "analyzingSources",
              "Analizzo più fonti..."
            )
          )}
        </span>

      </div>
    `;

  }

  if (sources) {
    sources.innerHTML = "";
  }

  if (availability) {
    availability.classList.add("hidden");
  }

  try {

    const response =
      await fetch(
        `${WORKER_URL}/api/search`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            query,
            category,
            fields,
            language:
              currentLanguage
          })
        }
      );

    let data;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        getText(
          "serverError",
          "Risposta non valida dal server."
        )
      );
    }

    if (!response.ok || !data.ok) {

      throw new Error(
        data.error ||
        getText(
          "searchError",
          "Errore nella ricerca."
        )
      );

    }

    renderResults(data);

  } catch (error) {

    if (title) {

      title.textContent =
        getText(
          "errorTitle",
          "Qualcosa è andato storto."
        );

    }

    if (list) {

      list.innerHTML = `
        <div class="error-card">
          ${escapeHTML(
            error.message ||
            getText(
              "searchError",
              "Errore nella ricerca."
            )
          )}
        </div>
      `;

    }

  }
}


/* =========================================================
   RESULTS
========================================================= */

function renderResults(data) {

  const title =
    document.getElementById(
      "resultsTitle"
    );

  const answer =
    document.getElementById(
      "resultsAnswer"
    );

  const list =
    document.getElementById(
      "resultsList"
    );

  const sources =
    document.getElementById(
      "sourcesList"
    );

  if (title) {

    title.textContent =
      getText(
        "bestFound",
        "Il meglio che ho trovato"
      );

  }

  if (answer) {

    answer.innerHTML = `

      <div class="answer-label">
        FINDLY
      </div>

      <p>
        ${escapeHTML(
          data.answer || ""
        )}
      </p>

      ${
        data.summary
          ? `
            <div class="summary">
              ${escapeHTML(
                data.summary
              )}
            </div>
          `
          : ""
      }

    `;

  }

  if (list) {

    const picks =
      Array.isArray(data.topPicks)
        ? data.topPicks
        : [];

    list.innerHTML =
      picks.length
        ? picks
            .map(
              (item, index) =>
                createResultCard(
                  item,
                  index
                )
            )
            .join("")
        : `
          <div class="error-card">
            ${escapeHTML(
              getText(
                "noResults",
                "Non ho trovato risultati."
              )
            )}
          </div>
        `;

  }

  if (sources) {

    const sourceData =
      Array.isArray(data.sources)
        ? data.sources
        : [];

    sources.innerHTML =
      sourceData
        .map(
          source => {

            const url =
              safeURL(
                source.url
              );

            if (!url) return "";

            return `

              <a
                class="source-item"
                href="${escapeAttribute(url)}"
                target="_blank"
                rel="noopener noreferrer"
              >

                <div>
                  ${escapeHTML(
                    source.source ||
                    ""
                  )}
                </div>

                <strong>
                  ${escapeHTML(
                    source.title ||
                    ""
                  )}
                </strong>

              </a>

            `;

          }
        )
        .join("");

  }

  const availability =
    document.getElementById(
      "availabilitySection"
    );

  const availabilityList =
    document.getElementById(
      "availabilityList"
    );

  if (
    availability &&
    availabilityList &&
    Array.isArray(data.availability) &&
    data.availability.length
  ) {

    availability.classList.remove(
      "hidden"
    );

    availabilityList.innerHTML =
      data.availability
        .map(item => {

          const url =
            safeURL(item.url);

          return `

            <div class="availability-item">

              <strong>
                ${escapeHTML(
                  item.title ||
                  item.name ||
                  ""
                )}
              </strong>

              ${
                item.price
                  ? `
                    <span>
                      ${escapeHTML(
                        String(
                          item.price
                        )
                      )}
                    </span>
                  `
                  : ""
              }

              ${
                url
                  ? `
                    <a
                      href="${escapeAttribute(url)}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${escapeHTML(
                        getText(
                          "open",
                          "Apri →"
                        )
                      )}
                    </a>
                  `
                  : ""
              }

            </div>

          `;

        })
        .join("");

  }
}


function createResultCard(
  item,
  index
) {

  const pros =
    Array.isArray(item.pros)
      ? item.pros
      : [];

  const cons =
    Array.isArray(item.cons)
      ? item.cons
      : [];

  const url =
    safeURL(item.url);

  return `

    <article class="result-card">

      <div class="result-rank">
        ${String(
          index + 1
        ).padStart(2, "0")}
      </div>

      <div class="result-main">

        <div class="result-icon">
          ${escapeHTML(
            item.emoji || "✦"
          )}
        </div>

        <div class="result-info">

          <h3>
            ${escapeHTML(
              item.title || ""
            )}
          </h3>

          <p class="result-reason">
            ${escapeHTML(
              item.reason || ""
            )}
          </p>

          <div class="pros-cons">

            <div class="pros">

              ${pros
                .slice(0, 2)
                .map(
                  pro =>
                    `<span>✓ ${escapeHTML(
                      pro
                    )}</span>`
                )
                .join("")}

            </div>

            <div class="cons">

              ${cons
                .slice(0, 2)
                .map(
                  con =>
                    `<span>− ${escapeHTML(
                      con
                    )}</span>`
                )
                .join("")}

            </div>

          </div>

          ${
            url
              ? `
                <a
                  class="result-link"
                  href="${escapeAttribute(url)}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${escapeHTML(
                    getText(
                      "viewSource",
                      "Vedi fonte →"
                    )
                  )}
                </a>
              `
              : ""
          }

        </div>

      </div>

    </article>

  `;
}


/* =========================================================
   EXAMPLES
========================================================= */

function setupExamples() {

  document
    .querySelectorAll("[data-example]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const input =
            document.getElementById(
              "freeSearchInput"
            );

          if (!input) return;

          input.value =
            button.dataset.example;

          input.focus();

        }
      );

    });
}


/* =========================================================
   LANGUAGE
========================================================= */

function setupLanguage() {

  const select =
    document.getElementById(
      "languageSelect"
    );

  if (!select) return;

  if (
    !["it", "en", "es", "fr"]
      .includes(currentLanguage)
  ) {

    currentLanguage = "it";

  }

  select.value =
    currentLanguage;

  select.addEventListener(
    "change",
    () => {

      const language =
        select.value;

      if (
        !["it", "en", "es", "fr"]
          .includes(language)
      ) {
        return;
      }

      currentLanguage =
        language;

      localStorage.setItem(
        "findlyLanguage",
        language
      );

      applyLanguage();

    }
  );
}


function applyLanguage() {

  document.documentElement.lang =
    currentLanguage;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      const translation =
        translations[
          currentLanguage
        ]?.[key];

      if (
        translation === undefined
      ) {
        return;
      }

      element.textContent =
        translation;

    });


  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(element => {

      const key =
        element.dataset
          .i18nPlaceholder;

      const translation =
        translations[
          currentLanguage
        ]?.[key];

      if (
        translation !== undefined
      ) {

        element.placeholder =
          translation;

      }

    });


  const select =
    document.getElementById(
      "languageSelect"
    );

  if (select) {
    select.value =
      currentLanguage;
  }

  updateAuthTexts();
}


function getText(
  key,
  fallback
) {

  return (
    translations[
      currentLanguage
    ]?.[key] ||
    fallback
  );
}


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  it: {

    navigation: "NAVIGAZIONE",
    home: "Home",
    freeSearch: "Ricerca libera",
    guidedSearch: "Ricerca guidata",
    compare: "Confronta",
    method: "Metodo Findly",
    categories: "CATEGORIE",
    account: "ACCOUNT",

    tech: "Tecnologia",
    fashion: "Moda",
    movies: "Film & Serie",
    books: "Libri",
    music: "Musica",
    travel: "Viaggi",
    food: "Cibo",
    sport: "Sport",
    cars: "Auto",
    homeCategory: "Casa",

    profile: "Profilo",
    settings: "Impostazioni",

    introSubtitle: "Trova il meglio",

    heroLine1: "Tu chiedi.",
    heroLine2: "Findly trova.",

    heroText:
      "Non una recensione. Non un'opinione. Il meglio dell'insieme.",

    searchLabel:
      "COSA STAI CERCANDO?",

    searchPlaceholder:
      "Cosa vuoi trovare?",

    searchHint:
      "Findly analizza più fonti e cerca il consenso generale.",

    chooseMode:
      "SCEGLI COME CERCARE",

    freeDescription:
      "Scrivi semplicemente quello che vuoi trovare.",

    guidedDescription:
      "Dai a Findly categoria e preferenze precise.",

    compareDescription:
      "Metti due alternative una contro l'altra.",

    explore:
      "ESPLORA",

    methodLabel:
      "IL METODO FINDLY",

    methodTitle:
      "Non scegliere dalla voce più forte.",

    methodText:
      "Findly raccoglie più fonti, confronta opinioni, individua i punti che si ripetono e ti mostra ciò che emerge dall'insieme.",

    discoverMethod:
      "Scopri il metodo →",

    freeTitle:
      "Dimmi cosa cerchi.",

    freePlaceholder:
      "Es. migliori cuffie sotto 150€",

    examples:
      "PROVA:",

    guidedTitle:
      "Guidami verso il meglio.",

    categoryLabel:
      "CATEGORIA",

    requestLabel:
      "COSA CERCHI?",

    guidedPlaceholder:
      "Es. cuffie wireless",

    preferenceLabel:
      "COSA CONTA DI PIÙ?",

    preferencePlaceholder:
      "Es. qualità, prezzo, durata...",

    findBest:
      "Trova il meglio →",

    compareTitle:
      "A o B?",

    optionA:
      "OPZIONE A",

    optionB:
      "OPZIONE B",

    firstPlaceholder:
      "Prima alternativa",

    secondPlaceholder:
      "Seconda alternativa",

    contextPlaceholder:
      "Cosa conta di più per te?",

    compareButton:
      "Confronta →",

    methodHero1:
      "Una recensione può sbagliare.",

    methodHero2:
      "Un insieme di opinioni racconta di più.",

    step1Title:
      "Cerca",

    step1Text:
      "Findly cerca informazioni su più fonti.",

    step2Title:
      "Confronta",

    step2Text:
      "Le fonti vengono analizzate insieme, non una per volta.",

    step3Title:
      "Individua i pattern",

    step3Text:
      "Findly cerca pregi, difetti e opinioni che si ripetono.",

    step4Title:
      "Ti consiglia",

    step4Text:
      "Alla fine ricevi una selezione ragionata, non semplicemente il primo risultato.",

    welcomeFindly:
      "Entra in Findly",

    loginDescription:
      "Accedi per salvare preferenze e impostazioni.",

    login:
      "Accedi",

    register:
      "Registrati",

    logout:
      "Esci",

    namePlaceholder:
      "Nome",

    emailPlaceholder:
      "Email",

    passwordPlaceholder:
      "Password",

    editProfile:
      "Modifica profilo",

    save:
      "Salva",

    language:
      "Lingua",

    languageDescription:
      "Cambia la lingua dell'interfaccia.",

    notifications:
      "Notifiche",

    notificationsDescription:
      "Attiva o disattiva le notifiche.",

    savePreferences:
      "Salva preferenze",

    preferencesDescription:
      "Mantieni le tue preferenze su questo dispositivo.",

    theme:
      "Tema",

    themeDescription:
      "Scegli l'aspetto di Findly.",

    light:
      "Chiaro",

    dark:
      "Scuro",

    clearData:
      "Cancella dati",

    clearDataDescription:
      "Cancella account locale e preferenze salvate.",

    delete:
      "Cancella",

    availability:
      "DISPONIBILITÀ",

    sources:
      "FONTI ANALIZZATE",

    searching:
      "Sto cercando il meglio per te...",

    analyzingSources:
      "Analizzo più fonti...",

    bestFound:
      "Il meglio che ho trovato",

    viewSource:
      "Vedi fonte →",

    findlyChooses:
      "FINDLY SCEGLIE",

    analyzing:
      "Analizzo...",

    compareButtonText:
      "Confronta →",

    searchError:
      "Errore nella ricerca.",

    serverError:
      "Risposta non valida dal server.",

    errorTitle:
      "Qualcosa è andato storto.",

    noResults:
      "Non ho trovato risultati.",

    open:
      "Apri →"

  },


  en: {

    navigation: "NAVIGATION",
    home: "Home",
    freeSearch: "Free search",
    guidedSearch: "Guided search",
    compare: "Compare",
    method: "Findly method",
    categories: "CATEGORIES",
    account: "ACCOUNT",

    tech: "Technology",
    fashion: "Fashion",
    movies: "Movies & Series",
    books: "Books",
    music: "Music",
    travel: "Travel",
    food: "Food",
    sport: "Sports",
    cars: "Cars",
    homeCategory: "Home",

    profile: "Profile",
    settings: "Settings",

    introSubtitle: "Find the best",

    heroLine1: "You ask.",
    heroLine2: "Findly finds.",

    heroText:
      "Not one review. Not one opinion. The best of the whole picture.",

    searchLabel:
      "WHAT ARE YOU LOOKING FOR?",

    searchPlaceholder:
      "What do you want to find?",

    searchHint:
      "Findly analyzes multiple sources and looks for overall consensus.",

    chooseMode:
      "CHOOSE HOW TO SEARCH",

    freeDescription:
      "Simply write what you want to find.",

    guidedDescription:
      "Give Findly a category and specific preferences.",

    compareDescription:
      "Put two alternatives against each other.",

    explore:
      "EXPLORE",

    methodLabel:
      "THE FINDLY METHOD",

    methodTitle:
      "Don't choose based on the loudest voice.",

    methodText:
      "Findly gathers multiple sources, compares opinions, identifies recurring points and shows you what emerges from the whole.",

    discoverMethod:
      "Discover the method →",

    freeTitle:
      "Tell me what you're looking for.",

    freePlaceholder:
      "E.g. best headphones under €150",

    examples:
      "TRY:",

    guidedTitle:
      "Guide me to the best.",

    categoryLabel:
      "CATEGORY",

    requestLabel:
      "WHAT ARE YOU LOOKING FOR?",

    guidedPlaceholder:
      "E.g. wireless headphones",

    preferenceLabel:
      "WHAT MATTERS MOST?",

    preferencePlaceholder:
      "E.g. quality, price, battery life...",

    findBest:
      "Find the best →",

    compareTitle:
      "A or B?",

    optionA:
      "OPTION A",

    optionB:
      "OPTION B",

    firstPlaceholder:
      "First alternative",

    secondPlaceholder:
      "Second alternative",

    contextPlaceholder:
      "What matters most to you?",

    compareButton:
      "Compare →",

    methodHero1:
      "One review can be wrong.",

    methodHero2:
      "A collection of opinions tells you more.",

    step1Title:
      "Search",

    step1Text:
      "Findly searches information across multiple sources.",

    step2Title:
      "Compare",

    step2Text:
      "Sources are analyzed together, not one at a time.",

    step3Title:
      "Find patterns",

    step3Text:
      "Findly looks for recurring strengths, weaknesses and opinions.",

    step4Title:
      "Recommend",

    step4Text:
      "You receive a reasoned selection, not simply the first result.",

    welcomeFindly:
      "Join Findly",

    loginDescription:
      "Log in to save preferences and settings.",

    login:
      "Log in",

    register:
      "Sign up",

    logout:
      "Log out",

    namePlaceholder:
      "Name",

    emailPlaceholder:
      "Email",

    passwordPlaceholder:
      "Password",

    editProfile:
      "Edit profile",

    save:
      "Save",

    language:
      "Language",

    languageDescription:
      "Change the interface language.",

    notifications:
      "Notifications",

    notificationsDescription:
      "Turn notifications on or off.",

    savePreferences:
      "Save preferences",

    preferencesDescription:
      "Keep your preferences on this device.",

    theme:
      "Theme",

    themeDescription:
      "Choose the Findly appearance.",

    light:
      "Light",

    dark:
      "Dark",

    clearData:
      "Clear data",

    clearDataDescription:
      "Delete local account and saved preferences.",

    delete:
      "Delete",

    availability:
      "AVAILABILITY",

    sources:
      "SOURCES ANALYZED",

    searching:
      "Finding the best for you...",

    analyzingSources:
      "Analyzing multiple sources...",

    bestFound:
      "The best I found",

    viewSource:
      "View source →",

    findlyChooses:
      "FINDLY CHOOSES",

    analyzing:
      "Analyzing...",

    compareButtonText:
      "Compare →",

    searchError:
      "Search error.",

    serverError:
      "Invalid server response.",

    errorTitle:
      "Something went wrong.",

    noResults:
      "No results found.",

    open:
      "Open →"

  },


  es: {

    navigation: "NAVEGACIÓN",
    home: "Inicio",
    freeSearch: "Búsqueda libre",
    guidedSearch: "Búsqueda guiada",
    compare: "Comparar",
    method: "Método Findly",
    categories: "CATEGORÍAS",
    account: "CUENTA",

    tech: "Tecnología",
    fashion: "Moda",
    movies: "Películas y Series",
    books: "Libros",
    music: "Música",
    travel: "Viajes",
    food: "Comida",
    sport: "Deportes",
    cars: "Coches",
    homeCategory: "Casa",

    profile: "Perfil",
    settings: "Ajustes",

    introSubtitle: "Encuentra lo mejor",

    heroLine1: "Tú preguntas.",
    heroLine2: "Findly encuentra.",

    heroText:
      "No una reseña. No una opinión. Lo mejor del conjunto.",

    searchLabel:
      "¿QUÉ ESTÁS BUSCANDO?",

    searchPlaceholder:
      "¿Qué quieres encontrar?",

    searchHint:
      "Findly analiza varias fuentes y busca el consenso general.",

    chooseMode:
      "ELIGE CÓMO BUSCAR",

    freeDescription:
      "Escribe simplemente lo que quieres encontrar.",

    guidedDescription:
      "Dale a Findly una categoría y preferencias específicas.",

    compareDescription:
      "Pon dos alternativas frente a frente.",

    explore:
      "EXPLORA",

    methodLabel:
      "EL MÉTODO FINDLY",

    methodTitle:
      "No elijas según la voz más fuerte.",

    methodText:
      "Findly reúne varias fuentes, compara opiniones, identifica puntos repetidos y te muestra lo que surge del conjunto.",

    discoverMethod:
      "Descubre el método →",

    freeTitle:
      "Dime qué estás buscando.",

    freePlaceholder:
      "Ej. mejores auriculares por menos de 150€",

    examples:
      "PRUEBA:",

    guidedTitle:
      "Guíame hacia lo mejor.",

    categoryLabel:
      "CATEGORÍA",

    requestLabel:
      "¿QUÉ BUSCAS?",

    guidedPlaceholder:
      "Ej. auriculares inalámbricos",

    preferenceLabel:
      "¿QUÉ ES LO MÁS IMPORTANTE?",

    preferencePlaceholder:
      "Ej. calidad, precio, duración...",

    findBest:
      "Encuentra lo mejor →",

    compareTitle:
      "¿A o B?",

    optionA:
      "OPCIÓN A",

    optionB:
      "OPCIÓN B",

    firstPlaceholder:
      "Primera alternativa",

    secondPlaceholder:
      "Segunda alternativa",

    contextPlaceholder:
      "¿Qué es lo más importante para ti?",

    compareButton:
      "Comparar →",

    methodHero1:
      "Una reseña puede equivocarse.",

    methodHero2:
      "Un conjunto de opiniones cuenta más.",

    step1Title:
      "Buscar",

    step1Text:
      "Findly busca información en varias fuentes.",

    step2Title:
      "Comparar",

    step2Text:
      "Las fuentes se analizan juntas, no una por una.",

    step3Title:
      "Encontrar patrones",

    step3Text:
      "Findly busca ventajas, defectos y opiniones que se repiten.",

    step4Title:
      "Recomendar",

    step4Text:
      "Recibes una selección razonada, no simplemente el primer resultado.",

    welcomeFindly:
      "Entra en Findly",

    loginDescription:
      "Inicia sesión para guardar preferencias y ajustes.",

    login:
      "Iniciar sesión",

    register:
      "Registrarse",

    logout:
      "Cerrar sesión",

    namePlaceholder:
      "Nombre",

    emailPlaceholder:
      "Email",

    passwordPlaceholder:
      "Contraseña",

    editProfile:
      "Editar perfil",

    save:
      "Guardar",

    language:
      "Idioma",

    languageDescription:
      "Cambia el idioma de la interfaz.",

    notifications:
      "Notificaciones",

    notificationsDescription:
      "Activa o desactiva las notificaciones.",

    savePreferences:
      "Guardar preferencias",

    preferencesDescription:
      "Mantén tus preferencias en este dispositivo.",

    theme:
      "Tema",

    themeDescription:
      "Elige el aspecto de Findly.",

    light:
      "Claro",

    dark:
      "Oscuro",

    clearData:
      "Borrar datos",

    clearDataDescription:
      "Borra la cuenta local y las preferencias guardadas.",

    delete:
      "Borrar",

    availability:
      "DISPONIBILIDAD",

    sources:
      "FUENTES ANALIZADAS",

    searching:
      "Buscando lo mejor para ti...",

    analyzingSources:
      "Analizando varias fuentes...",

    bestFound:
      "Lo mejor que he encontrado",

    viewSource:
      "Ver fuente →",

    findlyChooses:
      "FINDLY ELIGE",

    analyzing:
      "Analizando...",

    compareButtonText:
      "Comparar →",

    searchError:
      "Error de búsqueda.",

    serverError:
      "Respuesta no válida del servidor.",

    errorTitle:
      "Algo salió mal.",

    noResults:
      "No se encontraron resultados.",

    open:
      "Abrir →"

  },


  fr: {

    navigation: "NAVIGATION",
    home: "Accueil",
    freeSearch: "Recherche libre",
    guidedSearch: "Recherche guidée",
    compare: "Comparer",
    method: "Méthode Findly",
    categories: "CATÉGORIES",
    account: "COMPTE",

    tech: "Technologie",
    fashion: "Mode",
    movies: "Films & Séries",
    books: "Livres",
    music: "Musique",
    travel: "Voyages",
    food: "Cuisine",
    sport: "Sport",
    cars: "Voitures",
    homeCategory: "Maison",

    profile: "Profil",
    settings: "Paramètres",

    introSubtitle:
      "Trouvez le meilleur",

    heroLine1:
      "Vous demandez.",

    heroLine2:
      "Findly trouve.",

    heroText:
      "Pas un avis. Pas une opinion. Le meilleur de l'ensemble.",

    searchLabel:
      "QUE RECHERCHEZ-VOUS ?",

    searchPlaceholder:
      "Que voulez-vous trouver ?",

    searchHint:
      "Findly analyse plusieurs sources et recherche le consensus général.",

    chooseMode:
      "CHOISISSEZ COMMENT RECHERCHER",

    freeDescription:
      "Écrivez simplement ce que vous souhaitez trouver.",

    guidedDescription:
      "Donnez à Findly une catégorie et des préférences précises.",

    compareDescription:
      "Mettez deux alternatives face à face.",

    explore:
      "EXPLORER",

    methodLabel:
      "LA MÉTHODE FINDLY",

    methodTitle:
      "Ne choisissez pas selon la voix la plus forte.",

    methodText:
      "Findly rassemble plusieurs sources, compare les opinions, identifie les points récurrents et vous montre ce qui ressort de l'ensemble.",

    discoverMethod:
      "Découvrir la méthode →",

    freeTitle:
      "Dites-moi ce que vous cherchez.",

    freePlaceholder:
      "Ex. meilleurs écouteurs à moins de 150€",

    examples:
      "ESSAYEZ :",

    guidedTitle:
      "Guidez-moi vers le meilleur.",

    categoryLabel:
      "CATÉGORIE",

    requestLabel:
      "QUE RECHERCHEZ-VOUS ?",

    guidedPlaceholder:
      "Ex. écouteurs sans fil",

    preferenceLabel:
      "QU'EST-CE QUI COMPTE LE PLUS ?",

    preferencePlaceholder:
      "Ex. qualité, prix, autonomie...",

    findBest:
      "Trouver le meilleur →",

    compareTitle:
      "A ou B ?",

    optionA:
      "OPTION A",

    optionB:
      "OPTION B",

    firstPlaceholder:
      "Première alternative",

    secondPlaceholder:
      "Deuxième alternative",

    contextPlaceholder:
      "Qu'est-ce qui compte le plus pour vous ?",

    compareButton:
      "Comparer →",

    methodHero1:
      "Un avis peut se tromper.",

    methodHero2:
      "Un ensemble d'opinions en dit davantage.",

    step1Title:
      "Rechercher",

    step1Text:
      "Findly recherche des informations sur plusieurs sources.",

    step2Title:
      "Comparer",

    step2Text:
      "Les sources sont analysées ensemble, pas une par une.",

    step3Title:
      "Trouver les tendances",

    step3Text:
      "Findly recherche les avantages, défauts et opinions récurrents.",

    step4Title:
      "Recommander",

    step4Text:
      "Vous recevez une sélection raisonnée, pas simplement le premier résultat.",

    welcomeFindly:
      "Rejoignez Findly",

    loginDescription:
      "Connectez-vous pour enregistrer vos préférences et paramètres.",

    login:
      "Connexion",

    register:
      "Créer un compte",

    logout:
      "Déconnexion",

    namePlaceholder:
      "Nom",

    emailPlaceholder:
      "Email",

    passwordPlaceholder:
      "Mot de passe",

    editProfile:
      "Modifier le profil",

    save:
      "Enregistrer",

    language:
      "Langue",

    languageDescription:
      "Changez la langue de l'interface.",

    notifications:
      "Notifications",

    notificationsDescription:
      "Activez ou désactivez les notifications.",

    savePreferences:
      "Enregistrer les préférences",

    preferencesDescription:
      "Conservez vos préférences sur cet appareil.",

    theme:
      "Thème",

    themeDescription:
      "Choisissez l'apparence de Findly.",

    light:
      "Clair",

    dark:
      "Sombre",

    clearData:
      "Effacer les données",

    clearDataDescription:
      "Supprimez le compte local et les préférences enregistrées.",

    delete:
      "Effacer",

    availability:
      "DISPONIBILITÉ",

    sources:
      "SOURCES ANALYSÉES",

    searching:
      "Je cherche le meilleur pour vous...",

    analyzingSources:
      "Analyse de plusieurs sources...",

    bestFound:
      "Le meilleur que j'ai trouvé",

    viewSource:
      "Voir la source →",

    findlyChooses:
      "FINDLY CHOISIT",

    analyzing:
      "Analyse...",

    compareButtonText:
      "Comparer →",

    searchError:
      "Erreur de recherche.",

    serverError:
      "Réponse du serveur invalide.",

    errorTitle:
      "Une erreur s'est produite.",

    noResults:
      "Aucun résultat trouvé.",

    open:
      "Ouvrir →"

  }

};


/* =========================================================
   PROFILE
========================================================= */

function setupProfile() {

  document
    .getElementById("showLoginButton")
    ?.addEventListener(
      "click",
      () => openAuth("login")
    );

  document
    .getElementById("showRegisterButton")
    ?.addEventListener(
      "click",
      () => openAuth("register")
    );

  document
    .getElementById("loginTab")
    ?.addEventListener(
      "click",
      () => openAuth("login")
    );

  document
    .getElementById("registerTab")
    ?.addEventListener(
      "click",
      () => openAuth("register")
    );

  document
    .getElementById("editProfileButton")
    ?.addEventListener(
      "click",
      openEditProfile
    );

  document
    .getElementById("saveProfileButton")
    ?.addEventListener(
      "click",
      saveEditedProfile
    );

  document
    .getElementById("logoutButton")
    ?.addEventListener(
      "click",
      logoutUser
    );

  loadProfile();
}


function loadProfile() {

  const raw =
    localStorage.getItem(
      "findlyUser"
    );

  if (!raw) return;

  try {

    updateProfileUI(
      JSON.parse(raw)
    );

  } catch {}

}


function openAuth(mode) {

  authMode =
    mode === "register"
      ? "register"
      : "login";

  const guest =
    document.getElementById(
      "loggedOutProfile"
    );

  const panel =
    document.getElementById(
      "authPanel"
    );

  if (guest) {
    guest.classList.add("hidden");
  }

  if (panel) {
    panel.classList.remove("hidden");
  }

  updateAuthTabs();
  updateAuthTexts();

  const name =
    document.getElementById(
      "authName"
    );

  if (authMode === "register") {
    name?.focus();
  } else {
    document
      .getElementById("authEmail")
      ?.focus();
  }
}


function updateAuthTabs() {

  document
    .getElementById("loginTab")
    ?.classList.toggle(
      "active",
      authMode === "login"
    );

  document
    .getElementById("registerTab")
    ?.classList.toggle(
      "active",
      authMode === "register"
    );
}


function updateAuthTexts() {

  const submit =
    document.getElementById(
      "authSubmit"
    );

  if (!submit) return;

  submit.textContent =
    authMode === "register"
      ? getText(
          "register",
          "Registrati"
        )
      : getText(
          "login",
          "Accedi"
        );

  updateAuthTabs();
}


function updateProfileUI(
  profile
) {

  const name =
    profile?.name ||
    profile?.email?.split("@")[0] ||
    "Findly User";

  const email =
    profile?.email ||
    "";

  const accountName =
    document.getElementById(
      "accountName"
    );

  const accountEmail =
    document.getElementById(
      "accountEmail"
    );

  if (accountName) {
    accountName.textContent =
      name;
  }

  if (accountEmail) {
    accountEmail.textContent =
      email;
  }

  const avatar =
    document.getElementById(
      "profileAvatar"
    );

  if (avatar) {
    avatar.textContent =
      "♙";
  }

  const headerIcon =
    document.getElementById(
      "profileIcon"
    );

  if (headerIcon) {
    headerIcon.textContent =
      "♙";
  }
}


function openEditProfile() {

  const raw =
    localStorage.getItem(
      "findlyUser"
    );

  if (!raw) return;

  let user;

  try {
    user = JSON.parse(raw);
  } catch {
    return;
  }

  const panel =
    document.getElementById(
      "editProfilePanel"
    );

  if (panel) {
    panel.classList.remove("hidden");
  }

  const name =
    document.getElementById(
      "editName"
    );

  const email =
    document.getElementById(
      "editEmail"
    );

  if (name) {
    name.value =
      user.name || "";
  }

  if (email) {
    email.value =
      user.email || "";
  }

  name?.focus();
}


function saveEditedProfile() {

  const name =
    document
      .getElementById("editName")
      ?.value.trim();

  const email =
    document
      .getElementById("editEmail")
      ?.value.trim();

  if (!name || !email) {
    return;
  }

  const raw =
    localStorage.getItem(
      "findlyUser"
    );

  let user = {};

  if (raw) {

    try {
      user = JSON.parse(raw);
    } catch {}

  }

  user.name =
    name;

  user.email =
    email;

  localStorage.setItem(
    "findlyUser",
    JSON.stringify(user)
  );

  updateProfileUI(user);

  document
    .getElementById(
      "editProfilePanel"
    )
    ?.classList.add("hidden");

  refreshAuthUI();
}


/* =========================================================
   AUTH
========================================================= */

function setupAuth() {

  document
    .getElementById("authSubmit")
    ?.addEventListener(
      "click",
      submitAuth
    );

  [
    "authName",
    "authEmail",
    "authPassword"
  ]
    .forEach(id => {

      document
        .getElementById(id)
        ?.addEventListener(
          "keydown",
          event => {

            if (
              event.key === "Enter"
            ) {
              submitAuth();
            }

          }
        );

    });

  refreshAuthUI();
}


function submitAuth() {

  if (
    authMode === "register"
  ) {

    registerUser();

  } else {

    loginUser();

  }
}


function registerUser() {

  const name =
    document
      .getElementById("authName")
      ?.value.trim();

  const email =
    document
      .getElementById("authEmail")
      ?.value.trim();

  const password =
    document
      .getElementById("authPassword")
      ?.value;

  const message =
    document.getElementById(
      "authMessage"
    );

  if (
    !name ||
    !email ||
    !password
  ) {

    if (message) {
      message.textContent =
        getText(
          "fillFields",
          "Compila tutti i campi."
        );
    }

    return;
  }

  if (!isValidEmail(email)) {

    if (message) {
      message.textContent =
        getText(
          "invalidEmail",
          "Inserisci un'email valida."
        );
    }

    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem(
    "findlyUser",
    JSON.stringify(user)
  );

  localStorage.setItem(
    "findlyLoggedIn",
    "true"
  );

  updateProfileUI(user);
  refreshAuthUI();

  if (message) {
    message.textContent =
      getText(
        "registered",
        "Account creato."
      );
  }
}


function loginUser() {

  const email =
    document
      .getElementById("authEmail")
      ?.value.trim();

  const password =
    document
      .getElementById("authPassword")
      ?.value;

  const message =
    document.getElementById(
      "authMessage"
    );

  if (!email) {

    if (message) {
      message.textContent =
        getText(
          "emailRequired",
          "Inserisci la tua email."
        );
    }

    return;
  }

  const raw =
    localStorage.getItem(
      "findlyUser"
    );

  let user = null;

  if (raw) {

    try {
      user = JSON.parse(raw);
    } catch {}

  }

  if (!user) {

    user = {
      name:
        email.split("@")[0],
      email,
      password:
        password || ""
    };

    localStorage.setItem(
      "findlyUser",
      JSON.stringify(user)
    );

  } else if (
    user.password &&
    password &&
    user.password !== password
  ) {

    if (message) {
      message.textContent =
        getText(
          "wrongPassword",
          "Password non corretta."
        );
    }

    return;
  }

  localStorage.setItem(
    "findlyLoggedIn",
    "true"
  );

  updateProfileUI(user);
  refreshAuthUI();

  if (message) {
    message.textContent =
      getText(
        "loggedIn",
        "Accesso effettuato."
      );
  }
}


function logoutUser() {

  localStorage.setItem(
    "findlyLoggedIn",
    "false"
  );

  refreshAuthUI();

  showPage("profile");
}


function refreshAuthUI() {

  const loggedIn =
    localStorage.getItem(
      "findlyLoggedIn"
    ) === "true";

  const guest =
    document.getElementById(
      "loggedOutProfile"
    );

  const authPanel =
    document.getElementById(
      "authPanel"
    );

  const profile =
    document.getElementById(
      "loggedInProfile"
    );

  const editPanel =
    document.getElementById(
      "editProfilePanel"
    );

  if (guest) {

    guest.classList.toggle(
      "hidden",
      loggedIn
    );

  }

  if (profile) {

    profile.classList.toggle(
      "hidden",
      !loggedIn
    );

  }

  if (!loggedIn) {

    authPanel?.classList.add(
      "hidden"
    );

    editPanel?.classList.add(
      "hidden"
    );

  }

  if (loggedIn) {
    loadProfile();
  }
}


/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

  const notifications =
    document.getElementById(
      "notificationsToggle"
    );

  notifications?.addEventListener(
    "change",
    () => {

      localStorage.setItem(
        "findlyNotifications",
        String(
          notifications.checked
        )
      );

    }
  );


  const preferences =
    document.getElementById(
      "preferencesToggle"
    );

  preferences?.addEventListener(
    "change",
    () => {

      localStorage.setItem(
        "findlySavePreferences",
        String(
          preferences.checked
        )
      );

    }
  );


  const theme =
    document.getElementById(
      "themeSelect"
    );

  theme?.addEventListener(
    "change",
    () => {

      const value =
        theme.value;

      localStorage.setItem(
        "findlyTheme",
        value
      );

      applyTheme(value);

    }
  );


  document
    .getElementById(
      "clearDataButton"
    )
    ?.addEventListener(
      "click",
      clearFindlyData
    );
}


function loadSettings() {

  const notifications =
    document.getElementById(
      "notificationsToggle"
    );

  const savedNotifications =
    localStorage.getItem(
      "findlyNotifications"
    );

  if (notifications) {

    notifications.checked =
      savedNotifications !== "false";

  }


  const preferences =
    document.getElementById(
      "preferencesToggle"
    );

  const savedPreferences =
    localStorage.getItem(
      "findlySavePreferences"
    );

  if (preferences) {

    preferences.checked =
      savedPreferences !== "false";

  }


  const theme =
    document.getElementById(
      "themeSelect"
    );

  const savedTheme =
    localStorage.getItem(
      "findlyTheme"
    ) || "light";

  if (theme) {
    theme.value =
      savedTheme;
  }

  applyTheme(savedTheme);
}


function applyTheme(theme) {

  document.body.classList.toggle(
    "dark-mode",
    theme === "dark"
  );
}


function clearFindlyData() {

  const confirmed =
    window.confirm(
      getText(
        "confirmDelete",
        "Vuoi cancellare tutti i dati locali di Findly?"
      )
    );

  if (!confirmed) return;

  [
    "findlyUser",
    "findlyLoggedIn",
    "findlyProfile",
    "findlyLanguage",
    "findlyNotifications",
    "findlySavePreferences",
    "findlyTheme"
  ]
    .forEach(key =>
      localStorage.removeItem(key)
    );

  currentLanguage =
    "it";

  currentCategory =
    "other";

  const select =
    document.getElementById(
      "languageSelect"
    );

  if (select) {
    select.value = "it";
  }

  applyLanguage();
  loadSettings();
  refreshAuthUI();
}


/* =========================================================
   HELPERS
========================================================= */

function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);

}


function safeURL(value) {

  if (!value) return "";

  try {

    const url =
      new URL(
        String(value),
        window.location.href
      );

    if (
      url.protocol === "http:" ||
      url.protocol === "https:"
    ) {

      return url.href;

    }

  } catch {}

  return "";
}


function escapeHTML(value) {

  return String(
    value ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


function escapeAttribute(value) {

  return escapeHTML(value)
    .replaceAll(
      "`",
      "&#096;"
    );

}