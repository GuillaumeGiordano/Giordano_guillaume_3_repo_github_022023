
import { addErrorMessage, removeErrorMessage } from "./fonctions/dom.js";
import { validFileType } from "./image.js";


/**
 * Pick 1 picture to add
 * @returns 
 */
export function choosePictureProfil() {
    removeErrorMessage("#myModalProfil .js-profil");
    // Variables
    const imgSizeMax = 4000000 * 1;
    let imgSelect = document.querySelector("#profilChoose").files[0];
    let imgSize = imgSelect.size;

    // Condition N°1
    if (imgSize > imgSizeMax) {
        addErrorMessage("La photo est trop volumineuse!", "#myModalProfil .js-profil");
        templateLabelBtnProfil__Origin();
        return;
    };

    // Condition N°2
    if (!validFileType(imgSelect)) {
        addErrorMessage("La photo n'est pas au bon format !", "#myModalProfil .js-profil");
        templateLabelBtnProfil__Origin();
        return;
    };

    // Display picture !
    templateLabelBtnProfil__Select(imgSelect);
};


/**
 * Templates of label__Buttont's form (Pick Picture)
 */
function templateLabelBtnProfil__Origin() {
    document.querySelector("#profilView").src = "./assets/icons/image.png";
    document.querySelector("#profilView").classList.remove("addPicture__logo--full");
    document.querySelector("#profilView").classList.add("addPicture__logo--empty");
    document.querySelector("#profilForm .addPicture__btn").style = "display:null;";
    document.querySelector("#profilForm .contener__label p").style = "display:block;";
};
function templateLabelBtnProfil__Select(imageSelect) {
    document.querySelector("#profilView").src = URL.createObjectURL(imageSelect);
    document.querySelector("#profilView").classList.remove("addPicture__logo--empty");
    document.querySelector("#profilView").classList.add("addPicture__logo--full");
    document.querySelector("#profilForm .addPicture__btn").style = "display:none;";
    document.querySelector("#profilForm .contener__label p").style = "display:none;";
};