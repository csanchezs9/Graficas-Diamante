# Carpeta de Imágenes

Esta carpeta contiene todas las imágenes del sitio web organizadas por categoría.

## Estructura

```
images/
├── logos/          # Logos de Gráficas Diamante (3 archivos)
├── clientes/       # Logos de clientes (14 archivos)
├── productos/      # Fotos de productos (16 archivos)
├── servicios/      # Fotos de servicios/maquinaria (8 archivos)
├── galeria/        # Galería de trabajos (16 archivos: 5 GIFs + 11 JPGs)
└── icons/          # Iconos y assets adicionales
```

## Cómo Descargar las Imágenes

Ver el archivo `imagenes-extraidas.md` en la raíz del proyecto para las URLs completas de todas las imágenes que necesitas descargar.

## Convención de Nombres

- **logos/**: `logo-blanco.png`, `logo-color.png`, `logo-principal.png`
- **clientes/**: `nombre-cliente.png` (ej: `nutresa.png`, `leonisa.png`)
- **productos/**: `producto-01.jpg` a `producto-16.jpg`
- **servicios/**: nombres descriptivos (ej: `heidelberg.jpg`, `guillotina.jpg`)
- **galeria/**: `trabajo-01.jpg` a `trabajo-11.jpg` y `trabajo-gif-01.gif` a `trabajo-gif-05.gif`

## Uso en Componentes

```tsx
import Image from 'next/image'

// Ejemplo
<Image
  src="/images/logos/logo-principal.png"
  alt="Gráficas Diamante"
  width={200}
  height={100}
/>
```

## Notas

- Todas las imágenes deben ser optimizadas antes de subirlas
- Usar formatos modernos cuando sea posible (WebP)
- Mantener tamaños razonables para performance web
