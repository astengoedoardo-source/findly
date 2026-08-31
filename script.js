/* =========================================================
   FINDLY V8 — FRONTEND
========================================================= */

const WORKER_URL =
  "https://shrill-firefly-79b6.astengoedoardo.workers.dev";

let currentCategory = "other";
let currentLanguage =
  localStorage.getItem("findlyLanguage") || "it";

let authMode = "register";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  it: {
    introSubtitle: "Lo trova.",
    menu: "MENU",
    home: "Home",
    freeSearch: "Ricerca libera",
    guidedSearch: "Ricerca guidata",
    compare: "Confronta",
    method: "Metodo Findly",
    categories: "CATEGORIE",
    account: "ACCOUNT",
    profile: "Profilo",
    settings: "Impostazioni",

    catTech: "Tecnologia",
    catFashion: "Moda",
    catMovies: "Film & Serie",
    catBooks: "Libri",
    catMusic: "Musica",
    catTravel: "Viaggi",
    catFood: "Cibo",
    catSport: "Sport",
    catCars: "Auto",
    catHome: "Casa",

    heroKicker: "NON CERCARE. TROVA.",
    heroBest: "il meglio",
    heroText:
      "Dimmi cosa cerchi. Findly analizza più fonti, confronta opinioni e ti aiuta a scegliere.",
    whatLookingFor: "COSA STAI CERCANDO?",
    searchPlaceholder: "Cosa vuoi trovare?",
    find: "Trova →",
    searchHint:
      "Cerca prodotti, luoghi, film, auto, viaggi, libri e molto altro.",
    chooseMode: "SCEGLI COME CERCARE",
    exploreCategories: "ESPLORA LE CATEGORIE",

    freeSearchDesc:
      "Scrivi semplicemente quello che vuoi trovare.",
    guidedSearchDesc:
      "Dai a Findly categoria e preferenze per una ricerca più precisa.",
    compareDesc:
      "Metti due alternative una contro l'altra.",

    methodLabel: "IL METODO FINDLY",
    methodPreviewTitle:
      "Non scegliamo dalla prima recensione.",
    methodPreviewText:
      "Findly cerca più fonti e cerca i punti in comune tra recensioni, opinioni, esperienze e informazioni disponibili. L'obiettivo è capire il quadro generale.",
    discoverMethod: "Scopri il metodo →",

    freeSearchTitle: "Dimmi cosa cerchi.",
    freeSearchSubtitle: "Non servono formule precise.",
    freePlaceholder:
      "Es. migliori cuffie sotto 150€",
    examples: "Prova:",

    guidedTitle:
      "Più dettagli. Risultato migliore.",
    category: "CATEGORIA",
    guidedPlaceholder: "Es. cuffie wireless",
    priority: "COSA CONTA DI PIÙ?",
    preferencePlaceholder:
      "Es. qualità, prezzo, affidabilità...",

    compareTitle: "Quale scelgo?",
    compareSubtitle:
      "Lascia che Findly analizzi entrambe.",
    optionA: "OPZIONE A",
    optionB: "OPZIONE B",
    optionPlaceholder: "Alternativa",
    comparePriorityPlaceholder:
      "Cosa conta di più? Es. prezzo, qualità...",
    compareButton: "Confronta →",

    methodTitle: "Il modo in cui scegliamo.",
    methodHero:
      "Una recensione può essere un'opinione. Centinaia di opinioni iniziano a raccontare una storia.",
    step1Title: "Cerchiamo",
    step1Text:
      "Findly interroga più fonti online rilevanti per la tua richiesta.",
    step2Title: "Incrociamo",
    step2Text:
      "Non prendiamo una singola recensione come verità assoluta.",
    step3Title: "Troviamo i pattern",
    step3Text:
      "Cerchiamo pregi e difetti che ricorrono in più fonti indipendenti.",
    step4Title: "Ti aiutiamo a scegliere",
    step4Text:
      "Alla fine non devi leggere cento pagine: Findly sintetizza ciò che emerge.",

    sources: "FONTI ANALIZZATE",

    profileTitle: "Il tuo Findly.",
    register: "Registrati",
    login: "Accedi",
    editProfile: "Modifica profilo",
    logout: "Esci",
    save: "Salva",
    name: "Nome",
    email: "Email",

    settingsTitle: "Personalizza Findly.",
    language: "Lingua",
    languageDesc:
      "Scegli la lingua dell'interfaccia.",
    notifications: "Notifiche",
    notificationsDesc:
      "Attiva o disattiva le notifiche di Findly.",
    savePreferences: "Salva preferenze",
    savePreferencesDesc:
      "Ricorda lingua e impostazioni su questo dispositivo."
  },


  en: {
    introSubtitle: "Find it.",
    menu: "MENU",
    home: "Home",
    freeSearch: "Free search",
    guidedSearch: "Guided search",
    compare: "Compare",
    method: "Findly method",
    categories: "CATEGORIES",
    account: "ACCOUNT",
    profile: "Profile",
    settings: "Settings",

    catTech: "Technology",
    catFashion: "Fashion",
    catMovies: "Film & Series",
    catBooks: "Books",
    catMusic: "Music",
    catTravel: "Travel",
    catFood: "Food",
    catSport: "Sports",
    catCars: "Cars",
    catHome: "Home",

    heroKicker: "DON'T SEARCH. FIND.",
    heroBest: "the best",
    heroText:
      "Tell me what you're looking for. Findly analyzes multiple sources, compares opinions and helps you choose.",
    whatLookingFor: "WHAT ARE YOU LOOKING FOR?",
    searchPlaceholder: "What do you want to find?",
    find: "Find →",
    searchHint:
      "Search for products, places, movies, cars, trips, books and more.",
    chooseMode: "CHOOSE HOW TO SEARCH",
    exploreCategories: "EXPLORE CATEGORIES",

    freeSearchDesc:
      "Simply write what you want to find.",
    guidedSearchDesc:
      "Give Findly a category and your preferences for a more precise search.",
    compareDesc:
      "Put two alternatives against each other.",

    methodLabel: "THE FINDLY METHOD",
    methodPreviewTitle:
      "We don't choose from the first review.",
    methodPreviewText:
      "Findly searches multiple sources and looks for common patterns across reviews, opinions, experiences and available information.",
    discoverMethod: "Discover the method →",

    freeSearchTitle: "Tell me what you're looking for.",
    freeSearchSubtitle: "No precise formula required.",
    freePlaceholder:
      "E.g. best headphones under €150",
    examples: "Try:",

    guidedTitle:
      "More details. Better result.",
    category: "CATEGORY",
    guidedPlaceholder: "E.g. wireless headphones",
    priority: "WHAT MATTERS MOST?",
    preferencePlaceholder:
      "E.g. quality, price, reliability...",

    compareTitle: "Which one should I choose?",
    compareSubtitle:
      "Let Findly analyze both.",
    optionA: "OPTION A",
    optionB: "OPTION B",
    optionPlaceholder: "Alternative",
    comparePriorityPlaceholder:
      "What matters most? E.g. price, quality...",
    compareButton: "Compare →",

    methodTitle: "How we choose.",
    methodHero:
      "One review can be an opinion. Hundreds of opinions start telling a story.",
    step1Title: "Search",
    step1Text:
      "Findly searches multiple online sources relevant to your request.",
    step2Title: "Cross-check",
    step2Text:
      "We don't treat a single review as absolute truth.",
    step3Title: "Find patterns",
    step3Text:
      "We look for strengths and weaknesses repeated across independent sources.",
    step4Title: "Help you choose",
    step4Text:
      "You don't have to read a hundred pages: Findly summarizes what emerges.",

    sources: "SOURCES ANALYZED",

    profileTitle: "Your Findly.",
    register: "Sign up",
    login: "Log in",
    editProfile: "Edit profile",
    logout: "Log out",
    save: "Save",
    name: "Name",
    email: "Email",

    settingsTitle: "Customize Findly.",
    language: "Language",
    languageDesc:
      "Choose the interface language.",
    notifications: "Notifications",
    notificationsDesc:
      "Turn Findly notifications on or off.",
    savePreferences: "Save preferences",
    savePreferencesDesc:
      "Remember language and settings on this device."
  },


  es: {
    introSubtitle: "Encuéntralo.",
    menu: "MENÚ",
    home: "Inicio",
    freeSearch: "Búsqueda libre",
    guidedSearch: "Búsqueda guiada",
    compare: "Comparar",
    method: "Método Findly",
    categories: "CATEGORÍAS",
    account: "CUENTA",
    profile: "Perfil",
    settings: "Ajustes",

    catTech: "Tecnología",
    catFashion: "Moda",
    catMovies: "Películas y series",
    catBooks: "Libros",
    catMusic: "Música",
    catTravel: "Viajes",
    catFood: "Comida",
    catSport: "Deportes",
    catCars: "Coches",
    catHome: "Casa",

    heroKicker: "NO BUSQUES. ENCUENTRA.",
    heroBest: "lo mejor",
    heroText:
      "Dime qué buscas. Findly analiza varias fuentes, compara opiniones y te ayuda a elegir.",
    whatLookingFor: "¿QUÉ ESTÁS BUSCANDO?",
    searchPlaceholder: "¿Qué quieres encontrar?",
    find: "Encontrar →",
    searchHint:
      "Busca productos, lugares, películas, coches, viajes, libros y mucho más.",
    chooseMode: "ELIGE CÓMO BUSCAR",
    exploreCategories: "EXPLORA LAS CATEGORÍAS",

    freeSearchDesc:
      "Escribe simplemente lo que quieres encontrar.",
    guidedSearchDesc:
      "Indica una categoría y tus preferencias para una búsqueda más precisa.",
    compareDesc:
      "Pon dos alternativas una frente a la otra.",

    methodLabel: "EL MÉTODO FINDLY",
    methodPreviewTitle:
      "No elegimos según la primera reseña.",
    methodPreviewText:
      "Findly busca varias fuentes y encuentra patrones comunes entre reseñas, opiniones, experiencias e información disponible.",
    discoverMethod: "Descubre el método →",

    freeSearchTitle: "Dime qué estás buscando.",
    freeSearchSubtitle: "No necesitas una fórmula precisa.",
    freePlaceholder:
      "Ej. mejores auriculares por menos de 150€",
    examples: "Prueba:",

    guidedTitle:
      "Más detalles. Mejor resultado.",
    category: "CATEGORÍA",
    guidedPlaceholder: "Ej. auriculares inalámbricos",
    priority: "¿QUÉ ES LO MÁS IMPORTANTE?",
    preferencePlaceholder:
      "Ej. calidad, precio, fiabilidad...",

    compareTitle: "¿Cuál elijo?",
    compareSubtitle:
      "Deja que Findly analice ambos.",
    optionA: "OPCIÓN A",
    optionB: "OPCIÓN B",
    optionPlaceholder: "Alternativa",
    comparePriorityPlaceholder:
      "¿Qué importa más? Ej. precio, calidad...",
    compareButton: "Comparar →",

    methodTitle: "La forma en que elegimos.",
    methodHero:
      "Una reseña puede ser una opinión. Cientos de opiniones empiezan a contar una historia.",
    step1Title: "Buscamos",
    step1Text:
      "Findly consulta varias fuentes online relevantes para tu solicitud.",
    step2Title: "Contrastamos",
    step2Text:
      "No consideramos una sola reseña como verdad absoluta.",
    step3Title: "Encontramos patrones",
    step3Text:
      "Buscamos puntos fuertes y débiles repetidos en varias fuentes independientes.",
    step4Title: "Te ayudamos a elegir",
    step4Text:
      "No tienes que leer cien páginas: Findly resume lo que aparece.",

    sources: "FUENTES ANALIZADAS",

    profileTitle: "Tu Findly.",
    register: "Registrarse",
    login: "Iniciar sesión",
    editProfile: "Editar perfil",
    logout: "Cerrar sesión",
    save: "Guardar",
    name: "Nombre",
    email: "Email",

    settingsTitle: "Personaliza Findly.",
    language: "Idioma",
    languageDesc:
      "Elige el idioma de la interfaz.",
    notifications: "Notificaciones",
    notificationsDesc:
      "Activa o desactiva las notificaciones de Findly.",
    savePreferences: "Guardar preferencias",
    savePreferencesDesc:
      "Recuerda el idioma y los ajustes en este dispositivo."
  },


  fr: {
    introSubtitle: "Trouvez-le.",
    menu: "MENU",
    home: "Accueil",
    freeSearch: "Recherche libre",
    guidedSearch: "Recherche guidée",
    compare: "Comparer",
    method: "Méthode Findly",
    categories: "CATÉGORIES",
    account: "COMPTE",
    profile: "Profil",
    settings: "Paramètres",

    catTech: "Technologie",
    catFashion: "Mode",
    catMovies: "Films & Séries",
    catBooks: "Livres",
    catMusic: "Musique",
    catTravel: "Voyages",
    catFood: "Cuisine",
    catSport: "Sport",
    catCars: "Voitures",
    catHome: "Maison",

    heroKicker: "NE CHERCHEZ PAS. TROUVEZ.",
    heroBest: "le meilleur",
    heroText:
      "Dites-moi ce que vous cherchez. Findly analyse plusieurs sources, compare les avis et vous aide à choisir.",
    whatLookingFor: "QUE CHERCHEZ-VOUS ?",
    searchPlaceholder: "Que voulez-vous trouver ?",
    find: "Trouver →",
    searchHint:
      "Recherchez des produits, lieux, films, voitures, voyages, livres et bien plus.",
    chooseMode: "CHOISISSEZ COMMENT CHERCHER",
    exploreCategories: "EXPLORER LES CATÉGORIES",

    freeSearchDesc:
      "Écrivez simplement ce que vous voulez trouver.",
    guidedSearchDesc:
      "Indiquez une catégorie et vos préférences pour une recherche plus précise.",
    compareDesc:
      "Mettez deux alternatives face à face.",

    methodLabel: "LA MÉTHODE FINDLY",
    methodPreviewTitle:
      "Nous ne choisissons pas selon le premier avis.",
    methodPreviewText:
      "Findly recherche plusieurs sources et identifie les tendances communes dans les avis, opinions, expériences et informations disponibles.",
    discoverMethod: "Découvrir la méthode →",

    freeSearchTitle: "Dites-moi ce que vous cherchez.",
    freeSearchSubtitle: "Aucune formule précise nécessaire.",
    freePlaceholder:
      "Ex. meilleurs écouteurs à moins de 150€",
    examples: "Essayez :",

    guidedTitle:
      "Plus de détails. Meilleur résultat.",
    category: "CATÉGORIE",
    guidedPlaceholder: "Ex. écouteurs sans fil",
    priority: "QU'EST-CE QUI COMPTE LE PLUS ?",
    preferencePlaceholder:
      "Ex. qualité, prix, fiabilité...",

    compareTitle: "Lequel choisir ?",
    compareSubtitle:
      "Laissez Findly analyser les deux.",
    optionA: "OPTION A",
    optionB: "OPTION B",
    optionPlaceholder: "Alternative",
    comparePriorityPlaceholder:
      "Qu'est-ce qui compte le plus ? Ex. prix, qualité...",
    compareButton: "Comparer →",

    methodTitle: "Notre façon de choisir.",
    methodHero:
      "Un avis peut être une opinion. Des centaines d'avis commencent à raconter une histoire.",
    step1Title: "Nous cherchons",
    step1Text:
      "Findly consulte plusieurs sources en ligne pertinentes pour votre demande.",
    step2Title: "Nous croisons",
    step2Text:
      "Nous ne considérons pas un seul avis comme une vérité absolue.",
    step3Title: "Nous trouvons les tendances",
    step3Text:
      "Nous recherchons les qualités et défauts répétés dans plusieurs sources indépendantes.",
    step4Title: "Nous vous aidons à choisir",
    step4Text:
      "Pas besoin de lire cent pages : Findly synthétise ce qui ressort.",

    sources: "SOURCES ANALYSÉES",

    profileTitle: "Votre Findly.",
    register: "S'inscrire",
    login: "Se connecter",
    editProfile: "Modifier le profil",
    logout: "Se déconnecter",
    save: "Enregistrer",
    name: "Nom",
    email: "Email",

    settingsTitle: "Personnalisez Findly.",
    language: "Langue",
    languageDesc:
      "Choisissez la langue de l'interface.",
    notifications: "Notifications",
    notificationsDesc:
      "Activez ou désactivez les notifications Findly.",
    savePreferences: "Enregistrer les préférences",
    savePreferencesDesc:
      "Mémorisez la langue et les paramètres sur cet appareil."
  }

};


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    applyLanguage(currentLanguage);
    loadSettings();
    updateProfileUI();

    const intro =
      document.getElementById("introScreen");

    const app =
      document.getElementById("app");

    setTimeout(() => {

      intro.classList.add("intro-hide");

      setTimeout(() => {

        intro.style.display = "none";
        app.classList.remove("hidden");

      }, 700);

    }, 1700);

    setupNavigation();
    setupSearch();
    setupCategories();
    setupGuided();
    setupCompare();
    setupExamples();
    setupAuth();
    setupProfile();
    setupSettings();

  }
);


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

  menuButton.onclick =
    openMenu;

  closeMenu.onclick =
    closeSideMenu;

  overlay.onclick =
    closeSideMenu;


  document
    .querySelectorAll("[data-page]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const page =
            button.dataset.page;

          showPage(page);
          closeSideMenu();

        }
      );

    });


  document
    .getElementById("homeLogo")
    .onclick = () =>
      showPage("home");

}


