// Enhanced JavaScript for Four Skincare Website
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌿 Four Skincare - Enhanced Experience Loading...');

  // ===== PERFORMANCE OPTIMIZATION =====
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  // ===== LOADING SCREEN =====
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 2000);
  }

  // ===== PARTICLE SYSTEM =====
  const particleCanvas = document.getElementById('particleCanvas');
  if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.opacity = (this.life / this.maxLife) * 0.5;

        if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;

        if (this.life <= 0) {
          this.x = Math.random() * particleCanvas.width;
          this.y = Math.random() * particleCanvas.height;
          this.life = this.maxLife;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46, 139, 87, ${this.opacity})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + 
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(46, 139, 87, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', debounce(() => {
      resizeCanvas();
      initParticles();
    }, 250));
  }

  // ===== FLOATING PRODUCTS ANIMATION =====
  function createFloatingProducts() {
    const container = document.getElementById('floatingProducts');
    if (!container) return;

    const products = ['🧴', '🧼', '🧽', '💆‍♀️', '🌿', '✨', '💧', '🌸', '🍃', '🌺'];
    const productCount = window.innerWidth < 768 ? 8 : 15;
    
    function createProduct() {
      const product = document.createElement('div');
      product.className = 'floating-product';
      product.textContent = products[Math.floor(Math.random() * products.length)];
      product.style.left = Math.random() * 100 + '%';
      product.style.animationDuration = (Math.random() * 10 + 15) + 's';
      product.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(product);

      setTimeout(() => {
        if (product.parentNode) {
          product.parentNode.removeChild(product);
        }
      }, 25000);
    }

    // Initial products
    for (let i = 0; i < productCount; i++) {
      setTimeout(createProduct, i * 1000);
    }

    // Continue creating products
    setInterval(createProduct, 3000);
  }

  createFloatingProducts();

  // ===== MOBILE MENU TOGGLE =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark-mode') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
      updateThemeIcon(isDarkMode);
    });
  }
  
  function updateThemeIcon(isDarkMode) {
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  }

  // ===== SHOPPING CART FUNCTIONALITY =====
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('overlay');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.querySelector('.cart-count');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count
  function updateCartCount() {
    if (cartCount) {
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = count;
      cartCount.classList.toggle('show', count > 0);
    }
  }
  
  // Update cart display
  function updateCartDisplay() {
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
      cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>PKR ${item.price.toFixed(2)}</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn increase" data-index="${index}">+</button>
            </div>
          </div>
          <button class="remove-cart" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
    }
    
    updateCartTotal();
  }
  
  // Update cart total
  function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 0 : 0; // Free shipping
    const total = subtotal + shipping;
    
    if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
  }
  
  // Toggle cart sidebar
  function toggleCart() {
    if (cartSidebar) {
      cartSidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  }
  
  // Event listeners for cart
  if (cartToggle) cartToggle.addEventListener('click', toggleCart);
  if (cartClose) cartClose.addEventListener('click', toggleCart);
  if (overlay) overlay.addEventListener('click', toggleCart);
  
  // Add to cart functionality
  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
      const button = e.target.closest('.add-to-cart');
      const productCard = button.closest('.product-card');
      
      if (productCard) {
        const name = productCard.querySelector('.product-name').textContent;
        const priceText = productCard.querySelector('.product-price').textContent;
        const price = parseFloat(priceText.replace('PKR ', ''));
        const image = productCard.querySelector('.product-image img').src;
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({
            name,
            price,
            image,
            quantity: 1
          });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
        
        // Show notification
        showNotification('Product added to cart!');
      }
    }
  });
  
  // Handle cart item actions
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quantity-btn')) {
      const index = parseInt(e.target.dataset.index);
      
      if (e.target.classList.contains('increase')) {
        cart[index].quantity++;
      } else if (e.target.classList.contains('decrease')) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
    }
    
    if (e.target.classList.contains('remove-cart')) {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
      
      showNotification('Product removed from cart');
    }
  });
  
  // Initialize cart
  updateCartCount();
  updateCartDisplay();

  // ===== PRODUCT DATA =====
  const products = [
    {
      id: 1,
      name: "Natural Cleanser",
      price: 25.00,
      category: "cleanser",
      image: "assets/0 (14).jpg",
      description: "Gentle cleansing for all skin types",
      rating: 4.8,
      badge: "new"
    },
    {
      id: 2,
      name: "Hydrating Serum",
      price: 45.00,
      category: "serum",
      image: "assets/0 (12).jpg",
      description: "Deep hydration for radiant skin",
      rating: 4.9,
      badge: "bestseller"
    },
    {
      id: 3,
      name: "Anti-Aging Cream",
      price: 65.00,
      category: "moisturizer",
      image: "assets/0 (13).jpg",
      description: "Restore youthful radiance",
      rating: 4.7,
      badge: ""
    },
    {
      id: 4,
      name: "Vitamin C Serum",
      price: 55.00,
      category: "serum",
      image: "assets/0 (2).jpg",
      description: "Brighten and even skin tone",
      rating: 4.9,
      badge: "bestseller"
    },
    {
      id: 5,
      name: "Detox Mask",
      price: 35.00,
      category: "mask",
      image: "assets/0 (8).jpg",
      description: "Deep cleansing treatment",
      rating: 4.6,
      badge: ""
    },
    {
      id: 6,
      name: "Night Moisturizer",
      price: 40.00,
      category: "moisturizer",
      image: "assets/0 (14).jpg",
      description: "Overnight rejuvenation",
      rating: 4.8,
      badge: "new"
    }
  ];

  // ===== PRODUCT DISPLAY =====
  const productGrid = document.getElementById('productGrid');
  const tabButtons = document.querySelectorAll('.tab-button');
  
  function displayProducts(category = 'all') {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
      ? products 
      : products.filter(product => product.category === category);
    
    filteredProducts.forEach((product, index) => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">PKR ${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
            <button class="product-button add-to-cart">Add to Cart</button>
            <button class="product-button quick-view" data-id="${product.id}">Quick View</button>
          </div>
        </div>
      `;
      
      productGrid.appendChild(productCard);
      
      // Animate product cards
      setTimeout(() => {
        productCard.classList.add('show');
      }, index * 100);
    });
  }
  
  // Tab functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Display products for selected category
      const category = button.dataset.category;
      displayProducts(category);
    });
  });
  
  // Initial product display
  displayProducts();

  // ===== QUICK VIEW MODAL =====
  const quickViewModal = document.getElementById('quickViewModal');
  const closeModal = document.querySelector('.close-modal');
  
  function openQuickView(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product || !quickViewModal) return;
    
    const modalContent = quickViewModal.querySelector('.quick-view-content');
    modalContent.innerHTML = `
      <div class="quick-view-image-container">
        <img class="quick-view-image" src="${product.image}" alt="${product.name}">
        <div class="image-zoom-indicator">
          <i class="fas fa-search-plus"></i>
        </div>
      </div>
      <div class="quick-view-info">
        <div class="product-badges">
          ${product.badge ? `<span class="badge new">${product.badge}</span>` : ''}
        </div>
        <h3 class="quick-view-name">${product.name}</h3>
        <div class="quick-view-rating">
          <div class="stars">
            ${'★'.repeat(Math.floor(product.rating))}
            ${'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span class="rating-count">(127 reviews)</span>
        </div>
        <p class="quick-view-price">PKR ${product.price.toFixed(2)}</p>
        <p class="quick-view-description">${product.description}</p>
        <div class="product-options">
          <div class="option-group">
            <label>Size:</label>
            <select class="size-select">
              <option>30ml</option>
              <option>50ml</option>
              <option>100ml</option>
            </select>
          </div>
        </div>
        <div class="quick-view-actions">
          <button class="product-button add-to-cart enhanced-add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
            <i class="fas fa-shopping-cart"></i>
            <span>Add to Cart</span>
          </button>
          <button class="product-button wishlist-btn">
            <i class="fas fa-heart"></i>
          </button>
        </div>
        <div class="product-features">
          <div class="feature-item">
            <i class="fas fa-leaf"></i>
            <span>100% Natural</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-shipping-fast"></i>
            <span>Free Shipping</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-undo"></i>
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
    `;
    
    quickViewModal.classList.add('active');
    overlay.classList.add('active');
  }
  
  function closeQuickView() {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
    }
    overlay.classList.remove('active');
  }
  
  // Event listeners for quick view
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-view')) {
      const productId = e.target.dataset.id;
      openQuickView(productId);
    }
    
    if (e.target === closeModal || e.target.classList.contains('close-modal')) {
      closeQuickView();
    }
  });
  
  // Add to cart from quick view
  document.addEventListener('click', (e) => {
    if (e.target.closest('.enhanced-add-to-cart')) {
      const button = e.target.closest('.enhanced-add-to-cart');
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const image = button.dataset.image;
      
      // Check if product already in cart
      const existingItem = cart.find(item => item.name === name);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          name,
          price,
          image,
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
      closeQuickView();
      
      showNotification('Product added to cart!');
    }
  });

  // ===== TESTIMONIALS SLIDER =====
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialDots = document.getElementById('testimonialDots');
  const prevTestimonial = document.getElementById('prevTestimonial');
  const nextTestimonial = document.getElementById('nextTestimonial');
  
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial-card');
  
  function showTestimonial(index) {
    if (!testimonialTrack || !testimonials.length) return;
    
    // Update testimonial position
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    
    // Update dots
    if (testimonialDots) {
      const dots = testimonialDots.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    currentTestimonial = index;
  }
  
  // Initialize dots
  if (testimonialDots && testimonials.length > 0) {
    testimonialDots.innerHTML = '';
    testimonials.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (index === 0) dot.classList.add('active');
      dot.dataset.slide = index;
      dot.addEventListener('click', () => showTestimonial(index));
      testimonialDots.appendChild(dot);
    });
  }
  
  // Previous/next buttons
  if (prevTestimonial) {
    prevTestimonial.addEventListener('click', () => {
      const newIndex = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
      showTestimonial(newIndex);
    });
  }
  
  if (nextTestimonial) {
    nextTestimonial.addEventListener('click', () => {
      const newIndex = currentTestimonial < testimonials.length - 1 ? currentTestimonial + 1 : 0;
      showTestimonial(newIndex);
    });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    if (testimonials.length > 0) {
      const newIndex = currentTestimonial < testimonials.length - 1 ? currentTestimonial + 1 : 0;
      showTestimonial(newIndex);
    }
  }, 5000);

  // ===== ROUTINE TABS =====
  const routineTabs = document.querySelectorAll('.routine-tab');
  const routinePanels = document.querySelectorAll('.routine-panel');
  
  routineTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const routine = tab.dataset.routine;
      
      // Update active tab
      routineTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active panel
      routinePanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `${routine}-routine`);
      });
    });
  });

  // ===== SEARCH FUNCTIONALITY =====
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.getElementById('searchResults');
  const searchResultsGrid = searchResults?.querySelector('.search-results-grid');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      const query = searchInput.value.toLowerCase().trim();
      
      if (query === '') {
        if (searchResults) searchResults.style.display = 'none';
        return;
      }
      
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      
      if (searchResults && searchResultsGrid) {
        searchResults.style.display = 'block';
        searchResultsGrid.innerHTML = '';
        
        if (filteredProducts.length === 0) {
          searchResultsGrid.innerHTML = '<p>No products found matching your search.</p>';
        } else {
          filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : ''}
              </div>
              <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">PKR ${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                  <button class="product-button add-to-cart">Add to Cart</button>
                  <button class="product-button quick-view" data-id="${product.id}">Quick View</button>
                </div>
              </div>
            `;
            searchResultsGrid.appendChild(productCard);
          });
        }
      }
    }, 300));
  }

  // ===== FORM HANDLING =====
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      if (email) {
        // In a real application, you would send this to your server
        console.log('Newsletter subscription:', email);
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      }
    });
  }
  
  // Footer newsletter form
  const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = footerNewsletterForm.querySelector('input').value;
      
      if (email) {
        console.log('Footer newsletter subscription:', email);
        showNotification('Thank you for subscribing to our newsletter!');
        footerNewsletterForm.reset();
      }
    });
  }
  
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        firstName: contactForm.querySelector('#firstName').value,
        lastName: contactForm.querySelector('#lastName').value,
        email: contactForm.querySelector('#email').value,
        subject: contactForm.querySelector('#subject').value,
        message: contactForm.querySelector('#message').value
      };
      
      // In a real application, you would send this to your server
      console.log('Contact form submission:', formData);
      showNotification('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // ===== SCROLL ANIMATIONS =====
  const animatedElements = document.querySelectorAll('[data-scroll-animate]');
  
  function checkScrollAnimations() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate');
      }
    });
  }
  
  // Initial check
  checkScrollAnimations();
  
  // Check on scroll
  window.addEventListener('scroll', throttle(checkScrollAnimations, 100));

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.getElementById('backToTop');
  
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }
  
  window.addEventListener('scroll', throttle(toggleBackToTop, 100));

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('header');
  
  function updateHeaderOnScroll() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', throttle(updateHeaderOnScroll, 100));

  // ===== NOTIFICATION SYSTEM =====
  function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--gradient-primary);
      color: white;
      padding: 15px 25px;
      border-radius: 50px;
      box-shadow: var(--shadow-xl);
      z-index: 10000;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
      notification.style.transform = 'translateY(100px)';
      notification.style.opacity = '0';
      
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }

  // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== POSTER 3D EFFECT =====
  const posterCards = document.querySelectorAll('.enhanced-poster-card');
  
  if (posterCards.length > 0) {
    const posterContainer = document.querySelector('.enhanced-poster-container');
    
    posterContainer.addEventListener('mousemove', (e) => {
      const rect = posterContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      posterCards.forEach((card, index) => {
        const offset = index - 1; // -1, 0, 1
        card.style.transform = `
          rotateY(${rotateY * (1 - Math.abs(offset) * 0.5)}deg) 
          rotateX(${rotateX * (1 - Math.abs(offset) * 0.5)}deg) 
          translateZ(${offset * -50}px)
        `;
      });
    });
    
    posterContainer.addEventListener('mouseleave', () => {
      posterCards.forEach((card, index) => {
        const offset = index - 1;
        if (offset === 0) {
          card.style.transform = 'translateX(-50%) translateZ(0) scale(0.8)';
        } else {
          card.style.transform = `rotateY(${offset * 15}deg) translateZ(${-100}px)`;
        }
      });
    });
  }

  // ===== COUNTER ANIMATION =====
  function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format the number
      if (target > 1000) {
        element.textContent = Math.floor(current).toLocaleString();
      } else {
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
      }
    }, 16);
  }
  
  // Initialize counters when they come into view
  const counterElements = document.querySelectorAll('[data-count]');
  
  function checkCounters() {
    counterElements.forEach(counter => {
      const elementTop = counter.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible && !counter.classList.contains('counted')) {
        counter.classList.add('counted');
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
      }
    });
  }
  
  // Initial check
  checkCounters();
  
  // Check on scroll
  window.addEventListener('scroll', throttle(checkCounters, 100));

  // ===== INITIALIZATION =====
  console.log('🌿 Four Skincare - Enhanced Experience Loaded Successfully!');
});