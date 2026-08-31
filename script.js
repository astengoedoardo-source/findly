/* =========================================================
   FINDLY V6 — SCRIPT
   Frontend engine
========================================================= */

const FINDLY_CONFIG = {
  WORKER_URL: "INCOLLA_QUI_IL_LINK_DEL_TUO_WORKER",
  MAX_RESULTS: 10
};


/* =========================================================
   STATE
========================================================= */

const state = {
  language: localStorage.getItem("findly_language") || "it",
  theme: localStorage.getItem("findly_theme") || "dark",
  fontSize: localStorage.getItem("findly_font_size") || "normal",

  currentCategory: "other",
  currentQuery: "",
  currentFields: {},

  lastSearch: null,

  history: loadStorage("findly_history", []),
  favorites: loadStorage("findly_favorites", [])
};


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  it: {

    home: "Home",
    suggest: "Findly Suggest",
    local: "Findly Locale",
    discover: "Scopri",
    favorites: "Preferiti",
    history: "Cronologia",
    profile: "Profilo",
    settings: "Impostazioni",

    language: "Lingua",

    eyebrow: "FINDLY",

    heroTitle: "Trova il meglio.",

    heroSubtitle:
      "Dimmi cosa cerchi e Findly analizzerà il web per aiutarti a trovare, confrontare e scegliere.",

    talkToFindly: "Parla con Findly",

    talkDescription:
      "Dimmi cosa stai cercando.",

    welcomeMessage:
      "Cosa vuoi trovare oggi? Puoi chiedermi un film, un prodotto, un libro, un viaggio, un ristorante o aiutarmi a scegliere tra più alternative.",

    suggestionMovie:
      "Non so quale film guardare",

    suggestionTravel:
      "Non so dove andare",

    suggestionBook:
      "Cerco un libro",

    suggestionFood:
      "Voglio mangiare bene",

    searchPlaceholder:
      "Scrivi a Findly...",

    search:
      "CERCA",

    chooseCategory:
      "Cosa stai cercando?",

    categoryDescription:
      "Scegli una categoria oppure chiedi direttamente a Findly.",

    movies:
      "Film & Serie",

    moviesDescription:
      "Trova cosa guardare",

    books:
      "Libri",

    booksDescription:
      "Trova cosa leggere",

    fashion:
      "Moda",

    fashionDescription:
      "Trova il tuo stile",

    technology:
      "Tecnologia",

    technologyDescription:
      "Confronta prodotti",

    travel:
      "Viaggi",

    travelDescription:
      "Trova la tua prossima meta",

    food:
      "Cibo",

    foodDescription:
      "Trova dove mangiare",

    sport:
      "Sport",

    sportDescription:
      "Trova cosa fare",

    other:
      "Altro",

    otherDescription:
      "Cerca qualsiasi cosa",

    findly:
      "FINDLY",

    findBest:
      "Trova il meglio",

    findlySuggest:
      "FINDLY SUGGEST",

    compareTitle:
      "Non sai quale scegliere?",

    compareDescription:
      "Metti a confronto due o più alternative e lascia che Findly analizzi le differenze.",

    firstAlternative:
      "Prima alternativa",

    secondAlternative:
      "Seconda alternativa",

    comparisonPlaceholder:
      "Cosa conta per te? Es. qualità, prezzo, recensioni...",

    compare:
      "Confronta con Findly",

    findlyLocal:
      "FINDLY LOCALE",

    localTitle:
      "Trova il meglio vicino a te.",

    localDescription:
      "Ristoranti, palestre, campi da calcetto, attività, negozi e molto altro.",

    localPlaceholder:
      "Es. Trova un campo da calcetto stasera sotto €70 l'ora...",

    searchNearby:
      "Cerca vicino a me",

    findlyResults:
      "RISULTATI FINDLY",

    bestFound:
      "Abbiamo trovato il meglio.",

    analyzing:
      "Findly sta analizzando il web...",

    analyzingDescription:
      "Stiamo confrontando fonti, recensioni e informazioni disponibili.",

    searchErrorTitle:
      "Non sono riuscito a completare la ricerca.",

    searchErrorDescription:
      "Controlla la connessione e riprova.",

    retry:
      "Riprova",

    myAnalysis:
      "La mia analisi",

    topChoices:
      "TOP SCELTE",

    bestOptions:
      "Le migliori opzioni.",

    whereToFind:
      "DOVE TROVARLO",

    whereAvailable:
      "Dove puoi trovarlo.",

    sources:
      "FONTI",

    webSources:
      "Cosa abbiamo analizzato.",

    sourcesDescription:
      "Findly confronta informazioni provenienti da diverse fonti del web.",

    discoverTitle:
      "Potresti trovare qualcosa che non stavi cercando.",

    favoritesTitle:
      "Le cose che hai salvato.",

    historyTitle:
      "Le tue ricerche.",

    profileTitle:
      "Il tuo Findly.",

    profileDescription:
      "In futuro potrai salvare preferenze, interessi e budget per ricevere suggerimenti sempre più personali.",

    login:
      "Accedi / Registrati",

    settingsTitle:
      "Personalizza Findly.",

    appearance:
      "Aspetto",

    appearanceDescription:
      "Scegli come vedere Findly.",

    languageDescription:
      "Scegli la lingua di Findly.",

    textSize:
      "Dimensione testo",

    textSizeDescription:
      "Accessibilità dell'interfaccia.",

    footer:
      "Trova il meglio.",

    results:
      "risultati",

    noResults:
      "Non ho trovato risultati sufficientemente affidabili.",

    source:
      "Fonte",

    visit:
      "Apri fonte",

    save:
      "Salva",

    saved:
      "Salvato",

    remove:
      "Rimuovi",

    streaming:
      "Dove guardarlo",

    recommendation:
      "Per te",

    errorWorker:
      "Il collegamento con il motore Findly non è disponibile.",

    errorNetwork:
      "Non riesco a raggiungere Findly. Controlla la connessione.",

    errorGeneric:
      "Si è verificato un errore durante la ricerca."

  },


  en: {

    home: "Home",
    suggest: "Findly Suggest",
    local: "Findly Local",
    discover: "Discover",
    favorites: "Favorites",
    history: "History",
    profile: "Profile",
    settings: "Settings",

    language: "Language",

    eyebrow: "FINDLY",

    heroTitle: "Find the best.",

    heroSubtitle:
      "Tell me what you're looking for and Findly will analyze the web to help you find, compare and choose.",

    talkToFindly: "Talk to Findly",

    talkDescription:
      "Tell me what you're looking for.",

    welcomeMessage:
      "What are you looking for today? Ask me about a movie, product, book, trip, restaurant, or help choosing between alternatives.",

    suggestionMovie:
      "I don't know what movie to watch",

    suggestionTravel:
      "I don't know where to go",

    suggestionBook:
      "I'm looking for a book",

    suggestionFood:
      "I want to eat well",

    searchPlaceholder:
      "Write to Findly...",

    search:
      "SEARCH",

    chooseCategory:
      "What are you looking for?",

    categoryDescription:
      "Choose a category or ask Findly directly.",

    movies:
      "Movies & Series",

    moviesDescription:
      "Find something to watch",

    books:
      "Books",

    booksDescription:
      "Find something to read",

    fashion:
      "Fashion",

    fashionDescription:
      "Find your style",

    technology:
      "Technology",

    technologyDescription:
      "Compare products",

    travel:
      "Travel",

    travelDescription:
      "Find your next destination",

    food:
      "Food",

    foodDescription:
      "Find somewhere to eat",

    sport:
      "Sports",

    sportDescription:
      "Find something to do",

    other:
      "Other",

    otherDescription:
      "Search for anything",

    findly:
      "FINDLY",

    findBest:
      "Find the best",

    findlySuggest:
      "FINDLY SUGGEST",

    compareTitle:
      "Can't decide?",

    compareDescription:
      "Compare two or more alternatives and let Findly analyze the differences.",

    firstAlternative:
      "First alternative",

    secondAlternative:
      "Second alternative",

    comparisonPlaceholder:
      "What matters to you? e.g. quality, price, reviews...",

    compare:
      "Compare with Findly",

    findlyLocal:
      "FINDLY LOCAL",

    localTitle:
      "Find the best near you.",

    localDescription:
      "Restaurants, gyms, football fields, activities, stores and much more.",

    localPlaceholder:
      "e.g. Find a football field tonight under €70 per hour...",

    searchNearby:
      "Search nearby",

    findlyResults:
      "FINDLY RESULTS",

    bestFound:
      "We found the best.",

    analyzing:
      "Findly is analyzing the web...",

    analyzingDescription:
      "We're comparing sources, reviews and available information.",

    searchErrorTitle:
      "I couldn't complete the search.",

    searchErrorDescription:
      "Check your connection and try again.",

    retry:
      "Try again",

    myAnalysis:
      "My analysis",

    topChoices:
      "TOP PICKS",

    bestOptions:
      "The best options.",

    whereToFind:
      "WHERE TO FIND IT",

    whereAvailable:
      "Where you can find it.",

    sources:
      "SOURCES",

    webSources:
      "What we analyzed.",

    sourcesDescription:
      "Findly compares information from multiple sources across the web.",

    discoverTitle:
      "You might discover something you weren't looking for.",

    favoritesTitle:
      "Things you've saved.",

    historyTitle:
      "Your searches.",

    profileTitle:
      "Your Findly.",

    profileDescription:
      "In the future you will be able to save preferences, interests and budgets for more personal recommendations.",

    login:
      "Log in / Sign up",

    settingsTitle:
      "Customize Findly.",

    appearance:
      "Appearance",

    appearanceDescription:
      "Choose how Findly looks.",

    languageDescription:
      "Choose Findly's language.",

    textSize:
      "Text size",

    textSizeDescription:
      "Interface accessibility.",

    footer:
      "Find the best.",

    results:
      "results",

    noResults:
      "I couldn't find enough reliable results.",

    source:
      "Source",

    visit:
      "Open source",

    save:
      "Save",

    saved:
      "Saved",

    remove:
      "Remove",

    streaming:
      "Where to watch",

    recommendation:
      "For you",

    errorWorker:
      "The Findly search engine is not available.",

    errorNetwork:
      "I can't reach Findly. Check your connection.",

    errorGeneric:
      "Something went wrong during the search."

  }

};


