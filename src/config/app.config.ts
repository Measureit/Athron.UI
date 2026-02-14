// ===== KONFIGURACJA APLIKACJI =====
// Centralna konfiguracja dla całej aplikacji

export const APP_CONFIG = {
  // Inne konfiguracje aplikacji
  APP_NAME: 'Boisko Mocy',
  VERSION: '1.0.0',
  
  // Konfiguracja bloga
  BLOG: {
    POSTS_PER_PAGE: 6,
    HOME_PAGE_POSTS: 3,
    DEFAULT_IMAGE: 'https://via.placeholder.com/400x250/bb8fce/ffffff?text=Artykuł'
  },
  
  // Ścieżki API
  API: {
    BLOG_FILES: '/api/blog-files',
    BLOG_CONTENT: '/content/blog'
  }
} as const;
