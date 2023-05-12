export function makeLoginBoldOrNot() {
  // Clear
  document.querySelectorAll(".nav__li").forEach((link) => {
    link.classList.remove("nav__li--select");
  });

  const pageIndex = document.querySelector("#introduction");

  if (pageIndex == null) {
    // Add class
    document.querySelector("#nav__login").classList.add("nav__li--select");
  }
}