/* =========================================================
   DOM
========================================================= */

const $ = selector =>
  document.querySelector(selector);

const $$ = selector =>
  Array.from(document.querySelectorAll(selector));


/* =========================================================
   INIT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);


function init() {

  applyLanguage();
  applyTheme();
  applyFontSize();

  setupMenu();
  setupNavigation();
  setupSearch();
  setupCategories();
  setupSuggestions();
  setupComparison();
  setupLocalSearch();
  setupSettings();

  renderHistory();
  renderFavorites();

}


/* =========================================================
   LANGUAGE
========================================================= */

function applyLanguage() {

  document.documentElement.lang =
    state.language;

  const dictionary =
    translations[state.language] ||
    translations.it;


  $$("[data-i18n]").forEach(element => {

    const key =
      element.dataset.i18n;

    if (
      dictionary[key] !== undefined
    ) {

      element.textContent =
        dictionary[key];

    }

  });


  $$("[data-i18n-placeholder]").forEach(element => {

    const key =
      element.dataset.i18nPlaceholder;

    if (
      dictionary[key] !== undefined
    ) {

      element.placeholder =
        dictionary[key];

    }

  });


  $$(".language").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.lang ===
      state.language
    );

  });


  const settingsLanguage =
    $("#settingsLanguage");

  if (settingsLanguage) {

    settingsLanguage.value =
      state.language;

  }

}


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

