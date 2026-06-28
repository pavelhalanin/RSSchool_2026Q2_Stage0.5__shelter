class ShelterPagination {
  static id_pagination_items = "id_pagination_items";
  static id_current_page = "current_page";
  static id_first_page_button = "id_first_page_button";
  static id_prev_page_button = "id_prev_page_button";
  static id_next_page_button = "id_next_page_button";
  static id_last_page_button = "id_last_page_button";

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

  static async get48Cards() {
    const ARRAY_8 = await this.fetchData();
    let newArray = [];
    for (let i = 0; i < 6; i++) {
      newArray = newArray.concat(ARRAY_8.toSorted(() => Math.random() - 0.5));
    }
    return newArray;
  }

  static async render() {
    const ARRAY = await this.get48Cards();

    const DIV = document.getElementById(this.id_pagination_items);
    if (!DIV) {
      console.error(`Узел не найден: #${this.id_pagination_items}`);
      return;
    }

    DIV.innerHTML = `
      <ul>
        ${ARRAY.map((e) => {
          return `
            <li>
              <div class="slider__card_image">
                <img src="${e.img}" alt="">
              </div>
              <div class="pets__slider_card_text">
                ${e.name}
              </div>
              <button
                class="pets__slider_card_button assets__button_secondary"
                onclick="ShelterModal.openModalById('${e.id}')"
              >
                Learn more
              </button>
            </li>
          `;
        }).join("")}
      </ul>
    `;
  }

  static getLimit() {
    const WIDTH = window.innerWidth;
    return WIDTH >= 1280 ? 8 : WIDTH < 1280 && WIDTH >= 768 ? 6 : 3;
  }

  static getCurrentPage() {
    const CURRENT_PAGE_ELEMENT = document.getElementById(this.id_current_page);
    if (!CURRENT_PAGE_ELEMENT) {
      console.error(`Не найден узел: #${this.id_current_page}`);
      return 1;
    }

    const VALUE = Number(`${CURRENT_PAGE_ELEMENT.innerHTML}`.trim());
    return VALUE > 0 ? VALUE : 1;
  }

  static setCurrentPage(page) {
    const CURRENT_PAGE_ELEMENT = document.getElementById(this.id_current_page);
    if (!CURRENT_PAGE_ELEMENT) {
      console.error(`Не найден узел: #${this.id_current_page}`);
      return;
    }

    CURRENT_PAGE_ELEMENT.innerHTML = page;
  }

  static viewItemsForPage(page) {
    const LIMIT = this.getLimit();

    const ARRAY = document.querySelectorAll(
      `#${this.id_pagination_items}>ul>li`,
    );
    console.log(`#${this.id_pagination_items}>ul>li`);
    console.log(ARRAY);

    for (let i = 0; i < ARRAY.length; i++) {
      const ID = i + 1;
      console.log(
        `${ID > (page - 1) * LIMIT && ID <= page * LIMIT} ===> ${ID} > ${(page - 1) * LIMIT} && ${ID} <= ${page * LIMIT}`,
      );
      if (ID > (page - 1) * LIMIT && ID <= page * LIMIT) {
        ARRAY[i].style.display = "block";
        continue;
      }
      ARRAY[i].style.display = "none";
    }

    this.setCurrentPage(page);
    this.disableButtons();
  }

  static next() {
    const CURRENT_PAGE = this.getCurrentPage();
    this.viewItemsForPage(CURRENT_PAGE + 1);
  }

  static prev() {
    const CURRENT_PAGE = this.getCurrentPage();
    this.viewItemsForPage(CURRENT_PAGE - 1);
  }

  static firstPage() {
    this.viewItemsForPage(1);
  }

  static lastPage() {
    this.viewItemsForPage(this.getLastPage());
  }

  static getLastPage() {
    const LIMIT = this.getLimit();
    const LAST_PAGE = 48 / LIMIT;
    return LAST_PAGE;
  }

  static disableButtons() {
    console.log("disableButtons");
    const FIRST_PAGE_BUTTON = document.getElementById(
      this.id_first_page_button,
    );
    const PREV_PAGE_BUTTON = document.getElementById(this.id_prev_page_button);
    const NEXT_PAGE_BUTTON = document.getElementById(this.id_next_page_button);
    const LAST_PAGE_BUTTON = document.getElementById(this.id_last_page_button);

    if (!FIRST_PAGE_BUTTON) {
      console.error(`Не найден узел: #${this.id_first_page_button}`);
      return;
    }

    if (!PREV_PAGE_BUTTON) {
      console.error(`Не найден узел: #${this.id_prev_page_button}`);
      return;
    }

    if (!NEXT_PAGE_BUTTON) {
      console.error(`Не найден узел: #${this.id_next_page_button}`);
      return;
    }

    if (!LAST_PAGE_BUTTON) {
      console.error(`Не найден узел: #${this.id_last_page_button}`);
      return;
    }

    const CURRENT_PAGE = this.getCurrentPage();
    const LAST_PAGE = this.getLastPage();

    if (CURRENT_PAGE == 1) {
      FIRST_PAGE_BUTTON.setAttribute("disabled", "true");
      PREV_PAGE_BUTTON.setAttribute("disabled", "true");
      NEXT_PAGE_BUTTON.removeAttribute("disabled");
      LAST_PAGE_BUTTON.removeAttribute("disabled");
      return;
    }

    if (CURRENT_PAGE == LAST_PAGE) {
      FIRST_PAGE_BUTTON.removeAttribute("disabled");
      PREV_PAGE_BUTTON.removeAttribute("disabled");
      NEXT_PAGE_BUTTON.setAttribute("disabled", "true");
      LAST_PAGE_BUTTON.setAttribute("disabled", "true");
      return;
    }

    FIRST_PAGE_BUTTON.removeAttribute("disabled");
    PREV_PAGE_BUTTON.removeAttribute("disabled");
    NEXT_PAGE_BUTTON.removeAttribute("disabled");
    LAST_PAGE_BUTTON.removeAttribute("disabled");
  }
}
