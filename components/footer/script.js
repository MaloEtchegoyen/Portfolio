import template from "./template.html?raw";
import templateLi from "./templateLi.html?raw";




let Footer = {};

Footer.format = function(data){
    let html = template;

    html = html.replaceAll("{{link}}", data.link);

    let htmlLi = "";

    for (let social of data.socials){
        let li = templateLi;
        li = li.replaceAll("{{link}}", social.link).replaceAll("{{logo}}", social.logo).replaceAll("{{name}}", social.name);
        htmlLi += li;
    }

    html = html.replaceAll("{{social}}", htmlLi);
    return html;
}

Footer.render= function(where, data){
    let node = document.querySelector(where);
    node.innerHTML += Footer.format(data);
}

export { Footer };