function openMenu() {

  document
    .getElementById("sideMenu")
    .classList.add("open");

  document
    .getElementById("menuOverlay")
    .classList.add("show");

}


function closeSideMenu() {

  document
    .getElementById("sideMenu")
    .classList.remove("open");

  document
    .getElementById("menuOverlay")
    .classList.remove("show");

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

          showPage("guided");

          const select =
            document.getElementById(
              "guidedCategory"
            );

          if (select) {
            select.value =
              currentCategory;
          }

        }
      );

    });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

  const input =
    document.getElementById("searchInput");

  const button =
    document.getElementById("searchButton");

  button.addEventListener(
    "click",
    () => {

      const query =
        input.value.trim();

      if (!query) {
        input.focus();
        return;
      }

      search(
        query,
        currentCategory,
        {}
      );

    }
  );


  input.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        button.click();
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

  freeButton.addEventListener(
    "click",
    () => {

      const query =
        freeInput.value.trim();

      if (!query) {
        freeInput.focus();
        return;
      }

      search(
        query,
        "other",
        {}
      );

    }
  );


  freeInput.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        freeButton.click();
      }

    }
  );

}


/* =========================================================
   GUIDED
========================================================= */

function setupGuided() {

  document
    .getElementById(
      "guidedSearchButton"
    )
    .addEventListener(
      "click",
      () => {

        const category =
          document.getElementById(
            "guidedCategory"
          ).value;

        const query =
          document.getElementById(
            "guidedQuery"
          ).value.trim();

        const preference =
          document.getElementById(
            "guidedPreference"
          ).value.trim();

        if (!query) {

          document
            .getElementById(
              "guidedQuery"
            )
            .focus();

          return;

        }

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
    .addEventListener(
      "click",
      compare
    );

}


async function compare() {

  const first =
    document
      .getElementById(
        "compareFirst"
      )
      .value.trim();

  const second =
    document
      .getElementById(
        "compareSecond"
      )
      .value.trim();

  const context =
    document
      .getElementById(
        "compareContext"
      )
      .value.trim();

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

  button.disabled = true;
  button.textContent =
    currentLanguage === "it"
      ? "Analizzo..."
      : currentLanguage === "en"
        ? "Analyzing..."
        : currentLanguage === "es"
          ? "Analizando..."
          : "Analyse...";


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
        data.error || "Errore"
      );
    }


    result.innerHTML = `

      <div class="compare-result-card">

        <div class="winner-label">
          ${escapeHTML(
            currentLanguage === "it"
              ? "FINDLY SCEGLIE"
              : currentLanguage === "en"
                ? "FINDLY CHOOSES"
                : currentLanguage === "es"
                  ? "FINDLY ELIGE"
                  : "FINDLY CHOISIT"
          )}
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

  } catch (error) {

    result.innerHTML = `
      <div class="error-card">
        ${escapeHTML(
          error.message
        )}
      </div>
    `;

  } finally {

    button.disabled = false;

    button.textContent =
      translations[
        currentLanguage
      ]?.compareButton ||
      "Confronta →";

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

  title.textContent =
    searchingText();

  answer.innerHTML = "";

  list.innerHTML = `
    <div class="loading">
      <div class="loader"></div>
      <span>${escapeHTML(
        loadingText()
      )}</span>
    </div>
  `;


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
        "Errore nella ricerca"
      );

    }


    renderResults(data);


  } catch (error) {

    title.textContent =
      errorTitle();

    list.innerHTML = `
      <div class="error-card">
        ${escapeHTML(
          error.message
        )}
      </div>
    `;

  }

}


/* =========================================================
   RESULTS
========================================================= */

function renderResults(data) {

  document
    .getElementById(
      "resultsTitle"
    )
    .textContent =
      resultTitle();


  const answer =
    document.getElementById(
      "resultsAnswer"
    );


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


  const list =
    document.getElementById(
      "resultsList"
    );


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


  const sources =
    document.getElementById(
      "sourcesList"
    );


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
            rel="noopener noreferrer"
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


function createResultCard(
  item,
  index
) {

  return `

    <article class="result-card">

      <div class="result-rank">
        ${String(index + 1).padStart(2, "0")}
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
                (item.pros || [])
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
                (item.cons || [])
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
                  rel="noopener noreferrer"
                >
                  ${escapeHTML(
                    currentLanguage === "it"
                      ? "Vedi fonte →"
                      : currentLanguage === "en"
                        ? "View source →"
                        : currentLanguage === "es"
                          ? "Ver fuente →"
                          : "Voir la source →"
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

function applyLanguage(language) {

  if (!translations[language]) {
    language = "it";
  }

  currentLanguage = language;

  document.documentElement.lang =
    language;

  document
    .querySelectorAll("[data-i18n]")
    .forEach(element => {

      const key =
        element.dataset.i18n;

      const value =
        translations[language]?.[key];

      if (value !== undefined) {
        element.textContent = value;
      }

    });


  document
    .querySelectorAll(
      "[data-i18n-placeholder]"
    )
    .forEach(element => {

      const key =
        element.dataset.i18nPlaceholder;

      const value =
        translations[language]?.[key];

      if (value !== undefined) {
        element.placeholder = value;
      }

    });


  const languageSelect =
    document.getElementById(
      "languageSelect"
    );

  if (languageSelect) {
    languageSelect.value =
      language;
  }

}


function setupSettings() {

  const languageSelect =
    document.getElementById(
      "languageSelect"
    );

  const notifications =
    document.getElementById(
      "notificationsToggle"
    );

  const preferences =
    document.getElementById(
      "preferencesToggle"
    );


  languageSelect.addEventListener(
    "change",
    event => {

      currentLanguage =
        event.target.value;

      if (
        preferences.checked
      ) {
        localStorage.setItem(
          "findlyLanguage",
          currentLanguage
        );
      }

      applyLanguage(
        currentLanguage
      );

    }
  );


  notifications.addEventListener(
    "change",
    event => {

      localStorage.setItem(
        "findlyNotifications",
        String(event.target.checked)
      );

    }
  );


  preferences.addEventListener(
    "change",
    event => {

      if (event.target.checked) {

        localStorage.setItem(
          "findlyLanguage",
          currentLanguage
        );

        localStorage.setItem(
          "findlyPreferences",
          "true"
        );

      } else {

        localStorage.removeItem(
          "findlyLanguage"
        );

        localStorage.setItem(
          "findlyPreferences",
          "false"
        );

      }

    }
  );

}


function loadSettings() {

  const language =
    localStorage.getItem(
      "findlyLanguage"
    );

  if (
    language &&
    translations[language]
  ) {
    currentLanguage =
      language;
  }


  const notifications =
    document.getElementById(
      "notificationsToggle"
    );

  const preferences =
    document.getElementById(
      "preferencesToggle"
    );

  if (notifications) {

    notifications.checked =
      localStorage.getItem(
        "findlyNotifications"
      ) === "true";

  }

  if (preferences) {

    preferences.checked =
      localStorage.getItem(
        "findlyPreferences"
      ) !== "false";

  }

}


/* =========================================================
   LOCAL ACCOUNT
========================================================= */

function getStoredUser() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "findlyUser"
      )
    );

  } catch {

    return null;

  }

}