function setLanguage(language) {

  if (
    !translations[language]
  ) {
    return;
  }


  state.language =
    language;

  localStorage.setItem(
    "findly_language",
    language
  );


  applyLanguage();

  /*
    IMPORTANT:
    We also update the current UI state.
    The next search is sent to the Worker
    with the selected language.
  */

  if (
    state.lastSearch
  ) {

    state.lastSearch.language =
      language;

  }

}


/* =========================================================
   MENU
========================================================= */

function setupMenu() {

  const open =
    $("#openMenu");

  const close =
    $("#closeMenu");

  const overlay =
    $("#menuOverlay");


  if (open) {

    open.addEventListener(
      "click",
      () => {

        $("#sideMenu")
          ?.classList.add("open");

        overlay
          ?.classList.add("active");

      }
    );

  }


  if (close) {

    close.addEventListener(
      "click",
      closeMenu
    );

  }


  if (overlay) {

    overlay.addEventListener(
      "click",
      closeMenu
    );

  }


  $$(".language").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        setLanguage(
          button.dataset.lang
        );

      }
    );

  });

}


function closeMenu() {

  $("#sideMenu")
    ?.classList.remove("open");

  $("#menuOverlay")
    ?.classList.remove("active");

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  $$(".menu-item").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const section =
          button.dataset.section;

        showSection(section);

        closeMenu();

      }
    );

  });

}


function showSection(section) {

  const sections = {

    home:
      "#homeSection",

    suggest:
      "#suggestSection",

    local:
      "#localSection",

    discover:
      "#discoverSection",

    favorites:
      "#favoritesSection",

    history:
      "#historySection",

    profile:
      "#profileSection",

    settings:
      "#settingsSection"

  };


  Object.values(sections)
    .forEach(selector => {

      const element =
        $(selector);

      if (element) {

        element.classList.add(
          "hidden"
        );

      }

    });


  const target =
    $(sections[section] || sections.home);


  target?.classList.remove(
    "hidden"
  );


  $$(".menu-item").forEach(item => {

    item.classList.toggle(
      "active",
      item.dataset.section === section
    );

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

  const button =
    $("#findButton");

  const input =
    $("#request");


  if (button) {

    button.addEventListener(
      "click",
      () => performSearch()
    );

  }


  if (input) {

    input.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" &&
          !event.shiftKey
        ) {

          event.preventDefault();

          performSearch();

        }

      }
    );


    input.addEventListener(
      "input",
      autoResize
    );

  }


  const dynamicButton =
    $("#dynamicSearchButton");


  if (dynamicButton) {

    dynamicButton.addEventListener(
      "click",
      performDynamicSearch
    );

  }


  const navbarSearch =
    $("#navbarSearchButton");


  if (navbarSearch) {

    navbarSearch.addEventListener(
      "click",
      () => {

        showSection("home");

        setTimeout(
          () => $("#request")?.focus(),
          100
        );

      }
    );

  }

}


/* =========================================================
   SUGGESTIONS
========================================================= */

function setupSuggestions() {

  $$(".suggestion").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const query =
          button.dataset.query || "";

        const input =
          $("#request");

        if (input) {

          input.value =
            translateSuggestion(
              query
            );

          input.focus();

        }

        performSearch();

      }
    );

  });

}


function translateSuggestion(query) {

  if (
    state.language === "it"
  ) {
    return query;
  }


  const map = {

    "Non so quale film guardare stasera":
      "I don't know what movie to watch tonight",

    "Voglio organizzare un viaggio al mare":
      "I want to plan a beach trip",

    "Cerco un libro interessante":
      "I'm looking for an interesting book",

    "Voglio trovare un buon ristorante":
      "I want to find a good restaurant"

  };


  return map[query] || query;

}


/* =========================================================
   CATEGORIES
========================================================= */

function setupCategories() {

  $$(".category-card").forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const category =
          card.dataset.category ||
          "other";

        openDynamicSearch(
          category
        );

      }
    );

  });

}


