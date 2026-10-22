import template from "./template.html?raw";


let Hero = {};

Hero.format = function(data){
    let html = template;
    html = html.replaceAll("{{title}}", data.title);
    return html;
}

Hero.render= function(where, data){
    let node = document.querySelector(where);
    node.innerHTML += Hero.format(data);
}

export { Hero };