function saveUser(user) {

  localStorage.setItem(
    "findlyUser",
    JSON.stringify(user)
  );

}


function updateProfileUI() {

  const user =
    getStoredUser();

  const name =
    document.getElementById(
      "profileName"
    );

  const email =
    document.getElementById(
      "profileEmail"
    );

  const loggedOut =
    document.getElementById(
      "loggedOutActions"
    );

  const loggedIn =
    document.getElementById(
      "loggedInActions"
    );


  if (user) {

    name.textContent =
      user.name || "User";

    email.textContent =
      user.email || "";

    loggedOut.classList.add(
      "hidden"
    );

    loggedIn.classList.remove(
      "hidden"
    );

  } else {

    name.textContent =
      currentLanguage === "it"
        ? "Ospite"
        : currentLanguage === "en"
          ? "Guest"
          : currentLanguage === "es"
            ? "Invitado"
            : "Invité";

    email.textContent =
      currentLanguage === "it"
        ? "Non hai ancora effettuato l'accesso."
        : currentLanguage === "en"
          ? "You are not logged in."
          : currentLanguage === "es"
            ? "Aún no has iniciado sesión."
            : "Vous n'êtes pas connecté.";

    loggedOut.classList.remove(
      "hidden"
    );

    loggedIn.classList.add(
      "hidden"
    );

  }

}