function openDynamicSearch(category) {

  state.currentCategory =
    category;


  const container =
    $("#dynamicFields");

  const title =
    $("#dynamicTitle");

  const description =
    $("#dynamicDescription");

  const dynamic =
    $("#dynamicSearch");


  if (
    !container ||
    !dynamic
  ) {
    return;
  }


  const categoryData =
    getCategoryFields(category);


  if (title) {

    title.textContent =
      categoryData.title;

  }


  if (description) {

    description.textContent =
      categoryData.description;

  }


  container.innerHTML =
    categoryData.fields;


  dynamic.classList.remove(
    "hidden"
  );


  dynamic.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* =========================================================
   CATEGORY FIELDS
========================================================= */

function getCategoryFields(category) {

  const isEnglish =
    state.language === "en";


  const data = {

    movies: {

      title:
        isEnglish
          ? "What do you want to watch?"
          : "Cosa vuoi guardare?",

      description:
        isEnglish
          ? "Tell Findly what kind of movie or series you're looking for."
          : "Dimmi che tipo di film o serie stai cercando.",

      fields: `

        <label>
          ${isEnglish ? "Movie, actor, genre or idea" : "Film, attore, genere o idea"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. funny movies with Adam Sandler" : "es. film divertenti con Adam Sandler"}">
        </label>

        <label>
          ${isEnglish ? "Genre" : "Genere"}
          <select name="genre">
            <option value="">${isEnglish ? "Any genre" : "Qualsiasi genere"}</option>
            <option value="comedy">${isEnglish ? "Comedy" : "Commedia"}</option>
            <option value="action">${isEnglish ? "Action" : "Azione"}</option>
            <option value="horror">${isEnglish ? "Horror" : "Horror"}</option>
            <option value="thriller">${isEnglish ? "Thriller" : "Thriller"}</option>
            <option value="drama">${isEnglish ? "Drama" : "Drammatico"}</option>
            <option value="romance">${isEnglish ? "Romance" : "Romantico"}</option>
          </select>
        </label>

        <label>
          ${isEnglish ? "What matters most?" : "Cosa conta di più?"}
          <select name="priority">
            <option value="">${isEnglish ? "Overall quality" : "Qualità generale"}</option>
            <option value="reviews">${isEnglish ? "Reviews" : "Recensioni"}</option>
            <option value="fun">${isEnglish ? "Fun" : "Divertimento"}</option>
            <option value="scariness">${isEnglish ? "Scary" : "Paura"}</option>
            <option value="story">${isEnglish ? "Story" : "Storia"}</option>
          </select>
        </label>

      `

    },


    books: {

      title:
        isEnglish
          ? "What do you want to read?"
          : "Cosa vuoi leggere?",

      description:
        isEnglish
          ? "Find books based on your interests and what readers think."
          : "Trova libri in base ai tuoi interessi e alle opinioni dei lettori.",

      fields: `

        <label>
          ${isEnglish ? "What are you looking for?" : "Cosa stai cercando?"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. psychological thriller" : "es. thriller psicologico"}">
        </label>

        <label>
          ${isEnglish ? "Genre" : "Genere"}
          <input
            name="genre"
            placeholder="${isEnglish ? "e.g. fantasy, romance..." : "es. fantasy, romance..."}">
        </label>

        <label>
          ${isEnglish ? "Priority" : "Priorità"}
          <input
            name="priority"
            placeholder="${isEnglish ? "e.g. highly rated" : "es. molto apprezzato"}">
        </label>

      `

    },


    fashion: {

      title:
        isEnglish
          ? "What are you looking for?"
          : "Cosa stai cercando?",

      description:
        isEnglish
          ? "Find the best fashion options based on your style and budget."
          : "Trova le migliori opzioni in base al tuo stile e al tuo budget.",

      fields: `

        <label>
          ${isEnglish ? "Item" : "Cosa cerchi?"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. black oversized hoodie" : "es. felpa nera oversized"}">
        </label>

        <label>
          ${isEnglish ? "Budget" : "Budget"}
          <input
            name="budget"
            placeholder="${isEnglish ? "e.g. under €100" : "es. massimo €100"}">
        </label>

        <label>
          ${isEnglish ? "Style / priority" : "Stile / priorità"}
          <input
            name="style"
            placeholder="${isEnglish ? "e.g. streetwear" : "es. streetwear"}">
        </label>

      `

    },


    tech: {

      title:
        isEnglish
          ? "What tech do you need?"
          : "Che tecnologia cerchi?",

      description:
        isEnglish
          ? "Find and compare products using reviews, specifications and prices."
          : "Trova e confronta prodotti usando recensioni, caratteristiche e prezzi.",

      fields: `

        <label>
          ${isEnglish ? "Product" : "Prodotto"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. wireless headphones" : "es. cuffie wireless"}">
        </label>

        <label>
          ${isEnglish ? "Budget" : "Budget"}
          <input
            name="budget"
            placeholder="${isEnglish ? "e.g. under €150" : "es. massimo €150"}">
        </label>

        <label>
          ${isEnglish ? "Priority" : "Priorità"}
          <input
            name="priority"
            placeholder="${isEnglish ? "e.g. sound quality and battery" : "es. qualità audio e batteria"}">
        </label>

      `

    },


    travel: {

      title:
        isEnglish
          ? "Where do you want to go?"
          : "Dove vuoi andare?",

      description:
        isEnglish
          ? "Find destinations, stays and experiences that fit your trip."
          : "Trova destinazioni, alloggi ed esperienze adatte al tuo viaggio.",

      fields: `

        <label>
          ${isEnglish ? "Destination or idea" : "Destinazione o idea"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. beach holiday in Spain" : "es. vacanza al mare in Spagna"}">
        </label>

        <label>
          ${isEnglish ? "Budget" : "Budget"}
          <input
            name="budget"
            placeholder="${isEnglish ? "e.g. €800" : "es. €800"}">
        </label>

        <label>
          ${isEnglish ? "Priority" : "Priorità"}
          <input
            name="priority"
            placeholder="${isEnglish ? "e.g. nightlife and beaches" : "es. vita notturna e spiagge"}">
        </label>

      `

    },


    food: {

      title:
        isEnglish
          ? "Where do you want to eat?"
          : "Dove vuoi mangiare?",

      description:
        isEnglish
          ? "Find places using the overall picture of reviews, prices and opinions."
          : "Trova locali considerando recensioni, prezzi e opinioni nel complesso.",

      fields: `

        <label>
          ${isEnglish ? "What are you looking for?" : "Cosa cerchi?"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. best sushi restaurant" : "es. miglior ristorante sushi"}">
        </label>

        <label>
          ${isEnglish ? "Budget" : "Budget"}
          <input
            name="budget"
            placeholder="${isEnglish ? "e.g. €30 per person" : "es. €30 a persona"}">
        </label>

        <label>
          ${isEnglish ? "Priority" : "Priorità"}
          <input
            name="priority"
            placeholder="${isEnglish ? "e.g. food quality and atmosphere" : "es. qualità del cibo e atmosfera"}">
        </label>

      `

    },


    sport: {

      title:
        isEnglish
          ? "What are you looking for?"
          : "Cosa stai cercando?",

      description:
        isEnglish
          ? "Find sports facilities, activities and experiences."
          : "Trova strutture, attività ed esperienze sportive.",

      fields: `

        <label>
          ${isEnglish ? "Activity" : "Attività"}
          <input
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "e.g. football field" : "es. campo da calcetto"}">
        </label>

        <label>
          ${isEnglish ? "Location" : "Zona"}
          <input
            name="location"
            placeholder="${isEnglish ? "e.g. Rome" : "es. Roma"}">
        </label>

        <label>
          ${isEnglish ? "Budget" : "Budget"}
          <input
            name="budget"
            placeholder="${isEnglish ? "e.g. under €70" : "es. massimo €70"}">
        </label>

      `

    },


    other: {

      title:
        isEnglish
          ? "What do you want to find?"
          : "Cosa vuoi trovare?",

      description:
        isEnglish
          ? "Tell Findly exactly what you're looking for."
          : "Dimmi esattamente cosa stai cercando.",

      fields: `

        <label>
          ${isEnglish ? "Your search" : "La tua ricerca"}
          <textarea
            name="query"
            class="dynamic-input"
            placeholder="${isEnglish ? "Tell Findly what you need..." : "Dimmi cosa stai cercando..."}"></textarea>
        </label>

        <label>
          ${isEnglish ? "Budget / limits" : "Budget / limiti"}
          <input
            name="budget"
            placeholder="${isEnglish ? "Optional" : "Facoltativo"}">
        </label>

      `

    }

  };


  return (
    data[category] ||
    data.other
  );

}


/* =========================================================
   DYNAMIC SEARCH
========================================================= */

function performDynamicSearch() {

  const container =
    $("#dynamicFields");

  if (!container) {
    return;
  }


  const data =
    {};


  container
    .querySelectorAll(
      "input, textarea, select"
    )
    .forEach(field => {

      if (
        field.value &&
        field.value.trim()
      ) {

        data[field.name] =
          field.value.trim();

      }

    });


  const query =
    data.query ||
    Object.values(data)
      .filter(Boolean)
      .join(" ");


  if (!query) {

    showResultsError(
      state.language === "en"
        ? "Tell me what you are looking for first."
        : "Dimmi prima cosa stai cercando."
    );

    return;

  }


  state.currentFields =
    data;

  state.currentQuery =
    query;


  performSearch(
    query,
    state.currentCategory,
    data
  );

}


/* =========================================================
   MAIN SEARCH
========================================================= */

async function performSearch(
  customQuery = null,
  customCategory = null,
  customFields = null
) {

  const input =
    $("#request");


  const query =
    String(
      customQuery ??
      input?.value ??
      ""
    ).trim();


  if (!query) {

    input?.focus();

    return;

  }


  const category =
    customCategory ||
    state.currentCategory ||
    detectCategory(query);


  const fields =
    customFields ||
    state.currentFields ||
    {};


  state.currentQuery =
    query;

  state.currentCategory =
    category;

  state.currentFields =
    fields;


  hideDynamicSearch();

  showResults();

  showLoading();

  hideError();


  const searchData = {

    query,

    category,

    fields,

    language:
      state.language

  };


  state.lastSearch =
    searchData;


  try {

    const data =
      await requestWorker(
        "/api/search",
        searchData
      );


    if (
      !data ||
      data.ok !== true
    ) {

      throw new Error(
        data?.error ||
        getText("errorGeneric")
      );

    }


    renderSearchResults(
      data
    );


    saveSearchHistory(
      searchData,
      data
    );


  } catch (error) {

    console.error(
      "Findly search error:",
      error
    );


    showResultsError(
      formatError(error)
    );

  }

}


/* =========================================================
   WORKER REQUEST
========================================================= */

async function requestWorker(
  endpoint,
  body
) {

  const base =
    FINDLY_CONFIG.WORKER_URL.trim();


  if (
    !base ||
    base.includes(
      "INCOLLA_QUI"
    )
  ) {

    throw new Error(
      "WORKER_URL_MISSING"
    );

  }


  const url =
    base.replace(/\/+$/, "") +
    endpoint;


  const response =
    await fetch(
      url,
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(body)

      }
    );


  let data;


  try {

    data =
      await response.json();

  } catch {

    throw new Error(
      `HTTP_${response.status}`
    );

  }


  if (!response.ok) {

    throw new Error(
      data?.error ||
      `HTTP ${response.status}`
    );

  }


  return data;

}


