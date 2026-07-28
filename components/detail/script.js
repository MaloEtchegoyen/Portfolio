const templateFile = await fetch("./components/detail/template.html");
const template = await templateFile.text();
const templateImageFile = await fetch("./components/detail/templateImage.html");
const templateImage = await templateImageFile.text();
const templateSecteurFile = await fetch("./components/detail/templateSecteur.html");
const templateSecteur = await templateSecteurFile.text();
const templateInfoFile = await fetch("./components/detail/templateInfo.html");
const templateInfo = await templateInfoFile.text();

const uiTranslations = {
  fr: {
    btnUrl: "accéder au projet",
    errUrl: "Erreur : Paramètres d'URL incomplets (id ou type manquant)",
    errType: "Erreur : Type de projet inconnu",
    errProject: "Erreur : Projet introuvable"
  },
  en: {
    btnUrl: "view project",
    errUrl: "Error: Incomplete URL parameters (missing id or type)",
    errType: "Error: Unknown project type",
    errProject: "Error: Project not found"
  },
  es: {
    btnUrl: "ver proyecto",
    errUrl: "Error: Parámetros de URL incompletos (falta id o tipo)",
    errType: "Error: Tipo de proyecto desconocido",
    errProject: "Error: Proyecto no encontrado"
  }
};

let Detail = {};

Detail.format = function(data, currentLang) {
    const lang = document.documentElement.lang || 'fr';
    const ui = uiTranslations[lang] || uiTranslations.fr;

    let html = template;
    
    let buttonHTML = "";
    if (data.link && data.link.trim() !== "") { 
        buttonHTML = `<a class="detail__btn" href="${data.link}" target="_blank">${ui.btnUrl}</a>`;
    }

    html = html.replaceAll("{{title}}", data.title)
               .replaceAll("{{description}}", data.description)
               .replaceAll("{{type}}", data.type)
               .replaceAll("{{image}}", data.image)
               .replaceAll("{{buttonProject}}", buttonHTML);

    let htmlImg = "";
    for (let i=0; i< (data.images).length; i++){
        let li = templateImage;
        li = li.replaceAll("{{image}}", data.images[i]);
        htmlImg += li;
    }
    
    let htmlSec = "";
    for (let i=0; i< (data.secteurs).length; i++){
        let li = templateSecteur;
        li = li.replaceAll("{{secteur}}", data.secteurs[i]);
        htmlSec += li;
    }

    let htmlInfo = "";
    for (let i=0; i< (data.infos).length; i++){
        let li = templateInfo;
        li = li.replaceAll("{{info}}", data.infos[i]);
        htmlInfo += li;
    }

    html = html.replaceAll("{{images}}", htmlImg).replaceAll("{{secteur}}", htmlSec).replaceAll("{{info}}", htmlInfo);
    return html;
}

Detail.render = function(where, data, currentLang) {
    let node = document.querySelector(where);
    if (!node) return;

    const lang = document.documentElement.lang || 'fr';
    const ui = uiTranslations[lang] || uiTranslations.fr;

    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);
    const projectId = urlParams.get('id');
    const projectType = urlParams.get('type');

    if (!projectId || !projectType) {
        node.innerHTML = `<h1>${ui.errUrl}</h1>`;
        return;
    }

    const targetArray = data[projectType];

    if (!targetArray) {
        node.innerHTML = `<h1>${ui.errType}</h1>`;
        return;
    }

    const projectData = targetArray.find(projet => projet.id == parseInt(projectId));

    if (!projectData) {
        node.innerHTML = `<h1>${ui.errProject}</h1>`;
        return;
    }

    node.innerHTML = Detail.format(projectData, lang);
}

export { Detail };