/* =========================================================
   AUTH
========================================================= */

function setupAuth() {

  document
    .getElementById(
      "registerButton"
    )
    .addEventListener(
      "click",
      () => openAuth("register")
    );


  document
    .getElementById(
      "loginButton"
    )
    .addEventListener(
      "click",
      () => openAuth("login")
    );


  document
    .getElementById(
      "closeAuthModal"
    )
    .addEventListener(
      "click",
      closeAuth
    );


  document
    .getElementById(
      "authSwitch"
    )
    .addEventListener(
      "click",
      () => {

        openAuth(
          authMode === "register"
            ? "login"
            : "register"
        );

      }
    );


  document
    .getElementById(
      "authForm"
    )
    .addEventListener(
      "submit",
      handleAuthSubmit
    );

}


function openAuth(mode) {

  authMode = mode;

  const modal =
    document.getElementById(
      "authModal"
    );

  const name =
    document.getElementById(
      "authName"
    );

  const title =
    document.getElementById(
      "authTitle"
    );

  const submit =
    document.getElementById(
      "authSubmit"
    );

  const switchButton =
    document.getElementById(
      "authSwitch"
    );


  const isRegister =
    mode === "register";


  name.classList.toggle(
    "hidden",
    !isRegister
  );

  name.required =
    isRegister;


  title.textContent =
    isRegister
      ? translations[currentLanguage].register
      : translations[currentLanguage].login;


  submit.textContent =
    title.textContent;


  switchButton.textContent =
    isRegister
      ? currentLanguage === "it"
        ? "Hai già un account? Accedi"
        : currentLanguage === "en"
          ? "Already have an account? Log in"
          : currentLanguage === "es"
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "Vous avez déjà un compte ? Connectez-vous"
      : currentLanguage === "it"
        ? "Non hai un account? Registrati"
        : currentLanguage === "en"
          ? "Don't have an account? Sign up"
          : currentLanguage === "es"
            ? "¿No tienes una cuenta? Regístrate"
            : "Pas de compte ? Inscrivez-vous";


  document
    .getElementById(
      "authMessage"
    )
    .textContent = "";


  modal.classList.remove(
    "hidden"
  );

}


