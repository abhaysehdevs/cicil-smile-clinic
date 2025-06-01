// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Google Maps Integration
function initMap() {
    try {
        // Map styling
        const mapStyle = [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#c9c9c9"}]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#9e9e9e"}]
            }
        ];

        // Map options
        const mapOptions = {
            zoom: 15,
            styles: mapStyle,
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: false,
            gestureHandling: 'cooperative'
        };

        // Dayal Bagh Colony location (updated coordinates)
        const dayalBaghLocation = { lat: 28.494073492387066, lng: 77.29426049124014 };
        initializeLocationMap('map1', 
            dayalBaghLocation, 
            'Dr. Cicil\'s Smile Clinic - Dayal Bagh Colony\nBlock GC, Dayal Bagh Colony, Faridabad, Haryana 121009', 
            mapOptions
        );
        initializeLocationMap('booking-map1', 
            dayalBaghLocation, 
            'Dr. Cicil\'s Smile Clinic - Dayal Bagh Colony\nBlock GC, Dayal Bagh Colony, Faridabad, Haryana 121009', 
            mapOptions
        );

        // Sector 45 location (updated coordinates)
        const sector45Location = { lat: 28.448714489186305, lng: 77.30084180964572 };
        initializeLocationMap('map2', 
            sector45Location, 
            'Dr. Cicil\'s Smile Clinic - Sector 45\nHouse No. 199, Sector 45, Faridabad, Haryana 121010', 
            mapOptions
        );
        initializeLocationMap('booking-map2', 
            sector45Location, 
            'Dr. Cicil\'s Smile Clinic - Sector 45\nHouse No. 199, Sector 45, Faridabad, Haryana 121010', 
            mapOptions
        );

    } catch (error) {
        console.error('Error initializing maps:', error);
        handleMapError();
    }
}

function initializeLocationMap(elementId, position, title, options) {
    try {
        const mapElement = document.getElementById(elementId);
        if (!mapElement) {
            console.error(`Map element with id '${elementId}' not found`);
            return;
        }

        // Create map instance
        const map = new google.maps.Map(mapElement, {
            ...options,
            center: position
        });

        // Add marker with custom icon
        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        });

        // Add info window with formatted content
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>${title.split('\n')[0]}</h3>
                    <p>${title.split('\n')[1]}</p>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}" 
                       target="_blank" class="directions-link">
                        Get Directions
                    </a>
                </div>
            `
        });

        // Add click event to marker
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        // Add resize listener to maintain map center
        google.maps.event.addDomListener(window, 'resize', () => {
            const center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });

    } catch (error) {
        console.error(`Error initializing map for ${elementId}:`, error);
        handleMapError();
    }
}

// Add styles for map error message
const style = document.createElement('style');
style.textContent = `
    .map-error {
        padding: 20px;
        text-align: center;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 5px;
        color: #dc3545;
    }
    .map-info-window {
        padding: 10px;
    }
    .map-info-window h3 {
        margin: 0;
        color: var(--primary-color);
        font-size: 1rem;
    }
