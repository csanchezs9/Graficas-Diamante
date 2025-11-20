# 📱 PLAN DE RESPONSIVE MOBILE

## ⚠️ IMPORTANTE - LEER PRIMERO

```
🚨 NO TOCAR LA VERSIÓN DE ESCRITORIO (PC) 🚨

- Solo trabajar en breakpoints móviles (< 768px)
- Usar clases de Tailwind para móvil: sin prefijo y sm:
- NO modificar clases md:, lg:, xl:, 2xl:
- Probar cada cambio en modo responsive del navegador
```

---

## 🎯 Objetivos

1. **Reducir tamaños** de elementos que se ven muy grandes en móvil
2. **Arreglar bugs** de layout en pantallas pequeñas
3. **Mejorar spacing** y padding para móvil
4. **Optimizar videos y animaciones** para móvil

---

## 📋 CHECKLIST DE BUGS A ARREGLAR

### **app/page.tsx - Homepage**

#### ❌ Problemas Detectados:
1. **Hero Video Section**
   - Texto "Más de 50 años" muy grande (text-3xl en móvil)
   - Botón "Descubre más" se ve apretado
   - Scroll indicator tapa contenido

2. **Hero Content Section**
   - Logo de pestaña (300x300) muy grande
   - Cards flotantes (50+ años, 100% calidad) se salen de pantalla
   - Textos muy largos, no caben

3. **Carousel de Productos**
   - Cards de 320px muy anchas para móvil
   - Gap de 32px muy grande, desperdicia espacio

4. **Sección Clientes**
   - Grid de 2 columnas en móvil (debe ser más compacto)
   - Logos muy grandes

#### ✅ Soluciones:

```tsx
// 1. HERO VIDEO - Reducir tamaños de texto
<h2 className="text-2xl md:text-4xl lg:text-5xl ...">
  {/* Cambiar de text-3xl a text-2xl en móvil */}
</h2>

// 2. HERO CONTENT - Logo más pequeño en móvil
<Image
  src="/images/logos/logo-pestana.png"
  width={200} // Cambiar a 200 para móvil
  height={200}
  className="w-[200px] md:w-[300px] ..."
/>

// 3. HERO CONTENT - Cards flotantes más pequeñas
<motion.div className="absolute top-8 -left-4 ... p-3 md:p-4">
  <p className="text-2xl md:text-3xl ...">50+</p>
  <p className="text-xs md:text-sm ...">Años</p>
</motion.div>

// 4. CAROUSEL - Cards más pequeñas
<motion.div className="relative w-64 md:w-80 h-48 md:h-64 ...">
  {/* Reducir de w-80 h-64 a w-64 h-48 */}
</motion.div>

// 5. CAROUSEL - Gap más pequeño
<motion.div className="flex gap-4 md:gap-8 py-8">
  {/* Reducir gap de 8 a 4 en móvil */}
</motion.div>

// 6. CLIENTES - Más columnas en móvil
<motion.div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4">
  {/* 3 columnas en móvil en lugar de 2 */}
</motion.div>
```

---

### **app/servicios/page.tsx - Servicios**

#### ❌ Problemas Detectados:
1. **Videos de Tecnologías**
   - Videos muy grandes en móvil
   - Textos title (text-4xl/5xl/6xl) se salen de pantalla
   - Logo de pestaña (120x120) muy grande
   - Botón CTA con texto muy largo

2. **Spacing**
   - Padding de secciones muy grande (py-8 md:py-12)
   - Gap entre grid items muy grande (gap-12 lg:gap-16)

#### ✅ Soluciones:

