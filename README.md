# FitChrono 🏋️⏱️

Aplicación de entrenamiento personal desarrollada en **React + Vite + TypeScript** con **tema oscuro/claro** y **timer circular**.

## 🚀 Funcionalidades
- **🌙 Sistema de Temas** - Modo oscuro y claro con toggle
- **⏱️ Timer Circular** - Diseño moderno y visual para entrenamientos
- **🔐 Login** con validación
- **🏠 Home** con acceso rápido a módulos
- **⏰ Cronómetro** con fases de preparación, entrenamiento y descanso
- **📅 Calendario** para marcar progreso
- **⚖️ IMC** para calcular índice de masa corporal
- **💪 Rutinas** organizadas por día y grupo muscular
- **🎵 Playlist** con soporte para YouTube y archivos locales

## 📂 Estructura
- `src/features/` → funcionalidades organizadas por feature
- `src/components/ui/` → componentes reutilizables (shadcn/ui)
- `src/components/layouts/` → layout global (Header, Footer, Layout)
- `src/store/` → estado global con Zustand
- `src/lib/` → utilidades y configuración

## 🛠️ Instalación Local
```bash
npm install
npm run dev
```

## 🚀 Deployment en Vercel

### 1. **Preparar el repositorio**
```bash
git add .
git commit -m "feat: add dark theme and circular timer"
git push origin main
```

### 2. **Configurar en Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `app-Gym`
4. Vercel detectará automáticamente que es un proyecto Vite

### 3. **Variables de Entorno (Opcional)**
Si usas AWS Amplify, agrega estas variables en Vercel:
- `VITE_COGNITO_USER_POOL_ID`
- `VITE_COGNITO_CLIENT_ID`
- `VITE_REALTIME_API_ENDPOINT`

### 4. **Deploy**
Vercel hará el deploy automáticamente. La aplicación estará disponible en:
`https://tu-proyecto.vercel.app`

## 🎨 Características Técnicas
- **React 19** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **shadcn/ui** para componentes
- **Zustand** para estado global
- **React Hook Form + Zod** para validación
- **Responsive Design** para móviles
- **Tema Oscuro/Claro** con persistencia