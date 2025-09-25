document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    themeToggle.querySelector('i').classList.toggle('fa-moon');
    themeToggle.querySelector('i').classList.toggle('fa-sun');
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 100);
  });

  // Products Management - FIXED IMAGE URLs
  let products = [
    {
      id: 1,
      name: 'Gentle Cleansing Foam',
      price: 25.00,
      category: 'cleanser',
      image: 'assets/0 (14).jpg',
      description: 'A soft foaming cleanser that gently removes impurities without stripping the skin.'
    },
    {
      id: 2,
      name: 'Hydrating Moisturizer',
      price: 35.00,
      category: 'moisturizer',
      image: 'assets/0 (2).jpg',
      description: 'Deeply hydrating cream with hyaluronic acid and natural oils for all-day moisture.'
    },
    {
      id: 3,
      name: 'Vitamin C Serum',
      price: 45.00,
      category: 'serum',
      image: 'assets/0 (13).jpg',
      description: 'Brightening serum with stable vitamin C to even skin tone and reduce dark spots.'
    },
    {
      id: 4,
      name: 'Clay Detox Mask',
      price: 30.00,
      category: 'mask',
      image: 'assets/0 (8).jpg',
      description: 'Purifying clay mask that draws out toxins and unclogs pores for clearer skin.'
    },
    {
      id: 5,
      name: 'Revitalizing Eye Cream',
      price: 40.00,
      category: 'serum',
      image: 'assets/0 (12).jpg',
      description: 'Nourishing eye cream that reduces puffiness and dark circles with natural extracts.'
    }
  ];

  // Populate Product Grid
  const productGrid = document.getElementById('productGrid');
  const populateProducts = (filteredProducts = products, container = productGrid) => {
    container.innerHTML = '';
    filteredProducts.forEach((product, index) => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.dataset.category = product.category;
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
          ${index < 2 ? '<div class="product-badge">New</div>' : ''}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">PKR ${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
            <button class="product-button add-to-cart" data-id="${product.id}">
              Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>
            <button class="product-button quick-view" data-id="${product.id}">
              Quick View <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
      setTimeout(() => card.classList.add('show'), index * 100);
    });
  };
  populateProducts();

  // Product Filtering
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.category;
      const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
      populateProducts(filteredProducts);
    });
  });

  // Search Functionality
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.searchResults');
  const searchResultsGrid = document.querySelector('.search-results-grid');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    if (query.length > 0) {
      const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
      searchResults.classList.add('active');
      if (filteredProducts.length === 0) {
        searchResultsGrid.innerHTML = '<p class="no-results">No products found.</p>';
      } else {
        populateProducts(filteredProducts, searchResultsGrid);
      }
    } else {
      searchResults.classList.remove('active');
      searchResultsGrid.innerHTML = '';
    }
  });

  // Cart Functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.querySelector('.cart-count');
  const cartToggle = document.getElementById('cartToggle');
  const cartClose = document.getElementById('cartClose');
  const overlay = document.getElementById('overlay');

  const updateCart = () => {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        total += product.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div>
            <h4>${product.name}</h4>
            <p>$${product.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-cart" data-id="${product.id}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      }
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.classList.toggle('show', cart.length > 0);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    updateCart();
  };

  productGrid.addEventListener('click', e => {
    if (e.target.closest('.add-to-cart')) {
      const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
      addToCart(productId);
      cartSidebar.classList.add('active');
      overlay.classList.add('active');
    }
  });

  cartItemsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('remove-cart')) {
      const productId = parseInt(e.target.dataset.id);
      cart = cart.filter(item => item.id !== productId);
      updateCart();
    }
  });

  cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
  });

  cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    quickViewModal.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Quick View Modal
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewImage = quickViewModal.querySelector('.quick-view-image');
  const quickViewName = quickViewModal.querySelector('.quick-view-name');
  const quickViewPrice = quickViewModal.querySelector('.quick-view-price');
  const quickViewDescription = quickViewModal.querySelector('.quick-view-description');
  const quickViewAddToCart = quickViewModal.querySelector('.add-to-cart');
  const closeModal = quickViewModal.querySelector('.close-modal');

  productGrid.addEventListener('click', e => {
    if (e.target.closest('.quick-view')) {
      const productId = parseInt(e.target.closest('.quick-view').dataset.id);
      const product = products.find(p => p.id === productId);
      if (product) {
        quickViewImage.src = product.image;
        quickViewImage.alt = product.name;
        quickViewName.textContent = product.name;
        quickViewPrice.textContent = `$${product.price.toFixed(2)}`;
        quickViewDescription.textContent = product.description;
        quickViewAddToCart.dataset.id = productId;
        quickViewModal.classList.add('active');
        overlay.classList.add('active');
      }
    }
  });

  quickViewAddToCart.addEventListener('click', () => {
    const productId = parseInt(quickViewAddToCart.dataset.id);
    addToCart(productId);
    quickViewModal.classList.remove('active');
    cartSidebar.classList.add('active');
  });

  closeModal.addEventListener('click', () => {
    quickViewModal.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Particles.js Configuration
  particlesJS('particles', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ['#2E8B57', '#4CAF50', '#D4F4E2'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 5, random: true },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });

  // AOS Initialization
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });

  // Shape Animations - Made smoother
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    shape.style.top = `${Math.random() * 80 + 10}%`;
    shape.style.left = `${Math.random() * 80 + 10}%`;
    shape.style.animationDelay = `${index * 2}s`;
    shape.style.animationDuration = `${30 + Math.random() * 20}s`; // Increased duration for smoother animation
    shape.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)'; // Smoother timing function
  });

  // Poster Section Animation
  const posterSection = document.getElementById('posterSectionMyphone');
  const posterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        posterSection.classList.add('visible-myphone');
        posterObserver.unobserve(posterSection);
      }
    });
  }, { threshold: 0.2 });
  posterObserver.observe(posterSection);
});