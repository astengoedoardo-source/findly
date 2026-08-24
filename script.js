document.addEventListener("DOMContentLoaded", () => {

  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");

  const requestInput = document.getElementById("request");
  const findButton = document.getElementById("findButton");

  const conversation = document.getElementById("conversation");

  const dynamicSearch = document.getElementById("dynamicSearch");
  const dynamicTitle = document.getElementById("dynamicTitle");
  const dynamicDescription = document.getElementById("dynamicDescription");
  const dynamicFields = document.getElementById("dynamicFields");
  const dynamicSearchButton =
    document.getElementById("dynamicSearchButton");

  const results = document.getElementById("results");
  const aiAnswer = document.getElementById("aiAnswer");
  const aiAnswerText = document.getElementById("aiAnswerText");
  const topPicks = document.getElementById("topPicks");
  const topPicksGrid = document.getElementById("topPicksGrid");
  const availability = document.getElementById("availability");
  const availabilityGrid =
    document.getElementById("availabilityGrid");

  const recommendations =
    document.getElementById("recommendations");

  const matchCount =
    document.getElementById("matchCount");

  let currentCategory = null;
  let currentLanguage =
    localStorage.getItem("findly-language") || "it";


  /* =====================================================
     MENU
  ===================================================== */

  function openSideMenu() {
    sideMenu?.classList.add("open");
    menuOverlay?.classList.add("open");
  }

  function closeSideMenu() {
    sideMenu?.classList.remove("open");
    menuOverlay?.classList.remove("open");
  }

  openMenu?.addEventListener("click", openSideMenu);
  closeMenu?.addEventListener("click", closeSideMenu);
  menuOverlay?.addEventListener("click", closeSideMenu);


  /* =====================================================
     SEZIONI
  ===================================================== */

  const sections = {
    home: document.getElementById("homeSection"),
    suggest: document.getElementById("suggestSection"),
    local: document.getElementById("localSection"),
    discover: document.getElementById("discoverSection"),
    favorites: document.getElementById("favoritesSection"),
    history: document.getElementById("historySection"),
    profile: document.getElementById("profileSection"),
    settings: document.getElementById("settingsSection")
  };

  function showSection(name) {

    Object.values(sections).forEach(section => {
      section?.classList.add("hidden");
    });

    sections[name]?.classList.remove("hidden");

    document
      .querySelectorAll(".menu-item")
      .forEach(item =>
        item.classList.remove("active")
      );

    document
      .querySelector(
        `.menu-item[data-section="${name}"]`
      )
      ?.classList.add("active");

    closeSideMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  document
    .querySelectorAll(".menu-item")
    .forEach(item => {

      item.addEventListener("click", () => {

        const section =
          item.dataset.section;

        if (section) {
          showSection(section);
        }

      });

    });


  /* =====================================================
     CATEGORIE
  ===================================================== */

  const categoryData = {

    movies: {
      title: "Che film vuoi trovare?",
      description:
        "Dimmi cosa vuoi guardare e Findly cercherà le migliori opzioni.",
      fields: [
        ["genere", "Genere", "Es. commedia, horror, thriller..."],
        ["mood", "Che atmosfera cerchi?", "Es. divertente, inquietante..."],
        ["streaming", "Dove vuoi guardarlo?", "Netflix, Prime Video..."],
        ["budget", "Budget massimo", "Es. gratis, 2€, 5€..."]
      ]
    },

    books: {
      title: "Che libro stai cercando?",
      description:
        "Descrivimi anche solo il tipo di libro che hai in mente.",
      fields: [
        ["tipo", "Tipo di libro", "Es. romanzo, thriller..."],
        ["tema", "Cosa ti interessa?", "Es. soldi, amore, psicologia..."],
        ["formato", "Formato", "Cartaceo, Kindle, qualsiasi"],
        ["budget", "Budget massimo", "Es. 15€"]
      ]
    },

    fashion: {
      title: "Cosa vuoi trovare?",
      description:
        "Trova capi nuovi o usati in base a marca, stile e prezzo.",
      fields: [
        ["capo", "Cosa cerchi?", "Es. maglietta, jeans..."],
        ["marca", "Marca", "Es. Ralph Lauren"],
        ["condizione", "Condizione", "Nuovo, usato, qualsiasi"],
        ["budget", "Budget massimo", "Es. 50€"]
      ]
    },

    tech: {
      title: "Quale tecnologia cerchi?",
      description:
        "Confrontiamo prodotti, prezzi e caratteristiche.",
      fields: [
        ["prodotto", "Prodotto", "Es. cuffie, iPhone..."],
        ["priorita", "Cosa conta di più?", "Prezzo, qualità, batteria..."],
        ["marca", "Marca preferita", "Facoltativa"],
        ["budget", "Budget massimo", "Es. 300€"]
      ]
    },

    travel: {
      title: "Che viaggio vuoi fare?",
      description:
        "Troviamo destinazioni, voli, hotel e alternative.",
      fields: [
        ["destinazione", "Dove vuoi andare?", "Es. Maldive, Parigi..."],
        ["periodo", "Quando?", "Es. agosto, Natale..."],
        ["tipo", "Che viaggio vuoi?", "Mare, città, avventura..."],
        ["budget", "Budget", "Es. 2000€"]
      ]
    },

    food: {
      title: "Cosa vuoi mangiare?",
      description:
        "Troviamo i posti migliori in base a prezzo, distanza e recensioni.",
      fields: [
        ["cucina", "Che cucina?", "Es. italiana, sushi..."],
        ["zona", "Zona", "Es. vicino a me"],
        ["budget", "Prezzo massimo", "Es. 20€ a persona"],
        ["occasione", "Occasione", "Cena, pranzo, appuntamento..."]
      ]
    },

    sport: {
      title: "Che attività vuoi fare?",
      description:
        "Trova palestre, campi e attività sportive.",
      fields: [
        ["sport", "Sport", "Es. calcetto, tennis..."],
        ["zona", "Dove?", "Es. vicino a me"],
        ["data", "Quando?", "Es. stasera"],
        ["budget", "Prezzo massimo", "Es. 70€ l'ora"]
      ]
    },

    other: {
      title: "Cosa vuoi trovare?",
      description:
        "Scrivimi qualsiasi cosa. Findly proverà a capire di cosa hai bisogno.",
      fields: [
        ["cerca", "Cosa cerchi?", "Descrivilo liberamente"],
        ["preferenza", "Cosa conta per te?", "Prezzo, qualità, distanza..."],
        ["budget", "Budget", "Facoltativo"],
        ["extra", "Altro", "Qualsiasi informazione"]
      ]
    }

  };


  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.addEventListener("click", () => {

        createDynamicSearch(
          card.dataset.category
        );

      });

    });


  function createDynamicSearch(category) {

    const data =
      categoryData[category];

    if (!data) return;

    currentCategory = category;

    dynamicTitle.textContent =
      data.title;

    dynamicDescription.textContent =
      data.description;

    dynamicFields.innerHTML = "";

    data.fields.forEach(field => {

      const wrapper =
        document.createElement("div");

      wrapper.className =
        "dynamic-field";

      wrapper.innerHTML = `
        <label for="field-${field[0]}">
          ${escapeHTML(field[1])}
        </label>

        <input
          id="field-${field[0]}"
          data-field="${field[0]}"
          placeholder="${escapeAttribute(field[2])}"
        >
      `;

      dynamicFields.appendChild(wrapper);

    });

    dynamicSearch.classList.remove("hidden");

    dynamicSearch.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  function collectDynamicFields() {

    const data = {};

    document
      .querySelectorAll(
        "#dynamicFields [data-field]"
      )
      .forEach(input => {

        data[input.dataset.field] =
          input.value.trim();

      });

    return data;
  }


  dynamicSearchButton?.addEventListener(
    "click",
    () => {

      const fields =
        collectDynamicFields();

      const description =
        Object.entries(fields)
          .filter(([_, value]) => value)
          .map(
            ([key, value]) =>
              `${key}: ${value}`
          )
          .join(", ");

      const query =
        `${categoryData[currentCategory]?.title || "Ricerca"}. ${description}`;

      addUserMessage(query);

      runFindlySearch(
        query,
        currentCategory,
        fields
      );

    }
  );


  /* =====================================================
     RICERCA PRINCIPALE
  ===================================================== */

  function sendRequest() {

    const text =
      requestInput?.value.trim();

    if (!text) return;

    addUserMessage(text);

    requestInput.value = "";

    runFindlySearch(
      text,
      detectCategory(text),
      {}
    );

  }


  findButton?.addEventListener(
    "click",
    sendRequest
  );


  requestInput?.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendRequest();

      }

    }
  );


  document
    .querySelectorAll(".suggestion")
    .forEach(button => {

      button.addEventListener("click", () => {

        const query =
          button.dataset.query;

        requestInput.value =
          query;

        sendRequest();

      });

    });


  /* =====================================================
     CONVERSAZIONE
  ===================================================== */

  function addUserMessage(text) {

    if (!conversation) return;

    const message =
      document.createElement("div");

    message.className =
      "ai-message";

    message.style.justifyContent =
      "flex-end";

    message.innerHTML = `
      <div
        class="message-content"
        style="
          border-radius:15px 15px 4px 15px;
          background:rgba(255,255,255,.09);
        "
      >
        <p>${escapeHTML(text)}</p>
      </div>
    `;

    conversation.appendChild(message);

    conversation.scrollTop =
      conversation.scrollHeight;
  }


  function addAIMessage(text) {

    if (!conversation) return;

    const message =
      document.createElement("div");

    message.className =
      "ai-message";

    message.innerHTML = `
      <div class="message-avatar">
        F
      </div>

      <div class="message-content">

        <strong>Findly</strong>

        <p>${escapeHTML(text)}</p>

      </div>
    `;

    conversation.appendChild(message);

    conversation.scrollTop =
      conversation.scrollHeight;
  }


  /* =====================================================
     CATEGORIA
  ===================================================== */

  function detectCategory(text) {

    const t =
      text.toLowerCase();

    if (
      /film|serie|netflix|prime video|paramount|attore|cinema/.test(t)
    ) return "movies";

    if (
      /libro|romanzo|leggere|lettura/.test(t)
    ) return "books";

    if (
      /maglietta|jeans|scarpe|vestiti|abbigliamento|ralph lauren/.test(t)
    ) return "fashion";

    if (
      /iphone|computer|cuffie|telefono|tablet|laptop/.test(t)
    ) return "tech";

    if (
      /viaggio|volo|hotel|maldive|parigi|vacanza|aereo/.test(t)
    ) return "travel";

    if (
      /ristorante|mangiare|pizza|sushi|cena|pranzo/.test(t)
    ) return "food";

    if (
      /calcetto|palestra|tennis|sport|campo|basket|calcio/.test(t)
    ) return "sport";

    return "other";
  }


  /* =====================================================
     WORKER
  ===================================================== */

  async function runFindlySearch(
    query,
    category,
    fields = {}
  ) {

    showLoading();

    results?.classList.remove("hidden");

    results?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    try {

      const response =
        await fetch(
          "/api/search",
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

      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
          "Worker non disponibile"
        );

      }

      const data =
        await response.json();

      renderResults(data);

    }

    catch (error) {

      console.error(
        "Findly error:",
        error
      );

      aiAnswerText.textContent =
        currentLanguage === "en"
          ? "I couldn't complete the search right now. Please try again."
          : "Non sono riuscito a completare la ricerca. Riprova.";

      matchCount.textContent =
        "Errore";

      topPicks?.classList.add("hidden");
      availability?.classList.add("hidden");

    }

  }


  /* =====================================================
     LOADING
  ===================================================== */

  function showLoading() {

    aiAnswer?.classList.remove("hidden");

    aiAnswerText.textContent =
      currentLanguage === "en"
        ? "I'm searching, comparing sources and finding the best options for you..."
        : "Sto cercando, confrontando le fonti e trovando le opzioni migliori per te...";

    topPicks?.classList.add("hidden");

    availability?.classList.add("hidden");

    if (recommendations) {
      recommendations.innerHTML = "";
    }

    if (matchCount) {
      matchCount.textContent =
        currentLanguage === "en"
          ? "Searching..."
          : "Ricerca in corso...";
    }

  }


  /* =====================================================
     RISULTATI
  ===================================================== */

  function renderResults(data) {

    aiAnswer?.classList.remove("hidden");

    aiAnswerText.textContent =
      data.answer ||
      (
        currentLanguage === "en"
          ? "Here are the best options I found."
          : "Ecco le migliori opzioni che ho trovato."
      );


    const picks =
      Array.isArray(data.topPicks)
        ? data.topPicks
        : Array.isArray(data.results)
          ? data.results
          : [];


    renderTopPicks(picks);

    renderAvailability(
      Array.isArray(data.availability)
        ? data.availability
        : []
    );

    renderRecommendations(
      Array.isArray(data.sources)
        ? data.sources
        : []
    );


    if (matchCount) {

      matchCount.textContent =
        `${picks.length} ${
          currentLanguage === "en"
            ? "results"
            : "risultati"
        }`;

    }


    /*
      Se Tavily ha trovato immagini,
      le mostriamo nelle card.
    */

    if (
      Array.isArray(data.images) &&
      data.images.length
    ) {

      attachImagesToCards(
        data.images
      );

    }

  }


  /* =====================================================
     TOP PICKS
  ===================================================== */

  function renderTopPicks(items) {

    if (!topPicksGrid) return;

    topPicksGrid.innerHTML = "";

    if (!items.length) {

      topPicks?.classList.add("hidden");

      return;
    }

    topPicks?.classList.remove("hidden");


    /*
      MOSTRIAMO TUTTI I RISULTATI UTILI,
      MASSIMO 10.
    */

    items
      .slice(0, 10)
      .forEach((item, index) => {

        const card =
          document.createElement("article");

        card.className =
          "pick-card";


        const title =
          item.title ||
          item.name ||
          "Risultato";


        const reason =
          item.reason ||
          item.description ||
          "Consigliato da Findly.";


        const url =
          item.url ||
          item.link ||
          item.source ||
          "";


        const image =
          item.image ||
          item.image_url ||
          item.thumbnail ||
          "";


        card.innerHTML = `

          <div class="pick-image">

            ${
              image
                ? `
                  <img
                    src="${escapeAttribute(image)}"
                    alt="${escapeAttribute(title)}"
                    loading="lazy"
                    onerror="this.style.display='none'"
                  >
                `
                : `
                  <span>
                    ${item.emoji || "✦"}
                  </span>
                `
            }

          </div>


          <div class="pick-content">

            <span class="pick-number">
              #${index + 1}
            </span>

            <h3>
              ${escapeHTML(title)}
            </h3>

            <p>
              ${escapeHTML(reason)}
            </p>


            ${
              item.score
                ? `
                  <span class="pick-score">
                    ★ ${escapeHTML(item.score)}
                  </span>
                `
                : ""
            }


            ${
              url
                ? `
                  <a
                    class="result-link pick-link"
                    href="${escapeAttribute(url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${
                      currentLanguage === "en"
                        ? "Discover →"
                        : "Scopri →"
                    }
                  </a>
                `
                : ""
            }

          </div>
        `;


        topPicksGrid.appendChild(card);

      });

  }


  /* =====================================================
     IMMAGINI
  ===================================================== */

  function attachImagesToCards(images) {

    const cards =
      Array.from(
        document.querySelectorAll(
          "#topPicksGrid .pick-card"
        )
      );


    cards.forEach(
      (card, index) => {

        const image =
          images[index];

        if (!image) return;

        const imageContainer =
          card.querySelector(
            ".pick-image"
          );

        if (!imageContainer) return;

        const existing =
          imageContainer.querySelector(
            "img"
          );

        if (existing) return;

        const img =
          document.createElement(
            "img"
          );

        img.src =
          typeof image === "string"
            ? image
            : image.url || "";

        img.alt =
          "Findly result";

        img.loading =
          "lazy";

        img.onerror =
          () => {
            img.remove();
          };

        imageContainer
          .prepend(img);

      }
    );

  }


  /* =====================================================
     DISPONIBILITÀ
  ===================================================== */

  function renderAvailability(items) {

    if (!availabilityGrid) return;

    availabilityGrid.innerHTML = "";

    if (!items.length) {

      availability?.classList.add(
        "hidden"
      );

      return;
    }

    availability?.classList.remove(
      "hidden"
    );


    items.forEach(item => {

      const card =
        document.createElement("div");

      card.className =
        "availability-card";


      const url =
        item.url ||
        item.source ||
        "";


      card.innerHTML = `

        <div class="availability-logo">
          ${item.logo || "▶️"}
        </div>

        <strong>
          ${escapeHTML(
            item.platform ||
            "Piattaforma"
          )}
        </strong>

        <span>
          ${escapeHTML(
            item.type ||
            "Disponibilità"
          )}
        </span>

        <div class="availability-price">
          ${escapeHTML(
            item.price ||
            "Prezzo non disponibile"
          )}
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
                ${
                  currentLanguage === "en"
                    ? "Open →"
                    : "Apri →"
                }
              </a>
            `
            : ""
        }

      `;

      availabilityGrid.appendChild(card);

    });

  }


  /* =====================================================
     FONTI
  ===================================================== */

  function renderRecommendations(items) {

    if (!recommendations) return;

    recommendations.innerHTML = "";

    items.forEach(item => {

      if (!item.url) return;

      const card =
        document.createElement("article");

      card.className =
        "result-card";

      card.innerHTML = `

        <span class="result-source">
          ${escapeHTML(
            item.source ||
            "Fonte"
          )}
        </span>

        <h3>
          ${escapeHTML(
            item.title ||
            "Informazione"
          )}
        </h3>

        <p>
          ${escapeHTML(
            item.description ||
            ""
          )}
        </p>

        <a
          class="result-link"
          href="${escapeAttribute(item.url)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${
            currentLanguage === "en"
              ? "Open source →"
              : "Apri fonte →"
          }
        </a>

      `;

      recommendations.appendChild(card);

    });

  }


  /* =====================================================
     FINDLY SUGGEST
  ===================================================== */

  const compareButton =
    document.getElementById(
      "compareButton"
    );

  const comparisonResult =
    document.getElementById(
      "comparisonResult"
    );


  compareButton?.addEventListener(
    "click",
    async () => {

      const one =
        document.getElementById(
          "compareOne"
        )?.value.trim();

      const two =
        document.getElementById(
          "compareTwo"
        )?.value.trim();

      const context =
        document.getElementById(
          "comparisonContext"
        )?.value.trim();


      if (!one || !two) {

        comparisonResult?.classList.remove(
          "hidden"
        );

        if (comparisonResult) {
          comparisonResult.innerHTML = `
            <div class="ai-answer">
              ${
                currentLanguage === "en"
                  ? "Enter both alternatives."
                  : "Inserisci entrambe le alternative."
              }
            </div>
          `;
        }

        return;
      }


      comparisonResult?.classList.remove(
        "hidden"
      );


      if (comparisonResult) {

        comparisonResult.innerHTML = `
          <div class="ai-answer">

            <div class="ai-answer-header">

              <div class="ai-icon">
                ✦
              </div>

              <div>
                <strong>
                  Findly Suggest
                </strong>

                <span>
                  ${
                    currentLanguage === "en"
                      ? "Comparing..."
                      : "Confronto in corso..."
                  }
                </span>
              </div>

            </div>

            <div class="ai-answer-text">
              ${
                currentLanguage === "en"
                  ? "I'm comparing the two options using reviews and available information..."
                  : "Sto confrontando le due opzioni usando recensioni e informazioni disponibili..."
              }
            </div>

          </div>
        `;

      }


      try {

        const response =
          await fetch(
            "/api/compare",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                first: one,
                second: two,
                context,
                language:
                  currentLanguage
              })
            }
          );


        if (!response.ok) {
          throw new Error(
            "Comparison failed"
          );
        }


        const data =
          await response.json();


        if (comparisonResult) {

          comparisonResult.innerHTML = `
            <div class="ai-answer">

              <div class="ai-answer-header">

                <div class="ai-icon">
                  ✦
                </div>

                <div>
                  <strong>
                    Findly Suggest
                  </strong>

                  <span>
                    ${
                      currentLanguage === "en"
                        ? "Recommendation"
                        : "Consiglio"
                    }
                  </span>
                </div>

              </div>

              <div class="ai-answer-text">

                ${escapeHTML(
                  data.answer ||
                  (
                    currentLanguage === "en"
                      ? "Comparison completed."
                      : "Confronto completato."
                  )
                )}

              </div>

            </div>
          `;

        }

      }

      catch (error) {

        console.error(
          error
        );

        if (comparisonResult) {

          comparisonResult.innerHTML = `
            <div class="ai-answer">

              <strong>
                Findly Suggest
              </strong>

              <p>
                ${
                  currentLanguage === "en"
                    ? "The comparison could not be completed right now."
                    : "Non è stato possibile completare il confronto."
                }
              </p>

            </div>
          `;

        }

      }

    }
  );


  /* =====================================================
     FINDLY LOCALE
  ===================================================== */

  const localButton =
    document.getElementById(
      "localButton"
    );


  localButton?.addEventListener(
    "click",
    () => {

      const input =
        document.getElementById(
          "localRequest"
        );

      const text =
        input?.value.trim();

      if (!text) {

        input?.focus();

        return;
      }

      showSection("home");

      requestInput.value =
        text;

      sendRequest();

    }
  );


  /* =====================================================
     TEMA
  ===================================================== */

  const themeSelect =
    document.getElementById(
      "themeSelect"
    );


  function applyTheme(theme) {

    if (theme === "light") {

      document.body.classList.add(
        "light"
      );

    }

    else if (theme === "dark") {

      document.body.classList.remove(
        "light"
      );

    }

    else {

      const prefersLight =
        window.matchMedia(
          "(prefers-color-scheme: light)"
        ).matches;

      document.body.classList.toggle(
        "light",
        prefersLight
      );

    }

    localStorage.setItem(
      "findly-theme",
      theme
    );

  }


  const savedTheme =
    localStorage.getItem(
      "findly-theme"
    ) || "dark";


  if (themeSelect) {

    themeSelect.value =
      savedTheme;

    applyTheme(savedTheme);

    themeSelect.addEventListener(
      "change",
      () => {

        applyTheme(
          themeSelect.value
        );

      }
    );

  }


  /* =====================================================
     FONT SIZE
  ===================================================== */

  const fontSizeSelect =
    document.getElementById(
      "fontSizeSelect"
    );


  fontSizeSelect?.addEventListener(
    "change",
    () => {

      document.body.classList.remove(
        "font-large",
        "font-xlarge"
      );

      if (
        fontSizeSelect.value ===
        "large"
      ) {

        document.body.classList.add(
          "font-large"
        );

      }

      if (
        fontSizeSelect.value ===
        "xlarge"
      ) {

        document.body.classList.add(
          "font-xlarge"
        );

      }

      localStorage.setItem(
        "findly-font-size",
        fontSizeSelect.value
      );

    }
  );


  const savedFontSize =
    localStorage.getItem(
      "findly-font-size"
    );

  if (
    savedFontSize &&
    fontSizeSelect
  ) {

    fontSizeSelect.value =
      savedFontSize;

    fontSizeSelect.dispatchEvent(
      new Event("change")
    );

  }


  /* =====================================================
     LINGUA
  ===================================================== */

  const translations = {

    it: {
      home: "Home",
      suggest: "Findly Suggest",
      local: "Findly Locale",
      discover: "Scopri",
      favorites: "Preferiti",
      history: "Cronologia",
      profile: "Profilo",
      settings: "Impostazioni"
    },

    en: {
      home: "Home",
      suggest: "Findly Suggest",
      local: "Findly Locale",
      discover: "Discover",
      favorites: "Favorites",
      history: "History",
      profile: "Profile",
      settings: "Settings"
    }

  };


  function applyLanguage(lang) {

    if (
      !translations[lang]
    ) {
      lang = "it";
    }

    currentLanguage =
      lang;

    const t =
      translations[lang];


    Object.entries(t)
      .forEach(
        ([section, text]) => {

          const item =
            document.querySelector(
              `.menu-item[data-section="${section}"]`
            );

          if (!item) return;

          const textNode =
            Array.from(
              item.childNodes
            ).find(
              node =>
                node.nodeType ===
                Node.TEXT_NODE &&
                node.textContent.trim()
            );

          if (textNode) {
            textNode.textContent =
              ` ${text}`;
          }

        }
      );


    document
      .querySelectorAll(".language")
      .forEach(button => {

        button.classList.toggle(
          "active",
          button.dataset.lang ===
            lang
        );

      });


    const settingsLanguage =
      document.getElementById(
        "settingsLanguage"
      );

    if (settingsLanguage) {
      settingsLanguage.value =
        lang;
    }


    localStorage.setItem(
      "findly-language",
      lang
    );

  }


  document
    .querySelectorAll(".language")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          applyLanguage(
            button.dataset.lang
          );

        }
      );

    });


  const settingsLanguage =
    document.getElementById(
      "settingsLanguage"
    );


  settingsLanguage?.addEventListener(
    "change",
    () => {

      applyLanguage(
        settingsLanguage.value
      );

    }
  );


  applyLanguage(
    currentLanguage
  );


  /* =====================================================
     DISCOVER
  ===================================================== */

  const discoverGrid =
    document.getElementById(
      "discoverGrid"
    );


  if (discoverGrid) {

    const discoverItems = [

      [
        "🎬",
        "Film che potresti amare",
        "Scopri qualcosa in base ai tuoi gusti."
      ],

      [
        "✈️",
        "Posti da visitare",
        "Trova destinazioni che potrebbero sorprenderti."
      ],

      [
        "📚",
        "Libri da leggere",
        "Idee basate su ciò che ti interessa."
      ],

      [
        "🍝",
        "Posti dove mangiare",
        "Scopri locali interessanti vicino a te."
      ]

    ];


    discoverItems.forEach(item => {

      const card =
        document.createElement("div");

      card.className =
        "discover-card";

      card.innerHTML = `

        <div style="
          font-size:30px;
          margin-bottom:auto
        ">
          ${item[0]}
        </div>

        <strong>
          ${escapeHTML(item[1])}
        </strong>

        <span style="
          color:var(--muted);
          font-size:12px;
          margin-top:5px;
        ">
          ${escapeHTML(item[2])}
        </span>

      `;

      discoverGrid.appendChild(card);

    });

  }


  /* =====================================================
     FAVORITES / HISTORY
  ===================================================== */

  function loadSimpleStorage(
    key,
    containerId,
    emptyText
  ) {

    const container =
      document.getElementById(
        containerId
      );

    if (!container) return;

    const data =
      JSON.parse(
        localStorage.getItem(key) ||
        "[]"
      );


    if (!data.length) {

      container.innerHTML = `
        <div class="result-card">
          <p>
            ${escapeHTML(emptyText)}
          </p>
        </div>
      `;

      return;
    }


    container.innerHTML =
      data
        .map(item => `
          <div class="result-card">
            <h3>
              ${escapeHTML(item)}
            </h3>
          </div>
        `)
        .join("");

  }


  loadSimpleStorage(
    "findly-favorites",
    "favoritesList",
    "Non hai ancora salvato nulla."
  );


  loadSimpleStorage(
    "findly-history",
    "historyList",
    "La tua cronologia è ancora vuota."
  );


  /* =====================================================
     UTILITY
  ===================================================== */

  function escapeHTML(value) {

    return String(value)
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

    return String(value)
      .replaceAll(
        "&",
        "&amp;"
      )
      .replaceAll(
        '"',
        "&quot;"
      )
      .replaceAll(
        "<",
        "&lt;"
      )
      .replaceAll(
        ">",
        "&gt;"
      );

  }

});