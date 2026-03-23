// MOBILE MENU
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const body = document.body;

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
    });
});

// HEADER SCROLL
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const scrollTopBtn = document.getElementById('scrollTopBtn');
let lastScroll = 0;

// Remove old scroll handlers - now using optimized version below

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
let autoSlideInterval;

function updateSlider() {
    const offset = -currentReview * 100;
    reviewsTrack.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentReview = currentReview < reviewCards.length - 1 ? currentReview + 1 : 0;
    updateSlider();
}

function prevSlide() {
    currentReview = currentReview > 0 ? currentReview - 1 : reviewCards.length - 1;
    updateSlider();
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Auto-slide reviews
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Pause on hover
reviewsTrack.addEventListener('mouseenter', stopAutoSlide);
reviewsTrack.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();

// PROMO TIMER
function updateTimer() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now
    endDate.setHours(23, 59, 59, 999); // End of day
    
    const now = new Date().getTime();
    const distance = endDate - now;
    
    if (distance < 0) {
        // Timer expired, reset to 7 days
        endDate.setDate(endDate.getDate() + 7);
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// BOOKING FORM
const bookingForm = document.getElementById('bookingForm');

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] === '8') value = '7' + value.slice(1);
            if (value[0] !== '7') value = '7' + value;
            
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.slice(1, 4);
            if (value.length >= 5) formatted += ') ' + value.slice(4, 7);
            if (value.length >= 8) formatted += '-' + value.slice(7, 9);
            if (value.length >= 10) formatted += '-' + value.slice(9, 11);
            
            e.target.value = formatted;
        }
    });
}

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
}

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        service: document.getElementById('service').value,
        master: document.getElementById('master').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.replace(/\D/g, ''),
        comment: document.getElementById('comment').value.trim()
    };
    
    // Validate form
    if (!formData.service || !formData.master || !formData.date || !formData.time || !formData.name || !formData.phone) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Validate phone number
    if (formData.phone.length !== 11 || !formData.phone.startsWith('7')) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Validate name (only letters and spaces)
    if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(formData.name)) {
        alert('Имя должно содержать только буквы');
        return;
    }
    
    console.log('Booking data:', formData);
    
    // Here you would send the data to your backend
    // Example: fetch('/api/booking', { method: 'POST', body: JSON.stringify(formData) })
    
    alert('Спасибо за запись! Мы свяжемся с вами в ближайшее время для подтверждения.');
    bookingForm.reset();
    
    // Reset date to tomorrow
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
    }
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

// SCROLL TO TOP BUTTON
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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


// YANDEX MAPS INTEGRATION
function initMap() {
    // Координаты центра Москвы (замените на свои координаты)
    const coordinates = [55.751244, 37.618423];
    
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API not loaded');
        return;
    }
    
    ymaps.ready(function () {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            console.warn('Map element not found');
            return;
        }
        
        const map = new ymaps.Map('map', {
            center: coordinates,
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        // Создаем метку с кастомным стилем
        const placemark = new ymaps.Placemark(coordinates, {
            balloonContentHeader: 'KittlyClaw',
            balloonContentBody: 'Студия маникюра и визажа премиум-класса<br>г. Москва, ул. Примерная, д. 10',
            balloonContentFooter: 'Пн-Вс: 10:00 - 22:00',
            hintContent: 'KittlyClaw - Студия красоты'
        }, {
            preset: 'islands#pinkDotIcon',
            iconColor: '#D4AF37'
        });
        
        map.geoObjects.add(placemark);
        
        // Отключаем скролл карты колесиком мыши
        map.behaviors.disable('scrollZoom');
    });
}

// Инициализация карты после загрузки API
if (typeof ymaps !== 'undefined') {
    initMap();
} else {
    // Если API еще не загружен, ждем события
    window.addEventListener('load', function() {
        if (typeof ymaps !== 'undefined') {
            initMap();
        }
    });
}


// TOUCH SWIPE FOR REVIEWS SLIDER
let touchStartX = 0;
let touchEndX = 0;

if (reviewsTrack) {
    reviewsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    reviewsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            currentReview = currentReview < reviewCards.length - 1 ? currentReview + 1 : 0;
        } else {
            // Swipe right - prev
            currentReview = currentReview > 0 ? currentReview - 1 : reviewCards.length - 1;
        }
        updateSlider();
        resetAutoSlide();
    }
}

// LAZY LOADING FOR IMAGES (if you add real images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.style.backgroundImage = `url(${img.dataset.src})`;
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// PREVENT ZOOM ON DOUBLE TAP (iOS)
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

// OPTIMIZE SCROLL PERFORMANCE
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll(lastScrollY);
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

function handleScroll(scrollY) {
    // Header scroll effect
    if (scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
    
    // Scroll to top button
    if (scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Active nav link
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
}

// DETECT MOBILE DEVICE
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Add mobile-specific class
    document.body.classList.add('mobile-device');
    
    // Optimize animations for mobile
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
}

// HANDLE ORIENTATION CHANGE
window.addEventListener('orientationchange', () => {
    // Recalculate slider position
    updateSlider();
    
    // Close mobile menu on orientation change
    if (nav.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
    }
});

// IMPROVE FORM VALIDATION ON MOBILE
if (isMobile) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            // Scroll back to top if keyboard was open
            window.scrollTo(0, 0);
        });
    });
}
