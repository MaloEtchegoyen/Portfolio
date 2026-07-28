let xp = 0, mouseX = 0;
let yp = 0, mouseY = 0;

const cursorFollower = document.querySelector(".cursorFollower");
const projects = document.querySelectorAll(".project");

let activeFloatingPreview = null; 

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  xp += (mouseX - xp) / 5;
  yp += (mouseY - yp) / 5;

  if (cursorFollower) {
    cursorFollower.style.left = xp + "px";
    cursorFollower.style.top = yp + "px";
  }

  if (activeFloatingPreview && activeFloatingPreview.classList.contains("is-visible")) {
    activeFloatingPreview.style.transform = `translate(${mouseX + 20}px, ${mouseY + 20}px)`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  
  document.addEventListener("mouseover", (e) => {
    const project = e.target.closest(".project");
    if (project) {
      const myFloatingPreview = project.querySelector(".project__menu-floating");
      if (myFloatingPreview) {
        myFloatingPreview.classList.add("is-visible");
        activeFloatingPreview = myFloatingPreview;
      }
    }
  });

  document.addEventListener("mouseout", (e) => {
    const project = e.target.closest(".project");
    if (project && !project.contains(e.relatedTarget)) {
      const myFloatingPreview = project.querySelector(".project__menu-floating");
      if (myFloatingPreview) {
        myFloatingPreview.classList.remove("is-visible");
        activeFloatingPreview = null;
      }
    }
  });
}

const video = document.getElementById('animVideo');
const preloader = document.getElementById('preloader');

if (preloader) {
    if (sessionStorage.getItem('animationJouee') === 'true') {
        document.body.classList.remove('no-scroll');
        document.body.classList.add('video-ended');
        preloader.remove();
    } else {
        if (video) {
            const anticipation = 1; 
            let transitionDeclenchee = false;
            const unlockSite = () => {
                if (transitionDeclenchee) return;
                transitionDeclenchee = true;
                
                preloader.style.opacity = '0';
                document.body.classList.remove('no-scroll');
                document.body.classList.add('video-ended');
                sessionStorage.setItem('animationJouee', 'true');
                
                setTimeout(() => {
                    preloader.remove();
                }, 400);
            };

            video.addEventListener('timeupdate', () => {
                if (video.duration > 0 && (video.duration - video.currentTime) <= anticipation) {
                    unlockSite();
                }
            });

            video.addEventListener('error', unlockSite);
            video.addEventListener('stalled', unlockSite);
            setTimeout(unlockSite, 5000); 

        } else {
            document.body.classList.remove('no-scroll');
            document.body.classList.add('video-ended');
            preloader.remove();
        }
    }
}

const themeToggle = document.getElementById('themeToggle');

const themeAnim = lottie.loadAnimation({
  container: document.getElementById('theme-icon-container'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'asset/light.json'
});

if (localStorage.getItem('theme') === 'light') {
  themeToggle.checked = true;
  
  themeAnim.addEventListener('DOMLoaded', () => {
    themeAnim.goToAndStop(themeAnim.totalFrames - 1, true);
  });
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    localStorage.setItem('theme', 'light');
    console.log("light");
    
    themeAnim.setDirection(1);
    themeAnim.play();
  } else {
    localStorage.setItem('theme', 'dark');
    console.log("dark");
    
    themeAnim.setDirection(-1);
    themeAnim.play();
  }
});