import { fetchJSON } from "./api.js";
import { createElement } from "./dom.js";
import {
  choosePicture,
  removePicture,
  addPicture,
  ifEmptyInputModalPicture,
  initFormModalPicture,
} from "./image.js";
import { choosePictureProfil } from "./profil.js";

// Variables
let modal = null;

const listSelectorFocus = "button, a, input, textarea";
let canFocus = [];
let previouslyFocusedElement = null;

const page1 = document.querySelector(".js-gallery");
const page2 = document.querySelector(".js-picture");

/**
 * MAIN CODE
 */
export async function setModal() {
  // Cnx to API
  const worksListe = await fetchJSON("http://localhost:5678/api/works");
  const categoriesListe = await fetchJSON(
    "http://localhost:5678/api/categories"
  );

  // Display Works and categories
  creatWorksElementsFrom(worksListe, ".modal__gallery");
  creatCategoriesElementFrom(categoriesListe);

  // ADD listener "Open modal"
  document.querySelectorAll(".editLink").forEach((a) => {
    a.addEventListener("click", openModal);
  });

  // Key touch
  window.addEventListener("keydown", function (e) {
    // Close modal with escape !
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e);
    }
    // Navigation on modal with the hey "tab"
    if (e.key === "Tab" && modal !== null) {
      focusInModal(e);
    }
  });
}

/**
 * Add works element for MODAL
 * @param {Array} liste tableau d'objet(s)
 * @param {tagName} parent tagName to the parent's contener
 */
export function creatWorksElementsFrom(liste, parent) {
  liste.forEach((element) => {
    const figureElement = createElement("figure", {
      id: element.id,
    });
    const linkTrash = createElement("a", {
      href: "#",
      class: "js_trashClick",
    });
    const iconTrash = createElement("i", {
      class: "fa-solid fa-trash-can trash--position",
      "data-id": element.id,
    });
    const imgElement = createElement("img", {
      src: element.imageUrl,
      alt: "image sur : " + element.title,
    });
    const linkElement = createElement(
      "a",
      {
        href: "#",
      },
      "Editer"
    );
    // parent
    const contenerWorks = document.querySelector(parent);
    // Je les inbrique et affiche
    contenerWorks.appendChild(figureElement);
    figureElement.appendChild(linkTrash);
    linkTrash.appendChild(iconTrash);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(linkElement);
  });
}

/**
 * add categories to select's imput for MODAL
 * @param {Array} liste tableau d'objet
 */
function creatCategoriesElementFrom(liste) {
  const selectContener = document.querySelector("#pictureCat");
  liste.forEach((item) => {
    const optionCat = createElement(
      "option",
      {
        value: item.id,
      },
      item.name
    );
    selectContener.appendChild(optionCat);
  });
}

/**
 * Open modal
 * @param {event} e
 */
const openModal = function (e) {
  e.preventDefault();
  // Select modal
  const modalName = e.target.getAttribute("href");
  modal = document.querySelector(modalName);
  // Pages
  page1.style.display = null;
  page2.style.display = "none";
  // List all selectors can be focus
  // renvoi normalement un node, Array.from permet de le transformer en tableau !
  canFocus = Array.from(modal.querySelectorAll(listSelectorFocus));
  previouslyFocusedElement = document.querySelector(":focus");

  // show modal selected
  modal.style.display = null;
  canFocus[2].focus();
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");

  // ADD listener N°1 "Close modal"
  modal.addEventListener("click", closeModal);
  // ADD listener N°2 "Close modal"
  modal.querySelectorAll(".js-myModal-close").forEach((e) => {
    e.addEventListener("click", closeModal);
  });
  // ADD listener N°3 - "stopPropagation"
  modal.querySelectorAll(".js-myModal-stop").forEach((e) => {
    e.addEventListener("click", stopPropagation);
  });

  if (modalName === "#myModalGallery") {
    // ADD listener N°4 - "openPicture"
    modal
      .querySelector("#myModalGallery .modal__btn--add")
      .addEventListener("click", openPicture);
    // ADD listener N°5 - "removePicture"
    addClickListenrerTrash();
    // ADD listener N°6 - "backGallery"
    modal
      .querySelector(".js-myModal-before")
      .addEventListener("click", backGallery);
    // ADD listener N°7 - "choosePicture"
    modal
      .querySelector("#pictureChoose")
      .addEventListener("change", choosePicture);
    // ADD listener N°8 - "ifEmptyInputModalPicture"
    const allImputForm = Array.from(modal.querySelectorAll(".js-control"));
    allImputForm.forEach((input) => {
      input.addEventListener("change", ifEmptyInputModalPicture);
    });
    // ADD listener N°9 - "addPicture"
    modal.querySelector("#pictureForm").addEventListener("submit", addPicture);
  }

  if (modalName === "#myModalProfil") {
    // ADD listener N°10 - "choosePictureProfil"
    modal
      .querySelector("#profilChoose")
      .addEventListener("change", choosePictureProfil);
  }
};