`;
document.head.appendChild(style);

// Appointment Form Handling
// Removed duplicate event listener to consolidate form submission handling

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const contactData = Object.fromEntries(formData.entries());
    
    // Validate form data
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    this.reset();
});

// Form Validation Functions
function validateAppointmentForm(data) {
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.location || !data.date || !data.time || !data.service) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    // Phone validation
    if (!isValidPhone(data.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return false;
    }
    
    // Date validation
    if (!isValidDate(data.date)) {
        showNotification('Please select a valid date.', 'error');
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    return true;
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate >= today;
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'black';
    }
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize Google Maps when the page loads
window.addEventListener('load', initMap);

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.service-card, .testimonial, .location-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Booking System
class BookingSystem {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.selectedDate = null;
        this.selectedTime = null;
        
        this.initializeBookingSystem();
    }

    initializeBookingSystem() {
        // Initialize navigation buttons
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');
        this.submitButton = document.querySelector('.submit-button');
        
        // Add event listeners
        this.prevButton.addEventListener('click', () => this.navigateStep('prev'));
        this.nextButton.addEventListener('click', () => this.navigateStep('next'));
        
        // Initialize calendar
        this.initializeCalendar();
        
        // Initialize time slots
        this.initializeTimeSlots();
        
        // Initialize location maps
        this.initializeLocationMaps();
    }

    navigateStep(direction) {
        if (direction === 'next' && this.currentStep < this.totalSteps) {
            if (this.validateCurrentStep()) {
                this.currentStep++;
                this.updateStep();
            }
        } else if (direction === 'prev' && this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return document.querySelector('input[name="service"]:checked') !== null;
            case 2:
                return document.querySelector('input[name="location"]:checked') !== null;
            case 3:
                return this.selectedDate !== null && this.selectedTime !== null;
            default:
                return true;
        }
    }

    updateStep() {
        // Update progress bar
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            if (stepNum === this.currentStep) {
                step.classList.add('active');
            } else if (stepNum < this.currentStep) {
                step.classList.add('completed');
            }
        });

        // Show/hide steps
        document.querySelectorAll('.booking-step').forEach(step => {
            step.style.display = parseInt(step.dataset.step) === this.currentStep ? 'block' : 'none';
        });

        // Update navigation buttons
        this.prevButton.style.display = this.currentStep > 1 ? 'block' : 'none';
        this.nextButton.style.display = this.currentStep < this.totalSteps ? 'block' : 'none';
        this.submitButton.style.display = this.currentStep === this.totalSteps ? 'block' : 'none';
    }

    initializeCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthElement = document.getElementById('currentMonth');
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');
        
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        const updateCalendar = () => {
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const startingDay = firstDay.getDay();
            const totalDays = lastDay.getDate();

            currentMonthElement.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
            
            calendarGrid.innerHTML = '';
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });

            // Add empty cells for days before the first day of the month
            for (let i = 0; i < startingDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day empty';
                calendarGrid.appendChild(emptyDay);
            }

            // Add days of the month
            for (let day = 1; day <= totalDays; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const date = new Date(currentYear, currentMonth, day);
                if (date < new Date().setHours(0, 0, 0, 0)) {
                    dayElement.classList.add('disabled');
                } else {
                    dayElement.addEventListener('click', () => this.selectDate(date));
                }
                
                calendarGrid.appendChild(dayElement);
            }
        };

        prevMonthButton.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });

        nextMonthButton.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });

        updateCalendar();
    }

    selectDate(date) {
        this.selectedDate = date;
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.classList.remove('selected');
            if (day.textContent === date.getDate().toString()) {
                day.classList.add('selected');
            }
        });
        this.updateTimeSlots();
    }

    initializeTimeSlots() {
        const timeSlots = [
            '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
            '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
        ];

        const timeGrid = document.getElementById('timeSlots');
        timeGrid.innerHTML = '';

        timeSlots.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            timeSlot.addEventListener('click', () => this.selectTime(time));
            timeGrid.appendChild(timeSlot);
        });
    }

    selectTime(time) {
        this.selectedTime = time;
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
            if (slot.textContent === time) {
                slot.classList.add('selected');
            }
        });
    }

    updateTimeSlots() {
        // Here you would typically make an API call to check availability
        // For now, we'll just simulate some unavailable slots
        const unavailableSlots = Math.floor(Math.random() * 3);
        document.querySelectorAll('.time-slot').forEach((slot, index) => {
            slot.classList.remove('disabled');
            if (index < unavailableSlots) {
                slot.classList.add('disabled');
            }
        });
    }

    initializeLocationMaps() {
        // Initialize maps for booking section
        const dayalBagh = { lat: 28.4089, lng: 77.3178 };
        const sector45 = { lat: 28.3959, lng: 77.3178 };

        const map1 = new google.maps.Map(document.getElementById('booking-map1'), {
            zoom: 15,
            center: dayalBagh
        });
        new google.maps.Marker({
            position: dayalBagh,
            map: map1,
            title: 'Dr. Cicil\'s Smile Clinic - Dayal Bagh Colony'
        });

        const map2 = new google.maps.Map(document.getElementById('booking-map2'), {
            zoom: 15,
            center: sector45
        });
        new google.maps.Marker({
            position: sector45,
            map: map2,
            title: 'Dr. Cicil\'s Smile Clinic - Sector 45'
        });
    }
}

// Initialize booking system when the page loads
let bookingSystem = null;
window.addEventListener('load', () => {
    bookingSystem = new BookingSystem();
});

// About Section Animations and Interactions
class AboutSection {
    constructor() {
        this.initializeAnimations();
        this.initializeInteractions();
    }

    initializeAnimations() {
        // Initialize AOS (Animate On Scroll)
        this.initializeAOS();
        
        // Add hover effects for expertise cards
        this.initializeExpertiseCards();
        
        // Add counter animation for achievements
        this.initializeAchievementCounters();
    }

    initializeAOS() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    }

    initializeExpertiseCards() {
        const expertiseCards = document.querySelectorAll('.expertise-card');
        
        expertiseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow)';
            });
        });
    }

    initializeAchievementCounters() {
        const achievementNumbers = document.querySelectorAll('.achievement-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        achievementNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        let current = 0;
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    initializeInteractions() {
        // Add smooth scroll for timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        });

        // Add hover effect for credential items
        const credentialItems = document.querySelectorAll('.credential-item');
        
        credentialItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize About Section when the page loads
window.addEventListener('load', () => {
    const aboutSection = new AboutSection();
});

// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.sliderNav = document.querySelector('.slider-navigation');
        this.sliderDots = document.querySelector('.slider-dots');
        
        this.initializeSlider();
    }

    initializeSlider() {
        // Create dots
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.sliderDots.appendChild(dot);
        });

        // Add navigation events
        document.querySelector('.prev-slide').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-slide').addEventListener('click', () => this.nextSlide());

        // Start auto-slide
        this.startAutoSlide();
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.sliderDots.children[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.sliderDots.children[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slideCount;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.goToSlide(prev);
    }

    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000);
    }
}

// Doctor Image Gallery
class DoctorGallery {
    constructor() {
        this.mainImage = document.querySelector('.main-image img');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        
        this.initializeGallery();
    }

    initializeGallery() {
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const newSrc = thumbnail.src;
                const currentSrc = this.mainImage.src;
                
                // Animate the transition
                this.mainImage.style.opacity = '0';
                setTimeout(() => {
                    this.mainImage.src = newSrc;
                    this.mainImage.style.opacity = '1';
                }, 300);
                
                thumbnail.src = currentSrc;
            });
        });
    }
}

// Gallery Section
class Gallery {
    constructor() {
        this.items = document.querySelectorAll('.gallery-item');
        this.initializeGallery();
    }

    initializeGallery() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox(item);
            });
        });
    }

    openLightbox(item) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const content = `
            <div class="lightbox-content">
                <button class="close-lightbox">&times;</button>
                <img src="${item.querySelector('img').src}" alt="${item.querySelector('img').alt}">
                <div class="lightbox-caption">
                    <h3>${item.querySelector('.gallery-overlay h3').textContent}</h3>
                    <p>${item.querySelector('.gallery-overlay p').textContent}</p>
                </div>
            </div>
        `;
        
        lightbox.innerHTML = content;
        document.body.appendChild(lightbox);
        
        // Add close functionality
        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.remove();
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    }
}

// Initialize all components when the page loads
window.addEventListener('load', () => {
    const heroSlider = new HeroSlider();
    const doctorGallery = new DoctorGallery();
    const gallery = new Gallery();
});

// Services Section Interactivity
class ServicesSection {
    constructor() {
        this.initializeServices();
    }

    initializeServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const learnMoreBtn = card.querySelector('.learn-more-btn');
            const details = card.querySelector('.service-details');
            
            // Add click event for the entire card
            card.addEventListener('click', (e) => {
                // Prevent triggering when clicking the button
                if (e.target.classList.contains('learn-more-btn')) {
                    return;
                }
                
                this.toggleCardDetails(card);
            });
            
            // Add click event for the learn more button
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card click event
                    this.handleLearnMoreClick(card);
                });
            }
            
            // Add hover effect for smooth animation
            card.addEventListener('mouseenter', () => {
                this.startIconAnimation(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.stopIconAnimation(card);
            });
        });
    }

    toggleCardDetails(card) {
        const details = card.querySelector('.service-details');
        const isExpanded = details.style.maxHeight !== '0px';
        
        // Toggle the current card
        if (isExpanded) {
            details.style.maxHeight = '0px';
            details.style.opacity = '0';
            card.classList.remove('expanded');
        } else {
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.opacity = '1';
            card.classList.add('expanded');
        }
    }

    handleLearnMoreClick(card) {
        const service = card.querySelector('h3').textContent;
        const details = card.querySelector('.service-details');
        
        // Create a modal with service details
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        
        const modalContent = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${service}</h3>
                <div class="modal-body">
                    ${details.innerHTML}
                    <div class="modal-cta">
                        <a href="#appointment" class="book-appointment-btn">Book Appointment</a>
                    </div>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .service-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                position: relative;
                transform: translateY(20px);
                transition: transform 0.3s ease;
            }
            
            .close-modal {
                position: absolute;
                top: 1rem;
                right: 1rem;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            
            .modal-body {
                margin-top: 1rem;
            }
            
            .modal-cta {
                margin-top: 2rem;
                text-align: center;
            }
            
            .book-appointment-btn {
                display: inline-block;
                padding: 1rem 2rem;
                background: var(--primary-color);
                color: white;
                text-decoration: none;
                border-radius: 25px;
                transition: all 0.3s ease;
            }
            
            .book-appointment-btn:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
        
        // Animate modal entrance
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        });
        
        // Add close functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        };
        
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Add smooth scroll for appointment button
        modal.querySelector('.book-appointment-btn').addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            document.querySelector('#appointment').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    startIconAnimation(card) {
        const icon = card.querySelector('i');
        icon.style.animation = 'pulseIcon 1s infinite';
    }

    stopIconAnimation(card) {
        const icon = card.querySelector('i');
        icon.style.animation = 'none';
    }
}

// Initialize services section when the page loads
window.addEventListener('load', () => {
    const servicesSection = new ServicesSection();
});

// Virtual Assistant
class VirtualAssistant {
    constructor() {
        this.chatIcon = document.getElementById('chatIcon');
        this.chatPopup = document.getElementById('chatPopup');
        this.closeChat = document.getElementById('closeChat');
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendMessage = document.getElementById('sendMessage');
        
        this.initializeChat();
    }

    initializeChat() {
        // Toggle chat on icon click
        this.chatIcon.addEventListener('click', () => {
            this.toggleChat();
            this.removeNotification();
        });

        // Close chat
        this.closeChat.addEventListener('click', () => {
            this.toggleChat(false);
        });

        // Send message on button click
        this.sendMessage.addEventListener('click', () => {
            this.handleUserMessage();
        });

        // Send message on Enter key
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });

        // Handle quick reply buttons
        document.querySelectorAll('.quick-reply-btn').forEach(button => {
            button.addEventListener('click', () => {
                const query = button.dataset.query;
                this.addUserMessage(button.textContent);
                this.handleQuery(query);
            });
        });

        // Show initial notification after 2 seconds
        setTimeout(() => {
            this.showNotification();
        }, 2000);
    }

    toggleChat(show = true) {
        if (show) {
            this.chatPopup.style.display = 'flex';
            setTimeout(() => {
                this.chatPopup.classList.add('active');
            }, 10);
        } else {
            this.chatPopup.classList.remove('active');
            setTimeout(() => {
                this.chatPopup.style.display = 'none';
            }, 300);
        }
    }

    showNotification() {
        const dot = document.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'block';
        }
    }

    removeNotification() {
        const dot = document.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'none';
        }
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addAssistantMessage(message, includeQuickReplies = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant';
        
        let content = `
            <div class="message-content">
                <p>${message}</p>
        `;
        
        if (includeQuickReplies) {
            content += `
                <div class="quick-replies">
                    <button class="quick-reply-btn" data-query="book appointment">Book Appointment</button>
                    <button class="quick-reply-btn" data-query="services">Our Services</button>
                    <button class="quick-reply-btn" data-query="location">Clinic Locations</button>
                    <button class="quick-reply-btn" data-query="working hours">Working Hours</button>
                </div>
            `;
        }
        
        content += `</div>`;
        messageDiv.innerHTML = content;
        
        // Add event listeners to new quick reply buttons
        if (includeQuickReplies) {
            messageDiv.querySelectorAll('.quick-reply-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const query = button.dataset.query;
                    this.addUserMessage(button.textContent);
                    this.handleQuery(query);
                });
            });
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        return typingDiv;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    handleUserMessage() {
        const message = this.userInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.userInput.value = '';
            this.handleQuery(message.toLowerCase());
        }
    }

    async handleQuery(query) {
        const typingIndicator = this.showTypingIndicator();
        
        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        typingIndicator.remove();
        
        if (query.includes('appointment') || query.includes('book')) {
            this.addAssistantMessage("I'll help you book an appointment. You can either:", true);
            this.addAssistantMessage("1. Click the 'Book Appointment' button above to use our online booking system\n2. Call us at +91 XXXXXXXXXX\n3. Visit one of our clinics during working hours");
        }
        else if (query.includes('services')) {
            this.addAssistantMessage("We offer a wide range of dental services, including:", true);
            this.addAssistantMessage("• Teeth Cleaning & Checkup\n• Root Canal Treatment\n• Dental Implants\n• Braces & Aligners\n• Smile Design\n• And more!\n\nWould you like to know more about any specific service?");
        }
        else if (query.includes('location')) {
            this.addAssistantMessage("We have two convenient locations in Faridabad:", true);
            this.addAssistantMessage("1. Dayal Bagh Colony\nBlock GC, Dayal Bagh Colony, Faridabad, Haryana 121009\n\n2. Sector 45\nHouse No. 199, Sector 45, Faridabad, Haryana 121010\n\nBoth clinics are equipped with modern facilities and experienced staff.");
        }
        else if (query.includes('working') || query.includes('hours') || query.includes('timing')) {
            this.addAssistantMessage("Our clinic working hours are:", true);
            this.addAssistantMessage("Monday to Saturday: 9:00 AM - 7:00 PM\nSunday: Closed\n\nWould you like to book an appointment?");
        }
        else if (query.includes('emergency')) {
            this.addAssistantMessage("For dental emergencies:", true);
            this.addAssistantMessage("1. Call us immediately at +91 XXXXXXXXXX\n2. WhatsApp us using the button below\n3. Visit our nearest clinic\n\nWe prioritize emergency cases and will attend to you as quickly as possible.");
        }
        else if (query.includes('cost') || query.includes('price') || query.includes('fee')) {
            this.addAssistantMessage("Treatment costs vary based on individual cases.", true);
            this.addAssistantMessage("We recommend scheduling a consultation for an accurate assessment and detailed cost breakdown. Would you like to book a consultation?");
        }
        else {
            this.addAssistantMessage("I'm here to help! You can ask me about:", true);
            this.addAssistantMessage("• Booking appointments\n• Our dental services\n• Clinic locations\n• Working hours\n• Emergency care\n• Treatment costs\n\nWhat would you like to know?");
        }
    }
}

// Initialize virtual assistant when the page loads
window.addEventListener('load', () => {
    const virtualAssistant = new VirtualAssistant();
});

// Enhanced Notification System for Admin
class AdminNotificationSystem {
    constructor() {
        this.adminEmail = 'abhaysehdevofficial@gmail.com'; // Replace with your email
        this.adminPhone = '919811539510'; // Replace with your phone number
        this.notificationPreferences = {
            email: true,
            sms: true,
            whatsapp: true,
            desktop: true
        };
        this.notificationHistory = [];
        this.initializeDesktopNotifications();
    }

    initializeDesktopNotifications() {
        // Request permission for desktop notifications
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }

    async sendNotification(type, data) {
        try {
            // Add timestamp and unique ID to the notification
            const notificationData = {
                ...data,
                timestamp: new Date().toISOString(),
                id: this.generateUniqueId(),
                type: type,
                userAgent: navigator.userAgent,
                deviceInfo: this.getDeviceInfo(),
                location: await this.getUserLocation()
            };

            // Store in notification history
            this.notificationHistory.push(notificationData);
            
            // Log the notification
            console.log(`New ${type} Notification:`, notificationData);
            
            // Send notifications based on preferences
            if (this.notificationPreferences.email) {
                await this.sendEmailNotification(type, notificationData);
            }
            
            if (this.notificationPreferences.sms) {
                await this.sendSMSNotification(type, notificationData);
            }
            
            if (this.notificationPreferences.whatsapp) {
                await this.sendWhatsAppNotification(type, notificationData);
            }
            
            if (this.notificationPreferences.desktop) {
                this.sendDesktopNotification(type, notificationData);
            }

            // Store in local storage for persistence
            this.saveNotificationHistory();
            
            return true;
        } catch (error) {
            console.error('Error sending notification:', error);
            return false;
        }
    }

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getDeviceInfo() {
        return {
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    async getUserLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        } catch (error) {
            console.log('Location access denied or unavailable');
            return null;
        }
    }

    saveNotificationHistory() {
        try {
            localStorage.setItem('notificationHistory', JSON.stringify(this.notificationHistory));
        } catch (error) {
            console.error('Error saving notification history:', error);
        }
    }

    loadNotificationHistory() {
        try {
            const history = localStorage.getItem('notificationHistory');
            if (history) {
                this.notificationHistory = JSON.parse(history);
            }
        } catch (error) {
            console.error('Error loading notification history:', error);
        }
    }

    sendDesktopNotification(type, data) {
        if ("Notification" in window && Notification.permission === "granted") {
            const title = `New ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            const options = {
                body: this.formatNotificationMessage(type, data),
                icon: '/path/to/icon.png', // Replace with your icon path
                badge: '/path/to/badge.png', // Replace with your badge path
                tag: data.id,
                data: data
            };
            
            new Notification(title, options);
        }
    }

    formatNotificationMessage(type, data) {
        switch(type) {
            case 'appointment':
                return `New appointment request from ${data.name}\nService: ${data.service}\nDate: ${data.date} at ${data.time}\nLocation: ${data.location}`;
            case 'contact':
                return `New message from ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message.substring(0, 100)}${data.message.length > 100 ? '...' : ''}`;
            default:
                return JSON.stringify(data);
        }
    }

    async sendEmailNotification(type, data) {
        // Implement email notification logic here
        // You would typically use an email service like SendGrid, AWS SES, etc.
        console.log('Email notification sent:', { type, data });
    }

    async sendSMSNotification(type, data) {
        // Implement SMS notification logic here
        // You would typically use an SMS service like Twilio
        console.log('SMS notification sent:', { type, data });
    }

    async sendWhatsAppNotification(type, data) {
        // Implement WhatsApp notification logic here
        // You would typically use WhatsApp Business API
        console.log('WhatsApp notification sent:', { type, data });
    }

    // Method to update notification preferences
    updatePreferences(preferences) {
        this.notificationPreferences = {
            ...this.notificationPreferences,
            ...preferences
        };
        localStorage.setItem('notificationPreferences', JSON.stringify(this.notificationPreferences));
    }

    // Method to get notification history
    getNotificationHistory() {
        return this.notificationHistory;
    }

    // Method to clear notification history
    clearNotificationHistory() {
        this.notificationHistory = [];
        localStorage.removeItem('notificationHistory');
    }
}

