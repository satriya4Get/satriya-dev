// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Typing Effect
  const typedTextElement = document.getElementById('typed-text');
  const textArray = ["code", "design", "creativity", "problem solving"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 200; // Delay between each character typing

  function typeText() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      // Remove a character
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 100;
    } else {
      // Add a character
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 200;
    }

    // If finished typing the word
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingDelay = 1000; // Wait before starting to delete
    } 
    // If finished deleting the word
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length; // Move to next word
      typingDelay = 500; // Wait before typing next word
    }

    setTimeout(typeText, typingDelay);
  }

  // Start the typing animation
  setTimeout(typeText, 1000);

  // Navigation
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle mobile menu
  navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Check for elements to animate on scroll
    animateOnScroll();
  });
  
  // Scroll to section smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for fixed navbar
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100; // Offset
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.reveal-left, .reveal-right');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('active');
      }
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (barPosition < windowHeight - 50) {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
      }
    });
  }
  
  // Trigger animations on initial load
  setTimeout(animateOnScroll, 500);
  
  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});