'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const technologies = [
  {
    id: 1,
    title: 'Heidelberg XL75',
    subtitle: 'Impresión Offset de Alta Precisión',
    description: 'Tecnología de punta 2020 para impresiones de máxima calidad con colores vibrantes y acabados perfectos.',
    video: '/images/videos_tecnologias/heidelbergxl75.mp4',
  },
  {
    id: 2,
    title: 'Sistemas de Impresión',
    subtitle: 'Producción Industrial',
    description: 'Equipos de última generación para grandes volúmenes con tiempos de entrega optimizados y calidad constante.',
    video: '/images/videos_tecnologias/impresion.mp4',
  },
  {
    id: 3,
    title: 'Guillotina de Corte',
    subtitle: 'Precisión Milimétrica',
    description: 'Cortes perfectos y precisos para acabados profesionales en todos tus proyectos de impresión.',
    video: '/images/videos_tecnologias/Guillotina.mp4',
  },
  {
    id: 4,
    title: 'Pegado Automático',
    subtitle: 'Eficiencia en Packaging',
    description: 'Tecnología automatizada para pegado de cajas y empaques con velocidad y precisión industrial.',
    video: '/images/videos_tecnologias/pegadora.mp4',
  },
  {
    id: 5,
    title: 'Descartonado Automático',
    subtitle: 'Automatización Completa',
    description: 'Sistema automatizado para separación y descarte de cartón, maximizando la eficiencia de producción.',
    video: '/images/videos_tecnologias/descartonado.mp4',
  }
]

function TechnologySection({ tech, index }: { tech: typeof technologies[0], index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])
  const videoY = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  const isEven = index % 2 === 0

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative flex items-center py-12 md:py-16 overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Video Container */}
          <motion.div
            style={{ y: videoY }}
            className={`relative ${!isEven ? 'lg:order-2' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0046FF] to-[#0046FF]/50 rounded-2xl blur-xl opacity-50" />

              {/* Video */}
              <div className="relative bg-black rounded-2xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                >
                  <source src={tech.video} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            style={{ y }}
            className={`${!isEven ? 'lg:order-1' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <motion.div
                whileHover={{ scale: 1.05, x: isEven ? 10 : -10 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-[#0046FF]/10 backdrop-blur-sm rounded-full text-[#0046FF] text-sm font-semibold border border-[#0046FF]/20">
                  Tecnología #{index + 1}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {tech.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.h3
                className="text-xl md:text-2xl font-semibold text-[#0046FF] mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {tech.subtitle}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg text-gray-400 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {tech.description}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 30px rgba(0, 70, 255, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#0046FF] text-white font-bold rounded-xl shadow-lg hover:bg-[#0039CC] transition-colors"
                >
                  Más información
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#0046FF]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  )
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="pt-28 pb-8 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tecnología de Punta
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400"
          >
            Más de 50 años innovando con los mejores equipos del mercado
          </motion.p>
        </div>
      </section>

      {/* Technology Sections */}
      {technologies.map((tech, index) => (
        <TechnologySection key={tech.id} tech={tech} index={index} />
      ))}
    </div>
  )
}
