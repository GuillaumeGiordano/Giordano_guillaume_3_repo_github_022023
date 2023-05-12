import { addErrorMessage } from "./dom.js";

/**
 * Connexion avec API
 * @param {*} url
 * @param {*} options
 * @returns
 */
export async function fetchJSON(url, options = {}) {
  const headers = { Accept: "application/json", ...options.headers };
  const r = await fetch(url, { ...options, headers });
  if (r.ok) {
    return r.json();
  }
  addErrorMessage("Il y a une erreur sur le serveur !", "#portfolio");
  throw new Error("Il y a une erreur sur le serveur !");
}
