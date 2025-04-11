// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close business banner
    const businessBanner = document.getElementById('business-banner');
    const closeBannerBtn = document.getElementById('close-banner');
    
    if (closeBannerBtn && businessBanner) {
        closeBannerBtn.addEventListener('click', function() {
            businessBanner.style.display = 'none';
            // Save to localStorage to keep it closed on refresh
            localStorage.setItem('businessBannerClosed', 'true');
        });
    }
    
    // Check if banner was previously closed
    if (localStorage.getItem('businessBannerClosed') === 'true' && businessBanner) {
        businessBanner.style.display = 'none';
    }
    
    // Address input functionality
    const addressInput = document.querySelector('.address-input');
    const locateBtn = document.querySelector('.btn-locate');
    const findFoodBtn = document.querySelector('.btn-find-food');
    
    if (locateBtn) {
        locateBtn.addEventListener('click', function() {
            // Get user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    // In a real app, you would use the coordinates to get the address
                    // For demo purposes, we'll just show a placeholder
                    if (addressInput) {
                        addressInput.value = "Current Location";
                        addressInput.classList.add('has-value');
                    }
                }, function(error) {
                    console.error("Error getting location:", error);
                    alert("Unable to access your location. Please enter your address manually.");
                });
            } else {
                alert("Geolocation is not supported by your browser. Please enter your address manually.");
            }
        });
    }
    
    if (findFoodBtn && addressInput) {
        findFoodBtn.addEventListener('click', function() {
            if (addressInput.value.trim() === '') {
                alert("Please enter your address or use 'Locate me'");
                addressInput.focus();
            } else {
                // In a real app, this would redirect to the restaurants page
                // For demo purposes, we'll just show an alert
                alert("Finding restaurants near: " + addressInput.value);
                // window.location.href = '/restaurants?address=' + encodeURIComponent(addressInput.value);
            }
        });
    }
    
    // Language selector dropdown functionality
    const languageSelector = document.querySelector('.language-selector');
    
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            // In a real app, this would show a dropdown
            // For demo purposes, we'll just toggle a class
            this.classList.toggle('active');
            
            // Simple language toggle between EN and UR (Urdu) for demo
            const langText = this.querySelector('span');
            if (langText) {
                if (langText.textContent === 'EN') {
                    langText.textContent = 'UR';
                } else {
                    langText.textContent = 'EN';
                }
            }
        });
    }
    
    // Lazy loading images for better performance
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0,
            rootMargin: "0px 0px 300px 0px"
        };
        
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, imgOptions);
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Simple cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would open the cart
            // For demo purposes, we'll just show an alert
            alert("Your cart is empty. Add some delicious food!");
        });
    }
    
    // Restaurant cards hover effect
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Simulate loading state for Find Food button
    if (findFoodBtn) {
        findFoodBtn.addEventListener('click', function() {
            if (addressInput && addressInput.value.trim() !== '') {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                this.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    this.innerHTML = 'Find food';
                    this.disabled = false;
                }, 1500);
            }
        });
    }
});