const WORKER_URL =
  "https://shrill-firefly-79b6.astengoedoardo.workers.dev/";

const requestInput = document.getElementById("request");
const categories = document.querySelectorAll(".category");
const priorities = document.querySelectorAll(".priority");

const findButton = document.getElementById("findButton");
const resultsSection = document.getElementById("results");
const recommendations = document.getElementById("recommendations");

const dynamicFilters = document.getElementById("dynamicFilters");
const budgetSelect = document.getElementById("budget");
const matchCount = document.getElementById("matchCount");

let selectedCategory = "products";
let selectedPriority = "value";
let currentResults = [];


/* =========================
   FILTRI DINAMICI
========================= */

const categoryFilters = {

  products: `
    <div class="field">
      <label for="productBudget">Budget</label>
      <select id="productBudget">
        <option value="any">Qualsiasi</option>
        <option value="under50">Meno di €50</option>
        <option value="under100">Meno di €100</option>
        <option value="100-300">€100 – €300</option>
        <option value="300-700">€300 – €700</option>
        <option value="700plus">Oltre €700</option>
      </select>
    </div>

    <div class="field">
      <label for="condition">Condizioni</label>
      <select id="condition">
        <option value="any">Qualsiasi</option>
        <option value="new">Nuovo</option>
        <option value="used">Usato</option>
        <option value="excellent">Usato — ottime condizioni</option>
      </select>
    </div>
  `,

  fashion: `
    <div class="grid">
      <div class="field">
        <label for="fashionBudget">Budget</label>
        <select id="fashionBudget">
          <option value="any">Qualsiasi</option>
          <option value="under30">Meno di €30</option>
          <option value="under50">Meno di €50</option>
          <option value="under100">Meno di €100</option>
          <option value="100plus">Oltre €100</option>
        </select>
      </div>

      <div class="field">
        <label for="fashionCondition">Condizioni</label>
        <select id="fashionCondition">
          <option value="any">Qualsiasi</option>
          <option value="new">Nuovo</option>
          <option value="used">Usato</option>
          <option value="excellent">Usato — ottime condizioni</option>
        </select>
      </div>
    </div>

    <div class="grid">
      <div class="field">
        <label for="size">Taglia</label>
        <select id="size">
          <option value="any">Qualsiasi</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      <div class="field">
        <label for="gender">Reparto</label>
        <select id="gender">
          <option value="any">Qualsiasi</option>
          <option value="men">Uomo</option>
          <option value="women">Donna</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>
    </div>
  `,

  tech: `
    <div class="grid">
      <div class="field">
        <label for="techBudget">Budget</label>
        <select id="techBudget">
          <option value="any">Qualsiasi</option>
          <option value="under300">Meno di €300</option>
          <option value="300-500">€300 – €500</option>
          <option value="500-1000">€500 – €1.000</option>
          <option value="1000-2000">€1.000 – €2.000</option>
          <option value="2000plus">Oltre €2.000</option>
        </select>
      </div>

      <div class="field">
        <label for="techCondition">Condizioni</label>
        <select id="techCondition">
          <option value="any">Qualsiasi</option>
          <option value="new">Nuovo</option>
          <option value="used">Usato</option>
          <option value="refurbished">Ricondizionato</option>
        </select>
      </div>
    </div>
  `,

  auto: `
    <div class="grid">
      <div class="field">
        <label for="autoBudget">Prezzo massimo</label>
        <select id="autoBudget">
          <option value="any">Qualsiasi</option>
          <option value="under5000">€5.000</option>
          <option value="under10000">€10.000</option>
          <option value="under15000">€15.000</option>
          <option value="under20000">€20.000</option>
          <option value="under30000">€30.000</option>
          <option value="30000plus">Oltre €30.000</option>
        </select>
      </div>

      <div class="field">
        <label for="fuel">Carburante</label>
        <select id="fuel">
          <option value="any">Qualsiasi</option>
          <option value="petrol">Benzina</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Ibrida</option>
          <option value="electric">Elettrica</option>
        </select>
      </div>
    </div>

    <div class="grid">
      <div class="field">
        <label for="year">Anno minimo</label>
        <select id="year">
          <option value="any">Qualsiasi</option>
          <option value="2025">2025</option>
          <option value="2023">2023</option>
          <option value="2021">2021</option>
          <option value="2019">2019</option>
          <option value="2017">2017</option>
        </select>
      </div>

      <div class="field">
        <label for="km">Chilometri</label>
        <select id="km">
          <option value="any">Qualsiasi</option>
          <option value="30000">Meno di 30.000 km</option>
          <option value="60000">Meno di 60.000 km</option>
          <option value="100000">Meno di 100.000 km</option>
        </select>
      </div>
    </div>
  `,

  home: `
    <div class="field">
      <label for="homeBudget">Budget</label>
      <select id="homeBudget">
        <option value="any">Qualsiasi</option>
        <option value="under50">Meno di €50</option>
        <option value="under100">Meno di €100</option>
        <option value="100-300">€100 – €300</option>
        <option value="300-700">€300 – €700</option>
        <option value="700plus">Oltre €700</option>
      </select>
    </div>
  `,

  movies: `
    <div class="grid">
      <div class="field">
        <label for="platform">Dove vuoi guardarlo?</label>
        <select id="platform">
          <option value="any">Qualsiasi piattaforma</option>
          <option value="netflix">Netflix</option>
          <option value="prime">Prime Video</option>
          <option value="disney">Disney+</option>
          <option value="max">Max</option>
          <option value="apple">Apple TV+</option>
        </select>
      </div>

      <div class="field">
        <label for="watchType">Disponibilità</label>
        <select id="watchType">
          <option value="any">Qualsiasi</option>
          <option value="included">Incluso nell'abbonamento</option>
          <option value="free">Gratis</option>
          <option value="rent">Noleggio</option>
          <option value="buy">Acquisto</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label for="movieGenre">Genere</label>
      <select id="movieGenre">
        <option value="any">Qualsiasi genere</option>
        <option value="horror">Horror</option>
        <option value="thriller">Thriller</option>
        <option value="action">Azione</option>
        <option value="comedy">Commedia</option>
        <option value="drama">Drammatico</option>
        <option value="sci-fi">Fantascienza</option>
      </select>
    </div>
  `,

  books: `
    <div class="grid">
      <div class="field">
        <label for="bookFormat">Formato</label>
        <select id="bookFormat">
          <option value="any">Qualsiasi</option>
          <option value="paper">Cartaceo</option>
          <option value="ebook">eBook</option>
          <option value="audio">Audiolibro</option>
        </select>
      </div>

      <div class="field">
        <label for="bookCondition">Condizioni</label>
        <select id="bookCondition">
          <option value="any">Qualsiasi</option>
          <option value="new">Nuovo</option>
          <option value="used">Usato</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label for="bookBudget">Budget</label>
      <select id="bookBudget">
        <option value="any">Qualsiasi</option>
        <option value="under10">Meno di €10</option>
        <option value="10-20">€10 – €20</option>
        <option value="20-40">€20 – €40</option>
        <option value="40plus">Oltre €40</option>
      </select>
    </div>
  `,

  music: `
    <div class="grid">
      <div class="field">
        <label for="musicType">Cosa cerchi?</label>
        <select id="musicType">
          <option value="any">Qualsiasi</option>
          <option value="song">Canzone</option>
          <option value="album">Album</option>
          <option value="artist">Artista</option>
          <option value="concert">Concerto</option>
        </select>
      </div>

      <div class="field">
        <label for="musicPlatform">Piattaforma</label>
        <select id="musicPlatform">
          <option value="any">Qualsiasi</option>
          <option value="spotify">Spotify</option>
          <option value="youtube">YouTube</option>
          <option value="apple">Apple Music</option>
        </select>
      </div>
    </div>
  `,

  travel: `
    <div class="grid">
      <div class="field">
        <label for="travelBudget">Budget totale</label>
        <select id="travelBudget">
          <option value="any">Qualsiasi</option>
          <option value="under300">Meno di €300</option>
          <option value="300-500">€300 – €500</option>
          <option value="500-1000">€500 – €1.000</option>
          <option value="1000-2000">€1.000 – €2.000</option>
          <option value="2000plus">Oltre €2.000</option>
        </select>
      </div>

      <div class="field">
        <label for="travelPeople">Persone</label>
        <select id="travelPeople">
          <option value="1">1 persona</option>
          <option value="2" selected>2 persone</option>
          <option value="3">3 persone</option>
          <option value="4">4 persone</option>
          <option value="5plus">5+ persone</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label for="travelType">Tipo di viaggio</label>
      <select id="travelType">
        <option value="any">Qualsiasi</option>
        <option value="city">Città</option>
        <option value="beach">Mare</option>
        <option value="nature">Natura</option>
        <option value="nightlife">Vita notturna</option>
        <option value="culture">Cultura</option>
      </select>
    </div>
  `,

  places: `
    <div class="grid">
      <div class="field">
        <label for="placeType">Cosa vuoi trovare?</label>
        <select id="placeType">
          <option value="any">Qualsiasi</option>
          <option value="restaurant">Ristoranti</option>
          <option value="bar">Bar & locali</option>
          <option value="club">Club</option>
          <option value="beach">Spiagge</option>
          <option value="attraction">Attrazioni</option>
          <option value="activity">Attività</option>
        </select>
      </div>

      <div class="field">
        <label for="distance">Distanza</label>
        <select id="distance">
          <option value="any">Qualsiasi</option>
          <option value="1">Entro 1 km</option>
          <option value="5">Entro 5 km</option>
          <option value="10">Entro 10 km</option>
          <option value="25">Entro 25 km</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label for="placeBudget">Prezzo</label>
      <select id="placeBudget">
        <option value="any">Qualsiasi</option>
        <option value="free">Gratis</option>
        <option value="cheap">Economico</option>
        <option value="medium">Medio</option>
        <option value="premium">Premium</option>
      </select>
    </div>
  `,

  other: `
    <div class="field">
      <label for="otherBudget">Budget</label>
      <select id="otherBudget">
        <option value="any">Qualsiasi</option>
        <option value="under50">Meno di €50</option>
        <option value="under100">Meno di €100</option>
        <option value="100-300">€100 – €300</option>
        <option value="300-700">€300 – €700</option>
        <option value="700plus">Oltre €700</option>
      </select>
    </div>
  `
};


