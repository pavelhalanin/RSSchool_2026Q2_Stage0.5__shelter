class ShelterModal {
  static id_modal = "pet_modal";

  static async fetchDataById(id) {
    const URI = `/RSSchool_2026Q2_Stage0.5__shelter/api/pets/${id}.json?nocache=2026-06-29_13-00`;
    const RESPONSE = await fetch(URI);

    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS !== 200) {
      const TEXT = await RESPONSE.text();
      throw new Error(`HTTP ${HTTP_STATUS}\n${TEXT}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  }

  static closeModal() {
    document.querySelectorAll(`#${this.id_modal}`).forEach((e) => e.remove());
    document.body.removeAttribute("data-no-scroll-because-modal-is-open");
  }

  static async openModalById(id) {
    const DATA = await this.fetchDataById(id);

    document.querySelectorAll(`#${this.id_modal}`).forEach((e) => e.remove());

    const DIV = document.createElement("div");
    DIV.setAttribute("id", this.id_modal);
    DIV.classList.add("pets_modal");
    DIV.innerHTML = /* html */ `
      <div class="pets_modal__overlay" onclick="${this.name}.closeModal()"></div>
      <div class="pets_modal__block_wrapper">
        <button
          class="pets_modal__close_button"
          onclick="${this.name}.closeModal()"
        ></button>
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
                  ${DATA.type} - ${DATA.breed}
                </div>
              </div>
              <div class="pets_modal__description">
                ${DATA.description}
              </div>
              <ul class="pets_modal__ul">
                <li><b>Age:</b> ${DATA.age}</li>
                <li><b>Inoculations:</b> ${DATA.inoculations.join(", ")}</li>
                <li><b>Diseases:</b> ${DATA.diseases.join(", ")}</li>
                <li><b>Parasites:</b> ${DATA.parasites.join(", ")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;

    document.body.setAttribute("data-no-scroll-because-modal-is-open", "true");
    document.body.appendChild(DIV);
  }
}
