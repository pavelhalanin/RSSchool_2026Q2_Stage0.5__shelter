class ShelterMainSlider {
  static id_slider = "main_pets_slider";

  static async fetchData() {
    const URI = "/shelter/api/pets.json";
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

  static async left() {
    const DIV = document.getElementById(this.id_slider);

    if (!DIV) {
      console.error(`Узел не найден: #${this.id_slider}`);
    }

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
        })}
      </ul>
    `;
  }
}