/* =========================================================
   CATEGORY DETECTION
========================================================= */

function detectCategory(query) {

  const q =
    query.toLowerCase();


  if (
    /film|movie|serie|netflix|cinema|attore|attrice/.test(q)
  ) {
    return "movies";
  }


  if (
    /libro|libri|romanzo|book|reading/.test(q)
  ) {
    return "books";
  }


  if (
    /vestito|scarpe|maglia|felpa|pantaloni|moda|fashion|clothes/.test(q)
  ) {
    return "fashion";
  }


  if (
    /iphone|samsung|computer|pc|telefono|cuffie|tablet|laptop|tech|tecnologia/.test(q)
  ) {
    return "tech";
  }


  if (
    /viaggio|vacanza|hotel|volo|mare|trip|travel|destination/.test(q)
  ) {
    return "travel";
  }


  if (
    /ristorante|pizza|sushi|mangiare|cibo|food|restaurant/.test(q)
  ) {
    return "food";
  }


  if (
    /calcio|palestra|sport|tennis|padel|campo/.test(q)
  ) {
    return "sport";
  }


  return "other";

}


/* =========================================================
   RESULTS
========================================================= */

function showResults() {

  $("#results")
    ?.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function showLoading() {

  $("#resultsLoading")
    ?.classList.remove("hidden");

  $("#aiAnswer")
    ?.classList.add("hidden");

  $("#topPicks")
    ?.classList.add("hidden");

  $("#availability")
    ?.classList.add("hidden");

  $("#recommendations")
    ?.replaceChildren();

}


function hideLoading() {

  $("#resultsLoading")
    ?.classList.add("hidden");

}


function hideError() {

  $("#resultsError")
    ?.classList.add("hidden");

}


function showResultsError(message) {

  hideLoading();

  $("#resultsError")
    ?.classList.remove("hidden");


  const text =
    $("#resultsErrorText");


  if (text) {

    text.textContent =
      message;

  }

}


function formatError(error) {

  const message =
    String(
      error?.message || ""
    );


  if (
    message ===
    "WORKER_URL_MISSING"
  ) {

    return state.language === "en"
      ? "Add your Cloudflare Worker URL to script.js before testing Findly."
      : "Inserisci il link del Worker Cloudflare in script.js prima di provare Findly.";

  }


  if (
    message.includes("Failed to fetch")
  ) {

    return getText(
      "errorNetwork"
    );

  }


  return message ||
    getText("errorGeneric");

}


/* =========================================================
   RENDER SEARCH
========================================================= */

function renderSearchResults(
  data
) {

  hideLoading();
  hideError();


  const queryElement =
    $("#resultsQuery");


  if (queryElement) {

    queryElement.textContent =
      state.currentQuery;

  }


  const count =
    Number(
      data.meta?.resultCount ||
      data.sources?.length ||
      data.topPicks?.length ||
      0
    );


  const countElement =
    $("#matchCount");


  if (countElement) {

    countElement.textContent =
      `${count} ${getText("results")}`;

  }


  renderAIAnswer(
    data.answer
  );


  renderTopPicks(
    data.topPicks ||
    []
  );


  renderAvailability(
    data.availability ||
    []
  );


  renderSources(
    data.sources ||
    []
  );


  if (
    !data.topPicks?.length &&
    !data.sources?.length
  ) {

    const container =
      $("#recommendations");

    if (container) {

      container.innerHTML =
        `<div class="empty-state">
          ${escapeHTML(getText("noResults"))}
        </div>`;

    }

  }

}


/* =========================================================
   AI ANSWER
========================================================= */

function renderAIAnswer(
  answer
) {

  const box =
    $("#aiAnswer");

  const text =
    $("#aiAnswerText");


  if (
    !box ||
    !text ||
    !answer
  ) {
    return;
  }


  text.textContent =
    answer;


  box.classList.remove(
    "hidden"
  );

}


/* =========================================================
   TOP PICKS
========================================================= */

function renderTopPicks(
  picks
) {

  const section =
    $("#topPicks");

  const grid =
    $("#topPicksGrid");


  if (
    !section ||
    !grid
  ) {
    return;
  }


  grid.innerHTML = "";


  if (
    !Array.isArray(picks) ||
    !picks.length
  ) {

    section.classList.add(
      "hidden"
    );

    return;

  }


  /*
    IMPORTANT:
    We do NOT limit the results to 3.
    Findly can show up to 10 real options.
  */

  picks
    .slice(0, FINDLY_CONFIG.MAX_RESULTS)
    .forEach(
      (pick, index) => {

        const card =
          createPickCard(
            pick,
            index
          );

        grid.appendChild(
          card
        );

      }
    );


  section.classList.remove(
    "hidden"
  );

}


/* =========================================================
   PICK CARD
========================================================= */

function createPickCard(
  pick,
  index
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    "result-card";


  const title =
    pick.title ||
    `Option ${index + 1}`;


  const reason =
    pick.reason ||
    "";


  const score =
    pick.score ||
    "";


  card.innerHTML = `

    <div class="result-card-top">

      <div class="result-number">
        ${index + 1}
      </div>

      <div class="result-emoji">
        ${escapeHTML(
          pick.emoji ||
          getCategoryEmoji(
            state.currentCategory
          )
        )}
      </div>

    </div>


    <h3>
      ${escapeHTML(title)}
    </h3>


    ${
      score
        ? `<div class="result-score">
             ${escapeHTML(String(score))}
           </div>`
        : ""
    }


    <p>
      ${escapeHTML(reason)}
    </p>


    <div class="result-card-actions">

      <button
        class="save-result-button secondary-button"
        type="button">
        ♡ ${escapeHTML(getText("save"))}
      </button>

    </div>

  `;


  const saveButton =
    card.querySelector(
      ".save-result-button"
    );


  saveButton?.addEventListener(
    "click",
    () => {

      toggleFavorite({
        title,
        reason,
        category:
          state.currentCategory
      });

      saveButton.textContent =
        `♥ ${getText("saved")}`;

    }
  );


  return card;

}


/* =========================================================
   AVAILABILITY
========================================================= */

function renderAvailability(
  items
) {

  const section =
    $("#availability");

  const grid =
    $("#availabilityGrid");


  if (
    !section ||
    !grid
  ) {
    return;
  }


  grid.innerHTML = "";


  if (
    !Array.isArray(items) ||
    !items.length
  ) {

    section.classList.add(
      "hidden"
    );

    return;

  }


  const unique =
    [];


  const seen =
    new Set();


  items.forEach(item => {

    const key =
      `${item.platform || ""}|${item.source || ""}`;


    if (
      !seen.has(key)
    ) {

      seen.add(key);
      unique.push(item);

    }

  });


  unique.forEach(item => {

    const card =
      document.createElement(
        "article"
      );


    card.className =
      "availability-card";


    const platform =
      item.platform ||
      getText("source");


    const source =
      item.source ||
      "#";


    card.innerHTML = `

      <div class="availability-logo">
        ${escapeHTML(
          item.logo ||
          "▶"
        )}
      </div>

      <div class="availability-info">

        <strong>
          ${escapeHTML(platform)}
        </strong>

        <span>
          ${escapeHTML(
            item.type ||
            ""
          )}
        </span>

        <small>
          ${escapeHTML(
            item.price ||
            ""
          )}
        </small>

      </div>

      <a
        href="${escapeAttribute(source)}"
        target="_blank"
        rel="noopener noreferrer"
        class="availability-link">
        ${escapeHTML(getText("visit"))}
        →
      </a>

    `;


    grid.appendChild(
      card
    );

  });


  section.classList.remove(
    "hidden"
  );

}


/* =========================================================
   SOURCES
========================================================= */

function renderSources(
  sources
) {

  const container =
    $("#recommendations");


  if (!container) {
    return;
  }


  container.innerHTML =
    "";


  if (
    !Array.isArray(sources) ||
    !sources.length
  ) {
    return;
  }


  sources
    .slice(
      0,
      FINDLY_CONFIG.MAX_RESULTS
    )
    .forEach(source => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "source-card";


      const domain =
        source.source ||
        getDomain(
          source.url
        );


      card.innerHTML = `

        <div class="source-card-header">

          <span class="source-domain">
            ${escapeHTML(domain)}
          </span>

          <span class="source-label">
            ${escapeHTML(getText("source"))}
          </span>

        </div>


        <h3>
          ${escapeHTML(
            source.title ||
            getText("source")
          )}
        </h3>


        <p>
          ${escapeHTML(
            source.description ||
            ""
          )}
        </p>


        ${
          source.url
            ? `
              <a
                href="${escapeAttribute(source.url)}"
                target="_blank"
                rel="noopener noreferrer"
                class="source-link">
                ${escapeHTML(getText("visit"))}
                →
              </a>
            `
            : ""
        }

      `;


      container.appendChild(
        card
      );

    });

}


