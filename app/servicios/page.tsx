'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const technologies = [
  {
    id: 1,
    title: 'Heidelberg XL75',
    subtitle: 'Impresión Offset de Alta Precisión',
    description: 'Tecnología de punta 2020 para impresiones de máxima calidad con colores vibrantes y acabados perfectos.',
    video: '/images/videos_tecnologias/heidelbergxl75',
    buttonText: 'Garantiza reproducción exacta de colores Pantone y acabados profesionales para branding corporativo de alto impacto',
  },
  {
    id: 2,
    title: 'Sistemas de Impresión',
    subtitle: 'Producción Industrial',
    description: 'Equipos de última generación para grandes volúmenes con tiempos de entrega optimizados y calidad constante.',
    video: '/images/videos_tecnologias/impresion',
    buttonText: 'Capacidad para imprimir miles de piezas diarias manteniendo estándares de calidad uniformes en cada tiraje',
  },
  {
    id: 3,
    title: 'Guillotina de Corte',
    subtitle: 'Precisión Milimétrica',
    description: 'Cortes perfectos y precisos para acabados profesionales en todos tus proyectos de impresión.',
    video: '/images/videos_tecnologias/Guillotina',
    buttonText: 'Elimina desperdicios y asegura medidas exactas, crucial para proyectos donde cada milímetro cuenta',
  },
  {
    id: 4,
    title: 'Pegado Automático',
    subtitle: 'Eficiencia en Packaging',
    description: 'Tecnología automatizada para pegado de cajas y empaques con velocidad y precisión industrial.',
    video: '/images/videos_tecnologias/pegadora',
    buttonText: 'Acelera producción de packaging hasta 10x más rápido que procesos manuales con adhesión perfecta',
  },
  {
    id: 5,
    title: 'Descartonado Automático',
    subtitle: 'Automatización Completa',
    description: 'Sistema automatizado para separación y descarte de cartón, maximizando la eficiencia de producción.',
    video: '/images/videos_tecnologias/descartonado',
    buttonText: 'Reduce tiempos de acabado en un 70% y minimiza errores humanos en procesos de troquelado complejos',
  }
]

function TechnologySection({ tech, index, isLast }: { tech: typeof technologies[0], index: number, isLast: boolean }) {
  const isEven = index % 2 === 0
  const isFirst = index === 0
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  // Intersection Observer para pausar/reproducir video según visibilidad
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => {
              // Ignore autoplay errors
            })
          } else {
            videoElement.pause()
          }
        })
      },
      { threshold: 0.5 } // Video debe estar 50% visible para reproducirse
    )

    observer.observe(videoElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Intersection Observer para animaciones decorativas
  useEffect(() => {
    const sectionElement = sectionRef.current
    if (!sectionElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Primera sección usa animate directo, el resto usa whileInView
  const animationProps = isFirst ? {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.1 }
  } : {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  }

  return (
    <motion.section
      ref={sectionRef}
      {...animationProps}
      className={`relative flex items-center overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${isFirst ? 'pt-6 md:pt-8 lg:pt-12' : 'py-6 md:py-8 lg:py-12'} ${isLast ? 'pb-12 md:pb-16 lg:pb-20' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            animate={isFirst ? { opacity: 1, x: 0 } : undefined}
            whileInView={!isFirst ? { opacity: 1, x: 0 } : undefined}
            viewport={!isFirst ? { once: true } : undefined}
            transition={{ duration: 0.5, delay: isFirst ? 0.2 : 0.1 }}
            className={`relative order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative w-full max-w-xs md:max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0046FF] to-[#0046FF]/50 rounded-2xl blur-xl opacity-30" />

              {/* Video */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  loop
                  muted
                  playsInline
                  preload={isFirst ? "auto" : "metadata"}
                  poster={`${tech.video}-poster.jpg`}
                  className="w-full h-auto"
                >
                  <source src={`${tech.video}.webm`} type="video/webm" />
                  <source src={`${tech.video}.mp4`} type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isFirst ? { opacity: 1, x: 0 } : undefined}
            whileInView={!isFirst ? { opacity: 1, x: 0 } : undefined}
            viewport={!isFirst ? { once: true } : undefined}
            transition={{ duration: 0.5, delay: isFirst ? 0.3 : 0.2 }}
            className={`relative order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div>
              {/* Badge */}
              <div className="inline-block mb-3">
                <span className="px-4 py-2 bg-[#0046FF]/10 backdrop-blur-sm rounded-full text-[#0046FF] text-sm font-semibold border border-[#0046FF]/20">
                  Tecnología #{index + 1}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2">
                {tech.title}
              </h2>

              {/* Subtitle */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0046FF] mb-3">
                {tech.subtitle}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-3">
                {tech.description}
              </p>

              {/* Logo pestaña */}
              <div className="mb-4">
                <Image
                  src="/images/logos/logo-pestana.png"
                  alt="Gráficas Diamante"
                  width={120}
                  height={120}
                  className="w-20 md:w-[120px] h-auto opacity-80"
                />
              </div>

              {/* CTA Button */}
              <div className="max-w-2xl">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(0, 70, 255, 0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 md:px-6 py-4 md:py-5 bg-[#0046FF] text-white rounded-xl shadow-lg hover:bg-[#0039CC] transition-colors"
                >
                  <p className="text-sm md:text-sm lg:text-base leading-relaxed">
                    {tech.buttonText}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#0046FF]/10 rounded-full blur-3xl"
        animate={isVisible ? {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        } : { scale: 1, opacity: 0.2 }}
        transition={{
          duration: 4,
          repeat: isVisible ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  )
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Technology Sections */}
      {technologies.map((tech, index) => (
        <TechnologySection key={tech.id} tech={tech} index={index} isLast={index === technologies.length - 1} />
      ))}
    </div>
  )
}
