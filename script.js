/* =========================================================
   FINDLY V8 — SCRIPT
========================================================= */

const WORKER_URL =
  "https://shrill-firefly-79b6.astengoedoardo.workers.dev";

let currentCategory = "other";
let currentLanguage = "it";


/* =========================================================
   START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const intro =
    document.getElementById("introScreen");

  const app =
    document.getElementById("app");

  setTimeout(() => {

    if (intro) {
      intro.classList.add("intro-hide");
    }

    setTimeout(() => {

      if (intro) {
        intro.style.display = "none";
      }

      if (app) {
        app.classList.remove("hidden");
      }

    }, 700);

  }, 1700);


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
});


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

  if (menuButton) {
    menuButton.onclick = openMenu;
  }

  if (closeMenu) {
    closeMenu.onclick = closeSideMenu;
  }

  if (overlay) {
    overlay.onclick = closeSideMenu;
  }

  document
    .querySelectorAll("[data-page]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const page =
          button.dataset.page;

        showPage(page);
        closeSideMenu();

      });

    });

  const homeLogo =
    document.getElementById("homeLogo");

  if (homeLogo) {
    homeLogo.onclick =
      () => showPage("home");
  }

}


function openMenu() {

  const menu =
    document.getElementById("sideMenu");

  const overlay =
    document.getElementById("menuOverlay");

  if (menu) {
    menu.classList.add("open");
  }

  if (overlay) {
    overlay.classList.add("show");
  }

}


function closeSideMenu() {

  const menu =
    document.getElementById("sideMenu");

  const overlay =
    document.getElementById("menuOverlay");

  if (menu) {
    menu.classList.remove("open");
  }

  if (overlay) {
    overlay.classList.remove("show");
  }

}


function showPage(page) {

  document
    .querySelectorAll(".page")
    .forEach(item => {

      item.classList.remove(
        "active-page"
      );

    });

  const target =
    document.getElementById(
      page + "Page"
    );

  if (target) {

    target.classList.add(
      "active-page"
    );

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
    document.getElementById(
      "searchInput"
    );

  const button =
    document.getElementById(
      "searchButton"
    );

  if (button) {

    button.addEventListener(
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

  }

  if (input) {

    input.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          button?.click();

        }

      }
    );

  }


  const freeInput =
    document.getElementById(
      "freeSearchInput"
    );

  const freeButton =
    document.getElementById(
      "freeSearchButton"
    );

  if (freeButton) {

    freeButton.addEventListener(
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

  }

  if (freeInput) {

    freeInput.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          freeButton?.click();

        }

      }
    );

  }

}


/* =========================================================
   GUIDED SEARCH
========================================================= */

