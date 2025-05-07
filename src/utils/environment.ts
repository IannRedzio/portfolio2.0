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
  
  const localHostnames = ['localhost', '127.0.0.1'];
  
  return localHostnames.includes(hostname);
} 