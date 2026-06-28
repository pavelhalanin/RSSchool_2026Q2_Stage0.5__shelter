class ShelterBurger {
  static id_menu = "nav_menu";
  static id_burger = "burger";

  static openOrClose() {
    const MENU = document.getElementById(this.id_menu);
    const BURGER = document.getElementById(this.id_burger);

    if (!MENU) {
      console.error(`Узел не найден: ${this.id_menu}`);
      return;
    }

    if (!BURGER) {
      console.error(`Узел не найден: ${this.id_burger}`);
      return;
    }

    const IS_OPENED = BURGER.getAttribute("data-is-menu-opened") == "true";

    if (IS_OPENED) {
      MENU.removeAttribute("data-is-menu-opened");
      BURGER.removeAttribute("data-is-menu-opened");
      return;
    }

    MENU.setAttribute("data-is-menu-opened", "true");
    BURGER.setAttribute("data-is-menu-opened", "true");
  }
}
