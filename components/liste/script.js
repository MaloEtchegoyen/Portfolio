const templateFile = await fetch("./components/liste/template.html");
const template = await templateFile.text();
const templateLiFile = await fetch("./components/liste/templateLi.html");
const templateLi = await templateLiFile.text();

let LI = {};

LI.format = function(data){
    let html = template;

    let typeForUrl = data.detailType || "web";
    let idForUrl = data.detailId || data.id;

    html = html.replaceAll("{{title}}", data.title);

    let htmlLi = "";
    let total = 0;

for (let project of data.items){
        let li = templateLi;

        let typeForUrl = project.detailType || "graphic";
        let idForUrl = project.detailId || project.id;

        li = li.replaceAll("{{id}}", project.id)
                .replaceAll("{{detailId}}", idForUrl)
                .replaceAll("{{detailType}}", typeForUrl)
                .replaceAll("{{title}}", project.title)
                .replaceAll("{{description}}", project.description)
                .replaceAll("{{type}}", project.type)
                .replaceAll("{{image}}", project.image);
        htmlLi += li;
    }

    html = html.replaceAll("{{Li}}", htmlLi);
    return html;
}

LI.render= function(where, data){
    let node = document.querySelector(where);
    node.innerHTML += LI.format(data);
}

export { LI };