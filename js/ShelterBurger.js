class ShelterBurger {
  static openOrClose() {
    const IS_OPENED =
      document.body.getAttribute("data-is-menu-opened") == "true";

    if (IS_OPENED) {
      document.body.removeAttribute("data-is-menu-opened");
      return;
    }

    document.body.setAttribute("data-is-menu-opened", "true");
  }
}