```tsx
// 1. VIDEOS - Más pequeños en móvil
<div className="relative w-full max-w-xs md:max-w-md mx-auto ...">
  {/* Cambiar max-w-md a max-w-xs en móvil */}
</div>

// 2. TITLES - Reducir tamaños
<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl ...">
  {/* Reducir de text-4xl a text-3xl base */}
</h2>

// 3. SUBTITLES - Más pequeños
<h3 className="text-lg md:text-xl lg:text-2xl ...">
  {/* Reducir subtitle */}
</h3>

// 4. LOGO PESTAÑA - Más pequeño
<Image
  src="/images/logos/logo-pestana.png"
  width={80}
  height={80}
  className="w-20 md:w-[120px] opacity-80"
/>

// 5. BOTÓN CTA - Texto más corto en móvil
<motion.div className="px-4 md:px-6 py-3 md:py-5 ...">
  <p className="text-xs md:text-sm lg:text-base leading-relaxed">
    {/* Reducir tamaño de fuente */}
  </p>
</motion.div>

// 6. SPACING - Reducir padding
<motion.section className="... py-6 md:py-8 lg:py-12 ...">
  {/* Reducir padding vertical */}
</motion.section>

// 7. GRID GAP - Más pequeño
<div className="grid ... gap-8 md:gap-12 lg:gap-16 ...">
  {/* Reducir gap en móvil */}
</div>
```

---

### **app/nosotros/page.tsx - Nosotros**

#### ❌ Problemas Detectados:
1. **Hero Section**
   - Logo muy grande
   - Título "Sobre Nosotros" (text-5xl/7xl/8xl) gigante
   - Partículas interfieren con lectura
   - Círculos animados muy grandes (600px, 400px)

2. **Stats Section**
   - Cards de stats muy grandes
   - Números (text-5xl/6xl) muy grandes
   - Decoraciones toman mucho espacio

3. **Timeline**
   - Cards muy anchas
   - Texto muy grande
   - Spacing excesivo

4. **Values Accordion**
   - Texto muy pequeño en algunos lugares
   - Padding inconsistente

5. **Contact Section**
   - Botón WhatsApp muy grande
   - Textos largos

#### ✅ Soluciones:

```tsx
// 1. HERO - Logo más pequeño
<Image
  src="/images/logos/logo-pestana.png"
  width={60}
  height={60}
  className="w-[60px] md:w-auto ..."
/>

// 2. HERO - Título más pequeño
<motion.h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl ...">
  {/* Reducir de text-5xl a text-4xl base */}
</motion.h1>

// 3. HERO - Círculos más pequeños
<motion.div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] ...">
  {/* Reducir tamaño de círculos decorativos */}
</motion.div>

// 4. STATS - Cards más pequeñas
<motion.div className="relative p-6 md:p-8 rounded-2xl ...">
  {/* Reducir padding */}
</motion.div>

<div className="text-4xl md:text-5xl lg:text-6xl ...">
  {/* Reducir números */}
</div>

// 5. TIMELINE - Cards más compactas
<motion.div className="inline-block p-4 md:p-5 rounded-xl ...">
  {/* Reducir padding */}
</motion.div>

<h3 className="text-base md:text-lg font-semibold ...">
  {/* Reducir títulos */}
</h3>

// 6. ACCORDION - Mejorar padding
<button className="w-full px-4 md:px-6 py-4 md:py-5 ...">
  {/* Reducir padding */}
</button>

// 7. CONTACT - Botón más pequeño
<motion.a className="... px-6 md:px-8 py-3 md:py-4 text-base md:text-lg ...">
  {/* Reducir tamaño */}
</motion.a>
```

---

### **app/productos/page.tsx - Productos**

#### ❌ Problemas Detectados:
1. **Hero Section**
   - Título muy grande
   - Descripción muy larga

2. **Cards de Productos**
   - Imágenes muy grandes
   - Títulos muy largos
   - Descripciones se cortan mal

3. **Carousel interno**
   - No funciona bien en móvil
   - Flechas muy grandes

#### ✅ Soluciones:

```tsx
// 1. HERO - Título más pequeño
<h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl ...">
  {/* Reducir desde base */}
</h1>

// 2. CARDS - Más pequeñas
<motion.div className="relative p-4 md:p-6 ...">
  {/* Reducir padding */}
</motion.div>

// 3. IMÁGENES - Altura reducida
<div className="relative h-48 md:h-64 ...">
  {/* Reducir altura en móvil */}
</div>

// 4. TÍTULOS - Más pequeños
<h3 className="text-lg md:text-xl lg:text-2xl ...">
  {/* Reducir */}
</h3>

// 5. DESCRIPCIONES - Truncar mejor
<p className="text-sm md:text-base line-clamp-2 md:line-clamp-3 ...">
  {/* Menos líneas en móvil */}
</p>
```

