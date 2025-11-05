

interface NavigationState {
  isNavigating: boolean;
  touchStartY: number;
  currentSectionIndex: number;
  isMobile: boolean;
  isMenuOpen: boolean;
}


export function initFullpageNavigation(): void {
  const state: NavigationState = {
    isNavigating: false,
    touchStartY: 0,
    currentSectionIndex: 0,
    isMobile: window.innerWidth < 768,
    isMenuOpen: false
  };
  
  window.addEventListener('resize', () => {
    state.isMobile = window.innerWidth < 768;
  });
  
  const checkMenuState = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      state.isMenuOpen = mobileMenu.classList.contains('opacity-100');
    }
  };

  function setupInitialView(): void {
    const mainContainer: HTMLElement | null = document.getElementById('main-container');
    const body: HTMLElement = document.body;
    
    if (mainContainer) {
      mainContainer.scrollTop = 0;
      
      setTimeout(() => {
        body.classList.add('loaded');
        mainContainer.scrollTop = 0;
      }, 100);
    }
    
    if (window.location.hash) {
      window.location.hash = '';
    }
  }
  
  /**
   * @param index - Índice de la sección a la que navegar
   */
  function navigateToSection(index: number): void {
    if (state.isMenuOpen) return;
    
    const mainContainer: HTMLElement | null = document.getElementById('main-container');
    if (!mainContainer) return;
    
    const sections: NodeListOf<Element> = document.querySelectorAll('.fullpage-section');
    
    if (index >= 0 && index < sections.length) {
      state.isNavigating = true;
      state.currentSectionIndex = index;
      
      const targetSection: Element = sections[index];
      const targetPosition: number = (targetSection as HTMLElement).offsetTop;
      
      mainContainer.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Comentado para mantener URLs limpias sin hashes
      // if (targetSection.id) {
      //   history.replaceState(null, '', `#${targetSection.id}`);
      // }

      setTimeout(() => {
        state.isNavigating = false;
      }, 800);
    }
  }
  
  /**
   * @param event - Evento de rueda del mouse
   */
  function handleWheelNavigation(event: WheelEvent): void {
    checkMenuState();
    
    if (state.isMobile || state.isMenuOpen) return;
    
    if (state.isNavigating) {
      event.preventDefault();
      return;
    }
    
    const scrollDirection: number = Math.sign(event.deltaY);
    if (scrollDirection > 0) {
        navigateToSection(state.currentSectionIndex + 1);
    } else {
      navigateToSection(state.currentSectionIndex - 1);
    }
    
    event.preventDefault();
  }
  
  /**
   * Registra la posición inicial del toque en móviles
   * @param event - Evento táctil de inicio
   */
  function handleTouchStart(event: TouchEvent): void {
    checkMenuState();
    
    if (state.isMenuOpen) return;
    
    state.touchStartY = event.touches[0].clientY;
  }
  
  /**
   * Maneja el fin del evento táctil para determinar dirección de swipe
   * @param event - Evento táctil de fin
   */
  function handleTouchEnd(event: TouchEvent): void {
    checkMenuState();
    
    if (state.isMenuOpen) return;
    
    if (state.isMobile) {
      const SWIPE_THRESHOLD: number = 80;
      
      if (state.isNavigating) return;
      
      const touchEndY: number = event.changedTouches[0].clientY;
      const touchDeltaY: number = state.touchStartY - touchEndY;
      
      if (Math.abs(touchDeltaY) > SWIPE_THRESHOLD) {
        if (touchDeltaY > 0) {
          navigateToSection(state.currentSectionIndex + 1);
        } else {
          navigateToSection(state.currentSectionIndex - 1);
        }
      }
      return;
    }
    
    if (state.isNavigating) return;
    
    const touchEndY: number = event.changedTouches[0].clientY;
    const touchDeltaY: number = state.touchStartY - touchEndY;
    const SWIPE_THRESHOLD: number = 50;
    
    if (Math.abs(touchDeltaY) > SWIPE_THRESHOLD) {
      if (touchDeltaY > 0) {
        navigateToSection(state.currentSectionIndex + 1);
      } else {
        navigateToSection(state.currentSectionIndex - 1);
      }
    }
  }
  
  /**
   */
  function navigateToInitialSection(): void {
    const hash: string = window.location.hash.substring(1);
    if (!hash) return;
    
    const sections: NodeListOf<Element> = document.querySelectorAll('.fullpage-section');
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].id === hash) {
        setTimeout(() => navigateToSection(i), 100);
        break;
      }
    }
  }
  
  /**
   */
  function setupEventListeners(): void {
    const mainContainer: HTMLElement | null = document.getElementById('main-container');
    if (!mainContainer) return;
    
    mainContainer.addEventListener('wheel', handleWheelNavigation, { passive: false });
    
    mainContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    mainContainer.addEventListener('touchend', handleTouchEnd, { passive: true });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', () => {
        setTimeout(checkMenuState, 10);
      });
    }
    
    if (closeMenuButton) {
      closeMenuButton.addEventListener('click', () => {
        setTimeout(checkMenuState, 10);
      });
    }
    
    mainContainer.addEventListener('scroll', () => {
      if (state.isNavigating || state.isMenuOpen) return;
      
      const scrollPosition = mainContainer.scrollTop;
      const sections = document.querySelectorAll('.fullpage-section');
      
      sections.forEach((section, index) => {
        const sectionEl = section as HTMLElement;
        const sectionTop = sectionEl.offsetTop;
        const sectionHeight = sectionEl.offsetHeight;
        
        if (scrollPosition >= sectionTop - 100 && 
            scrollPosition < sectionTop + sectionHeight - 100) {
          state.currentSectionIndex = index;
        }
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    navigateToInitialSection();
  });
  
  window.addEventListener('load', setupInitialView);
} 