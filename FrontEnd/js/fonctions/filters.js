import { renderWorks } from "./works.js";
import { createElement, addErrorMessage } from "./dom.js";
import { fetchJSON } from "./api.js";


export function renderFilters(list) {
    // CREAT First button <Tous>
    const allButton = createElement("li", {
        "class": "filter__item filter__item--select",
        "id": "filterBtn_0",
        "data-id": 0
    },
        "Tous");
    const parentOfNewsElements = document.querySelector(".filter");
    parentOfNewsElements.appendChild(allButton);

    // CREAT all other button from list
    list.forEach(item => {
        const filtersButtons = createElement("li", {
            "class": "filter__item",
            "id": "filterBtn_" + item.id,
            "data-id": item.id
        },
            item.name
        );
        parentOfNewsElements.appendChild(filtersButtons);
    });

    // ADD listener "filtersButtonsOnClick"
    document.querySelectorAll(".filter__item").forEach(element => {
        element.addEventListener("click", filtersButtonsOnClick);
    });
};


const filtersButtonsOnClick = async function () {
    // Variable(s)
    const categoryId = this.dataset.id;
    const maListeWorks = await fetchJSON("http://localhost:5678/api/works");

    // take off class --select to all button
    document.querySelectorAll(".filter__item").forEach((button) => {
        button.classList.remove("filter__item--select");
    });

    // reinitialise page
    document.querySelector(".gallery").innerHTML = "";

    // Add class --select
    this.classList.add("filter__item--select");

    if (categoryId == 0) {
        return renderWorks(maListeWorks, ".gallery");
    }

    // const filterByObjets = maListeWorks.filter(function (objet) {
    //     return objet.category.id == categoryId;
    // });
    const filterByObjets = maListeWorks.filter(objet => objet.category.id == categoryId);

    renderWorks(filterByObjets, ".gallery");
};