---

## 🔧 MODIFICACIONES GLOBALES

### **components/layout/Header.tsx**

```tsx
// Logo más pequeño en móvil
<Image
  src="/images/logos/logo-principal.png"
  width={150}
  height={50}
  className="h-12 md:h-16 w-auto"
/>

// Padding reducido
<div className="w-full px-6 md:px-16">
  {/* Reducir padding lateral */}
</div>
```

### **components/layout/Footer.tsx**

```tsx
// Columnas más compactas
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
  {/* Reducir gap */}
</div>

// Textos más pequeños
<p className="text-xs md:text-sm ...">
  {/* Reducir tamaño base */}
</p>
```

---

## 📱 BREAKPOINTS DE TAILWIND

```css
/* Móvil */
Sin prefijo = 0px - 640px (AQUÍ TRABAJAMOS)

/* Tablet */
sm: = 640px+

/* Desktop */
md: = 768px+ (NO TOCAR)
lg: = 1024px+ (NO TOCAR)
xl: = 1280px+ (NO TOCAR)
2xl: = 1536px+ (NO TOCAR)
```

---

## 🎨 REGLAS DE ORO

1. **Reducir tamaños base** (sin prefijo)
2. **Mantener proporciones** con md:, lg:, xl:
3. **Probar en Chrome DevTools** modo responsive
4. **Usar clases de Tailwind**, NO custom CSS
5. **Spacing consistente**: p-4 md:p-6 lg:p-8
6. **Text sizes**: text-sm md:text-base lg:text-lg

---

## 🧪 TESTING CHECKLIST

- [ ] iPhone SE (375px) - Pantalla más pequeña
- [ ] iPhone 12 Pro (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] Modo landscape (horizontal)

---

## 🚀 ORDEN DE TRABAJO

### Fase 1: Header y Footer (30 min)
1. Header responsive
2. Footer responsive
3. Navegación móvil

### Fase 2: Homepage (1-2 horas)
1. Hero video section
2. Hero content section
3. Carousel de productos
4. Sección de clientes
5. Technology slider

### Fase 3: Servicios (1 hora)
1. Videos de tecnologías
2. Títulos y descripciones
3. Botones CTA
4. Spacing

### Fase 4: Nosotros (1 hora)
1. Hero section
2. Stats section
3. Timeline
4. Values accordion
5. Contact section

### Fase 5: Productos (1 hora)
1. Hero section
2. Cards de productos
3. Carousel interno
4. Modales

### Fase 6: Testing Final (30 min)
1. Probar en todos los dispositivos
2. Verificar animaciones
3. Verificar videos
4. Verificar forms

---

## 📝 EJEMPLO DE CAMBIO CORRECTO

### ❌ ANTES (Mal - muy grande en móvil):
```tsx
<h1 className="text-5xl md:text-7xl font-bold">
  Título
</h1>
```

### ✅ DESPUÉS (Bien - apropiado para móvil):
```tsx
<h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
  Título
</h1>
```

---

## 🎯 META FINAL

**Website 100% responsive en móvil sin bugs, manteniendo la versión de escritorio intacta.**

- Todos los textos legibles
- Todos los elementos visibles
- Sin scroll horizontal
- Sin elementos que se salgan de pantalla
- Animaciones funcionando correctamente
- Videos optimizados para móvil

---

## 📞 NOTAS IMPORTANTES

- **NO eliminar clases md:, lg:, xl:** Solo agregar las clases base (sin prefijo) más pequeñas
- **Probar constantemente:** Usar Chrome DevTools responsive mode
- **Consistencia:** Usar los mismos tamaños en elementos similares
- **Performance:** Los cambios de responsive NO afectan las optimizaciones ya hechas

---

**¡ADELANTE! 🚀**
