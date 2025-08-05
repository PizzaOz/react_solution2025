import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Отключаем параллельное выполнение для первых тестов
  fullyParallel: false,
  // Оставляем 1 worker для последовательного выполнения
  workers: 1,
  
  // Отключаем retries локально (включены только на CI)
  retries: process.env.CI ? 2 : 0,
  
  reporter: 'html',
  
  use: {
    // Указываем базовый URL вашего приложения
    baseURL: 'http://localhost:8050',
    
    // Включаем трассировку только для упавших тестов
    trace: 'on-first-retry',
    
    // Делаем скриншоты при падении тестов
    screenshot: 'only-on-failure',
  },

  // Оставляем только Chromium для начала
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Можно добавить дополнительные опции:
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
      },
    }
  ],

  // Добавляем автоматический запуск сервера перед тестами
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8050',
    reuseExistingServer: true,
    timeout: 120 * 1000, // Увеличиваем таймаут для запуска
  },
});