/* =========================
   CAMBIO CATEGORIA
========================= */

function updateCategory() {

  categories.forEach(button => {
    button.classList.remove("active");
  });

  const activeCategory = document.querySelector(
    `.category[data-category="${selectedCategory}"]`
  );

  if (activeCategory) {
    activeCategory.classList.add("active");
  }

  dynamicFilters.innerHTML =
    categoryFilters[selectedCategory] || categoryFilters.other;
}


/* =========================
   SELEZIONE CATEGORIA
========================= */

categories.forEach(button => {

  button.addEventListener("click", () => {

    selectedCategory =
      button.dataset.category;

    updateCategory();

  });

});


/* =========================
   SELEZIONE PRIORITÀ
========================= */

priorities.forEach(button => {

  button.addEventListener("click", () => {

    priorities.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedPriority =
      button.dataset.value;

  });

});


/* =========================
   RACCOLTA FILTRI
========================= */

function collectFilters() {

  const filters = {};

  const selects =
    dynamicFilters.querySelectorAll("select");

  selects.forEach(select => {

    filters[select.id] =
      select.value;

  });

  return filters;
}


/* =========================
   COSTRUZIONE RICERCA
========================= */

function buildSearchQuery() {

  const request =
    requestInput.value.trim();

  const filters =
    collectFilters();

  const filterText =
    Object.entries(filters)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

  return {
    query: request,
    category: selectedCategory,
    priority: selectedPriority,
    filters,
    filterText
  };
}