/* =========================================================
   COMPARISON
========================================================= */

function setupComparison() {

  const button =
    $("#compareButton");


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    performComparison
  );

}


async function performComparison() {

  const first =
    $("#compareOne")?.value.trim();

  const second =
    $("#compareTwo")?.value.trim();

  const context =
    $("#comparisonContext")?.value.trim() ||
    "";


  if (
    !first ||
    !second
  ) {

    renderComparisonError(
      state.language === "en"
        ? "Enter both alternatives first."
        : "Inserisci entrambe le alternative."
    );

    return;

  }


  const result =
    $("#comparisonResult");


  result?.classList.remove(
    "hidden"
  );


  if (result) {

    result.innerHTML =
      `<div class="loading-state">
        ${escapeHTML(getText("analyzing"))}
      </div>`;

  }


  try {

    const data =
      await requestWorker(
        "/api/compare",
        {

          first,
          second,
          context,

          language:
            state.language

        }
      );


    if (
      !data.ok
    ) {

      throw new Error(
        data.error ||
        getText("errorGeneric")
      );

    }


    renderComparison(
      data
    );

  } catch (error) {

    renderComparisonError(
      formatError(error)
    );

  }

}


function renderComparison(
  data
) {

  const result =
    $("#comparisonResult");


  if (!result) {
    return;
  }


  const winner =
    data.winner;


  const winnerText =
    winner === "option_a"
      ? $("#compareOne")?.value
      : winner === "option_b"
        ? $("#compareTwo")?.value
        : (
            state.language === "en"
              ? "It's a tie"
              : "Pareggio"
          );


  result.innerHTML = `

    <div class="comparison-winner">

      <p class="eyebrow">
        FINDLY SUGGEST
      </p>

      <h3>
        ${escapeHTML(
          winnerText || ""
        )}
      </h3>

      <p>
        ${escapeHTML(
          data.answer ||
          ""
        )}
      </p>

    </div>


    ${
      Array.isArray(data.reasons) &&
      data.reasons.length
        ? `
          <div class="comparison-reasons">

            ${data.reasons
              .map(
                reason =>
                  `<div>
                    ✓ ${escapeHTML(reason)}
                  </div>`
              )
              .join("")}

          </div>
        `
        : ""
    }

  `;

}


