import { createElement } from "./dom.js";

/**
 * Add works elements after fetch ON INDEX.HTML
 * @param {Array} liste object's array
 * @param {Tag} where tagName of parent's contener
 */
export async function renderWorks(liste, where) {
  liste.forEach((element) => {
    const figureElement = createElement("figure", {
      "data-id": element.id,
    });
    const imgElement = createElement("img", {
      src: element.imageUrl,
      alt: "image sur : " + element.title,
    });
    const captionElement = createElement("figcaption", {}, element.title);
    const parentOfNewsElements = document.querySelector(where);
    parentOfNewsElements.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(captionElement);
  });
}
