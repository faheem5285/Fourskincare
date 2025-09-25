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

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  let lastScrollTop = 0;
  
  function updateHeaderOnScroll() {
    if (header) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-2px)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop;
    }
  }
  
  window.addEventListener('scroll', throttle(updateHeaderOnScroll, 100));

  // ===== SEARCH FUNCTIONALITY =====
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');
  
  if (searchInput && searchIcon) {
    searchInput.addEventListener('focus', () => {
      searchIcon.style.transform = 'scale(1.2) rotate(10deg)';
    });
    
    searchInput.addEventListener('blur', () => {
      searchIcon.style.transform = 'scale(1) rotate(0deg)';
    });
  }

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
  const overlay = document.getElementById('overlay');
  
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
    if (overlay) {
      overlay.classList.remove('active');
    }
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
    
    if (e.target === overlay) {
      closeQuickView();
    }
  });

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

  // ===== CART FUNCTIONALITY =====
  let cart = [];
  const cartBtn = document.querySelector('.cart-btn');
  const cartCount = document.querySelector('.cart-count');

  function updateCartCount() {
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      if (totalItems > 0) {
        cartCount.classList.add('show');
      } else {
        cartCount.classList.remove('show');
      }
    }
  }

  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
  }

  // Add to cart event listeners
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
      const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
      const productName = button.dataset.name;
      const productPrice = parseFloat(button.dataset.price);
      const productImage = button.dataset.image;
      
      if (productName && productPrice && productImage) {
        addToCart({
          id: Date.now(),
          name: productName,
          price: productPrice,
          image: productImage
        });
      } else {
        // Find product from the card
        const productCard = button.closest('.product-card');
        if (productCard) {
          const name = productCard.querySelector('.product-name').textContent;
          const priceText = productCard.querySelector('.product-price').textContent;
          const price = parseFloat(priceText.replace('PKR ', ''));
          const image = productCard.querySelector('img').src;
          
          addToCart({
            id: Date.now(),
            name: name,
            price: price,
            image: image
          });
        }
      }
    }
  });

  // ===== FORM HANDLING =====
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      if (email) {
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
      if (backToTop) backToTop.classList.add('show');
    } else {
      if (backToTop) backToTop.classList.remove('show');
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
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

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

  // ===== PARTICLE EFFECT =====
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-green);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      opacity: 0.3;
    `;
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.body.appendChild(particle);
    const duration = Math.random() * 3000 + 2000;
    const finalX = Math.random() * 200 - 100;
    particle.animate([
      { transform: 'translateY(0px) translateX(0px)', opacity: 0.3 },
      { transform: `translateY(-${window.innerHeight + 100}px) translateX(${finalX}px)`, opacity: 0 }
    ], {
      duration: duration,
      easing: 'linear'
    }).onfinish = () => particle.remove();
  }

  setInterval(createParticle, 3000);

  // ===== FLOATING PRODUCTS ANIMATION =====
  const floatingProducts = document.querySelectorAll('.floating-product');
  floatingProducts.forEach((product, index) => {
    const delay = parseInt(product.dataset.delay) || 0;
    
    setTimeout(() => {
      product.style.animation = `productFloat 4s ease-in-out infinite`;
      product.style.animationDelay = `${index}s`;
    }, delay);
  });

  // ===== HERO STATS COUNTER =====
  const heroStats = document.querySelectorAll('.hero-stats-enhanced .stat-number');
  let statsAnimated = false;

  function animateHeroStats() {
    if (statsAnimated) return;
    
    heroStats.forEach(stat => {
      const target = parseInt(stat.dataset.count);
      if (target) {
        animateCounter(stat, target, 2000);
      }
    });
    statsAnimated = true;
  }

  // Trigger stats animation when hero section is visible
  const heroSection = document.querySelector('.new-hero-section');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(animateHeroStats, 2000); // Delay to match other animations
        }
      });
    });
    observer.observe(heroSection);
  }

  // ===== INITIALIZATION =====
  console.log('🌿 Four Skincare - Enhanced Experience Loaded Successfully!');
  
  // Initialize cart count
  updateCartCount();
});