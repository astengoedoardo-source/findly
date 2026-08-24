const priorities = document.querySelectorAll(".priority");
const findButton = document.getElementById("findButton");
const results = document.getElementById("results");
const recommendations = document.getElementById("recommendations");

let selectedPriority = "price";

priorities.forEach(button => {
  button.addEventListener("click", () => {
    priorities.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedPriority = button.dataset.value;
  });
});

const products = {
  tech: [
    {
      name: "Sony WH-1000XM5",
      description: "Cuffie wireless premium con ottima cancellazione del rumore e grande autonomia.",
      price: "€299",
      quality: 96
    },
    {
      name: "Soundcore Space Q45",
      description: "Cuffie wireless pensate per offrire molto senza salire troppo di prezzo.",
      price: "€149",
      quality: 91
    },
    {
      name: "JBL Live 770NC",
      description: "Una soluzione equilibrata per musica, viaggi e utilizzo quotidiano.",
      price: "€129",
      quality: 87
    }
  ],

  fashion: [
    {
      name: "Nike Air Max",
      description: "Sneaker versatile pensata per uso quotidiano e comfort.",
      price: "€150",
      quality: 90
    },
    {
      name: "Adidas Campus",
      description: "Design semplice e versatile con un buon rapporto qualità/prezzo.",
      price: "€110",
      quality: 87
    },
    {
      name: "New Balance 550",
      description: "Sneaker lifestyle dal design riconoscibile e facile da abbinare.",
      price: "€130",
      quality: 89
    }
  ],

  sport: [
    {
      name: "Nike Training Pro",
      description: "Soluzione versatile per allenamento e attività sportive.",
      price: "€90",
      quality: 91
    },
    {
      name: "Adidas Performance",
      description: "Buon equilibrio tra comfort, prestazioni e prezzo.",
      price: "€75",
      quality: 87
    },
    {
      name: "Under Armour Training",
      description: "Pensato per allenamenti frequenti e utilizzo intenso.",
      price: "€85",
      quality: 89
    }
  ],

  home: [
    {
      name: "Dyson V8",
      description: "Aspirapolvere senza filo compatto e versatile.",
      price: "€299",
      quality: 94
    },
    {
      name: "Rowenta X-Force",
      description: "Buona potenza e autonomia per la pulizia quotidiana.",
      price: "€249",
      quality: 89
    },
    {
      name: "Xiaomi Vacuum",
      description: "Alternativa più economica con un buon rapporto qualità/prezzo.",
      price: "€179",
      quality: 85
    }
  ],

  travel: [
    {
      name: "Samsonite Cabin",
      description: "Valigia compatta pensata per viaggi frequenti e utilizzo in aereo.",
      price: "€180",
      quality: 94
    },
    {
      name: "American Tourister",
      description: "Valigia pratica e resistente a un prezzo più accessibile.",
      price: "€110",
      quality: 88
    },
    {
      name: "Eastpak Transit",
      description: "Soluzione semplice e versatile per viaggi brevi.",
      price: "€90",
      quality: 84
    }
  ],

  auto: [
    {
      name: "Toyota Yaris",
      description: "Auto compatta, efficiente e adatta soprattutto all'utilizzo quotidiano.",
      price: "€22.000",
      quality: 93
    },
    {
      name: "Volkswagen Polo",
      description: "Una scelta equilibrata per chi cerca comfort e versatilità.",
      price: "€21.000",
      quality: 90
    },
    {
      name: "Renault Clio",
      description: "Compatta e pratica, con un buon equilibrio generale.",
      price: "€18.000",
      quality: 87
    }
  ],

  other: [
    {
      name: "Opzione Premium",
      description: "Una scelta orientata alla qualità e all'affidabilità.",
      price: "€299",
      quality: 95
    },
    {
      name: "Opzione Balanced",
      description: "Il compromesso migliore tra prezzo e qualità.",
      price: "€199",
      quality: 89
    },
    {
      name: "Opzione Budget",
      description: "La soluzione più conveniente tra quelle considerate.",
      price: "€99",
      quality: 82
    }
  ]
};

function getReason(product, priority) {
  if (priority === "price") {
    return "È stata selezionata perché offre un prezzo particolarmente interessante rispetto alle alternative.";
  }

  if (priority === "quality") {
    return "È stata selezionata perché punta soprattutto sulla qualità e sulle caratteristiche complessive.";
  }

  if (priority === "value") {
    return "È stata selezionata perché rappresenta un buon equilibrio tra prezzo e qualità.";
  }

  if (priority === "speed") {
    return "È stata selezionata perché è una soluzione semplice e immediata per questo tipo di esigenza.";
  }

  return "È una delle opzioni che meglio corrisponde alla richiesta.";
}

findButton.addEventListener("click", () => {
  const request = document.getElementById("request").value.trim();
  const category = document.getElementById("category").value;

  if (!request) {
    document.getElementById("request").focus();
    return;
  }

  let selectedProducts = [...(products[category] || products.other)];

  selectedProducts = selectedProducts.map(product => {
    let score = product.quality;

    if (selectedPriority === "price") {
      if (product.price.includes("99")) score += 8;
      if (product.price.includes("110")) score += 6;
      if (product.price.includes("129")) score += 5;
      if (product.price.includes("149")) score += 4;
    }

    if (selectedPriority === "quality") {
      score += product.quality / 10;
    }

    if (selectedPriority === "value") {
      score += product.quality / 8;
    }

    return {
      ...product,
      score
    };
  });

  selectedProducts.sort((a, b) => b.score - a.score);

  recommendations.innerHTML = "";

  selectedProducts.slice(0, 3).forEach((product, index) => {
    const card = document.createElement("div");

    card.className = "result-card";

    const match = Math.min(99, Math.round(product.score));

    card.innerHTML = `
      <div class="rank">#${index + 1}</div>

      <h3>${product.name}</h3>

      <p class="result-description">
        ${product.description}
      </p>

      <div class="price">
        ${product.price}
      </div>

      <div class="match">
        ${match}% match
      </div>

      <div class="reason">
        <strong>Perché te lo consigliamo:</strong><br>
        ${getReason(product, selectedPriority)}
      </div>
    `;

    recommendations.appendChild(card);
  });

  results.classList.remove("hidden");

  setTimeout(() => {
    results.scrollIntoView({
      behavior: "smooth"
    });
  }, 100);
});