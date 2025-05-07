/**
 * Utilidades para detectar el entorno de ejecución
 */

/**
 * Verifica si la URL proporcionada corresponde a un entorno local
 * @param url URL a verificar
 * @returns true si es un entorno local, false en caso contrario
 */
export function isLocalEnvironment(url: URL): boolean {
  const hostname = url.hostname;
  
  // Detectar dominios de producción conocidos
  if (hostname.includes('vercel.app') || 
      hostname.includes('netlify.app') || 
      hostname.includes('pages.dev') ||
      hostname.includes('github.io')) {
    return false;
  }
  
  // Lista de hostnames que siempre son considerados locales
  return hostname === 'localhost' || 
         hostname === '127.0.0.1' ||
         hostname.includes('.local') ||
         hostname.includes('.test');
} 