class ShelterBurger {
  static id_header = "header";

  static openOrClose() {
    const HEADER = document.getElementById(this.id_header);

    if (!HEADER) {
      console.error(`Узел не найден: ${this.id_header}`);
      return;
    }

    const IS_OPENED = HEADER.getAttribute("data-is-menu-opened") == "true";

    if (IS_OPENED) {
      HEADER.removeAttribute("data-is-menu-opened");
      return;
    }

    HEADER.setAttribute("data-is-menu-opened", "true");
  }
}
