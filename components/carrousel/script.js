const templateFile = await fetch("./components/carrousel/template.html");
const template = await templateFile.text();
const templateCardFile = await fetch("./components/carrousel/templateCard.html");
const templateCard = await templateCardFile.text();

let Cards = {};

Cards.format = function(data){
    let html = template;

    html = html.replaceAll("{{title}}", data.title).replaceAll("{{button}}", data.button);

    let htmlCard = "";
    let total = 0;
    for (let card of data.items){
        let typeForUrl = card.detailType || "graphic";
        let idForUrl = card.detailId || card.id;
        if(card.id < 7){
            let li = templateCard;
            li = li.replaceAll("{{id}}", card.id)
                    .replaceAll("{{detailId}}", idForUrl)
                    .replaceAll("{{detailType}}", typeForUrl)
                   .replaceAll("{{image}}", card.image)
                   .replaceAll("{{link}}", card.link)
                   .replaceAll("{{title}}", card.title);
            htmlCard += li;
            total += 1;
        }
    }

    html = html.replaceAll("{{total}}", total);
    html = html.replaceAll("{{projects}}", htmlCard);
    return html;
}

Cards.render = function(where, data){
    let node = document.querySelector(where);
    if (!node) return;

    node.innerHTML = Cards.format(data);
}

export { Cards };