// Initialize admin notification system
const adminNotifications = new AdminNotificationSystem();

// Load notification history on page load
adminNotifications.loadNotificationHistory();

document.getElementById('appointmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Include selectedDate and selectedTime from bookingSystem
    const date = bookingSystem ? bookingSystem.selectedDate : null;
    const time = bookingSystem ? bookingSystem.selectedTime : null;

    // Create a data object for validation
    const dataForValidation = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        service: this.service.value,
        location: this.location.value,
        date: date ? date.toISOString().split('T')[0] : '',
        time: time || '',
    };

    if (!validateAppointmentForm(dataForValidation)) {
        return;
    }

    const formData = new FormData(this);
    const appointmentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        location: formData.get('location'),
        date: date ? date.toISOString().split('T')[0] : '',
        time: time || '',
        notes: formData.get('notes'),
        preferredContactMethod: formData.get('preferredContactMethod') || 'email',
        isNewPatient: formData.get('isNewPatient') === 'yes',
        previousDentist: formData.get('previousDentist') || 'N/A',
        medicalConditions: formData.get('medicalConditions') || 'None',
        insuranceProvider: formData.get('insuranceProvider') || 'N/A',
        insuranceNumber: formData.get('insuranceNumber') || 'N/A'
    };

    // Send notification to admin
    await adminNotifications.sendNotification('appointment', appointmentData);

    // Show success message to user
    showNotification('Appointment booked successfully! We will contact you shortly.', 'success');

    // Reset form and return to first step
    this.reset();

    // Reset booking steps UI
    const bookingSteps = document.querySelectorAll('.booking-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    bookingSteps.forEach((step, index) => {
        step.style.display = index === 0 ? 'block' : 'none';
        progressSteps[index].classList.remove('active', 'completed');
    });
    progressSteps[0].classList.add('active');
});

// Update contact form submission with enhanced data collection
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateContactForm(this)) {
        return;
    }

    const formData = new FormData(this);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        preferredContactMethod: formData.get('preferredContactMethod') || 'email',
        subject: formData.get('subject') || 'General Inquiry',
        urgency: formData.get('urgency') || 'normal',
        bestTimeToContact: formData.get('bestTimeToContact') || 'Any time'
    };

    // Send notification to admin
    await adminNotifications.sendNotification('contact', contactData);

    // Show success message to user
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

// Example: Disable SMS notifications
adminNotifications.updatePreferences({ sms: false });

// Get all notifications
const history = adminNotifications.getNotificationHistory();
console.log(history);

// Clear all stored notifications
adminNotifications.clearNotificationHistory(); 