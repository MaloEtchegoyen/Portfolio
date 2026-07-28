document.addEventListener('mousemove', (e) => {
    const yeux = document.querySelector('.center__eyes');
    const visage = document.querySelector('.center');
    
    if (!yeux || !visage) return;

    const rectVisage = visage.getBoundingClientRect();
    
    const centreX = rectVisage.left + rectVisage.width / 2;
    const centreY = rectVisage.top + rectVisage.height / 2;
    
    const angle = Math.atan2(e.clientY - centreY, e.clientX - centreX);
    
    const distanceMaxYeux = 6; 
    const distanceMaxTete = 1;
    
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    const deplacementXYeux = cosAngle * distanceMaxYeux;
    const deplacementYYeux = sinAngle * distanceMaxYeux;
    
    const deplacementXTete = cosAngle * distanceMaxTete;
    const deplacementYTete = sinAngle * distanceMaxTete;
    
    yeux.style.transform = `translate(${deplacementXYeux}px, ${deplacementYYeux}px)`;
    visage.style.transform = `translate(${deplacementXTete}px, ${deplacementYTete}px)`;
});

document.addEventListener('DOMContentLoaded', () => {
    const containerToggle = document.getElementById('containerToggle');
    const textToggle = document.getElementById('textToggle');

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
});