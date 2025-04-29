// Sidebar and Section Handling
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const sections = document.querySelectorAll('.initiative-section');
    const initiativeButtons = document.querySelectorAll('.initiative-btn');
    const homeSection = document.getElementById('home');

    // Ensure menu button is visible
    if (menuToggle) {
        menuToggle.style.display = 'flex';
        menuToggle.style.opacity = '1';
        menuToggle.style.visibility = 'visible';
    }

    // Function to hide all sections
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
    }

    // Function to show a specific section
    function showSection(sectionId) {
        hideAllSections();
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'block';
            section.classList.add('active');
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Hide all sections initially except home
    hideAllSections();
    if (homeSection) {
        homeSection.style.display = 'block';
        homeSection.classList.add('active');
    }
    if (homeSection) {
        homeSection.classList.add('active');
    }

    // Handle menu toggle click
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        this.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            this.textContent = '✕';
            this.style.background = '#ff5252';
        } else {
            this.textContent = '☰';
            this.style.background = '#ff6b6b';
        }
    });
    
    // Initialize button states
    initiativeButtons.forEach(btn => {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
    });

    // Handle initiative button clicks
    initiativeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            
            // Update button states
            initiativeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show the target section
            showSection(targetId);
            
            // Add JavaScript to open the modal when the button is clicked and close it when the close button or outside the modal is clicked.
            document.addEventListener('DOMContentLoaded', function() {
              var modal = document.getElementById('fullStoryModal');
              var openBtn = document.getElementById('openFullStoryModal');
              var closeBtn = document.getElementById('closeFullStoryModal');

              if (openBtn && modal && closeBtn) {
                openBtn.onclick = function() {
                  modal.style.display = 'flex';
                };
                closeBtn.onclick = function() {
                  modal.style.display = 'none';
                };
                window.onclick = function(event) {
                  if (event.target === modal) {
                    modal.style.display = 'none';
                  }
                };
              }
            });

            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = 'scale(1)', 200);
            
            // Close sidebar and update menu button
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.textContent = '☰';
            menuToggle.style.background = '#ff6b6b';
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sidebar') && 
            !e.target.closest('.menu-toggle') && 
            window.innerWidth <= 768 && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            main.classList.remove('sidebar-active');
            menuToggle.textContent = '☰';
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = document.querySelector('.navbar').offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Form submission handler
document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset(); // Clear form after submission
});

// Donation Amount Selection
document.querySelectorAll('.amount-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove selected class from all buttons
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Add selected class to clicked button
        this.classList.add('selected');
        
        // Handle custom amount
        const customContainer = document.getElementById('custom-amount-container');
        if (this.dataset.amount === 'custom') {
            customContainer.style.display = 'block';
            document.getElementById('custom-amount').focus();
        } else {
            customContainer.style.display = 'none';
        }
    });
});

// Payment Method Selection
document.querySelectorAll('.payment-logo').forEach(logo => {
    logo.addEventListener('click', function() {
        document.querySelectorAll('.payment-logo').forEach(l => {
            l.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Donation Form Submission
document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const name = document.getElementById('donor-name').value;
    const email = document.getElementById('donor-email').value;
    const phone = document.getElementById('donor-phone').value;
    
    // Find selected donation amount
    const selectedAmount = document.querySelector('.amount-btn.selected');
    let amount = selectedAmount ? selectedAmount.dataset.amount : 
                 document.getElementById('custom-amount').value;
    
    // Basic validation
    if (!amount || amount < 100) {
        alert('Please select or enter a valid donation amount (minimum ₹100)');
        return;
    }
    
    // In a real-world scenario, you'd integrate with a payment gateway here
    alert(`Thank you, ${name}! Your donation of ₹${amount} will help transform lives.`);
    
    // Reset form
    this.reset();
});

// Logo Fallback Handling
document.addEventListener('DOMContentLoaded', function() {
    const paymentLogos = document.querySelectorAll('.payment-logo img');
    paymentLogos.forEach(logo => {
        logo.addEventListener('error', function() {
            // If image fails to load, create a text fallback
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.textContent = this.alt;
            fallback.style.width = '80px';
            fallback.style.height = '80px';
            fallback.style.backgroundColor = 'var(--secondary-color)';
            fallback.style.color = 'white';
            fallback.style.display = 'flex';
            fallback.style.alignItems = 'center';
            fallback.style.justifyContent = 'center';
            fallback.style.borderRadius = '15px';
            fallback.style.fontWeight = 'bold';
            fallback.style.textTransform = 'uppercase';
            this.parentNode.appendChild(fallback);
        });
    });
});

// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - document.querySelector('.navbar').offsetHeight,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        }
    });
});

// Dropdown Functionality
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const content = dropdown.querySelector('.dropdown-content');
    
    link.addEventListener('click', (e) => {
        e.preventDefault();
        content.classList.toggle('show');
    });
    
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            content.classList.remove('show');
        }
    });
});

// Optional: Scroll Animations
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('fade-in');
        }
    });
});

// Founder Section Animation
const leaderSection = document.querySelector('#leadership');
const leaderImg = document.querySelector('.leader img');

function animateFounder() {
    const leaderPosition = leaderSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (leaderPosition < screenPosition) {
        leaderSection.classList.add('animate');
        leaderImg.style.transform = 'scale(1) rotate(0deg)';
    }
}

window.addEventListener('scroll', animateFounder);

// Initial animation
gsap.from('.leader', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power2.out'
});
