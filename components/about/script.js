const templateFile = await fetch("./components/about/template.html");
const template = await templateFile.text();
const templateSubjectFile = await fetch("./components/about/templateSubject.html");
const templateSubject = await templateSubjectFile.text();
const templateImageFile = await fetch("./components/about/templateImage.html");
const templateImage = await templateImageFile.text();

let about = {};

about.format = function(data){
    let html = template;

    const lang = document.documentElement.lang || 'fr';
    const currentData = data[lang] || data.fr;

    let htmlCard = "";

    for (let card of currentData.items){
        let li = templateSubject;
        li = li.replaceAll("{{id}}", card.id)
               .replaceAll("{{title}}", card.title);
        htmlCard += li;
    }

    let defaultItem = currentData.items[0];
    let htmlImg = "";
    if (defaultItem.images && defaultItem.images.length > 0) {
        for (let img of defaultItem.images) {
            let li = templateImage;
            li = li.replaceAll("{{image}}", img)
                   .replaceAll("{{imageTitle}}", img);
            htmlImg += li;
        }
    }
    
    html = html.replaceAll("{{title}}", defaultItem.title)
               .replaceAll("{{description}}", defaultItem.description)
               .replaceAll("{{subject}}", htmlCard)
               .replaceAll("{{linkname}}", defaultItem.linkname)
               .replaceAll("{{link}}", defaultItem.link)
               .replaceAll("{{images}}", htmlImg);
               
    return html;
}

about.render = function(where, data){
    let node = document.querySelector(where);
    if (!node) return;
    
    node.innerHTML = about.format(data);

    const containerToggle = node.querySelector('#containerToggle');
    const textToggle = node.querySelector('#textToggle');

    if (containerToggle && textToggle) {
        containerToggle.addEventListener('change', () => {
            if (containerToggle.checked) {
                textToggle.checked = false;
            }
        });

        textToggle.addEventListener('change', () => {
            if (textToggle.checked) {
                containerToggle.checked = false;
            }
        });
    }

    const items = node.querySelectorAll('.item');
    const descTitle = node.querySelector('.desc__title');
    const descText = node.querySelector('.desc__text');
    const descLinkname = node.querySelector('.desc__linkname');
    const descLink = node.querySelector('.desc__link');
    const descImages = node.querySelector('.desc__images');

    const lang = document.documentElement.lang || 'fr';
    const currentData = data[lang] || data.fr;

    let defaultItem = currentData.items[0];

    if (descLinkname && (!defaultItem.linkname || !defaultItem.link)) {
        descLinkname.style.display = "none";
    }
    if (descImages && (!defaultItem.images || defaultItem.images.length === 0)) {
        descImages.style.display = "none";
    }

    if (items.length > 0 && descTitle && descText) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                const itemId = parseInt(item.getAttribute('data-id'));
                
                const selectedData = currentData.items.find(i => i.id === itemId);

                if (selectedData) {
                    descTitle.textContent = selectedData.title;
                    descText.innerHTML = selectedData.description;
                    if (descLinkname) {
                        if (selectedData.linkname && selectedData.linkname !== "" && selectedData.link && selectedData.link !== "") {
                            descLinkname.innerHTML = selectedData.linkname;
                            descLinkname.href = selectedData.link;
                            descLinkname.setAttribute('aria-label', selectedData.linkname);
                            descLinkname.style.display = "";
            
                    } else {
                            descLinkname.textContent = "";
                            descLinkname.removeAttribute('href');
                            descLinkname.style.display = "none";
                        }
                    }
                }
                if (descImages) {
                    if (selectedData.images && selectedData.images.length > 0) {
                        descImages.innerHTML = "";
                        descImages.style.display = "flex";

                        selectedData.images.forEach(async (imgUrl) => {
                            const li = document.createElement('li');
                            li.classList.add('about__image');
                            
                            if (imgUrl.toLowerCase().endsWith('.svg')) {
                                const response = await fetch(imgUrl);
                                const svgData = await response.text();
                                li.innerHTML = svgData;
                            } else {
                                const img = document.createElement('img');
                                img.src = imgUrl;
                                img.alt = "";
                                li.appendChild(img);
                            }
                            
                            descImages.appendChild(li);
                        });
                    } else {
                        descImages.innerHTML = "";
                        descImages.style.display = "none";
                    }
                }
            });
        });
    }
}

export { about };

document.addEventListener('mousemove', (e) => {
    const yeux = document.querySelector('.center__eyes');
    const visage = document.querySelector('.center');
    
    if (!yeux || !visage) return;

    const rectVisage = visage.getBoundingClientRect();
    
    const centreX = rectVisage.left + rectVisage.width / 2;
    const centreY = rectVisage.top + rectVisage.height / 2;
    
    const angle = Math.atan2(e.clientY - centreY, e.clientX - centreX);
    
    const distanceMaxYeux = 6; 
    const distanceMaxTete = 3;
    
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    const deplacementXYeux = cosAngle * distanceMaxYeux;
    const deplacementYYeux = sinAngle * distanceMaxYeux;
    
    const deplacementXTete = cosAngle * distanceMaxTete;
    const deplacementYTete = sinAngle * distanceMaxTete;
    
    yeux.style.transform = `translate(${deplacementXYeux}px, ${deplacementYYeux}px)`;
    visage.style.transform = `translate(${deplacementXTete}px, ${deplacementYTete}px)`;
});