// MOBILE MENU
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// HEADER SCROLL
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

// SERVICES TABS
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// PORTFOLIO FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// REVIEWS SLIDER
const reviewsTrack = document.querySelector('.reviews-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const reviewCards = document.querySelectorAll('.review-card');

let currentReview = 0;

function updateSlider() {
    const offset = -currentReview * 100;
    reviewsTrack.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    currentReview = currentReview > 0 ? currentReview - 1 : reviewCards.length - 1;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentReview = currentReview < reviewCards.length - 1 ? currentReview + 1 : 0;
    updateSlider();
});

// Auto-slide reviews
setInterval(() => {
    currentReview = currentReview < reviewCards.length - 1 ? currentReview + 1 : 0;
    updateSlider();
}, 5000);

// PROMO TIMER
function updateTimer() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now
    
    const now = new Date().getTime();
    const distance = endDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// BOOKING FORM
const bookingForm = document.getElementById('bookingForm');

// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        service: document.getElementById('service').value,
        master: document.getElementById('master').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        comment: document.getElementById('comment').value
    };
    
    console.log('Booking data:', formData);
    
    // Here you would send the data to your backend
    alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время для подтверждения.');
    bookingForm.reset();
});

// SMOOTH SCROLL
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

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.advantage-card, .service-card, .master-card, .portfolio-item, .promo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
