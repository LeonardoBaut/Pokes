This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# 🦁 PokeNext Explorer

Una aplicación web moderna para explorar el mundo Pokémon, construida con **Next.js**, **Tailwind CSS** y consumiendo datos en tiempo real de la **PokeAPI**.

Este proyecto demuestra el uso de rutas dinámicas, componentes de servidor (Server Components) y diseño responsivo adaptable.

## 🚀 Características Principales

* **Rutas Dinámicas:** Navegación fluida entre `/pokes` y `/pokes/[id]` para ver detalles específicos.
* **Diseño Responsivo (Mobile First):**
    * 📱 **Móvil:** Menú superior y navegación vertical.
    * 💻 **Escritorio:** Menú lateral (sidebar) y diseño en filas.
* **Server Components:** Consumo de datos (Fetch) realizado directamente en el servidor para mayor velocidad y SEO.
* **Next.js 15 Ready:** Implementación correcta de `params` asíncronos (`await params`).
* **Manejo de Errores:** Control de rutas inexistentes (404) y validación de datos.

## 🛠️ Tecnologías

* **Framework:** Next.js (App Router)
* **Estilos:** Tailwind CSS
* **Datos:** [PokeAPI](https://pokeapi.co/)
* **Lenguaje:** TypeScript / React

## 📂 Estructura del Proyecto

El núcleo de la aplicación se encuentra en `app/pokes/`:

```text
app/pokes/
├── layout.tsx        # Menú lateral persistente (se mantiene al navegar)
├── page.tsx          # Vista principal: Grid de tarjetas Pokémon
└── [id]/             # Carpeta de Ruta Dinámica
    └── page.tsx      # Vista de Detalle: Info completa del Pokémon