function setupGuided() {

  const button =
    document.getElementById(
      "guidedSearchButton"
    );

  if (!button) return;

  button.addEventListener(
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
          .getElementById(
            "guidedQuery"
          )
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

  const button =
    document.getElementById(
      "compareButton"
    );

  if (button) {
    button.addEventListener(
      "click",
      compare
    );
  }

}


async function compare() {

  const first =
    document
      .getElementById(
        "compareFirst"
      )
      ?.value.trim();

  const second =
    document
      .getElementById(
        "compareSecond"
      )
      ?.value.trim();

  const context =
    document
      .getElementById(
        "compareContext"
      )
      ?.value.trim();

  if (!first || !second) {
    return;
  }

  const button =
    document.getElementById(
      "compareButton"
    );

  const result =
    document.getElementById(
      "compareResult"
    );

  if (button) {
    button.disabled = true;
    button.textContent =
      currentLanguage === "en"
        ? "Analyzing..."
        : "Analizzo...";
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

    if (!data.ok) {

      throw new Error(
        data.error ||
        "Errore"
      );

    }

    if (result) {

      result.innerHTML = `

        <div class="compare-result-card">

          <div class="winner-label">
            ${
              currentLanguage === "en"
                ? "FINDLY CHOOSES"
                : "FINDLY SCEGLIE"
            }
          </div>

          <h3>
            ${
              data.winner === "option_a"
                ? escapeHTML(first)
                : escapeHTML(second)
            }
          </h3>

          <p>
            ${escapeHTML(
              data.answer || ""
            )}
          </p>

          <div class="reason-list">

            ${
              (data.reasons || [])
                .map(
                  reason =>
                    `<div>✓ ${escapeHTML(
                      reason
                    )}</div>`
                )
                .join("")
            }

          </div>

        </div>

      `;

    }

  } catch (error) {

    if (result) {

      result.innerHTML = `
        <div class="error-card">
          ${escapeHTML(
            error.message
          )}
        </div>
      `;

    }

  } finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        currentLanguage === "en"
          ? "Compare →"
          : "Confronta →";

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

  if (title) {

    title.textContent =
      currentLanguage === "en"
        ? "Finding the best for you..."
        : "Sto cercando il meglio per te...";

  }

  if (answer) {
    answer.innerHTML = "";
  }

  if (list) {

    list.innerHTML = `
      <div class="loading">

        <div class="loader"></div>

        <span>
          ${
            currentLanguage === "en"
              ? "Analyzing multiple sources..."
              : "Analizzo più fonti..."
          }
        </span>

      </div>
    `;

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

    const data =
      await response.json();

    if (!data.ok) {

      throw new Error(
        data.error ||
        (
          currentLanguage === "en"
            ? "Search error"
            : "Errore nella ricerca"
        )
      );

    }

    renderResults(data);

  } catch (error) {

    if (title) {

      title.textContent =
        currentLanguage === "en"
          ? "Something went wrong."
          : "Qualcosa è andato storto.";

    }

    if (list) {

      list.innerHTML = `
        <div class="error-card">
          ${escapeHTML(
            error.message
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
      currentLanguage === "en"
        ? "The best I found"
        : "Il meglio che ho trovato";

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

    list.innerHTML =
      (data.topPicks || [])
        .map(
          (item, index) =>
            createResultCard(
              item,
              index
            )
        )
        .join("");

  }

  if (sources) {

    sources.innerHTML =
      (data.sources || [])
        .map(
          source => `

            <a
              class="source-item"
              href="${escapeAttribute(
                source.url
              )}"
              target="_blank"
              rel="noopener"
            >

              <div>
                ${escapeHTML(
                  source.source
                )}
              </div>

              <strong>
                ${escapeHTML(
                  source.title
                )}
              </strong>

            </a>

          `
        )
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

              ${
                pros
                  .slice(0, 2)
                  .map(
                    pro =>
                      `<span>✓ ${escapeHTML(
                        pro
                      )}</span>`
                  )
                  .join("")
              }

            </div>

            <div class="cons">

              ${
                cons
                  .slice(0, 2)
                  .map(
                    con =>
                      `<span>− ${escapeHTML(
                        con
                      )}</span>`
                  )
                  .join("")
              }

            </div>

          </div>

          ${
            item.url
              ? `
                <a
                  class="result-link"
                  href="${escapeAttribute(
                    item.url
                  )}"
                  target="_blank"
                  rel="noopener"
                >
                  ${
                    currentLanguage === "en"
                      ? "View source →"
                      : "Vedi fonte →"
                  }
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

  const saved =
    localStorage.getItem(
      "findlyLanguage"
    );

  if (
    ["it", "en", "es", "fr"]
      .includes(saved)
  ) {

    currentLanguage =
      saved;

  }

  document
    .querySelectorAll(
      "[data-language]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const language =
            button.dataset.language;

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

    });

  applyLanguage();

}


