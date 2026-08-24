document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTI PRINCIPALI
  ===================================================== */

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
  let currentLanguage = "it";


  /* =====================================================
     MENU
  ===================================================== */

  function openSideMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("open");
  }

  function closeSideMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
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
      .forEach(item => item.classList.remove("active"));

    const active =
      document.querySelector(
        `.menu-item[data-section="${name}"]`
      );

    active?.classList.add("active");

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
        "Puoi descrivere anche solo il tipo di libro che hai in mente.",
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
        "Troviamo destinazioni, voli, hotel e alternative in base alle tue esigenze.",
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

        const category =
          card.dataset.category;

        createDynamicSearch(category);

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
          ${field[1]}
        </label>

        <input
          id="field-${field[0]}"
          data-field="${field[0]}"
          placeholder="${field[2]}"
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


  /* =====================================================
     RACCOLTA CAMPI
  ===================================================== */

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


  /* =====================================================
     INVIO RICERCA
  ===================================================== */

  dynamicSearchButton?.addEventListener(
    "click",
    () => {

      const fields =
        collectDynamicFields();

      const description =
        Object.entries(fields)
          .filter(([_, value]) => value)
          .map(([key, value]) =>
            `${key}: ${value}`
          )
          .join(", ");

      const categoryName =
        categoryData[currentCategory]?.title ||
        "ricerca";

      const query =
        `${categoryName}. ${description}`;

      addUserMessage(query);

      runFindlySearch(
        query,
        currentCategory,
        fields
      );

    }
  );


  /* =====================================================
     SUGGERIMENTI RAPIDI
  ===================================================== */

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

        <strong>
          Findly
        </strong>

        <p>
          ${escapeHTML(text)}
        </p>

      </div>
    `;

    conversation.appendChild(message);

    conversation.scrollTop =
      conversation.scrollHeight;

  }


  function sendRequest() {

    const text =
      requestInput.value.trim();

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


  /* =====================================================
     RICONOSCIMENTO CATEGORIA
  ===================================================== */

  function detectCategory(text) {

    const t =
      text.toLowerCase();

    if (
      t.includes("film") ||
      t.includes("serie") ||
      t.includes("netflix") ||
      t.includes("prime video") ||
      t.includes("attore")
    ) {
      return "movies";
    }

    if (
      t.includes("libro") ||
      t.includes("romanzo") ||
      t.includes("leggere")
    ) {
      return "books";
    }

    if (
      t.includes("maglietta") ||
      t.includes("jeans") ||
      t.includes("scarpe") ||
      t.includes("ralph lauren") ||
      t.includes("vestiti")
    ) {
      return "fashion";
    }

    if (
      t.includes("iphone") ||
      t.includes("computer") ||
      t.includes("cuffie") ||
      t.includes("telefono")
    ) {
      return "tech";
    }

    if (
      t.includes("viaggio") ||
      t.includes("volo") ||
      t.includes("hotel") ||
      t.includes("maldive") ||
      t.includes("parigi")
    ) {
      return "travel";
    }

    if (
      t.includes("ristorante") ||
      t.includes("mangiare") ||
      t.includes("pizza") ||
      t.includes("sushi")
    ) {
      return "food";
    }

    if (
      t.includes("calcetto") ||
      t.includes("palestra") ||
      t.includes("tennis") ||
      t.includes("sport")
    ) {
      return "sport";
    }

    return "other";

  }


  /* =====================================================
     RICERCA FINDLY
  ===================================================== */

  async function runFindlySearch(
    query,
    category,
    fields = {}
  ) {

    showLoading();

    results.classList.remove("hidden");

    results.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    /*
      QUI ENTRERÀ IL WORKER.

      Per ora proviamo a chiamare il Worker.
      Quando lo collegheremo definitivamente,
      il Worker restituirà:

      - risposta AI
      - top 10
      - prezzi
      - disponibilità
      - piattaforme
      - recensioni
      - fonti
      - link
    */

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
        throw new Error(
          "Worker non disponibile"
        );
      }


      const data =
        await response.json();


      renderResults(data);

    }

    catch (error) {

      /*
        DEMO FALLBACK

        Se il Worker non è ancora collegato,
        Findly continua a mostrare la UI.
      */

      renderDemoResults(
        query,
        category
      );

    }

  }


  /* =====================================================
     LOADING
  ===================================================== */

  function showLoading() {

    aiAnswer.classList.remove("hidden");

    aiAnswerText.innerHTML = `
      Sto cercando le migliori opzioni,
      confrontando informazioni e cercando
      di capire quale scelta abbia più senso
      per te...
    `;

    topPicks.classList.add("hidden");

    availability.classList.add("hidden");

    recommendations.innerHTML = "";

    matchCount.textContent =
      "Ricerca in corso...";

  }


  /* =====================================================
     RISULTATI REALI
  ===================================================== */

  function renderResults(data) {

    aiAnswer.classList.remove("hidden");

    aiAnswerText.innerHTML =
      escapeHTML(
        data.answer ||
        "Ho analizzato le opzioni migliori per te."
      );


    const picks =
      data.topPicks ||
      data.results ||
      [];


    renderTopPicks(picks);

    renderAvailability(
      data.availability ||
      []
    );

    renderRecommendations(
      data.sources ||
      data.recommendations ||
      []
    );


    matchCount.textContent =
      `${picks.length} risultati`;

  }


  /* =====================================================
     TOP PICKS
  ===================================================== */

  function renderTopPicks(items) {

    if (!items.length) {

      topPicks.classList.add(
        "hidden"
      );

      return;
    }

    topPicks.classList.remove(
      "hidden"
    );

    topPicksGrid.innerHTML = "";

    items
      .slice(0, 10)
      .forEach((item, index) => {

        const card =
          document.createElement("article");

        card.className =
          "pick-card";

        card.innerHTML = `

          <div class="pick-image">
            ${item.emoji || "✦"}
          </div>

          <div class="pick-content">

            <span class="pick-number">
              #${index + 1}
            </span>

            <h3>
              ${escapeHTML(
                item.title || "Risultato"
              )}
            </h3>

            <p>
              ${escapeHTML(
                item.reason ||
                item.description ||
                "Consigliato da Findly."
              )}
            </p>

            ${
              item.score
                ? `
                  <span class="pick-score">
                    ★ ${item.score}
                  </span>
                `
                : ""
            }

          </div>
        `;

        topPicksGrid.appendChild(card);

      });

  }


  /* =====================================================
     DISPONIBILITÀ
  ===================================================== */

  function renderAvailability(items) {

    if (!items.length) {

      availability.classList.add(
        "hidden"
      );

      return;
    }

    availability.classList.remove(
      "hidden"
    );

    availabilityGrid.innerHTML = "";

    items.forEach(item => {

      const card =
        document.createElement("div");

      card.className =
        "availability-card";

      card.innerHTML = `

        <div class="availability-logo">
          ${item.logo || "▶️"}
        </div>

        <strong>
          ${escapeHTML(
            item.platform || "Piattaforma"
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

      `;

      availabilityGrid.appendChild(card);

    });

  }


  /* =====================================================
     FONTI
  ===================================================== */

  function renderRecommendations(items) {

    recommendations.innerHTML = "";

    items.forEach(item => {

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
                Vai alla fonte →
              </a>
            `
            : ""
        }

      `;

      recommendations.appendChild(card);

    });

  }


  /* =====================================================
     DEMO RESULTS
  ===================================================== */

  function renderDemoResults(
    query,
    category
  ) {

    matchCount.textContent =
      "10 risultati";

    aiAnswer.classList.remove(
      "hidden"
    );


    let answer = "";


    if (category === "movies") {

      answer =
        "Ho capito che stai cercando un film. " +
        "In una ricerca completa Findly confronterà " +
        "recensioni, genere, valutazioni e disponibilità " +
        "sulle piattaforme per consigliarti i migliori " +
        "e spiegarti perché.";

    }

    else if (category === "travel") {

      answer =
        "Ho capito che stai cercando un viaggio. " +
        "Findly confronterà destinazioni, voli, hotel, " +
        "prezzi e recensioni per aiutarti a scegliere " +
        "l'opzione con il miglior rapporto qualità-prezzo.";

    }

    else {

      answer =
        "Ho capito cosa stai cercando. " +
        "Findly analizzerà le alternative disponibili " +
        "e non si limiterà a mostrarti dei semplici link: " +
        "ti aiuterà anche a capire quale scegliere.";

    }


    aiAnswerText.textContent =
      answer;


    const demoItems = [

      {
        title: "Scelta consigliata",
        emoji:
          category === "movies"
            ? "🎬"
            : category === "travel"
              ? "✈️"
              : "✦",
        reason:
          "Questa sarebbe l'opzione che Findly considera più adatta alla tua richiesta.",
        score: "9.4/10"
      },

      {
        title: "Seconda scelta",
        emoji: "⭐",
        reason:
          "Ottima alternativa se vuoi dare priorità a caratteristiche diverse.",
        score: "9.1/10"
      },

      {
        title: "Terza scelta",
        emoji: "🔥",
        reason:
          "Una scelta interessante con un ottimo rapporto tra qualità e prezzo.",
        score: "8.8/10"
      }

    ];


    renderTopPicks(
      demoItems
    );


    availability.classList.remove(
      "hidden"
    );

    availabilityGrid.innerHTML = `

      <div class="availability-card">

        <div class="availability-logo">
          ▶️
        </div>

        <strong>
          Disponibilità
        </strong>

        <span>
          I dati reali verranno recuperati dal Worker.
        </span>

        <div class="availability-price">
          In aggiornamento
        </div>

      </div>

      <div class="availability-card">

        <div class="availability-logo">
          💶
        </div>

        <strong>
          Prezzo
        </strong>

        <span>
          Findly confronterà le offerte.
        </span>

        <div class="availability-price">
          In aggiornamento
        </div>

      </div>

      <div class="availability-card">

        <div class="availability-logo">
          ★
        </div>

        <strong>
          Recensioni
        </strong>

        <span>
          Findly analizzerà le fonti.
        </span>

        <div class="availability-price">
          In aggiornamento
        </div>

      </div>

    `;


    recommendations.innerHTML = `

      <article class="result-card">

        <span class="result-source">
          FINDLY
        </span>

        <h3>
          Analisi intelligente
        </h3>

        <p>
          Questa è ancora una demo.
          Quando collegheremo il Worker,
          questa sezione mostrerà le fonti reali
          utilizzate per costruire la raccomandazione.
        </p>

      </article>

    `;

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
        ).value.trim();

      const two =
        document.getElementById(
          "compareTwo"
        ).value.trim();

      const context =
        document.getElementById(
          "comparisonContext"
        ).value.trim();


      if (!one || !two) {

        comparisonResult.classList.remove(
          "hidden"
        );

        comparisonResult.innerHTML = `
          <div class="ai-answer">
            Inserisci entrambe le alternative
            che vuoi confrontare.
          </div>
        `;

        return;
      }


      comparisonResult.classList.remove(
        "hidden"
      );


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
                Confronto in corso
              </span>
            </div>

          </div>

          <div class="ai-answer-text">

            Sto confrontando
            <strong>${escapeHTML(one)}</strong>
            e
            <strong>${escapeHTML(two)}</strong>
            ${
              context
                ? `in base a: ${escapeHTML(context)}`
                : ""
            }.

          </div>

        </div>
      `;


      /*
        In futuro il confronto verrà inviato
        allo stesso Worker.
      */

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
          throw new Error();
        }


        const data =
          await response.json();


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
                  La mia scelta
                </span>
              </div>

            </div>

            <div class="ai-answer-text">
              ${escapeHTML(
                data.answer ||
                "Confronto completato."
              )}
            </div>

          </div>
        `;

      }

      catch {

        /*
          Demo fallback
        */

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
                  Anteprima
                </span>
              </div>

            </div>

            <div class="ai-answer-text">

              Tra
              <strong>
                ${escapeHTML(one)}
              </strong>
              e
              <strong>
                ${escapeHTML(two)}
              </strong>,
              Findly analizzerà recensioni,
              caratteristiche, prezzo,
              qualità e ciò che hai indicato
              come importante per te.

              <br><br>

              Non ti dirà semplicemente
              “questo ha 4,5 stelle”:
              proverà a spiegarti
              <strong>perché scegliere uno
              rispetto all'altro.</strong>

            </div>

          </div>
        `;

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
        input.value.trim();


      if (!text) {

        input.focus();

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

  if (savedFontSize) {

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
      local: "Findly Local",
      discover: "Discover",
      favorites: "Favorites",
      history: "History",
      profile: "Profile",
      settings: "Settings"

    }

  };


  function applyLanguage(lang) {

    currentLanguage =
      lang;

    const t =
      translations[lang];


    document
      .querySelector(
        '[data-section="home"]'
      )
      ?.lastChild;


    const menuMap = {
      home: 0,
      suggest: 1,
      local: 2,
      discover: 3,
      favorites: 4,
      history: 5,
      profile: 6,
      settings: 7
    };


    Object.entries(menuMap)
      .forEach(
        ([section, index]) => {

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
              ` ${t[section]}`;

          }

        }
      );


    document
      .querySelectorAll(
        ".language"
      )
      .forEach(button => {

        button.classList.toggle(
          "active",
          button.dataset.lang === lang
        );

      });


    localStorage.setItem(
      "findly-language",
      lang
    );

  }


  document
    .querySelectorAll(
      ".language"
    )
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


  const savedLanguage =
    localStorage.getItem(
      "findly-language"
    ) || "it";


  if (settingsLanguage) {

    settingsLanguage.value =
      savedLanguage;

  }


  applyLanguage(
    savedLanguage
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

        <div style="font-size:30px;margin-bottom:auto">
          ${item[0]}
        </div>

        <strong>
          ${item[1]}
        </strong>

        <span
          style="
            color:var(--muted);
            font-size:12px;
            margin-top:5px;
          "
        >
          ${item[2]}
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
            ${emptyText}
          </p>
        </div>
      `;

      return;
    }


    container.innerHTML =
      data.map(item => `
        <div class="result-card">
          <h3>
            ${escapeHTML(item)}
          </h3>
        </div>
      `).join("");

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
     UTILITIES
  ===================================================== */

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
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  }

});