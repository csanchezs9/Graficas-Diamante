'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamic imports con lazy loading
const TechnologySlider = dynamic(() => import('./components/TechnologySlider'), {
  loading: () => (
    <div className="relative h-[600px] md:h-[700px] lg:h-[800px] bg-black flex items-center justify-center">
      <div className="animate-pulse text-white text-xl">Cargando servicios...</div>
    </div>
  ),
  ssr: false
})

export default function Home() {
  const heroVideoRef = React.useRef<HTMLVideoElement>(null)
  const heroSectionRef = React.useRef<HTMLElement>(null)
  const heroContentRef = React.useRef<HTMLElement>(null)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const clientsRef = React.useRef<HTMLElement>(null)
  const [isHeroVisible, setIsHeroVisible] = React.useState(false)
  const [isHeroContentVisible, setIsHeroContentVisible] = React.useState(false)
  const [isCarouselVisible, setIsCarouselVisible] = React.useState(false)
  const [isClientsVisible, setIsClientsVisible] = React.useState(false)

  // Video hero - reproducción continua sin reinicios
  React.useEffect(() => {
    const videoElement = heroVideoRef.current
    if (!videoElement) return

    // Play inicial
    videoElement.play().catch(() => {
      // Ignore autoplay errors
    })

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // NO pausar cuando se oculta, dejar que el navegador lo maneje
      } else {
        // Cuando vuelves, si está pausado, reanuda desde donde estaba
        if (videoElement.paused) {
          videoElement.play().catch(() => {})
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Intersection Observer para animaciones de hero
  React.useEffect(() => {
    const heroElement = heroSectionRef.current
    if (!heroElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(heroElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Intersection Observer para animaciones de hero content
  React.useEffect(() => {
    const heroContentElement = heroContentRef.current
    if (!heroContentElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroContentVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(heroContentElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Intersection Observer para carousel
  React.useEffect(() => {
    const carouselElement = carouselRef.current
    if (!carouselElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsCarouselVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(carouselElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Intersection Observer para sección de clientes
  React.useEffect(() => {
    const clientsElement = clientsRef.current
    if (!clientsElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsClientsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(clientsElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Video Section */}
      <section ref={heroSectionRef} className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            ref={heroVideoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero/video-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/images/hero/video.webm" type="video/webm" />
            <source src="/images/hero/video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Light overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Enganche abajo izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-16 md:bottom-24 left-4 md:left-8 lg:left-16 z-10 max-w-lg"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-2xl leading-tight mb-4 md:mb-6">
            Más de 50 años
            <br />
            Imprimiendo Calidad
          </h2>

          <motion.a
            href="#hero-content"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/95 backdrop-blur-sm text-gray-900 text-sm md:text-base font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all"
          >
            <span>Descubre más</span>
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <a href="#hero-content">
            <motion.div
              animate={isHeroVisible ? { y: [0, 10, 0] } : { y: 0 }}
              transition={{ duration: 2, repeat: isHeroVisible ? Infinity : 0 }}
              className="flex flex-col items-center gap-1 md:gap-2 text-white cursor-pointer"
            >
              <span className="text-xs md:text-sm font-medium">Ver más</span>
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </section>

      {/* Hero Content Section */}
      <section ref={heroContentRef} id="hero-content" className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="px-4 py-2 bg-[#0046FF]/10 text-[#0046FF] rounded-full text-sm font-semibold">
                  Desde 1970
                </span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Impactamos las satisfacciones de{' '}
                <span className="bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">
                  nuestros clientes
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Con impresiones <strong>Elegantes, Innovadoras y Distintivas</strong>.
                Más de 50 años convirtiendo ideas en realidades impresas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/servicios"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#0046FF] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-[#0039CC] transition-all shadow-lg"
                >
                  Ver servicios
                  <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <motion.a
                  href="/productos"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-gray-800 text-sm md:text-base font-semibold rounded-lg border-2 border-gray-200 hover:border-[#0046FF] hover:text-[#0046FF] transition-all"
                >
                  Ver productos
                </motion.a>
              </div>
            </motion.div>

            {/* Right - Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                {/* Main circle with gradient */}
                <motion.div
                  animate={isHeroContentVisible ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 30, repeat: isHeroContentVisible ? Infinity : 0, ease: "linear" }}
                  className="w-full aspect-square max-w-md mx-auto relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0046FF]/20 via-cyan-500/20 to-[#0046FF]/20 rounded-full blur-3xl" />
                  <div className="absolute inset-8 bg-gradient-to-br from-[#0046FF] to-cyan-500 rounded-full opacity-10" />
                </motion.div>

                {/* Logo centered on circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={isHeroContentVisible ? {
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    } : { y: 0, rotate: 0 }}
                    transition={{
                      duration: 4,
                      repeat: isHeroContentVisible ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src="/images/logos/logo-pestana.webp"
                      alt="Gráficas Diamante"
                      width={300}
                      height={300}
                      priority
                      className="w-[200px] md:w-[300px] h-auto drop-shadow-2xl"
                    />
                  </motion.div>
                </motion.div>

                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute top-4 md:top-8 -left-2 md:-left-4 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 border border-gray-100"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">50+</p>
                  <p className="text-xs md:text-sm text-gray-600">Años</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute bottom-4 md:bottom-8 -right-2 md:-right-4 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 border border-gray-100"
                >
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">100%</p>
                  <p className="text-xs md:text-sm text-gray-600">Calidad</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xs md:text-sm font-semibold text-gray-700">En línea</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestro Trabajo Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            {/* Left - Title */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Nuestro <span className="bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">Trabajo</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                Calidad y precisión en cada impresión. Descubre nuestros proyectos más destacados.
              </p>
            </motion.div>

            {/* Right - Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:text-right"
            >
              <motion.a
                href="/productos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#0046FF] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-[#0039CC] transition-all shadow-lg"
              >
                Ver todos los productos
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Carousel Container */}
        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div
            className={`flex gap-4 md:gap-8 py-8 ${isCarouselVisible ? 'animate-carousel' : ''}`}
            style={{
              willChange: isCarouselVisible ? 'transform' : 'auto'
            }}
          >
            {[...Array(2)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {Array.from({ length: 16 }, (_, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="relative w-64 md:w-80 h-48 md:h-64 flex-shrink-0 bg-white rounded-xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Image
                      src={`/images/productos_sin_fondo/producto-${String(i + 1).padStart(2, '0')}.webp`}
                      alt={`Producto ${i + 1}`}
                      fill
                      sizes="320px"
                      loading={setIndex === 0 && i < 3 ? "eager" : "lazy"}
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
        </motion.div>
      </section>

      {/* Services Section - Technology Slider */}
      <TechnologySlider />

      {/* Clients Section */}
      <section ref={clientsRef} className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Confían en <span className="bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">nosotros</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Marcas líderes que eligen calidad y excelencia
            </p>
          </motion.div>

          <SimpleClientGrid isVisible={isClientsVisible} />
        </div>
      </section>
    </div>
  )
}

function SimpleClientGrid({ isVisible }: { isVisible: boolean }) {
  const clients = [
    { name: 'Santa Elena', logo: '/images/clientes/santa-elena.webp' },
    { name: 'Avon', logo: '/images/clientes/avon.webp' },
    { name: 'San Fiorino', logo: '/images/clientes/san-fiorino.webp' },
    { name: 'Pecoda', logo: '/images/clientes/pecoda.webp' },
    { name: 'Corona', logo: '/images/clientes/corona.webp' },
    { name: 'Gricoat', logo: '/images/clientes/gricoat.webp' },
    { name: 'Atenea', logo: '/images/clientes/atenea.webp' },
    { name: 'Nutresa', logo: '/images/clientes/nutresa.webp' },
    { name: 'Chocolates', logo: '/images/clientes/chocolates.webp' },
    { name: 'Prebel', logo: '/images/clientes/prebel.webp' },
    { name: 'Leonisa', logo: '/images/clientes/leonisa.webp' },
    { name: 'Ecar', logo: '/images/clientes/ecar.webp' },
    { name: 'Crystal', logo: '/images/clientes/crystal.webp' },
    { name: 'Familia', logo: '/images/clientes/familia.webp' },
  ]

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePos({ x, y })
  }

  const calculateRepulsion = (currentIndex: number, hoveredIdx: number | null) => {
    if (hoveredIdx === null || currentIndex === hoveredIdx) return { x: 0, y: 0, scale: 1 }

    const cols = 7
    const currentRow = Math.floor(currentIndex / cols)
    const currentCol = currentIndex % cols
    const hoveredRow = Math.floor(hoveredIdx / cols)
    const hoveredCol = hoveredIdx % cols

    const deltaX = currentCol - hoveredCol
    const deltaY = currentRow - hoveredRow
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

    if (distance === 0) return { x: 0, y: 0, scale: 1 }

    const force = Math.max(0, (3 - distance) / 3)
    const pushX = (deltaX / distance) * force * 120
    const pushY = (deltaY / distance) * force * 120

    return {
      x: pushX,
      y: pushY,
      scale: 1 - force * 0.15
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4"
        animate={{
          rotateX: mousePos.y * -5,
          rotateY: mousePos.x * 5,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {clients.map((client, index) => {
          const row = Math.floor(index / 7)
          const col = index % 7
          const delay = (row + col) * 0.05
          const repulsion = calculateRepulsion(index, hoveredIndex)
          const isHovered = hoveredIndex === index

          return (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, z: -100, rotateY: -90 }}
              whileInView={{ opacity: 1, z: 0, rotateY: 0 }}
              viewport={{ once: true }}
              animate={{
                x: repulsion.x,
                y: repulsion.y,
                scale: isHovered ? 1.5 : repulsion.scale,
                z: isHovered ? 150 : 0,
                rotateZ: isHovered ? 0 : repulsion.x * 0.1,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card con efecto 3D */}
              <div className="relative h-16 md:h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-gray-700 to-gray-600 border border-gray-500">
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#0046FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    transform: 'translateZ(1px)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glowing border */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: '0 0 15px rgba(0, 70, 255, 0.3)',
                    transform: 'translateZ(2px)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Logo */}
                <div className="relative w-full h-full flex items-center justify-center p-3"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
                    loading="lazy"
                    className="object-contain p-1 brightness-0 saturate-0 opacity-70 group-hover:brightness-100 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                </div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-[#0046FF] rounded-full opacity-0 group-hover:opacity-60"
                  animate={isVisible ? {
                    y: [0, -20, 0],
                    opacity: [0, 0.6, 0],
                  } : { y: 0, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: isVisible ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  style={{ transform: 'translateZ(50px)' }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-60"
                  animate={isVisible ? {
                    y: [0, 15, 0],
                    opacity: [0, 0.6, 0],
                  } : { y: 0, opacity: 0 }}
                  transition={{
                    duration: 2.5,
                    repeat: isVisible ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  style={{ transform: 'translateZ(50px)' }}
                />
              </div>

              {/* Shadow */}
              <motion.div
                className="absolute inset-0 bg-black/20 blur-xl rounded-xl -z-10"
                animate={{
                  scale: mousePos.x !== 0 || mousePos.y !== 0 ? 1.1 : 1,
                  opacity: mousePos.x !== 0 || mousePos.y !== 0 ? 0.3 : 0.1,
                }}
                style={{ transform: 'translateZ(-50px) translateY(20px)' }}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
