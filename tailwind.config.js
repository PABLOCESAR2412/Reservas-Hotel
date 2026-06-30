/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Usaremos una clase para alternar el modo oscuro
  content: [
    "./src/**/*.{html,ts}", // Angular leerá las clases de Tailwind aquí
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e3a8a',       // Azul marino corporativo (blue-900)
        'primary-hover': '#1e40af', // Hover para botones (blue-800)
        'accent': '#3b82f6',        // Azul claro para detalles (blue-500)
        'brand-dark': '#0f172a',    // Fondo para el Navbar en modo oscuro
      }
    },
  },
  plugins: [],
}