function applyLanguage() {

  document
    .querySelectorAll(
      "[data-i18n]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18n;

      const translation =
        translations[
          currentLanguage
        ]?.[key];

      if (
        translation !== undefined
      ) {

        if (
          element.tagName ===
          "INPUT" ||
          element.tagName ===
          "TEXTAREA"
        ) {

          element.placeholder =
            translation;

        } else {

          element.textContent =
            translation;

        }

      }

    });

  document
    .querySelectorAll(
      "[data-language]"
    )
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.language ===
        currentLanguage
      );

    });

}


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  it: {

    search: "Cerca",
    compare: "Confronta",
    guided: "Ricerca guidata",
    free: "Ricerca libera",
    method: "Metodo Findly",
    profile: "Profilo",
    settings: "Impostazioni",
    login: "Accedi",
    register: "Registrati",
    logout: "Esci",

    searchPlaceholder:
      "Cosa stai cercando?",

    guidedPlaceholder:
      "Cosa vuoi trovare?",

    preferencePlaceholder:
      "Hai preferenze particolari?",

    compareContext:
      "Cosa conta di più per te?",

    homeTitle:
      "Trova il meglio.",

    homeSubtitle:
      "Findly confronta più fonti e opinioni per aiutarti a scegliere.",

    save:
      "Salva",

    notifications:
      "Notifiche",

    preferences:
      "Preferenze",

    editProfile:
      "Modifica profilo"

  },

  en: {

    search: "Search",
    compare: "Compare",
    guided: "Guided search",
    free: "Free search",
    method: "Findly method",
    profile: "Profile",
    settings: "Settings",
    login: "Log in",
    register: "Sign up",
    logout: "Log out",

    searchPlaceholder:
      "What are you looking for?",

    guidedPlaceholder:
      "What do you want to find?",

    preferencePlaceholder:
      "Any specific preferences?",

    compareContext:
      "What matters most to you?",

    homeTitle:
      "Find the best.",

    homeSubtitle:
      "Findly compares multiple sources and opinions to help you choose.",

    save:
      "Save",

    notifications:
      "Notifications",

    preferences:
      "Preferences",

    editProfile:
      "Edit profile"

  },

  es: {

    search: "Buscar",
    compare: "Comparar",
    guided: "Búsqueda guiada",
    free: "Búsqueda libre",
    method: "Método Findly",
    profile: "Perfil",
    settings: "Ajustes",
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",

    searchPlaceholder:
      "¿Qué estás buscando?",

    guidedPlaceholder:
      "¿Qué quieres encontrar?",

    preferencePlaceholder:
      "¿Tienes preferencias?",

    compareContext:
      "¿Qué es lo más importante para ti?",

    homeTitle:
      "Encuentra lo mejor.",

    homeSubtitle:
      "Findly compara varias fuentes y opiniones para ayudarte a elegir.",

    save:
      "Guardar",

    notifications:
      "Notificaciones",

    preferences:
      "Preferencias",

    editProfile:
      "Editar perfil"

  },

  fr: {

    search: "Rechercher",
    compare: "Comparer",
    guided: "Recherche guidée",
    free: "Recherche libre",
    method: "Méthode Findly",
    profile: "Profil",
    settings: "Paramètres",
    login: "Connexion",
    register: "Créer un compte",
    logout: "Déconnexion",

    searchPlaceholder:
      "Que recherchez-vous ?",

    guidedPlaceholder:
      "Que voulez-vous trouver ?",

    preferencePlaceholder:
      "Avez-vous des préférences ?",

    compareContext:
      "Qu'est-ce qui compte le plus pour vous ?",

    homeTitle:
      "Trouvez le meilleur.",

    homeSubtitle:
      "Findly compare plusieurs sources et opinions pour vous aider à choisir.",

    save:
      "Enregistrer",

    notifications:
      "Notifications",

    preferences:
      "Préférences",

    editProfile:
      "Modifier le profil"

  }

};


/* =========================================================
   PROFILE
========================================================= */

function setupProfile() {

  const savedProfile =
    localStorage.getItem(
      "findlyProfile"
    );

  if (savedProfile) {

    try {

      const profile =
        JSON.parse(
          savedProfile
        );

      updateProfileUI(
        profile
      );

    } catch {}

  }

  document
    .querySelectorAll(
      "[data-profile-save]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        saveProfile
      );

    });

}


