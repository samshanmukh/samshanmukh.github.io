// Select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
	if(!showMenu) {
		menuBtn.classList.add('close');
		menu.classList.add('show');
		menuNav.classList.add('show');
		menuBranding.classList.add('show');
		navItems.forEach(item => item.classList.add('show'));
		
		// Show Menu State
		showMenu = true;
	} else {
		menuBtn.classList.remove('close');
		menu.classList.remove('show');
		menuNav.classList.remove('show');
		menuBranding.classList.remove('show');
		navItems.forEach(item => item.classList.remove('show'));

		// Show Menu State
		showMenu = false;
	}
}

// Typing Animation
const typeSpan = document.querySelector('.typewriter');
if (typeSpan) {
    const words = ["Web Developer", "Designer", "Machine Learning", "Deep Learning"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 200;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typeSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            typeSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 200;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    document.addEventListener('DOMContentLoaded', type);
}

// Scroll Reveal using Intersection Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Keep it active once it has been revealed if you prefer
            // entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// Mouse Cursor Trail Effect
const coords = { x: 0, y: 0 };
const circles = [];

const colors = [
  "#58a6ff",
  "#4d96e8",
  "#4286d1",
  "#3776ba",
  "#2c66a3",
  "#21568c",
  "#164675",
  "#0b365e",
  "#002647"
];

// Create circles
for (let i = 0; i < 20; i++) {
  const div = document.createElement("div");
  div.className = "cursor-circle";
  div.x = 0;
  div.y = 0;
  document.body.appendChild(div);
  circles.push(div);
}

window.addEventListener("mousemove", function(e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;

    circle.style.backgroundColor = colors[index % colors.length];
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
