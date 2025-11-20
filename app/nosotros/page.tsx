'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Animated counter component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

// Accordion Item component
function AccordionItem({ value, index }: { value: { title: string; description: string; icon: React.ReactNode; color: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0) // Primera abierta por defecto

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#0046FF]/10 text-[#0046FF] flex items-center justify-center flex-shrink-0">
            {value.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#0046FF]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <p className="text-gray-600 leading-relaxed pl-14">{value.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Floating particles background
function FloatingParticles({ isVisible }: { isVisible: boolean }) {
  const particles = [
    { left: 10, top: 20, duration: 3, delay: 0 },
    { left: 25, top: 60, duration: 4, delay: 0.5 },
    { left: 40, top: 30, duration: 3.5, delay: 1 },
    { left: 55, top: 80, duration: 4.5, delay: 0.3 },
    { left: 70, top: 15, duration: 3, delay: 1.5 },
    { left: 85, top: 50, duration: 4, delay: 0.8 },
    { left: 15, top: 75, duration: 3.5, delay: 1.2 },
    { left: 45, top: 45, duration: 4, delay: 0.2 },
    { left: 60, top: 90, duration: 3, delay: 1.8 },
    { left: 80, top: 35, duration: 4.5, delay: 0.6 },
    { left: 5, top: 55, duration: 3.5, delay: 1.4 },
    { left: 35, top: 10, duration: 4, delay: 0.9 },
    { left: 50, top: 65, duration: 3, delay: 0.4 },
    { left: 75, top: 85, duration: 4.5, delay: 1.1 },
    { left: 90, top: 25, duration: 3.5, delay: 1.7 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#0046FF]/30 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={isVisible ? {
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          } : { y: 0, opacity: 0.3 }}
          transition={{
            duration: particle.duration,
            repeat: isVisible ? Infinity : 0,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function NosotrosPage() {
  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const [isHeroVisible, setIsHeroVisible] = React.useState(false)
  const [isStatsVisible, setIsStatsVisible] = React.useState(false)
  const [isContactVisible, setIsContactVisible] = React.useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Intersection Observer para animaciones de hero
  useEffect(() => {
    const heroElement = heroRef.current
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

  // Intersection Observer para animaciones de stats
  useEffect(() => {
    const statsElement = statsRef.current
    if (!statsElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsStatsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(statsElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Intersection Observer para animaciones de contacto
  useEffect(() => {
    const contactElement = contactRef.current
    if (!contactElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsContactVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(contactElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  const stats = [
    { number: 50, suffix: '+', label: 'Años de experiencia' },
    { number: 1970, suffix: '', label: 'Año de fundación' },
    { number: 100, suffix: '%', label: 'Compromiso con calidad' },
  ]

  const values = [
    {
      title: 'Innovación',
      description: 'La compañía cuenta con equipos tecnológicos modernos en impresión, acabados, troquelado y pegado. Dispone de máquinas de impresión digital y offset con tintas convencionales y UV que permiten secado inmediato y continuidad en procesos sin esperas.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'El Desafío',
      description: 'Gráficas Diamante implementó herramientas de gestión para impulsar desarrollo económico sostenible, buscando equilibrio entre aspectos económicos, sociales y ambientales. El enfoque corporativo mantiene balance entre creación de riqueza y uso responsable de recursos.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Calidad Total',
      description: 'Más de 50 años "IMPRIMIENDO CALIDAD" con un Sistema de Gestión Integral que controla calidad, ambiente, seguridad laboral, salud y responsabilidad social empresarial.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const timeline = [
    { year: '1970', event: 'Fundación de Gráficas Diamante', description: 'Inicio de operaciones en artes gráficas' },
    { year: '1990', event: 'Expansión de servicios', description: 'Incorporación de tecnología offset moderna' },
    { year: '2010', event: 'Certificación de calidad', description: 'Sistema de Gestión Integral implementado' },
    { year: '2020', event: 'Tecnología de punta', description: 'Adquisición de Heidelberg XL75 y equipos UV' },
  ]

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <FloatingParticles isVisible={isHeroVisible} />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0046FF]/5 via-transparent to-transparent" />

        {/* Animated circles */}
        <motion.div
          className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full border border-[#0046FF]/20"
          animate={isHeroVisible ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 30, repeat: isHeroVisible ? Infinity : 0, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full border border-[#0046FF]/30"
          animate={isHeroVisible ? { rotate: -360 } : { rotate: 0 }}
          transition={{ duration: 20, repeat: isHeroVisible ? Infinity : 0, ease: "linear" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <Image
                src="/images/logos/logo-pestana.webp"
                alt="Gráficas Diamante"
                width={100}
                height={100}
                className="w-[60px] md:w-auto h-auto mx-auto"
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Sobre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046FF] to-cyan-500">
                Nosotros
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Somos una empresa de artes gráficas fundada en 1970, especializada en
              <span className="text-[#0046FF] font-semibold"> Packaging de lujo</span>,
              material publicitario y más, con los más altos estándares de calidad.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <motion.a
                href="#historia"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#0046FF] text-white text-sm md:text-base font-semibold rounded-xl hover:bg-[#0039CC] transition-colors"
              >
                Conoce nuestra historia
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={isHeroVisible ? { y: [0, 10, 0] } : { y: 0 }}
          transition={{ duration: 2, repeat: isHeroVisible ? Infinity : 0 }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-[#0046FF] rounded-full"
              animate={isHeroVisible ? { opacity: [1, 0, 1], y: [0, 8, 0] } : { opacity: 1, y: 0 }}
              transition={{ duration: 2, repeat: isHeroVisible ? Infinity : 0 }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white via-[#0046FF]/5 to-white overflow-hidden">
        {/* Background decorations */}
        <motion.div
          className="absolute top-10 left-1/4 w-64 h-64 bg-[#0046FF]/10 rounded-full blur-3xl"
          animate={isStatsVisible ? {
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 4, repeat: isStatsVisible ? Infinity : 0, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
          animate={isStatsVisible ? {
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.6, 0.3],
          } : { scale: 1.3, opacity: 0.3 }}
          transition={{ duration: 5, repeat: isStatsVisible ? Infinity : 0, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <motion.div
                  animate={isStatsVisible ? {
                    y: [0, -6, 0],
                  } : { y: 0 }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: isStatsVisible ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="relative p-6 md:p-8 rounded-2xl bg-white shadow-lg border border-gray-100"
                >
                  {/* Icon decoration */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0046FF] to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    {index === 0 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                  </div>

                  {/* Number with gradient */}
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">
                    <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                  </div>

                  {/* Label with underline */}
                  <div className="relative">
                    <p className="text-gray-700 text-lg font-medium">{stat.label}</p>
                    <motion.div
                      className="absolute -bottom-2 left-1/2 h-0.5 bg-gradient-to-r from-[#0046FF] to-cyan-500 rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="historia" className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
        {/* Background images */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 top-0 w-1/2 h-full opacity-60">
            <Image
              src="/images/nosotros/us1.webp"
              alt="Historia Gráficas Diamante"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-transparent" />
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-60">
            <Image
              src="/images/nosotros/us2.webp"
              alt="Historia Gráficas Diamante"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/50 via-transparent to-transparent" />
          </div>
          {/* Gradient fade to top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex flex-col md:inline-flex md:flex-row items-center gap-3 md:gap-4 lg:gap-6 bg-white/80 backdrop-blur-sm rounded-2xl px-4 md:px-6 lg:px-8 py-4 md:py-6 shadow-lg max-w-full mx-4">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
                  Nuestra Historia
                </h2>
                <p className="text-base md:text-lg text-gray-600">
                  Más de cinco décadas de evolución y excelencia
                </p>
              </div>
              <Image
                src="/images/logos/logo-principal.webp"
                alt="Gráficas Diamante"
                width={220}
                height={80}
                className="w-32 md:w-auto h-auto flex-shrink-0 md:-my-6 md:-mr-4"
              />
            </div>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0046FF] via-[#0046FF]/50 to-transparent hidden md:block" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className={`inline-block p-4 md:p-5 rounded-xl bg-white/90 backdrop-blur-sm shadow-md border border-gray-100 hover:border-[#0046FF]/50 transition-all max-w-sm ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}
                  >
                    <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">{item.year}</span>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mt-1">{item.event}</h3>
                    <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0046FF] rounded-full hidden md:block"
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute inset-0 bg-[#0046FF] rounded-full animate-ping opacity-30" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator with logos */}
      <section className="bg-white py-8 overflow-hidden">
        <div className="flex justify-center items-center gap-16 md:gap-24 lg:gap-32">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Image
                src="/images/logos/logo-pestana.webp"
                alt="Gráficas Diamante"
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
                className="opacity-30"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section - Accordion */}
      <section className="relative overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left - Accordion */}
          <div className="w-full lg:w-1/2 py-12 md:py-16 lg:py-24 px-6 lg:px-16 bg-gray-50 flex items-center">
            <div className="max-w-lg mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Nuestros Pilares
                </h2>
                <p className="text-xl text-gray-600">
                  Los fundamentos que nos han convertido en líderes del sector
                </p>
              </motion.div>

              <div className="space-y-4">
                {values.map((value, index) => (
                  <AccordionItem key={value.title} value={value} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Image full height */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/nosotros/local.webp"
              alt="Local Gráficas Diamante"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Separator with logos */}
      <section className="bg-white py-8 overflow-hidden">
        <div className="flex justify-center items-center gap-16 md:gap-24 lg:gap-32">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Image
                src="/images/logos/logo-pestana.webp"
                alt="Gráficas Diamante"
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
                className="opacity-30"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-[#0046FF]/5 to-white overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#0046FF]/10 rounded-full blur-3xl"
          animate={isContactVisible ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          } : { scale: 1, opacity: 0.3 }}
          transition={{
            duration: 5,
            repeat: isContactVisible ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={isContactVisible ? {
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          } : { scale: 1.2, opacity: 0.3 }}
          transition={{
            duration: 6,
            repeat: isContactVisible ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                ¿Listo para tu próximo{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046FF] to-cyan-500">
                  proyecto?
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Estamos aquí para convertir tus ideas en realidad con la mejor calidad y tecnología del mercado.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#0046FF]/10 rounded-xl flex items-center justify-center text-[#0046FF]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dirección</p>
                    <p className="text-sm text-gray-600">Calle 49 sur 43a60, Envigado, Colombia</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#0046FF]/10 rounded-xl flex items-center justify-center text-[#0046FF]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono</p>
                    <p className="text-sm text-gray-600">(+57) (604) 3394300</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#0046FF]/10 rounded-xl flex items-center justify-center text-[#0046FF]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">servicioalcliente@graficasdiamante.com</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-gray-500">Síguenos:</span>
                <div className="flex gap-3">
                  <motion.a
                    href="https://www.facebook.com/graficasdiamante/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-[#0046FF] rounded-lg flex items-center justify-center text-white hover:bg-[#0039CC] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/graficasdiamante/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-[#0046FF] rounded-lg flex items-center justify-center text-white hover:bg-[#0039CC] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h3>

              <form className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0046FF] focus:ring-1 focus:ring-[#0046FF] transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0046FF] focus:ring-1 focus:ring-[#0046FF] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0046FF] focus:ring-1 focus:ring-[#0046FF] transition-colors resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="robot"
                    className="w-5 h-5 rounded border-gray-300 bg-white accent-[#0046FF] cursor-pointer"
                  />
                  <label htmlFor="robot" className="text-sm text-gray-600 cursor-pointer">
                    No soy un robot
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-5 md:px-6 py-3 bg-[#0046FF] text-white text-sm md:text-base font-semibold rounded-xl hover:bg-[#0039CC] transition-colors shadow-lg shadow-[#0046FF]/20"
                >
                  Enviar mensaje
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
