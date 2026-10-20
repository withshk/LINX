import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트(5173)에서 /api로 보낸 요청을 백엔드(8080)로 대신 전달 → CORS 우회, 세션 쿠키도 같은 출처로 붙음
      '/api': 'http://localhost:8080',
      // 백엔드가 저장한 링크 이미지(/images/link/...)
      '/images': 'http://localhost:8080',
    },
  },
})
