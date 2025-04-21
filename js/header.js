class SpecialHeader extends HTMLElement {
  constructor() {
    super();
    this.scrolled = false;
    this.toggle = false;

    // Easter egg: Secret code sequence
    this.easterEggCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.currentSequence = [];
  }

  connectedCallback() {
    // Check if we're in local development or production
    this.isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    this.render();
    this.addStyles();
    this.addEventListeners();
    this.highlightActiveLink();

    // Add Easter egg key listener
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    // Use different links based on environment
    const homeLink = this.isLocalDev ? '/index.html' : '/';
    const solutionLink = this.isLocalDev ? '/components/solution/solution.html' : '/solution';
    const contactLink = this.isLocalDev ? '/components/contact/contact.html' : '/contact';

    this.innerHTML = `
      <!-- Header ( Navbar ) code start here -->
      <div id="header" class="w-full h-[90px] py-[80px">
        <div class="navbar px-[25px] md:px-[96px] py-[20px] bg-transparent flex justify-between items-center fixed top-0 z-[1000] transition-all duration-300 ease-in-out">
          <div class="flex flex-row gap-2">
            <div class="bg-Logo w-[200px] h-[60px] bg-contain bg-no-repeat"></div>
          </div>
          <div class="md:flex hidden gap-[34px] items-center">
            <a href="${homeLink}" class='nav-link text-[14px] font-bold leading-[17.6px]'>Home</a>
            <a href="${solutionLink}" class='nav-link text-[14px] font-bold leading-[17.6px]'>Solution</a>
            <a href="${contactLink}" class='nav-link text-[14px] font-bold leading-[17.6px]'>Contact us</a>
            <!-- <button type="button" class="flex items-center justify-center w-[134px] h-[40px] px-[24px] py-[14px] text-[14px] font-bold text-[black] rounded-[8px]">Button</button> -->
          </div>

          <div class="md:hidden flex items-center relative z-[1001]">
            <span class="toggle-icon bars" aria-hidden="true">
              <i class="fas fa-bars text-white text-2xl" aria-hidden="true"></i>
            </span>
            <span class="toggle-icon times hidden" aria-hidden="true">
              <i class="fas fa-times text-white text-2xl" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div class="mobile-nav md:hidden fixed top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-start transform ${this.toggle ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out">
          <ul class="flex flex-col items-start gap-10 pl-7 text-black font-bold mt-32">
            <li class="cursor-pointer" data-link="home"><a href="${homeLink}" class="nav-link">Home</a></li>
            <li class="cursor-pointer" data-link="solution"><a href="${solutionLink}" class="nav-link">Solution</a></li>
            <li class="cursor-pointer" data-link="contact"><a href="${contactLink}" class="nav-link">Contact us</a></li>
            <li class="cursor-pointer" data-link="button"><button type="button" class="mnavb flex items-center justify-center w-[134px] h-[40px] px-[24px] py-[14px] text-[14px] font-bold rounded-[8px]">Button</button></li>
          </ul>
        </div>
      </div>
      <!-- Header ( Navbar ) code end here -->
      
      <!-- Easter Egg Element (hidden by default) -->
      <div id="easter-egg" class="easter-egg-container" style="display: none;">
        <div class="easter-egg-content">
          <h3>🎉 You found the Easter Egg! 🎉</h3>
          <p>Happy coding to the awesome Spinovix Developer team! Jairam Deo, Punit Deshmukh, Vinayak Jadhav 😊
                </p> </p>
        </div>
      </div>
    `;
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Navbar basic styles*/
      .navbar {
        position: fixed; /* Make the navbar fixed */
        top: 0; /* Position it at the top of the viewport */
        width: 100%; /* Occupy full width */
        z-index: 1000; /* Ensure it stays on top of other elements */
        height: 90px; /* Set height to 90px */
        border: 1.5px solid #f9f9f9;
        border-radius: 2px;        
        background-color: #f9f9f9;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);        
      }
      .mnavb{
        // color: #2385C6 !important;
        color: #2385C6 !important;
        border: 1px solid #2385C6 !important;        
      } 
      .mnavb:hover{
              background-color: #2385C6;
        color: #fff !important;   
      }   

      .navbar a:hover {
        /* Add padding to create space between the link text and the border */
        padding-bottom: 8px;
        border-bottom: 1.3px solid;
        // color: #726ae3;
        color: #2385C6;

        /* Apply a gradient as border */
        border-image: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, #726ae3 52%, rgba(255, 255, 255, 0.1) 100%) 1
        /* This ensures the gradient is applied properly */
      }
          /* Update color of toggle icons */
  .toggle-icon i {
    color: black; /* Change color to black */
  }

      .hidden {
        display: none;
      }

      /* Ensure flex container does not interfere with desktop view */
      .md\\:flex.hidden {
        display: none;
      }

      @media (min-width: 768px) {
        .md\\:flex {
          display: flex !important;
        }
        .mobile-nav {
          display: none;
        }
      }

      .active-link {
        color: #2385C6 !important;
      }
      
      /* Easter Egg Styles */
      .easter-egg-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background: linear-gradient(135deg, #4056a1, #2385C6);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: bounceIn 0.5s;
      }
      
      .easter-egg-content {
        text-align: center;
        color: white;
        padding: 10px;
      }
      
      .easter-egg-content h3 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      
      @keyframes bounceIn {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    this.appendChild(style);
  }

  addEventListeners() {
    const toggleIcons = this.querySelectorAll('.toggle-icon');
    const mobileNav = this.querySelector('.mobile-nav');

    toggleIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        this.toggle = !this.toggle;
        this.updateToggleIcons();
        mobileNav.classList.toggle('translate-x-0');
      });
    });

    const mobileNavLinks = this.querySelectorAll('.mobile-nav li');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.toggle = false;
        this.updateToggleIcons();
        mobileNav.classList.remove('translate-x-0');
      });
    });
  }

  highlightActiveLink() {
    const links = this.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    // Define the path mappings based on environment
    let pathMappings;

    if (this.isLocalDev) {
      // Local development paths
      pathMappings = {
        '/index.html': ['/index.html', '/'],
        '/components/solution/solution.html': ['/components/solution/solution.html'],
        '/components/contact/contact.html': ['/components/contact/contact.html']
      };
    } else {
      // Production paths
      pathMappings = {
        '/': ['/', '/index', '/index.html'],
        '/solution': ['/solution', '/components/solution/solution.html'],
        '/contact': ['/contact', '/components/contact/contact.html']
      };
    }

    let activeFound = false;

    // Check each link against our path mappings
    links.forEach(link => {
      const href = link.getAttribute('href');

      // Check if current path matches any of our mappings
      for (const [linkPath, possiblePaths] of Object.entries(pathMappings)) {
        if (possiblePaths.includes(currentPath) && href === linkPath) {
          link.classList.add('active-link');
          activeFound = true;
          break;
        }
      }

      if (!activeFound && link.classList.contains('active-link')) {
        link.classList.remove('active-link');
      }
    });

    // If no active link was found, default to home
    if (!activeFound) {
      const homeHref = this.isLocalDev ? '/index.html' : '/';
      const homeLinks = this.querySelectorAll(`a[href="${homeHref}"]`);
      homeLinks.forEach(link => {
        link.classList.add('active-link');
      });
    }
  }

  updateToggleIcons() {
    const barsIcon = this.querySelector('.toggle-icon.bars');
    const timesIcon = this.querySelector('.toggle-icon.times');

    if (this.toggle) {
      barsIcon.classList.add('hidden');
      timesIcon.classList.remove('hidden');
    } else {
      barsIcon.classList.remove('hidden');
      timesIcon.classList.add('hidden');
    }
  }

  // Easter egg functionality
  handleKeyDown(event) {
    // Add the key to the current sequence
    this.currentSequence.push(event.key);

    // Keep only the last N keys where N is the length of the Easter egg code
    if (this.currentSequence.length > this.easterEggCode.length) {
      this.currentSequence.shift();
    }

    // Check if the current sequence matches the Easter egg code
    if (JSON.stringify(this.currentSequence) === JSON.stringify(this.easterEggCode)) {
      this.showEasterEgg();
    }
  }

  showEasterEgg() {
    const easterEgg = document.getElementById('easter-egg');
    easterEgg.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
      easterEgg.style.animation = 'fadeOut 1s';
      setTimeout(() => {
        easterEgg.style.display = 'none';
        easterEgg.style.animation = '';
      }, 1000);
    }, 5000);
  }
}

customElements.define('special-header', SpecialHeader);