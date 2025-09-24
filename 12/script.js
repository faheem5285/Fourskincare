// Four Skincare - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Four Skincare Loading...');

  // Utility Functions
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Loading Screen
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 2000);
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference
  const savedTheme = JSON.parse(localStorage.getItem('theme')) || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('theme', JSON.stringify(isDarkMode ? 'dark' : 'light'));
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

  // Shopping Cart Functionality
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('overlay');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.querySelector('.cart-count');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTotal = document.getElementById('cartTotal');
  
  let cart = JSON.parse(localStorage.getItem('fourSkinCart')) || [];
  
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
          <button class="remove-cart" data-index="${index}">
            <i class="fas fa-times"></i>
          </button>
        `;
        cartItems.appendChild(cartItem);
      });
    }
    
    updateCartTotal();
  }
  
  // Update cart total
  function updateCartTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal; // Free shipping
    
    if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
  }
  
  // Toggle cart sidebar
  function toggleCart() {
    if (cartSidebar && overlay) {
      cartSidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
    }
  }
  
  // Event listeners for cart
  if (cartToggle) cartToggle.addEventListener('click', toggleCart);
  if (cartClose) cartClose.addEventListener('click', toggleCart);
  if (overlay) overlay.addEventListener('click', toggleCart);
  
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
      
      localStorage.setItem('fourSkinCart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
    }
    
    if (e.target.classList.contains('remove-cart') || e.target.parentElement.classList.contains('remove-cart')) {
      const button = e.target.classList.contains('remove-cart') ? e.target : e.target.parentElement;
      const index = parseInt(button.dataset.index);
      cart.splice(index, 1);
      
      localStorage.setItem('fourSkinCart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
      
      showNotification('Product removed from cart');
    }
  });
  
  // Initialize cart
  updateCartCount();
  updateCartDisplay();

  // Product Data
  const products = [
    {
      id: 1,
      name: "Natural Cleanser",
      price: 2500,
      category: "cleanser",
      image: "assets/0 (14).jpg",
      description: "Gentle cleansing for all skin types with natural botanicals",
      rating: 4.8,
      badge: "new"
    },
    {
      id: 2,
      name: "Hydrating Serum",
      price: 4500,
      category: "serum",
      image: "assets/0 (12).jpg",
      description: "Deep hydration for radiant skin with hyaluronic acid",
      rating: 4.9,
      badge: "bestseller"
    },
    {
      id: 3,
      name: "Anti-Aging Cream",
      price: 6500,
      category: "moisturizer",
      image: "assets/0 (13).jpg",
      description: "Restore youthful radiance with peptides and retinol",
      rating: 4.7,
      badge: ""
    },
    {
      id: 4,
      name: "Vitamin C Serum",
      price: 5500,
      category: "serum",
      image: "assets/0 (2).jpg",
      description: "Brighten and even skin tone with pure vitamin C",
      rating: 4.9,
      badge: "bestseller"
    },
    {
      id: 5,
      name: "Detox Mask",
      price: 3500,
      category: "mask",
      image: "assets/0 (8).jpg",
      description: "Deep cleansing treatment with activated charcoal",
      rating: 4.6,
      badge: ""
    },
    {
      id: 6,
      name: "Night Moisturizer",
      price: 4000,
      category: "moisturizer",
      image: "assets/0 (14).jpg",
      description: "Overnight rejuvenation with ceramides and peptides",
      rating: 4.8,
      badge: "new"
    }
  ];

  // Product Display
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
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">PKR ${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
            <button class="product-button add-to-cart" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
              <i class="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
            <button class="product-button quick-view" data-id="${product.id}">
              <i class="fas fa-eye"></i>
              Quick View
            </button>
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
  if (tabButtons) {
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
  }
  
  // Initial product display
  displayProducts();

  // Add to cart functionality
  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
      const button = e.target.closest('.add-to-cart');
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
      
      localStorage.setItem('fourSkinCart', JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
      
      // Show notification
      showNotification('Product added to cart!');
    }
  });

  // Testimonials Slider
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
  
  // Dots functionality
  if (testimonialDots) {
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showTestimonial(index));
    });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    if (testimonials.length > 0) {
      const newIndex = currentTestimonial < testimonials.length - 1 ? currentTestimonial + 1 : 0;
      showTestimonial(newIndex);
    }
  }, 5000);

  // Routine Tabs
  const routineTabs = document.querySelectorAll('.routine-tab');
  const routinePanels = document.querySelectorAll('.routine-panel');
  
  if (routineTabs) {
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
  }

  // Search Functionality
  const searchInput = document.querySelector('.search-input');
  
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      const query = searchInput.value.toLowerCase().trim();
      
      if (query === '') {
        displayProducts();
        return;
      }
      
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      
      productGrid.innerHTML = '';
      
      if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products found matching your search.</p>';
      } else {
        filteredProducts.forEach((product, index) => {
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          productCard.innerHTML = `
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}" loading="lazy">
              ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-price">PKR ${product.price.toFixed(2)}</p>
              <p class="product-description">${product.description}</p>
              <div class="product-actions">
                <button class="product-button add-to-cart" 
                        data-name="${product.name}" 
                        data-price="${product.price}" 
                        data-image="${product.image}">
                  <i class="fas fa-shopping-cart"></i>
                  Add to Cart
                </button>
                <button class="product-button quick-view" data-id="${product.id}">
                  <i class="fas fa-eye"></i>
                  Quick View
                </button>
              </div>
            </div>
          `;
          productGrid.appendChild(productCard);
          
          setTimeout(() => {
            productCard.classList.add('show');
          }, index * 50);
        });
      }
    }, 300));
  }

  // Form Handling
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      if (email && isValidEmail(email)) {
        console.log('Newsletter subscription:', email);
        showNotification('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      } else {
        showNotification('Please enter a valid email address', 'error');
      }
    });
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Header Scroll Effect
  const header = document.querySelector('.main-header');
  
  function updateHeaderOnScroll() {
    if (window.pageYOffset > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', throttle(updateHeaderOnScroll, 100));

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
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

  // Notification System
  function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${type === 'error' ? '#ff6b6b' : '#2e8b57'};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      max-width: 300px;
      font-weight: 500;
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

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Counter Animation
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
      
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }
  
  // Initialize counters when they come into view
  const counterElements = document.querySelectorAll('[data-count]');
  
  function checkCounters() {
    counterElements.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !counter.classList.contains('counted')) {
        counter.classList.add('counted');
        const target = parseInt(counter.dataset.count);
        animateCounter(counter, target);
      }
    });
  }
  
  // Initial check and scroll listener
  checkCounters();
  window.addEventListener('scroll', throttle(checkCounters, 100));

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.product-card, .ingredient-card, .testimonial-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Hero animations on load
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 500);

  // Error handling for images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.warn('Image failed to load:', this.src);
    });
  });

  // Performance optimization - Lazy loading for images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });

  console.log('🌿 Four Skincare - Enhanced Experience Loaded Successfully!');
});