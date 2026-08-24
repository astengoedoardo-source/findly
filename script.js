const WORKER_URL = "https://shrill-firefly-79b6.astengoedoardo.workers.dev/";

const priorities = document.querySelectorAll(".priority");
const findButton = document.getElementById("findButton");
const results = document.getElementById("results");
const recommendations = document.getElementById("recommendations");

let selectedPriority = "price";

priorities.forEach(button => {
  button.addEventListener("click", () => {
    priorities.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    selectedPriority = button.dataset.value;
  });
});

findButton.addEventListener("click", async () => {
  const request = document.getElementById("request").value.trim();

  if (!request) {
    document.getElementById("request").focus();
    return;
  }

  findButton.disabled = true;
  findButton.textContent = "Sto cercando...";

  recommendations.innerHTML = "";

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: request,
        priority: selectedPriority
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Errore nella ricerca");
    }

    if (!data.results || data.results.length === 0) {
      recommendations.innerHTML = `
        <div class="result-card">
          <h3>Nessun risultato trovato</h3>
          <p class="result-description">
            Prova a descrivere la tua ricerca in modo diverso.
          </p>
        </div>
      `;
    } else {
      data.results.slice(0, 3).forEach((item, index) => {
        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `
          <div class="rank">#${index + 1}</div>

          <h3>${escapeHtml(item.title || "Risultato")}</h3>

          <p class="result-description">
            ${escapeHtml(item.description || "")}
          </p>

          <div class="match">
            ${Math.round((item.score || 0) * 100)}% match
          </div>

          <div class="reason">
            <strong>Risultato trovato da Findly</strong><br>
            ${escapeHtml(item.description || "Questo risultato corrisponde alla tua ricerca.")}
          </div>

          <a
            href="${item.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="find-button"
            style="margin-top:18px;text-decoration:none;"
          >
            Apri risultato →
          </a>
        `;

        recommendations.appendChild(card);
      });
    }

    results.classList.remove("hidden");

    setTimeout(() => {
      results.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);

  } catch (error) {
    recommendations.innerHTML = `
      <div class="result-card">
        <h3>Ops, qualcosa è andato storto.</h3>
        <p class="result-description">
          ${escapeHtml(error.message)}
        </p>
      </div>
    `;

    results.classList.remove("hidden");

  } finally {
    findButton.disabled = false;
    findButton.textContent = "Trova per me →";
  }
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}