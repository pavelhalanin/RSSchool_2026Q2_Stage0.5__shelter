class ShelterMainSlider {
  static id_slider = "main_pets_slider";
  static id_prev = "slider_prev_button";
  static id_next = "slider_next_button";

  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static disableButtons() {
    const PREV_BUTTON = document.getElementById(this.id_prev);
    const NEXT_BUTTON = document.getElementById(this.id_next);

    if (!PREV_BUTTON) {
      onsole.error(`Узел не найден: #${this.id_prev}`);
      return;
    }

    if (!NEXT_BUTTON) {
      onsole.error(`Узел не найден: #${this.id_next}`);
      return;
    }

    PREV_BUTTON.setAttribute("disabled", "true");
    NEXT_BUTTON.setAttribute("disabled", "true");

    console.log(
      new Date().toJSON().slice(0, 19).replace("T", " "),
      "Buttons disabled for sliders",
    );
  }

  static enableButtons() {
    const PREV_BUTTON = document.getElementById(this.id_prev);
    const NEXT_BUTTON = document.getElementById(this.id_next);

    if (!PREV_BUTTON) {
      onsole.error(`Узел не найден: #${this.id_prev}`);
      return;
    }

    if (!NEXT_BUTTON) {
      onsole.error(`Узел не найден: #${this.id_next}`);
      return;
    }

    PREV_BUTTON.removeAttribute("disabled");
    NEXT_BUTTON.removeAttribute("disabled");

    console.log(
      new Date().toJSON().slice(0, 19).replace("T", " "),
      "Buttons enabled for sliders",
    );
  }

  static async fetchData() {
    const URI =
      "/RSSchool_2026Q2_Stage0.5__shelter/shelter/api/pets.json?nocache=2026-06-29_13-00";
    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      const TEXT = await RESPONSE.text();
      throw new Error(`HTTP ${HTTP_STATUS}\n${TEXT}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  }

  static getViewedCards() {
    try {
      const VIEWED_CARDS = localStorage.getItem("viewed_cards");
      if (!VIEWED_CARDS) {
        return [1, 2, 3];
      }
      const DATA = JSON.parse(VIEWED_CARDS);
      const ARRAY = Object.keys(DATA)
        .filter((e) => DATA[e] > 0)
        .slice(0, 3)
        .map((e) => DATA[e]);
      return ARRAY;
    } catch (exception) {
      console.error(exception);
      return [1, 2, 3];
    }
  }

  static async getRandom3() {
    const DATA = await this.fetchData();
    const VIEWED_CARDS = this.getViewedCards();
    let array = DATA;

    for (let i = 0; i < VIEWED_CARDS.length; i++) {
      array = array.filter((e) => e.id != VIEWED_CARDS[i]);
    }

    array = array.toSorted(() => Math.random() - 0.5).slice(0, 3);

    console.log(`Viewed id cards: ${array.map((e) => e.id)}`);

    localStorage.setItem(
      "viewed_cards",
      JSON.stringify(array.map((e) => e.id)),
    );
    return array.slice(0, 3);
  }

  static async leftRight(
    params = {
      command: "left",
    },
  ) {
    const DIV = document.getElementById(this.id_slider);

    if (!DIV) {
      console.error(`Узел не найден: #${this.id_slider}`);
      return;
    }

    this.disableButtons();

    DIV.style.transform =
      params.command == "left" ? "translateX(200%)" : "translateX(-200%)";
    DIV.style.transition = "all 1.5s ease";
    DIV.style.opacity = "0";
    await this.sleep(600);

    const RANDOM_ARRAY = await this.getRandom3();
    DIV.innerHTML = `
      <ul>
        ${RANDOM_ARRAY.map((e) => {
          return `
            <li>
              <div class="slider__card_image">
                <img src="${e.img}" alt="">
              </div>
              <div class="pets__slider_card_text">${e.name}</div>
              <button class="pets__slider_card_button assets__button_secondary"
                onclick="ShelterModal.openModalById('${e.id}')">
                Learn more
              </button>
            </li>
          `;
        }).join("")}
      </ul>
    `;

    DIV.style.transform = "translateX(0%)";
    DIV.style.opacity = "1";
    await this.sleep(1500);
    this.enableButtons();
  }
}
