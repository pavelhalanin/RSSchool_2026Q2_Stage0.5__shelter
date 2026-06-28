class ShelterModal {
  static id_modal = "pet_modal";

  static async fetchDataById(id) {
    const URI = `/shelter/api/pets/${id}.json`;
    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      const TEXT = await RESPONSE.text();
      throw new Error(`HTTP ${HTTP_STATUS}\n${TEXT}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  }

  static async openModalById(id) {
    const DATA = await this.fetchDataById(id);

    document.querySelectorAll(`#${this.id_modal}`).forEach((e) => e.remove());

    const DIALOG = document.createElement("dialog");
    DIALOG.setAttribute("id", this.id_modal);
    DIALOG.classList.add("pets_modal");
    DIALOG.innerHTML = /* html */ `
      <div class="pets_modal__wrapper">
        <header class="pets_modal__header">
          <button class="pets_modal__close_button" commandfor="${this.id_modal}" command="close">
            
          </button>
        </header>
        <div class="pets_modal__content">
          <div class="pets_modal__image_block">
            <img src="${DATA.img}" alt="" />
          </div>
          <div>
            <div class="pets_modal__text_block">
              <div>
                <div class="pets_modal__h">
                  ${DATA.name}
                </div>
                <div class="pets_modal__brend">
                  ${DATA.type} ${DATA.brend}
                </div>
              </div>
              <div class="pets_modal__description">
                ${DATA.description}
              </div>
              <ul>
                <li><b>Age:</b> ${DATA.age}</li>
                <li><b>Inoculations: none:</b> ${DATA.inoculations.join(", ")}</li>
                <li><b>Diseases:</b> ${DATA.diseases.join(", ")}</li>
                <li><b>Parasites:</b> ${DATA.parasites.join(", ")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;

    document.body.appendChild(DIALOG);

    DIALOG.addEventListener("click", function (event) {
      const rect = this.getBoundingClientRect();

      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside) {
        this.close();
      }
    });

    const BUTTON = document.createElement("button");
    BUTTON.setAttribute("command", "show-modal");
    BUTTON.setAttribute("commandfor", this.id_modal);
    document.body.appendChild(BUTTON);
    BUTTON.click();
    BUTTON.remove();
  }
}