export function addClickListenrerTrash() {
  // Add listener on link trash
  modal.querySelectorAll(".js_trashClick").forEach((trash) => {
    trash.addEventListener("click", removePicture);
  });
}

/**
 * Close Modal
 * @param {event} e
 * @returns
 */
const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();

  const modalName = "#" + modal.getAttribute("id");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");

  // REMOVE listener N°1 "Close modal"
  modal.removeEventListener("click", closeModal);
  // REMOVE listener N°2 "Close modal"
  modal.querySelectorAll(".js-myModal-close").forEach((e) => {
    e.removeEventListener("click", closeModal);
  });
  // REMOVE listener N°3 "stopPropagation"
  modal
    .querySelector(".js-myModal-stop")
    .removeEventListener("click", stopPropagation);

  if (modalName === "#myModalGallery") {
    // REMOVE listener N°4 "openPicture"
    modal
      .querySelector("#myModalGallery .modal__btn--add")
      .removeEventListener("click", openPicture);
    // REMOVE listener N°5 "removePicture"
    modal.querySelectorAll(".js_trashClick").forEach((trash) => {
      trash.removeEventListener("click", removePicture);
    });
    // REMOVE listener N°6 "backGallery"
    modal
      .querySelector(".js-myModal-before")
      .removeEventListener("click", backGallery);
    // REMOVE listener N°7 "choosePicture"
    modal
      .querySelector("#pictureChoose")
      .addEventListener("change", choosePicture);
    // REMOVE listener N°8 "ifEmptyInputModalPicture"
    const allImputForm = Array.from(modal.querySelectorAll(".js-control"));
    allImputForm.forEach((input) => {
      input.removeEventListener("change", ifEmptyInputModalPicture);
    });
    // REMOVE listener N°9 "addPicture"
    modal
      .querySelector("#pictureForm")
      .removeEventListener("submit", addPicture);

    initFormModalPicture();
  }

  if (modalName === "#myModalProfil") {
    // REMOVE listener N°10 "choosePictureProfil"
    modal
      .querySelector("#profilChoose")
      .removeEventListener("change", choosePictureProfil);
  }

  modal = null;
};

/**
 * stopPropagation
 * @param {event} e
 */
const stopPropagation = function (e) {
  e.stopPropagation();
};

/**
 * keep focus when you leave modal
 * @param {event} e
 */
const focusInModal = function (e) {
  e.preventDefault();
  let index = canFocus.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftkey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= canFocus.length) {
    index = 0;
  }
  if (index < 0) {
    index = canFocus.length - 1;
  }
  canFocus[index].focus();
};

/**
 * Go to => pick picture
 * @param {event} e
 */
const openPicture = function (e) {
  e.preventDefault();
  // Change the page
  page1.style.display = "none";
  page2.style.display = null;
};

/**
 * Back to => edite's gallery
 */
export function backGallery() {
  page1.style.display = null;
  page2.style.display = "none";
  initFormModalPicture();
}
