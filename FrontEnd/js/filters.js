// Mes Imports (type="module")
import { renderWorks } from "./works.js";
import { createElement, addErrorMessage } from "./fonctions/dom.js";
import { fetchJSON } from "./fonctions/api.js";

export function renderFilters(liste) {

    // 1) I make the first button <ALL>
    const buttonAll = createElement("li", {
        "class": "filter__item filter__item--select",
        "id": "filterBtn_0",
        "data-id": 0
    },
        "Tous");
    // Parent's to my new elements
    const contenerFilter = document.querySelector(".filter");

    // i insert my new element to index.html
    contenerFilter.appendChild(buttonAll);
    // 2) i made all other filters from API
    liste.forEach(item => {
        const buttonsFilter = createElement("li", {
            "class": "filter__item",
            "id": "filterBtn_" + item.id,
            "data-id": item.id
        },
            item.name
        );
        contenerFilter.appendChild(buttonsFilter);
    });


    // onCllick
    const boutonsFilter = document.querySelectorAll(".filter__item");
    boutonsFilter.forEach(element => {
        element.addEventListener("click", async function () {

            const maListeWorks = await fetchJSON("http://localhost:5678/api/works");
            const categoryId = element.dataset.id;

            // take off class --select to all button
            boutonsFilter.forEach((button) => {
                button.classList.remove("filter__item--select");
            });

            // reinitialise page
            document.querySelector(".gallery").innerHTML = "";

            // Add class --select
            element.classList.add("filter__item--select");

            if (categoryId == 0) {
                return renderWorks(maListeWorks, ".gallery");
            }

            // const filterByObjets = maListeWorks.filter(function (objet) {
            //     return objet.category.id == categoryId;
            // });
            const filterByObjets = maListeWorks.filter(objet => objet.category.id == categoryId);

            renderWorks(filterByObjets, ".gallery");
        });
    });

};