function saveProfile() {

  const name =
    document
      .getElementById(
        "profileName"
      )
      ?.value.trim() || "";

  const email =
    document
      .getElementById(
        "profileEmail"
      )
      ?.value.trim() || "";

  const profile = {
    name,
    email
  };

  localStorage.setItem(
    "findlyProfile",
    JSON.stringify(profile)
  );

  updateProfileUI(
    profile
  );

}


function updateProfileUI(
  profile
) {

  document
    .querySelectorAll(
      "[data-profile-name]"
    )
    .forEach(element => {

      element.textContent =
        profile.name ||
        "Findly User";

    });

  document
    .querySelectorAll(
      "[data-profile-email]"
    )
    .forEach(element => {

      element.textContent =
        profile.email ||
        "";

    });

}


/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

  const notifications =
    document.getElementById(
      "notificationsToggle"
    );

  if (notifications) {

    const saved =
      localStorage.getItem(
        "findlyNotifications"
      );

    notifications.checked =
      saved !== "false";

    notifications.addEventListener(
      "change",
      () => {

        localStorage.setItem(
          "findlyNotifications",
          notifications.checked
        );

      }
    );

  }


  document
    .querySelectorAll(
      "[data-preference]"
    )
    .forEach(input => {

      const key =
        input.dataset.preference;

      const saved =
        localStorage.getItem(
          "findlyPref_" + key
        );

      if (
        saved !== null
      ) {

        if (
          input.type ===
          "checkbox"
        ) {

          input.checked =
            saved === "true";

        } else {

          input.value =
            saved;

        }

      }

      input.addEventListener(
        "change",
        () => {

          const value =
            input.type ===
            "checkbox"
              ? input.checked
              : input.value;

          localStorage.setItem(
            "findlyPref_" + key,
            value
          );

        }
      );

    });

}


/* =========================================================
   AUTH
========================================================= */

function setupAuth() {

  document
    .querySelectorAll(
      "[data-auth-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const action =
            button.dataset.authAction;

          if (
            action === "register"
          ) {

            registerUser();

          }

          if (
            action === "login"
          ) {

            loginUser();

          }

          if (
            action === "logout"
          ) {

            logoutUser();

          }

        }
      );

    });

  refreshAuthUI();

}


function registerUser() {

  const name =
    document
      .getElementById(
        "authName"
      )
      ?.value.trim();

  const email =
    document
      .getElementById(
        "authEmail"
      )
      ?.value.trim();

  const password =
    document
      .getElementById(
        "authPassword"
      )
      ?.value;

  if (
    !name ||
    !email ||
    !password
  ) {
    return;
  }

  const user = {
    name,
    email
  };

  localStorage.setItem(
    "findlyUser",
    JSON.stringify(user)
  );

  localStorage.setItem(
    "findlyLoggedIn",
    "true"
  );

  updateProfileUI(
    user
  );

  refreshAuthUI();

}


function loginUser() {

  const email =
    document
      .getElementById(
        "authEmail"
      )
      ?.value.trim();

  if (!email) {
    return;
  }

  const existing =
    localStorage.getItem(
      "findlyUser"
    );

  let user = null;

  if (existing) {

    try {

      user =
        JSON.parse(existing);

    } catch {}

  }

  if (!user) {

    user = {
      name:
        email.split("@")[0],
      email
    };

    localStorage.setItem(
      "findlyUser",
      JSON.stringify(user)
    );

  }

  localStorage.setItem(
    "findlyLoggedIn",
    "true"
  );

  updateProfileUI(
    user
  );

  refreshAuthUI();

}


function logoutUser() {

  localStorage.setItem(
    "findlyLoggedIn",
    "false"
  );

  refreshAuthUI();

}


function refreshAuthUI() {

  const loggedIn =
    localStorage.getItem(
      "findlyLoggedIn"
    ) === "true";

  document
    .querySelectorAll(
      "[data-auth-logged]"
    )
    .forEach(element => {

      element.style.display =
        loggedIn
          ? ""
          : "none";

    });

  document
    .querySelectorAll(
      "[data-auth-guest]"
    )
    .forEach(element => {

      element.style.display =
        loggedIn
          ? "none"
          : "";

    });

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(value) {

  return String(
    value || ""
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