function closeAuth() {

  document
    .getElementById(
      "authModal"
    )
    .classList.add(
      "hidden"
    );

}


function handleAuthSubmit(event) {

  event.preventDefault();

  const name =
    document
      .getElementById(
        "authName"
      )
      .value.trim();

  const email =
    document
      .getElementById(
        "authEmail"
      )
      .value.trim()
      .toLowerCase();

  const password =
    document
      .getElementById(
        "authPassword"
      )
      .value;


  if (
    !email ||
    !password ||
    (
      authMode === "register" &&
      !name
    )
  ) {
    return;
  }


  const existing =
    getStoredUser();


  if (
    authMode === "register"
  ) {

    saveUser({
      name,
      email,
      password
    });

    closeAuth();
    updateProfileUI();

    showPage("profile");

    return;
  }


  if (
    !existing ||
    existing.email !== email ||
    existing.password !== password
  ) {

    document
      .getElementById(
        "authMessage"
      )
      .textContent =
      currentLanguage === "it"
        ? "Email o password non corretti."
        : currentLanguage === "en"
          ? "Incorrect email or password."
          : currentLanguage === "es"
            ? "Email o contraseña incorrectos."
            : "Email ou mot de passe incorrect.";

    return;

  }


  closeAuth();
  updateProfileUI();
  showPage("profile");

}


