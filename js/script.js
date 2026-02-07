// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
        });
    });
}

// Tax Savings Calculator
function calculateSavings() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const filingStatus = document.getElementById('filingStatus').value;
    const businessIncome = parseFloat(document.getElementById('businessIncome').value) || 0;
    const dependents = parseInt(document.getElementById('dependents').value) || 0;

    if (income === 0) {
        alert('Please enter your annual income');
        return;
    }

    // Calculate based on income level and profile
    let baseSavings = 0;
    let deductionSavings = 0;
    let creditSavings = 0;
    let businessSavings = 0;
    let dependentSavings = 0;

    // Base deduction optimization (typically 15-20% of income)
    if (income > 50000) {
        deductionSavings = income * 0.18 * 0.30; // 30% of potential deductions saved
    } else {
        deductionSavings = income * 0.15 * 0.30;
    }

    // Tax credit optimization
    if (filingStatus === 'married') {
        creditSavings = 2000 + (dependents * 800);
    } else if (filingStatus === 'head') {
        creditSavings = 1500 + (dependents * 700);
    } else {
        creditSavings = 1000 + (dependents * 600);
    }

    // Business income optimization
    if (businessIncome > 0) {
        businessSavings = businessIncome * 0.25 * 0.35; // 35% of business expense optimization
    }

    // Dependent optimization
    dependentSavings = dependents * 1200;

    const totalSavings = deductionSavings + creditSavings + businessSavings + dependentSavings;

    // Apply income-based cap considerations
    let finalSavings = totalSavings;

    // Ensure savings are within realistic bounds
    const maxSavings = income * 0.25; // Max 25% of income
    const minSavings = 2000;

    if (finalSavings > maxSavings) {
        finalSavings = maxSavings;
    }
    if (finalSavings < minSavings) {
        finalSavings = minSavings;
    }

    displayResults(finalSavings);
}

function displayResults(savings) {
    const resultsDiv = document.getElementById('results');
    const savingsAmount = document.getElementById('savingsAmount');

    savingsAmount.textContent = '$' + Math.round(savings).toLocaleString();
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.elements[0].value;
        const email = contactForm.elements[1].value;

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 2000;
            animation: slideIn 0.3s ease-out;
        `;
        successMessage.textContent = `Thanks for reaching out, ${name}! We'll contact you soon.`;
        document.body.appendChild(successMessage);

        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

        // Reset form
        contactForm.reset();
    });
}

// Smooth scroll to contact
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.why-card, .service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Navbar highlight on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Real-time input validation for calculator
document.getElementById('income')?.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

document.getElementById('businessIncome')?.addEventListener('input', function() {
    if (this.value < 0) this.value = 0;
});

document.getElementById('dependents')?.addEventListener('input', function() {
    if (this.value > 10) this.value = 10;
    if (this.value < 0) this.value = 0;
});

// Log website loaded
console.log('MyTax website loaded successfully');
console.log('Ready to help you save on taxes!');
