import { addErrorMessage } from "./fonctions/dom.js";
import { makeLoginBoldOrNot } from "./fonctions/navigation.js";
import { setLogin } from "./fonctions/connexion.js";

try {
    makeLoginBoldOrNot();
    setLogin();

} catch (e) {
    addErrorMessage("Veuillez contacter le développeur s'il vous plaît, merci", "main");
    console.log(e);
};