function renderComparisonError(
  message
) {

  const result =
    $("#comparisonResult");


  if (!result) {
    return;
  }


  result.classList.remove(
    "hidden"
  );


  result.innerHTML =
    `<div class="error-state">
      ${escapeHTML(message)}
    </div>`;

}


/* =========================================================
   LOCAL
========================================================= */

function setupLocalSearch() {

  const button =
    $("#localButton");


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    () => {

      const query =
        $("#localRequest")
          ?.value
          .trim();


      if (!query) {
        return;
      }


      performSearch(
        query,
        "food",
        {
          location:
            "near me"
        }
      );

    }
  );

}


/* =========================================================
   SETTINGS
========================================================= */

function setupSettings() {

  const theme =
    $("#themeSelect");

  const language =
    $("#settingsLanguage");

  const font =
    $("#fontSizeSelect");


  if (theme) {

    theme.value =
      state.theme;

    theme.addEventListener(
      "change",
      () => {

        state.theme =
          theme.value;

        localStorage.setItem(
          "findly_theme",
          state.theme
        );

        applyTheme();

      }
    );

  }


  if (language) {

    language.value =
      state.language;

    language.addEventListener(
      "change",
      () => {

        setLanguage(
          language.value
        );

      }
    );

  }


  if (font) {

    font.value =
      state.fontSize;

    font.addEventListener(
      "change",
      () => {

        state.fontSize =
          font.value;

        localStorage.setItem(
          "findly_font_size",
          state.fontSize
        );

        applyFontSize();

      }
    );

  }


  const retry =
    $("#retrySearch");


  retry?.addEventListener(
    "click",
    () => {

      if (
        state.lastSearch
      ) {

        performSearch(
          state.lastSearch.query,
          state.lastSearch.category,
          state.lastSearch.fields
        );

      }

    }
  );

}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

  document.documentElement
    .dataset.theme =
      state.theme;

  document.body
    .dataset.theme =
      state.theme;

}