/* =========================
   RENDER RISULTATI
========================= */

function renderResults(data) {

  currentResults =
    data.results || [];

  recommendations.innerHTML = "";

  if (!currentResults.length) {

    recommendations.innerHTML = `
      <div class="result-card">
        <h3>Nessun risultato trovato</h3>
        <p class="result-description">
          Prova a descrivere la ricerca in modo più preciso.
        </p>
      </div>
    `;

    matchCount.textContent =
      "0 risultati";

    return;
  }


  matchCount.textContent =
    `${currentResults.length} risultati`;


  currentResults.forEach((item, index) => {

    const card =
      document.createElement("article");

    card.className =
      "result-card";

    const score =
      Math.round((item.score || 0) * 100);

    let source =
      "Web";

    try {

      const hostname =
        new URL(item.url).hostname
          .replace("www.", "");

      source =
        hostname.split(".")[0];

      source =
        source.charAt(0).toUpperCase() +
        source.slice(1);

    } catch {
      source = "Web";
    }


    card.innerHTML = `

      <div class="rank">
        #${index + 1}
      </div>

      <div class="source-badge">
        ${source}
      </div>

      <h3>
        ${escapeHtml(item.title)}
      </h3>

      <p class="result-description">
        ${escapeHtml(
          item.description ||
          "Nessuna descrizione disponibile."
        )}
      </p>

      <div class="match">
        ${score ? `${score}% match` : "Match Findly"}
      </div>

      <div class="reason">
        🔎 Risultato trovato da Findly
      </div>

      <a
        href="${item.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="result-link"
      >
        Vedi sul sito →
      </a>

    `;

    recommendations.appendChild(card);

  });

}


