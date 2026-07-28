const templateFile = await fetch("./components/video/template.html");
const template = await templateFile.text();
const templateVideoFile = await fetch("./components/video/templateVideo.html");
const templateVideo = await templateVideoFile.text();

let Video = {};

Video.format = function(data){
    let html = template;

    html = html.replaceAll("{{title}}", data.title);

    let htmlVideo = "";

    for (let project of data.items){
        let li = templateVideo;
        
        let typeForUrl = project.detailType || "video";
        let idForUrl = project.detailId || project.id;

        li = li.replaceAll("{{id}}", project.id)                
                .replaceAll("{{detailId}}", idForUrl)
                .replaceAll("{{detailType}}", typeForUrl)
                .replaceAll("{{title}}", project.title)
                .replaceAll("{{image}}", project.image);
        htmlVideo += li;
    }

    html = html.replaceAll("{{video}}", htmlVideo);
    return html;
}

Video.render= function(where, data){
    let node = document.querySelector(where);
    node.innerHTML += Video.format(data);
}

export { Video };