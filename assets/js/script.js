'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // Handle filter button clicks
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const filterItems = document.querySelectorAll('[data-filter-item]');
  const selectValue = document.querySelector('[data-select-value]');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.textContent;
      filterItems.forEach(item => {
        if (filter === 'All' || item.getAttribute('data-category') === filter) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update the select value to reflect the filter choice
      if (selectValue) {
        selectValue.textContent = filter;
      }
    });
  });

  // Handle select box clicks
  const selectItems = document.querySelectorAll('[data-select-item]');

  selectItems.forEach(selectItem => {
    selectItem.addEventListener('click', () => {
      const selectedCategory = selectItem.textContent;
      selectValue.textContent = selectedCategory;

      // Trigger the filter button click event programmatically
      filterButtons.forEach(button => {
        if (button.textContent === selectedCategory) {
          button.click();
        }
      });
    });
  });

});


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables - moved to enhanced section below



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Enhanced Features Implementation

// Scroll to Top Functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Floating Action Button - Quick Contact
const fab = document.getElementById('fab');

fab.addEventListener('click', () => {
  // Scroll to contact section
  const contactSection = document.querySelector('[data-page="contact"]');
  const navbarLink = document.querySelector('[data-nav-link]:nth-child(4)');

  // Trigger contact navigation
  navbarLink.click();

  // Smooth scroll to contact section
  contactSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Particle Background Animation
const particlesContainer = document.getElementById('particles-container');
let particles = [];

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random size between 2-6px
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';

  // Random position
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';

  // Random animation delay
  particle.style.animationDelay = Math.random() * 6 + 's';

  particlesContainer.appendChild(particle);
  particles.push(particle);

  // Remove particle after animation
  setTimeout(() => {
    particle.remove();
    particles = particles.filter(p => p !== particle);
  }, 6000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Counter Animation
const counters = document.querySelectorAll('.counter-number');

function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  const count = +counter.innerText;
  const increment = target / 200;

  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => animateCounter(counter), 10);
  } else {
    counter.innerText = target;
  }
}

// Click event for Counter Animation
const counterItems = document.querySelectorAll('.counter-item');

counterItems.forEach(item => {
  item.addEventListener('click', () => {
    const counter = item.querySelector('.counter-number');
    if (counter && counter.innerText === '0') {
      animateCounter(counter);
    }
  });
});

// Optional: Keep Intersection Observer for automatic animation on scroll
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter-number');
      counters.forEach(counter => {
        if (counter.innerText === '0') {
          animateCounter(counter);
        }
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const achievementSection = document.querySelector('.achievement-counters');
if (achievementSection) {
  counterObserver.observe(achievementSection);
}

// Scroll-triggered Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('loading');
    }
  });
}, observerOptions);

// Observe all major sections
const sections = document.querySelectorAll('article, .service-item, .testimonials-item, .project-item');
sections.forEach(section => {
  observer.observe(section);
});

// Enhanced Form Validation
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute('disabled');
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
    } else {
      formBtn.setAttribute('disabled', '');
      formBtn.innerHTML = '<ion-icon name="close-circle"></ion-icon><span>Please fill all fields</span>';
    }
  });
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Loading Animation on Page Load
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  // Add loading class to initial elements
  const initialElements = document.querySelectorAll('.sidebar, .navbar, article.active');
  initialElements.forEach(el => el.classList.add('loading'));
});
