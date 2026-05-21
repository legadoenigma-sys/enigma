
# ENIGMA Website — Guía de Archivos

## 📁 Estructura de Carpetas

```
ENIGMA-Website/
│
├── index.html              ← Página principal
│
├── css/
│   ├── variables.css       ← Variables, tipografía, colores, botones
│   ├── layout.css          ← Cursor, navbar, hero
│   ├── sections.css        ← Todas las secciones del sitio
│   └── chatbot.css         ← Estilos del chatbot
│
├── js/
│   ├── main.js             ← Cursor, partículas, navbar, tabs, menú móvil
│   └── chatbot.js          ← Lógica del chatbot
│
├── images/
│   ├── logo.jpg            ← ✅ Logo ENIGMA (ya incluido)
│   │
│   ├── ilusión-piña.jpg       ← Foto del licor Ilusión (Piña)
│   ├── euforia-banano.jpg     ← Foto del licor Euforia (Banano)
│   ├── pasion-maracuya.jpg    ← Foto del licor Pasión (Maracuyá)
│   ├── dulzura-mora.jpg       ← Foto del licor Dulzura (Mora)
│   ├── amor-petalos.jpg       ← Foto del licor Amor (Pétalos)
│   ├── serenidad-yerbabuena.jpg ← Foto del licor Serenidad
│   ├── capricho-cacao.jpg     ← Foto del licor Capricho (Cacao)
│   ├── suave-cafe.jpg         ← Foto del licor Suave (Café)
│   ├── intenso-cafe.jpg       ← Foto del licor Intenso (Café fuerte)
│   └── armonia-cafe.jpg       ← Foto del café artesanal Armonía
│
└── fonts/                  ← (Vacía — fuentes cargadas desde Google Fonts)
```

---

## 🖼️ Cómo Agregar Imágenes

### Paso a Paso:

1. **Toma la foto del producto** (botella sobre fondo oscuro, iluminación lateral)
2. **Renombra el archivo** exactamente como aparece en la lista de arriba
   - Ejemplo: la foto de Ilusión → guardar como `ilusión-piña.jpg`
3. **Copia el archivo** a la carpeta `images/`
4. **Abre el sitio** — la imagen aparecerá automáticamente

### Si la imagen no carga:
El sitio tiene un **fallback automático**: si no encuentra la imagen, muestra un emoji decorativo. No rompe el diseño.

---

## 📐 Tamaños Recomendados de Imágenes

| Uso           | Tamaño      | Formato |
|---------------|-------------|---------|
| Productos     | 600 × 600 px | JPG/WebP |
| Logo          | ya incluido | JPG |

---

## 🔗 Redes Sociales — Actualizar Links

Abre `index.html` y busca estas líneas para cambiar los links:

```html
<!-- Instagram -->
<a href="https://www.instagram.com/TU_USUARIO" ...>

<!-- Facebook -->
<a href="https://www.facebook.com/TU_PAGINA" ...>

<!-- WhatsApp (ya configurado con el número 320 577 5112) -->
<a href="https://wa.me/573205775112" ...>
```

---

## 📱 Para Publicar el Sitio

Opciones gratuitas:
- **Netlify**: arrastra la carpeta `ENIGMA-Website/` a netlify.com/drop
- **GitHub Pages**: sube la carpeta a un repositorio público
- **Vercel**: igual que Netlify, drag & drop

---

## 🎨 Tipografía del Logo

El sitio usa exactamente las mismas familias del logo:
- **ENIGMA** → Playfair Display 900 (serif bold, mayúsculas)
- **El legado del abuelo** → Great Vibes (script cursiva dorada)
- **Cuerpo** → Cormorant Garamond (serif elegante)

---

*ENIGMA — El Legado del Abuelo*