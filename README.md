# Gráficas Diamante - Sitio Web

Nuevo sitio web para Gráficas Diamante construido con Next.js 16, React, TypeScript, Tailwind CSS y Framer Motion.

## Tecnologías

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animaciones)
- **Componentes 100% personalizados**

## Estructura del Proyecto

```
graficas-diamante-web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de inicio
│   └── globals.css          # Estilos globales
├── components/              # Componentes React
│   ├── ui/                  # Componentes UI reutilizables
│   ├── layout/              # Componentes de layout (Header, Footer)
│   └── sections/            # Secciones de página
├── public/                  # Archivos estáticos
│   └── images/             # Imágenes organizadas
│       ├── logos/          # Logos de la empresa
│       ├── clientes/       # Logos de clientes
│       ├── productos/      # Imágenes de productos
│       ├── servicios/      # Imágenes de servicios
│       ├── galeria/        # Galería de trabajos
│       └── icons/          # Iconos y assets
├── lib/                    # Utilidades y helpers
├── utils/                  # Funciones de utilidad
└── types/                  # TypeScript types

```

## Estructura de Imágenes

Todas las imágenes están organizadas en `/public/images/` siguiendo esta estructura:

- **logos/** - 3 logos de la empresa
- **clientes/** - 14 logos de clientes (Nutresa, Leonisa, Avon, etc.)
- **productos/** - 16 imágenes de productos
- **servicios/** - 8 imágenes de maquinaria y servicios
- **galeria/** - 16 trabajos (5 GIFs + 11 fotos)

✅ **TODAS LAS IMÁGENES YA ESTÁN DESCARGADAS** - Ver `IMAGENES-DESCARGADAS.md` en la raíz para el inventario completo.

## Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar producción
npm run start

# Linting
npm run lint
```

## Información de la Empresa

**Gráficas Diamante**
- Más de 50 años de experiencia
- Ubicación: Calle 49 sur 43ª60, Envigado, Colombia
- Teléfono: +57 (604) 3394300
- Email: servicioalcliente@graficasdiamante.com
- WhatsApp: +57 312 7201607

## Propuesta de Valor

"Impactamos las marcas de nuestros clientes con impresiones ELEGANTES, INNOVADORAS y DISTINTIVAS"

## Secciones del Sitio

1. **Inicio** - Hero, servicios destacados, clientes
2. **Nosotros** - Historia y valores
3. **Productos** - Catálogo de productos (8 categorías)
4. **Servicios** - Preprensa, Acabados, Tecnología, Offset, Digital
5. **Sostenibilidad** - Medio ambiente, Seguridad, Inclusión, Economía circular
6. **Trabaja con Nosotros** - Oportunidades laborales
7. **Contacto** - Formulario y datos de contacto

## Productos Principales

- Cajas Plegadizas
- Catálogos
- Material P.O.P.
- Carpetas
- Etiquetas
- Cuadernos y Libretas
- Tarjetas Blister

## Servicios Destacados

- Preprensa in house
- 10+ acabados especializados
- Impresión Offset (Heidelberg XL75 2020)
- Impresión Digital (HP Indigo Press 5500)
- Tecnología de punta

## Desarrollo

Este proyecto usa Next.js 16 con App Router y componentes de servidor por defecto.

### Próximos Pasos

1. Descargar todas las imágenes de `imagenes-extraidas.md`
2. Colocarlas en sus respectivas carpetas en `/public/images/`
3. Crear componentes UI personalizados
4. Implementar secciones principales
5. Agregar animaciones con Framer Motion
6. Configurar panel de administración (fase 2)

## Notas

- No usar SHADCN para el frontend público (solo para panel admin)
- Todos los componentes del frontend deben ser creados desde cero
- Usar Framer Motion para animaciones fluidas
- Mantener diseño moderno y elegante
