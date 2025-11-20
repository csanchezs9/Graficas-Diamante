'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function TechnologySlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = React.useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  // Intersection Observer para pausar slider cuando no está visible
  React.useEffect(() => {
    const sliderElement = sliderRef.current
    if (!sliderElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sliderElement)

    return () => {
      observer.disconnect()
    }
  }, [])

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
    if (!isVisible) return // Solo avanza el slider si está visible

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % technologies.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [technologies.length, isVisible])

  return (
    <section ref={sliderRef} className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-black">
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
            loading={currentSlide === 0 ? "eager" : "lazy"}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      </AnimatePresence>

      {/* Bottom content overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 via-black/40 to-transparent py-16">
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
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-[#0046FF] text-white text-sm md:text-base font-semibold rounded-lg hover:bg-[#0039CC] transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Ver todos los servicios
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
