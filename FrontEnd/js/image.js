
import { backGallery, creatWorksElementsFrom, addClickListenrerTrash } from "./modal.js";
import { renderWorks } from "./works.js";
import { addErrorMessage, removeErrorMessage } from "./fonctions/dom.js";

/**
 * Pick 1 picture to add
 * @returns 
 */
export function choosePicture() {
    removeErrorMessage("#myModalGallery .js-picture");
    // Variables
    const imgSizeMax = 4000000 * 1;
    let imgSelect = document.querySelector("#pictureChoose").files[0];
    let imgSize = imgSelect.size;

    // Condition N°1
    if (imgSize > imgSizeMax) {
        addErrorMessage("La photo est trop volumineuse!", "#myModalGallery .js-picture");
        templateLabelBtn__Origin();
        return;
    };

    // Condition N°2
    if (!validFileType(imgSelect)) {
        addErrorMessage("La photo n'est pas au bon format !", "#myModalGallery .js-picture");
        templateLabelBtn__Origin();
        return;
    };

    // Display picture !
    templateLabelBtn__Select(imgSelect);
};


/**
 * Remove picture with fetch
 * @param {*} e 
 * @returns 
 */
export async function removePicture(e) {
    e.preventDefault();

    // Variables
    const pictureToDelete = e.target.parentElement.parentElement;
    const idDelete = e.target.getAttribute("data-id");
    const pictureOnIndex = document.querySelector(`figure[data-id="${idDelete}"]`)
    const token = localStorage.getItem("SESSION");

    // Request to API
    const cnx = await fetch('http://localhost:5678/api/works/' + idDelete, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // Condition N°1 authorisation || token to old !!!
    const r = cnx.status;
    if (r === 401) {
        console.log("Vous n'êtes pas autorisé(e) ou token trop vieux");
        return;
    };

    // Connection OK => Next
    if (cnx.ok) {
        pictureToDelete.remove();
        pictureOnIndex.remove();
    };

};


/**
 * Add picture with fetch
 */
export async function addPicture(event) {
    event.preventDefault();

    // Variables
    const myProjet = [];
    const formData = new FormData(event.target);
    const token = localStorage.getItem("SESSION");

    // Connect to API
    const cnx = await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // Controls connection / i delete token if he is to old !!!
    const r = cnx.status;
    if (r === 401) {
        addErrorMessage("Vous n'êtes pas autorisé(e) ou token trop vieux !", "#myModalGallery .js-picture");
        return;
    };

    // Connection OK => Next
    if (cnx.ok) {
        const resultat = await cnx.json();
        myProjet.push(resultat);
        backGallery();
        creatWorksElementsFrom(myProjet, ".modal__gallery");
        renderWorks(myProjet, ".gallery");
        addClickListenrerTrash();
    };
};


/**
 * use for unlock or lock the button
 * @returns 
 */
export const ifEmptyInputModalPicture = function () {

    // Variables
    let file = document.querySelector("#pictureChoose").files[0];
    let filePicture = document.querySelector("#pictureChoose").files.length;
    let nameProjet = document.querySelector("#pictureTitre").value;
    let valueCategorie = document.querySelector("#pictureCat").value;

    // Condition N°1
    if (filePicture == 0) {
        templateSubmit__Origin();
        return;
    };
    // Condition N°2
    if (file) {
        console.log(validFileType(file));
        if (!validFileType(file)) {
            templateSubmit__Origin();
            return;
        };
    };
    // Condition N°3
    if (nameProjet === "") {
        templateSubmit__Origin();
        return;
    };
    // Condition N°4
    if (valueCategorie === "" || valueCategorie < 1) {
        templateSubmit__Origin();
        return;
    };

    templateSubmit__Valid();
};


/**
 * If Valid file ?
 * @param {file} file 
 * @returns 
 */
export const validFileType = function (file) {
    //Variable
    const fileTypes = [
        'image/jpeg',
        'image/png'
    ];
    // Condition N°1
    for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        };
    };
    return false;
};


/**
 * INIT FORM modal Picture
 */
export function initFormModalPicture() {
    // Form
    document.querySelector(".js-picture form").reset();
    // Image
    templateLabelBtn__Origin();
    // button "Valide"
    templateSubmit__Origin();
};


/**
 * Templates of Submit's form (Add Picture)
 */
export function templateSubmit__Origin() {
    document.querySelector("#pictureSubmit").classList.add("modal__btn--noComplet")
    document.querySelector("#pictureSubmit").setAttribute("disabled", "");
};
export function templateSubmit__Valid() {
    document.querySelector("#pictureSubmit").classList.remove("modal__btn--noComplet")
    document.querySelector("#pictureSubmit").removeAttribute("disabled");
};


/**
 * Templates of label__Buttont's form (Pick Picture)
 */
export function templateLabelBtn__Origin() {
    document.querySelector("#pictureView").src = "./assets/icons/image.png";
    document.querySelector("#pictureView").classList.remove("addPicture__logo--full");
    document.querySelector("#pictureView").classList.add("addPicture__logo--empty");
    document.querySelector("#pictureForm .addPicture__btn").style = "display:null;";
    document.querySelector("#pictureForm .contener__label p").style = "display:block;";
};
export function templateLabelBtn__Select(imageSelect) {
    document.querySelector("#pictureView").src = URL.createObjectURL(imageSelect);
    document.querySelector("#pictureView").classList.remove("addPicture__logo--empty");
    document.querySelector("#pictureView").classList.add("addPicture__logo--full");
    document.querySelector("#pictureForm .addPicture__btn").style = "display:none;";
    document.querySelector("#pictureForm .contener__label p").style = "display:none;";
};