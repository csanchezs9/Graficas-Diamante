'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function TechnologySlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const technologies = [
    {
      image: '/images/servicios/tecnologias/tecnologia-01.jpg',
      title: 'Tecnología de Impresión Offset',
      description: 'Equipos de última generación para impresiones de alta calidad'
    },
    {
      image: '/images/servicios/tecnologias/tecnologia-02.jpg',
      title: 'Sistemas de Acabados Especializados',
      description: 'Maquinaria especializada para acabados profesionales'
    },
    {
      image: '/images/servicios/tecnologias/tecnologia-03.jpg',
      title: 'Automatización de Procesos',
      description: 'Tecnología automatizada para máxima eficiencia y precisión'
    },
    {
      image: '/images/servicios/tecnologias/tecnologia-04.jpg',
      title: 'Control de Calidad Avanzado',
      description: 'Sistemas de control para garantizar la excelencia en cada proyecto'
    },
    {
      image: '/images/servicios/tecnologias/tecnologia-05.jpg',
      title: 'Innovación en Preprensa Digital',
      description: 'Tecnología de punta en preparación de archivos e impresión'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % technologies.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [technologies.length])

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-black">
      {/* Title overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center"
          >
            Los Servicios que ofrecemos
          </motion.h2>
        </div>
      </div>

      {/* Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={technologies[currentSlide].image}
            alt={technologies[currentSlide].title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom content overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/60 to-transparent py-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {technologies[currentSlide].title}
              </h3>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                {technologies[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {technologies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="relative h-1 bg-white/30 rounded-full overflow-hidden"
                style={{ width: '60px' }}
              >
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: currentSlide === index ? '100%' : '0%'
                  }}
                  transition={{
                    duration: currentSlide === index ? 4 : 0.3,
                    ease: 'linear'
                  }}
                />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <a
              href="/servicios"
              className="inline-block px-8 py-4 bg-[#0046FF] text-white font-semibold rounded-lg hover:bg-[#0039CC] transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Ver todos los servicios
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background - URL pendiente */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            {/* TODO: Agregar URL del video aquí */}
            <source src="/images/hero/video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay Gradient - Más oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white"
              style={{
                textShadow: '0 0 20px rgba(0, 0, 0, 0.9), 2px 2px 8px rgba(0, 0, 0, 0.8), -1px -1px 4px rgba(0, 0, 0, 0.6)'
              }}
            >
              Impactamos las marcas de
              <br />
              nuestros clientes con
              <br />
              impresiones Elegantes,
              <br className="hidden md:block" />
              Innovadoras y Distintivas
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12"
            style={{
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
            }}
          >
            Más de 50 años convirtiendo ideas en realidades impresas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contacto"
              className="px-8 py-4 bg-[#0046FF] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ver nuestros servicios
            </a>
            <a
              href="#galeria"
              className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:border-[#0046FF] hover:text-[#0046FF] transition-all duration-200"
            >
              Explorar galería
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white"
          >
            <span className="text-sm font-medium">Descubre más</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Nuestro Trabajo Section */}
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Nuestro Trabajo
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Calidad y precisión en cada impresión
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <motion.div
            className="flex gap-8 py-8"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(4)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {Array.from({ length: 16 }, (_, i) => (
                  <div key={`${setIndex}-${i}`} className="relative w-80 h-64 flex-shrink-0">
                    <Image
                      src={`/images/productos_sin_fondo/producto-${String(i + 1).padStart(2, '0')}.png`}
                      alt={`Producto ${i + 1}`}
                      fill
                      sizes="320px"
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                      style={{
                        filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))',
                      }}
                    />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Overlay with button on hover */}
          <div className="absolute inset-0 transition-all duration-500 flex items-center justify-center pointer-events-none">
            <a
              href="/productos"
              className="px-6 py-3 bg-white/90 text-gray-700 font-medium rounded-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 shadow-md hover:bg-white hover:text-gray-900 pointer-events-auto"
            >
              Ver más
            </a>
          </div>
        </div>
      </section>

      {/* Services Section - Technology Slider */}
      <TechnologySlider />

      {/* Clients Section */}
      <section className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Confían en nosotros
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Marcas líderes que eligen calidad y excelencia
            </p>
          </motion.div>

          <SimpleClientGrid />
        </div>
      </section>
    </div>
  )
}

function SimpleClientGrid() {
  const clients = [
    { name: 'Santa Elena', logo: '/images/clientes/santa-elena.png' },
    { name: 'Avon', logo: '/images/clientes/avon.png' },
    { name: 'San Fiorino', logo: '/images/clientes/san-fiorino.png' },
    { name: 'Pecoda', logo: '/images/clientes/pecoda.png' },
    { name: 'Corona', logo: '/images/clientes/corona.png' },
    { name: 'Gricoat', logo: '/images/clientes/gricoat.png' },
    { name: 'Atenea', logo: '/images/clientes/atenea.png' },
    { name: 'Nutresa', logo: '/images/clientes/nutresa.png' },
    { name: 'Chocolates', logo: '/images/clientes/chocolates.png' },
    { name: 'Prebel', logo: '/images/clientes/prebel.png' },
    { name: 'Leonisa', logo: '/images/clientes/leonisa.png' },
    { name: 'Ecar', logo: '/images/clientes/ecar.png' },
    { name: 'Crystal', logo: '/images/clientes/crystal.png' },
    { name: 'Familia', logo: '/images/clientes/familia.png' },
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
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4"
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
              transition={{
                duration: 0.8,
                delay,
                type: 'spring',
                stiffness: 100
              }}
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
              <div className="relative h-24 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                  style={{
                    transform: 'translateZ(1px)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glowing border */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 70, 255, 0.5), inset 0 0 20px rgba(0, 70, 255, 0.2)',
                    transform: 'translateZ(2px)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Logo */}
                <div className="relative w-full h-full flex items-center justify-center p-4"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 14vw"
                    className="object-contain p-2 drop-shadow-2xl"
                  />
                </div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transform: 'translateZ(50px)' }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{
                    y: [0, 15, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
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
