// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const newsletterForm = document.querySelector('.newsletter-form');
  const contactForm = document.querySelector('.contact-form');
  const modal = document.querySelector('.modal');
  const closeModal = document.querySelector('.close-modal');
  const searchInput = document.querySelector('.search-input');
  const productCards = document.querySelectorAll('.product-card');
  const adminForm = document.querySelector('.admin-form');
  const adminProductGrid = document.querySelector('.admin-product-grid');
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // Particle system
  const particles = [];
  const particleCount = 50;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `rgba(46, 139, 87, ${Math.random() * 0.5 + 0.1})`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  createParticles();
  
  // Animate particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (themeToggle) {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  
  // Testimonial slider
  let testimonialIndex = 0;
  
  function showTestimonial(index) {
    if (testimonialSlider) {
      testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
      
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }
  
  if (testimonialDots.length > 0) {
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        testimonialIndex = index;
        showTestimonial(testimonialIndex);
      });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonialDots.length;
      showTestimonial(testimonialIndex);
    }, 5000);
  }
  
  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      if (validateEmail(email)) {
        // Show success animation
        showSuccessMessage('Thank you for subscribing to our newsletter!');
        this.reset();
        
        // Create confetti effect
        createConfetti();
      } else {
        // Show error
        const emailInput = this.querySelector('input[type="email"]');
        emailInput.classList.add('error');
        setTimeout(() => {
          emailInput.classList.remove('error');
        }, 3000);
      }
    });
  }
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');
      
      // Validate name
      if (name.value.trim() === '') {
        name.parentElement.classList.add('error');
        isValid = false;
      } else {
        name.parentElement.classList.remove('error');
      }
      
      // Validate email
      if (!validateEmail(email.value)) {
        email.parentElement.classList.add('error');
        isValid = false;
      } else {
        email.parentElement.classList.remove('error');
      }
      
      // Validate message
      if (message.value.trim() === '') {
        message.parentElement.classList.add('error');
        isValid = false;
      } else {
        message.parentElement.classList.remove('error');
      }
      
      if (isValid) {
        // Show success modal
        showModal('Thank you for your message! We will get back to you soon.');
        this.reset();
        
        // Create fireworks effect
        createFireworks();
      }
    });
  }
  
  // Email validation
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Show success message
  function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: var(--primary-color);
      color: white;
      padding: 15px 25px;
      border-radius: var(--border-radius);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      z-index: 1000;
      animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.style.animation = 'slideOut 0.5s ease';
      setTimeout(() => {
        document.body.removeChild(successDiv);
      }, 500);
    }, 3000);
  }
  
  // Modal functions
  function showModal(message) {
    if (modal) {
      const modalMessage = modal.querySelector('.modal-message');
      if (modalMessage) {
        modalMessage.textContent = message;
      }
      modal.style.display = 'flex';
    }
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  if (modal) {
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  // Product WhatsApp integration
  if (productCards.length > 0) {
    productCards.forEach(card => {
      const button = card.querySelector('.product-button');
      if (button) {
        button.addEventListener('click', function() {
          const productName = card.querySelector('.product-name').textContent;
          const whatsappNumber = '1234567890'; // Replace with actual WhatsApp number
          const message = `Please provide me more detail about this product: ${productName}`;
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          
          window.open(whatsappUrl, '_blank');
        });
      }
    });
  }
  
  // Search functionality
  if (searchInput && productCards.length > 0) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
          card.style.display = 'block';
          // Add highlight animation
          card.style.animation = 'highlight 1s ease';
          setTimeout(() => {
            card.style.animation = '';
          }, 1000);
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // Admin form
  if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const product = {
        id: Date.now(),
        name: this.querySelector('input[name="name"]').value,
        price: this.querySelector('input[name="price"]').value,
        image: this.querySelector('input[name="image"]').value || `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/300/200.jpg`,
        description: this.querySelector('textarea[name="description"]').value
      };
      
      // Save to localStorage
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
      
      // Reset form
      this.reset();
      
      // Update product grid
      updateAdminProductGrid();
      updateHomeProductGrid();
      
      // Show success message
      showSuccessMessage('Product added successfully!');
    });
  }
  
  // Update admin product grid
  function updateAdminProductGrid() {
    if (adminProductGrid) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      
      adminProductGrid.innerHTML = '';
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'admin-product-card';
        productCard.innerHTML = `
          <div class="admin-product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="admin-product-info">
            <h3 class="admin-product-name">${product.name}</h3>
            <p class="admin-product-price">$${product.price}</p>
            <p class="admin-product-description">${product.description}</p>
            <div class="admin-product-actions">
              <button class="edit-button" data-id="${product.id}">Edit</button>
              <button class="delete-button" data-id="${product.id}">Delete</button>
            </div>
          </div>
        `;
        
        adminProductGrid.appendChild(productCard);
      });
      
      // Add event listeners to edit and delete buttons
      const editButtons = adminProductGrid.querySelectorAll('.edit-button');
      const deleteButtons = adminProductGrid.querySelectorAll('.delete-button');
      
      editButtons.forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          editProduct(productId);
        });
      });
      
      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.getAttribute('data-id');
          deleteProduct(productId);
        });
      });
    }
  }
  
  // Update home product grid
  function updateHomeProductGrid() {
    const homeProductGrid = document.querySelector('.product-grid');
    if (homeProductGrid) {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      
      // Clear existing products except the first few (if any)
      while (homeProductGrid.children.length > 4) {
        homeProductGrid.removeChild(homeProductGrid.lastChild);
      }
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button class="product-button">Learn More</button>
          </div>
        `;
        
        homeProductGrid.appendChild(productCard);
      });
      
      // Add event listeners to new product buttons
      const newProductButtons = homeProductGrid.querySelectorAll('.product-button');
      newProductButtons.forEach(button => {
        button.addEventListener('click', function() {
          const productCard = this.closest('.product-card');
          const productName = productCard.querySelector('.product-name').textContent;
          const whatsappNumber = '1234567890'; // Replace with actual WhatsApp number
          const message = `Please provide me more detail about this product: ${productName}`;
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
          
          window.open(whatsappUrl, '_blank');
        });
      });
    }
  }
  
  // Edit product
  function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id == productId);
    
    if (product && adminForm) {
      adminForm.querySelector('input[name="name"]').value = product.name;
      adminForm.querySelector('input[name="price"]').value = product.price;
      adminForm.querySelector('input[name="image"]').value = product.image;
      adminForm.querySelector('textarea[name="description"]').value = product.description;
      
      // Change form submit behavior
      adminForm.onsubmit = function(e) {
        e.preventDefault();
        
        // Update product
        product.name = this.querySelector('input[name="name"]').value;
        product.price = this.querySelector('input[name="price"]').value;
        product.image = this.querySelector('input[name="image"]').value;
        product.description = this.querySelector('textarea[name="description"]').value;
        
        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(products));
        
        // Reset form
        this.reset();
        
        // Reset form submit behavior
        adminForm.onsubmit = null;
        
        // Update product grids
        updateAdminProductGrid();
        updateHomeProductGrid();
        
        // Show success message
        showSuccessMessage('Product updated successfully!');
      };
    }
  }
  
  // Delete product
  function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(p => p.id != productId);
    localStorage.setItem('products', JSON.stringify(products));
    
    // Update product grids
    updateAdminProductGrid();
    updateHomeProductGrid();
    
    // Show success message
    showSuccessMessage('Product deleted successfully!');
  }
  
  // Initialize admin product grid
  updateAdminProductGrid();
  
  // Parallax scrolling
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // For timeline items
        if (entry.target.classList.contains('timeline-item')) {
          const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.2;
          entry.target.style.transitionDelay = `${delay}s`;
        }
      }
    });
  }, observerOptions);
  
  // Elements to observe
  const animatedElements = document.querySelectorAll('.timeline-item, .value-card, .team-card, .product-card');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Confetti effect
  function createConfetti() {
    const confettiCount = 150;
    const confettiElements = [];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: ${getRandomColor()};
        top: -10px;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() + 0.5};
        transform: rotate(${Math.random() * 360}deg);
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 1000;
      `;
      
      document.body.appendChild(confetti);
      confettiElements.push(confetti);
      
      // Animate confetti
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      
      confetti.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
      });
      
      // Remove confetti after animation
      setTimeout(() => {
        document.body.removeChild(confetti);
      }, (duration + delay) * 1000);
    }
  }
  
  // Fireworks effect
  function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1000;
    `;
    
    document.body.appendChild(fireworksContainer);
    
    const fireworkCount = 5;
    
    for (let i = 0; i < fireworkCount; i++) {
      setTimeout(() => {
        createFirework(fireworksContainer);
      }, i * 500);
    }
    
    // Remove fireworks container after animation
    setTimeout(() => {
      document.body.removeChild(fireworksContainer);
    }, 5000);
  }
  
  function createFirework(container) {
    const firework = document.createElement('div');
    firework.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${getRandomColor()};
      bottom: 0;
      left: ${Math.random() * 100}%;
      box-shadow: 0 0 10px 2px ${getRandomColor()};
    `;
    
    container.appendChild(firework);
    
    // Animate firework going up
    const targetY = Math.random() * window.innerHeight * 0.5;
    
    firework.animate([
      { transform: `translate(0, 0)`, opacity: 1 },
      { transform: `translate(0, -${targetY}px)`, opacity: 1 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      fill: 'forwards'
    }).onfinish = () => {
      // Create explosion
      createExplosion(container, firework.offsetLeft, window.innerHeight - targetY);
      
      // Remove firework
      container.removeChild(firework);
    };
  }
  
  function createExplosion(container, x, y) {
    const particleCount = 50;
    const color = getRandomColor();
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${color};
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 6px 1px ${color};
      `;
      
      container.appendChild(particle);
      
      // Animate explosion
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      particle.animate([
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px)`, opacity: 0 }
      ], {
        duration: 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
      });
      
      // Remove particle after animation
      setTimeout(() => {
        container.removeChild(particle);
      }, 1000);
    }
  }
  
  // Get random color
  function getRandomColor() {
    const colors = ['#2E8B57', '#D4F4E2', '#F5F6F5', '#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Mouse trail effect
  let mouseTrail = [];
  const maxTrailLength = 20;
  
  document.addEventListener('mousemove', function(e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY });
    
    if (mouseTrail.length > maxTrailLength) {
      mouseTrail.shift();
    }
    
    // Create trail elements
    const trailElements = document.querySelectorAll('.mouse-trail');
    trailElements.forEach(element => {
      document.body.removeChild(element);
    });
    
    mouseTrail.forEach((point, index) => {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.cssText = `
        position: fixed;
        width: ${index * 2}px;
        height: ${index * 2}px;
        border-radius: 50%;
        background-color: rgba(46, 139, 87, ${0.5 - (index / maxTrailLength) * 0.5});
        left: ${point.x}px;
        top: ${point.y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(trail);
    });
  });
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Page transition
  document.querySelectorAll('a:not([href^="#"]):not([href^="tel"]):not([href^="mailto"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
  
  // Admin password protection
  const adminPage = document.querySelector('.admin-page');
  if (adminPage) {
    const password = prompt('Please enter the admin password:');
    
    if (password !== 'admin123') { // Simple password check
      document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
          <h1 style="color: #2E8B57; margin-bottom: 20px;">Access Denied</h1>
          <p style="margin-bottom: 20px;">You don't have permission to access this page.</p>
          <a href="index.html" style="background-color: #2E8B57; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Go to Home</a>
        </div>
      `;
    }
  }
  
  // Form field focus effects
  const formInputs = document.querySelectorAll('.form-control');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
      this.parentElement.style.boxShadow = '0 0 0 3px rgba(46, 139, 87, 0.2)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
      this.parentElement.style.boxShadow = 'none';
    });
  });
  
  // Add CSS animation keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes highlight {
      0% { box-shadow: 0 0 0 0 rgba(46, 139, 87, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(46, 139, 87, 0); }
      100% { box-shadow: 0 0 0 0 rgba(46, 139, 87, 0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});