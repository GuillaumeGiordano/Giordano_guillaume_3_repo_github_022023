import { createElement } from "./dom.js";
import { setModal } from "./modal.js";


/**
 * Main Code
 */
export function setAdmin() {

    // MODIFIER POUR RAJOUTER UNE CLASSE POUR FAIRE CA !!!
    const tagLogin = document.querySelector("#nav__login");
    tagLogin.innerText = "logout";
    tagLogin.addEventListener("click", logout);

    addMenuEdit("body");
    addLinkModifier(
        "#introduction figure",
        {
            "href": "#myModalProfil",
            "class": "editLink editLink-profil"
        }
    );
    addLinkModifier(
        "#portfolio h2",
        {
            "href": "#myModalGallery",
            "class": "editLink editLink-projets"
        }
    );
};



/**
 * Event onClick for signOut and go to login.html
 */
export function logout() {
    localStorage.removeItem("SESSION");
    window.location.href = './index.html';
};


/**
 * Build all link "Modifier" for the black edit mode
 * @param {*} parent tagName of parent for new link
 * @param {*} liste list of attributes for new link
 */
const addLinkModifier = function (parent, liste = {}) {
    // Add button "MODIFIES" in parent tagName
    const contenerTitleWorks = document.querySelector(parent);

    // link
    const editWorksModifier = createElement("a", liste, " modifier");
    contenerTitleWorks.appendChild(editWorksModifier);

    // icon
    const editWorksIcon = createElement("i", {
        "class": "fa-regular fa-pen-to-square"
    });
    editWorksModifier.prepend(editWorksIcon);
};


/**
 * Creat black edit mode on the top screem
 * @param {*} parent Tag Name of parent for new link
 */
const addMenuEdit = function (parent) {
    // Add black edit mode
    const contenerParent = document.querySelector(parent);
    const editNav = createElement("div", {
        "class": "editNav"
    });
    contenerParent.prepend(editNav);

    // Tittle
    const editNavTitre = createElement("h3", {
        "class": "editNav__titre"
    },
        " Mode édition");
    editNav.appendChild(editNavTitre);

    // icon
    const editNavIcon = createElement("i", {
        "class": "fa-regular fa-pen-to-square"
    });
    editNavTitre.prepend(editNavIcon);

    // Button
    const editNavButton = createElement("Button", {
        "class": "editNav__button"
    },
        "publier les changements");
    editNav.appendChild(editNavButton);
};