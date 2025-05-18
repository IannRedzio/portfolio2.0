/**
 * Sistema de navegación fullpage
 */

interface NavigationState {
  isNavigating: boolean;
  touchStartY: number;
  currentSectionIndex: number;
}


export function initFullpageNavigation(): void {
  const state: NavigationState = {
    isNavigating: false,
    touchStartY: 0,
    currentSectionIndex: 0
  };
  

  function setupInitialView(): void {
    const mainContainer: HTMLElement | null = document.getElementById('main-container');
    const body: HTMLElement = document.body;
    
    if (mainContainer) {
      // Forzar scroll al inicio
      mainContainer.scrollTop = 0;
      
      // Aplicar transiciones suaves después de la carga
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
   * Navega a una sección específica según su índice
   * @param index - Índice de la sección a la que navegar
   */
  function navigateToSection(index: number): void {
    const mainContainer: HTMLElement | null = document.getElementById('main-container');
    if (!mainContainer) return;
    
    const sections: NodeListOf<Element> = document.querySelectorAll('.fullpage-section');
    
    if (index >= 0 && index < sections.length) {
      // Bloquear nueva navegación mientras animamos
      state.isNavigating = true;
      state.currentSectionIndex = index;
      
      const targetSection: Element = sections[index];
      const targetPosition: number = (targetSection as HTMLElement).offsetTop;
      
      // Animar scroll
      mainContainer.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Actualizar URL sin causar scroll
      if (targetSection.id) {
        history.replaceState(null, '', `#${targetSection.id}`);
      }
      
      // Permitir nueva navegación después de la animación
      setTimeout(() => {
        state.isNavigating = false;
      }, 800);
    }
  }
  
  /**
   * Maneja eventos de rueda del mouse para navegación
   * @param event - Evento de rueda del mouse
   */
  function handleWheelNavigation(event: WheelEvent): void {
    if (state.isNavigating) {
      event.preventDefault();
      return;
    }
    
    const scrollDirection: number = Math.sign(event.deltaY);
    if (scrollDirection > 0) {
      // Scroll hacia abajo: siguiente sección
      navigateToSection(state.currentSectionIndex + 1);
    } else {
      // Scroll hacia arriba: sección anterior
      navigateToSection(state.currentSectionIndex - 1);
    }
    
    event.preventDefault();
  }
  
  /**
   * Registra la posición inicial del toque en móviles
   * @param event - Evento táctil de inicio
   */
  function handleTouchStart(event: TouchEvent): void {
    state.touchStartY = event.touches[0].clientY;
  }
  
  /**
   * Maneja el fin del evento táctil para determinar dirección de swipe
   * @param event - Evento táctil de fin
   */
  function handleTouchEnd(event: TouchEvent): void {
    if (state.isNavigating) return;
    
    const touchEndY: number = event.changedTouches[0].clientY;
    const touchDeltaY: number = state.touchStartY - touchEndY;
    const SWIPE_THRESHOLD: number = 50;
    
    if (Math.abs(touchDeltaY) > SWIPE_THRESHOLD) {
      if (touchDeltaY > 0) {
        // Deslizamiento hacia arriba: siguiente sección
        navigateToSection(state.currentSectionIndex + 1);
      } else {
        // Deslizamiento hacia abajo: sección anterior
        navigateToSection(state.currentSectionIndex - 1);
      }
    }
  }
  
  /**
   * Navega a la sección correspondiente al hash inicial en la URL
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
   * Configura los escuchadores de eventos para la navegación
   */
  function setupEventListeners(): void {
    const mainContainer: HTMLElement | null = document.getElementById('main-container');
    if (!mainContainer) return;
    
    // Evento de rueda para navegación vertical
    mainContainer.addEventListener('wheel', handleWheelNavigation, { passive: false });
    
    // Eventos táctiles para dispositivos móviles
    mainContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    mainContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
  
  // Inicializar navegación cuando el DOM está cargado
  document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    navigateToInitialSection();
  });
  
  // Configurar vista inicial cuando la página esté completamente cargada
  window.addEventListener('load', setupInitialView);
} 