/* =========================================================
   PROFILE
========================================================= */

function setupProfile() {

  document
    .getElementById(
      "logoutButton"
    )
    .addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "findlyUser"
        );

        updateProfileUI();

      }
    );


  document
    .getElementById(
      "editProfileButton"
    )
    .addEventListener(
      "click",
      openProfileEditor
    );


  document
    .getElementById(
      "closeProfileModal"
    )
    .addEventListener(
      "click",
      closeProfileEditor
    );


  document
    .getElementById(
      "profileForm"
    )
    .addEventListener(
      "submit",
      saveProfile
    );

}


function openProfileEditor() {

  const user =
    getStoredUser();

  if (!user) return;


  document
    .getElementById(
      "editName"
    )
    .value =
    user.name || "";


  document
    .getElementById(
      "editEmail"
    )
    .value =
    user.email || "";


  document
    .getElementById(
      "profileModal"
    )
    .classList.remove(
      "hidden"
    );

}


function closeProfileEditor() {

  document
    .getElementById(
      "profileModal"
    )
    .classList.add(
      "hidden"
    );

}


function saveProfile(event) {

  event.preventDefault();

  const user =
    getStoredUser();

  if (!user) return;


  user.name =
    document
      .getElementById(
        "editName"
      )
      .value.trim();

  user.email =
    document
      .getElementById(
        "editEmail"
      )
      .value.trim()
      .toLowerCase();


  saveUser(user);

  closeProfileEditor();
  updateProfileUI();

}


/* =========================================================
   TEXT HELPERS
========================================================= */

function searchingText() {

  return {
    it: "Sto cercando il meglio per te...",
    en: "Finding the best for you...",
    es: "Buscando lo mejor para ti...",
    fr: "Je cherche le meilleur pour vous..."
  }[currentLanguage];

}


function loadingText() {

  return {
    it: "Analizzo più fonti...",
    en: "Analyzing multiple sources...",
    es: "Analizando varias fuentes...",
    fr: "Analyse de plusieurs sources..."
  }[currentLanguage];

}


function resultTitle() {

  return {
    it: "Il meglio che ho trovato",
    en: "The best I found",
    es: "Lo mejor que he encontrado",
    fr: "Le meilleur que j'ai trouvé"
  }[currentLanguage];

}


function errorTitle() {

  return {
    it: "Qualcosa è andato storto.",
    en: "Something went wrong.",
    es: "Algo salió mal.",
    fr: "Quelque chose s'est mal passé."
  }[currentLanguage];

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(value) {

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(value) {

  return escapeHTML(value)
    .replaceAll("`", "&#096;");
}