/* =========================
   SICUREZZA TESTO
========================= */

function escapeHtml(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text || "";

  return div.innerHTML;
}


/* =========================
   TROVA
========================= */

findButton.addEventListener("click", async () => {

  const search =
    buildSearchQuery();

  if (!search.query) {

    requestInput.focus();

    return;
  }


  findButton.disabled = true;

  findButton.innerHTML =
    "🔎 Findly sta cercando...";


  resultsSection.classList.remove("hidden");

  recommendations.innerHTML = `
    <div class="result-card">
      <h3>Sto cercando le migliori opzioni...</h3>
      <p class="result-description">
        Findly sta confrontando i risultati.
      </p>
    </div>
  `;


  try {

    const response =
      await fetch(WORKER_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          query: search.query,

          category:
            search.category,

          priority:
            search.priority,

          filters:
            search.filters,

          filterText:
            search.filterText

        })

      });


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "Errore durante la ricerca."
      );

    }


    renderResults(data);


    resultsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


  } catch (error) {

    recommendations.innerHTML = `

      <div class="result-card">

        <h3>
          Qualcosa è andato storto.
        </h3>

        <p class="result-description">
          ${escapeHtml(error.message)}
        </p>

      </div>

    `;

  } finally {

    findButton.disabled = false;

    findButton.innerHTML =
      '<span>🔎</span> Trova per me <span>→</span>';

  }

});


/* =========================
   FILTRI RISULTATI
========================= */

document.addEventListener("click", event => {

  const button =
    event.target.closest(".result-filter");

  if (!button) return;


  document
    .querySelectorAll(".result-filter")
    .forEach(item => {
      item.classList.remove("active");
    });


  button.classList.add("active");


  const sort =
    button.dataset.sort;


  if (sort === "price") {

    currentResults.sort(
      (a, b) =>
        (a.score || 0) -
        (b.score || 0)
    );

  } else {

    currentResults.sort(
      (a, b) =>
        (b.score || 0) -
        (a.score || 0)
    );

  }


  renderResults({
    results: currentResults
  });

});


/* =========================
   AVVIO
========================= */

updateCategory();