/* =========================================================
   FONT SIZE
========================================================= */

function applyFontSize() {

  document.documentElement
    .dataset.fontSize =
      state.fontSize;

}


/* =========================================================
   HISTORY
========================================================= */

function saveSearchHistory(
  searchData,
  result
) {

  const entry = {

    id:
      Date.now(),

    query:
      searchData.query,

    category:
      searchData.category,

    language:
      searchData.language,

    timestamp:
      new Date().toISOString(),

    topPick:
      result.topPicks?.[0]?.title ||
      null

  };


  state.history.unshift(
    entry
  );


  state.history =
    state.history.slice(
      0,
      50
    );


  saveStorage(
    "findly_history",
    state.history
  );


  renderHistory();

}


function renderHistory() {

  const container =
    $("#historyList");


  if (!container) {
    return;
  }


  container.innerHTML =
    "";


  if (
    !state.history.length
  ) {

    container.innerHTML =
      `<div class="empty-state">
        ${state.language === "en"
          ? "Your searches will appear here."
          : "Le tue ricerche appariranno qui."}
      </div>`;

    return;

  }


  state.history.forEach(
    item => {

      const element =
        document.createElement(
          "button"
        );


      element.className =
        "history-item";


      element.innerHTML = `

        <span>
          ${escapeHTML(
            item.query
          )}
        </span>

        <small>
          ${escapeHTML(
            item.category
          )}
        </small>

      `;


      element.addEventListener(
        "click",
        () => {

          showSection("home");

          const input =
            $("#request");

          if (input) {

            input.value =
              item.query;

          }

          performSearch(
            item.query,
            item.category
          );

        }
      );


      container.appendChild(
        element
      );

    }
  );

}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFavorite(
  item
) {

  const exists =
    state.favorites.some(
      favorite =>
        favorite.title ===
        item.title
    );


  if (exists) {

    state.favorites =
      state.favorites.filter(
        favorite =>
          favorite.title !==
          item.title
      );

  } else {

    state.favorites.unshift({
      ...item,
      id: Date.now()
    });

  }


  saveStorage(
    "findly_favorites",
    state.favorites
  );


  renderFavorites();

}


function renderFavorites() {

  const container =
    $("#favoritesList");


  if (!container) {
    return;
  }


  container.innerHTML =
    "";


  if (
    !state.favorites.length
  ) {

    container.innerHTML =
      `<div class="empty-state">
        ${
          state.language === "en"
            ? "Save something and it will appear here."
            : "Salva qualcosa e apparirà qui."
        }
      </div>`;

    return;

  }


  state.favorites.forEach(
    item => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "favorite-item";


      card.innerHTML = `

        <div>

          <strong>
            ${escapeHTML(
              item.title
            )}
          </strong>

          <p>
            ${escapeHTML(
              item.reason ||
              ""
            )}
          </p>

        </div>


        <button
          class="secondary-button"
          type="button">

          ${escapeHTML(
            getText("remove")
          )}

        </button>

      `;


      card
        .querySelector("button")
        ?.addEventListener(
          "click",
          () => {

            toggleFavorite(
              item
            );

          }
        );


      container.appendChild(
        card
      );

    }
  );

}


/* =========================================================
   DYNAMIC SEARCH HIDE
========================================================= */

function hideDynamicSearch() {

  $("#dynamicSearch")
    ?.classList.add(
      "hidden"
    );

}


/* =========================================================
   STORAGE
========================================================= */

function loadStorage(
  key,
  fallback
) {

  try {

    const data =
      localStorage.getItem(
        key
      );


    return data
      ? JSON.parse(data)
      : fallback;

  } catch {

    return fallback;

  }

}


function saveStorage(
  key,
  value
) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.warn(
      "Findly storage error:",
      error
    );

  }

}


/* =========================================================
   HELPERS
========================================================= */

function getText(
  key
) {

  return (
    translations[
      state.language
    ]?.[key] ||
    translations.it[key] ||
    key
  );

}


function getCategoryEmoji(
  category
) {

  const emojis = {

    movies: "🎬",
    books: "📚",
    fashion: "👕",
    tech: "🎧",
    travel: "✈️",
    food: "🍝",
    sport: "⚽",
    other: "✦"

  };


  return (
    emojis[category] ||
    "✦"
  );

}


function getDomain(
  url
) {

  try {

    return new URL(
      url
    ).hostname
      .replace(
        /^www\./,
        ""
      );

  } catch {

    return "";

  }

}


function autoResize(
  event
) {

  const element =
    event.target;


  element.style.height =
    "auto";


  element.style.height =
    `${element.scrollHeight}px`;

}


function escapeHTML(
  value
) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttribute(
  value
) {

  return escapeHTML(
    value
  );

}


/* =========================================================
   END
========================================================= */