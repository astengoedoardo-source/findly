/* =========================================================
   FINDLY V8 — FRONTEND
========================================================= */

const WORKER_URL =
  "https://shrill-firefly-79b6.astengoedoardo.workers.dev";

let currentCategory = "other";
let currentLanguage = "it";


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const intro =
      document.getElementById(
        "introScreen"
      );

    const app =
      document.getElementById(
        "app"
      );


    setTimeout(() => {

      intro.classList.add(
        "intro-hide"
      );

      setTimeout(() => {

        intro.style.display =
          "none";

        app.classList.remove(
          "hidden"
        );

      }, 700);

    }, 1700);


    setupNavigation();
    setupSearch();
    setupCategories();
    setupGuided();
    setupCompare();
    setupExamples();

  }
);


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  const menuButton =
    document.getElementById(
      "menuButton"
    );

  const closeMenu =
    document.getElementById(
      "closeMenu"
    );

  const sideMenu =
    document.getElementById(
      "sideMenu"
    );

  const overlay =
    document.getElementById(
      "menuOverlay"
    );


  if (menuButton) {

    menuButton.onclick =
      () => openMenu();

  }


  if (closeMenu) {

    closeMenu.onclick =
      () => closeSideMenu();

  }


  if (overlay) {

    overlay.onclick =
      () => closeSideMenu();

  }


  document
    .querySelectorAll(
      "[data-page]"
    )
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


  const homeLogo =
    document.getElementById(
      "homeLogo"
    );

  if (homeLogo) {

    homeLogo.onclick =
      () => showPage("home");

  }

}


/* =========================================================
   MENU
========================================================= */

function openMenu() {

  const sideMenu =
    document.getElementById(
      "sideMenu"
    );

  const overlay =
    document.getElementById(
      "menuOverlay"
    );


  sideMenu.classList.add(
    "open"
  );

  overlay.classList.add(
    "show"
  );

}


function closeSideMenu() {

  const sideMenu =
    document.getElementById(
      "sideMenu"
    );

  const overlay =
    document.getElementById(
      "menuOverlay"
    );


  sideMenu.classList.remove(
    "open"
  );

  overlay.classList.remove(
    "show"
  );

}


/* =========================================================
   PAGES
========================================================= */

function showPage(page) {

  document
    .querySelectorAll(
      ".page"
    )
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
    .querySelectorAll(
      ".menu-item"
    )
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
    .querySelectorAll(
      "[data-category]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          currentCategory =
            button.dataset.category;


          showPage(
            "guided"
          );


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
   SEARCH HOME
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


  if (input && button) {

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

        if (
          event.key === "Enter"
        ) {

          button.click();

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


  if (
    freeInput &&
    freeButton
  ) {

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

        if (
          event.key === "Enter"
        ) {

          freeButton.click();

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


  if (!button) {
    return;
  }


  button.addEventListener(
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

  const button =
    document.getElementById(
      "compareButton"
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    compare
  );

}


async function compare() {

  const first =
    document.getElementById(
      "compareFirst"
    ).value.trim();


  const second =
    document.getElementById(
      "compareSecond"
    ).value.trim();


  const context =
    document.getElementById(
      "compareContext"
    ).value.trim();


  if (
    !first ||
    !second
  ) {

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
    "Analizzo...";


  result.innerHTML =
    `<div class="loading">
      <div class="loader"></div>
      <span>Confronto più fonti...</span>
    </div>`;


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

          body:
            JSON.stringify({
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


    const winner =
      data.winner ===
      "option_a"
        ? first
        : second;


    result.innerHTML = `

      <div class="compare-result-card">

        <div class="winner-label">
          FINDLY SCEGLIE
        </div>

        <h3>
          ${escapeHTML(
            winner
          )}
        </h3>

        <p>
          ${escapeHTML(
            data.answer || ""
          )}
        </p>

        <div class="reason-list">

          ${
            (
              data.reasons ||
              []
            )
              .map(
                reason =>
                  `<div>
                    ✓ ${escapeHTML(
                      reason
                    )}
                  </div>`
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

    button.disabled =
      false;

    button.textContent =
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

  showPage(
    "results"
  );


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
    "Sto cercando il meglio per te...";


  answer.innerHTML = "";


  list.innerHTML = `
    <div class="loading">

      <div class="loader"></div>

      <span>
        Analizzo più fonti...
      </span>

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

          body:
            JSON.stringify({
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


    renderResults(
      data
    );


  } catch (error) {

    title.textContent =
      "Qualcosa è andato storto.";


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
   RENDER RESULTS
========================================================= */

function renderResults(data) {

  const title =
    document.getElementById(
      "resultsTitle"
    );


  title.textContent =
    "Il meglio che ho trovato";


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
    (
      data.topPicks ||
      []
    )
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
    (
      data.sources ||
      []
    )
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


/* =========================================================
   RESULT CARD
========================================================= */

function createResultCard(
  item,
  index
) {

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
            item.emoji ||
            "✦"
          )}

        </div>


        <div class="result-info">

          <h3>
            ${escapeHTML(
              item.title ||
              ""
            )}
          </h3>


          <p class="result-reason">

            ${escapeHTML(
              item.reason ||
              ""
            )}

          </p>


          <div class="pros-cons">


            <div class="pros">

              ${
                (
                  item.pros ||
                  []
                )
                  .slice(
                    0,
                    2
                  )
                  .map(
                    pro =>
                      `<span>
                        ✓ ${escapeHTML(
                          pro
                        )}
                      </span>`
                  )
                  .join("")
              }

            </div>


            <div class="cons">

              ${
                (
                  item.cons ||
                  []
                )
                  .slice(
                    0,
                    2
                  )
                  .map(
                    con =>
                      `<span>
                        − ${escapeHTML(
                          con
                        )}
                      </span>`
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
                  Vedi fonte →
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
    .querySelectorAll(
      "[data-example]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const input =
            document.getElementById(
              "freeSearchInput"
            );


          if (!input) {
            return;
          }


          input.value =
            button.dataset.example;


          input.focus();

        }
      );

    });

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(
  value
) {

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


function escapeAttribute(
  value
) {

  return escapeHTML(
    value
  )
    .replaceAll(
      "`",
      "&#096;"
    );

}