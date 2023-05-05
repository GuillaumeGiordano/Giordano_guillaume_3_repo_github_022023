import { renderWorks } from "./fonctions/works.js";
import { renderFilters } from "./fonctions/filters.js";
import { setAdmin } from "./fonctions/admin.js";
import { fetchJSON } from "./fonctions/api.js";
import { addErrorMessage } from "./fonctions/dom.js";
import { renderNav } from "./fonctions/navigation.js";
import { setModal } from "./fonctions/modal.js";

// Variable(s)
let token = localStorage.key("SESSION");
const maListeWorks = await fetchJSON("http://localhost:5678/api/works");
const maListeCategories = await fetchJSON("http://localhost:5678/api/categories");

// Main Code
try {
    renderNav();
    renderWorks(maListeWorks, ".gallery");

    if (token === "SESSION") {
        setAdmin();
        setModal();
    } else {
        renderFilters(maListeCategories);
    };

} catch (e) {
    addErrorMessage("Veuillez contacter le développeur s'il vous plaît, merci", "#portfolio");
    console.log(e);
};

