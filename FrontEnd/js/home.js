import { renderWorks } from "./works.js";
import { renderFilters } from "./filters.js";
import { setAdmin } from "./admin.js";
import { setLogin } from "./login.js";
import { fetchJSON } from "./fonctions/api.js";

// Variables GLOBAL
let SESSION = localStorage.key("SESSION");
const pageLogin = document.querySelector("#formLogin");
const pageIndex = document.querySelector("#portfolio");
const maListeWorks = await fetchJSON("http://localhost:5678/api/works");
const maListeCategories = await fetchJSON("http://localhost:5678/api/categories");

/**
 * PAGE INDEX
 */
if (pageIndex) {
    try {
        document.querySelector("#nav__index").setAttribute("style", "font-weight:800;");
        renderWorks(maListeWorks, ".gallery");

        if (SESSION === "SESSION") {
            setAdmin();
        } else {
            renderFilters(maListeCategories);
        };

    } catch (e) {
        alert("Veuillez contacter le développeur s'il vous plaît, merci")
        console.log(e);
    };
};

/**
 * PAGE LOGIN
 */
if (pageLogin) {
    try {
        document.querySelector("#nav__login").setAttribute("style", "font-weight:800;");
        setLogin();
    } catch (e) {
        alert("Veuillez contacter le développeur s'il vous plaît, merci")
        console.log(e);
    };
};

