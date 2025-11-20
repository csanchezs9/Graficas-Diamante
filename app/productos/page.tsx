'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  image: string
  description: string
  fullDescription: string
  features: string[]
}

const products: Product[] = [
  {
    id: 1,
    name: 'Cajas Plegadizas',
    image: '/images/productos/plegadizas.webp',
    description: 'Excelentes impresiones que mejoran la presentación del producto. Almacenamiento eficiente por capacidad de doblamiento.',
    fullDescription: 'Pueden lograrse excelentes impresiones, lo que mejora la presentación del producto, pues además dan muy buena apariencia al exhibirse. Protegen al producto. Se almacenan fácilmente debido a que pueden ser dobladas, ocupando un mínimo de espacio.',
    features: ['Excelentes impresiones que mejoran la presentación', 'Almacenamiento eficiente por capacidad de doblamiento', 'Protección durante exhibición y transporte']
  },
  {
    id: 2,
    name: 'Catálogos',
    image: '/images/productos/catalogo.webp',
    description: 'Importantes medios publicitarios y de promoción. Presentación detallada de bienes y servicios.',
    fullDescription: 'Éstos son de gran utilidad, porque se convierten en importantes medios publicitarios y de promoción para la venta de los bienes y/o servicios que brinda la empresa. Son herramientas que permiten la presentación detallada de los productos que ofrece una organización.',
    features: ['Importantes medios publicitarios y de promoción', 'Presentación detallada de bienes y servicios', 'Herramienta efectiva para venta empresarial']
  },
  {
    id: 3,
    name: 'Material P.O.P.',
    image: '/images/productos/pop.webp',
    description: 'Promoción y difusión de marca, categoría o producto. Posicionamiento de marca efectivo.',
    fullDescription: 'Recursos gráficos, de publicidad para la promoción y difusión de una marca, categoría o producto. Ayuda al posicionamiento de una marca que podría traducirse en un alza en las ventas.',
    features: ['Promoción y difusión de marca, categoría o producto', 'Posicionamiento de marca efectivo', 'Incremento potencial en ventas']
  },
  {
    id: 4,
    name: 'Carpetas',
    image: '/images/productos/carpetas.webp',
    description: 'Impresos personalizados con imágenes, textos y logotipos. Formas recortadas personalizadas.',
    fullDescription: 'Aunque a veces confiamos más en otros medios de comunicación, imprimir carpetas personalizadas puede ofrecer muchos beneficios a cualquier negocio, independientemente de su tamaño. La capacidad de agregar imágenes, texto, logotipos, formas recortadas y una amplia gama de opciones despierta el interés del destinatario en los productos y/o servicios que ofrecemos.',
    features: ['Impresos personalizados con imágenes, textos y logotipos', 'Formas recortadas personalizadas', 'Despiertan interés en productos y servicios']
  },
  {
    id: 5,
    name: 'Etiquetas',
    image: '/images/productos/etiquetas.webp',
    description: 'Elementos profesionales para transmitir valores de marca con precisión.',
    fullDescription: 'No se trata de hacer una simple etiqueta, se trata de saber qué elementos tenemos a nuestra disposición para convertir una etiqueta común y corriente en una etiqueta de aspecto profesional y que transmita con precisión los valores de una marca o producto.',
    features: ['Elementos profesionales para transmitir valores de marca', 'Aspecto profesional y distintivo', 'Personalización completa']
  },
  {
    id: 6,
    name: 'Cuadernos y Libretas',
    image: '/images/productos/cuaderno.webp',
    description: 'Herramientas de marketing que promocionan marca con cada uso.',
    fullDescription: 'Los cuadernos y libretas de negocios personalizados son una excelente manera de aumentar el conocimiento de la marca. Cuando distribuye cuadernos a clientes, empleados y proveedores, ellos promocionan su marca cada vez que los utilizan. Cuantas más personas utilicen los cuadernos y libretas, más exposición tendrá su marca.',
    features: ['Herramientas de marketing que promocionan marca', 'Aumentan visibilidad constante', 'Uso frecuente por clientes y empleados']
  },
  {
    id: 7,
    name: 'Tarjetas Blister',
    image: '/images/productos/tarjetas-blister.webp',
    description: 'Empaques económicos con burbujas adheridas a etiquetas para expositores.',
    fullDescription: 'Los blíster se utilizan para adherir burbujas a la etiqueta y ser colgados en expositores y dar visibilidad al producto. Además, son un tipo de embalaje económico, a prueba de robos, a prueba de filtraciones de sustancias y que ofrece buena protección al producto.',
    features: ['Empaques económicos', 'Burbujas adheridas a etiquetas para expositores', 'Protección contra robos y filtraciones', 'Buena presentación visual']
  },
]

// Packaging Carousel Component
function PackagingCollage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const itemsPerPage = isMobile ? 2 : 4 // 2 en móvil, 4 en desktop
  const totalItems = 16 // 16 imágenes
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const imageSize = isMobile ? 140 : 260 // Más pequeño en móvil para que quepan 2
  const gap = isMobile ? 16 : 24 // gap consistente
  const containerWidth = (imageSize * itemsPerPage) + (gap * (itemsPerPage - 1))

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
            Somos Expertos en{' '}
            <span className="bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">Packaging</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 50 años transformando ideas en soluciones gráficas de alta calidad
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full mx-auto px-2 md:px-6 max-w-screen-xl">
        <div className="relative h-[180px] md:h-[320px] lg:h-[480px] flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-20 w-8 h-8 md:w-14 md:h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#0046FF] hover:text-white transition-all duration-300 group flex-shrink-0"
            aria-label="Previous"
          >
            <svg className="w-4 h-4 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Track - Todas las imágenes pre-renderizadas */}
          <div className="overflow-hidden mx-10 md:mx-20" style={{ width: `${containerWidth}px`, maxWidth: '100%' }}>
            <motion.div
              className="flex"
              animate={{
                x: `-${currentPage * containerWidth}px`
              }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: "easeInOut"
              }}
            >
              {/* Renderizar todas las páginas */}
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="flex flex-shrink-0" style={{ width: `${containerWidth}px`, gap: `${gap}px` }}>
                  {Array.from({ length: itemsPerPage }).map((_, itemIdx) => {
                    const imageIndex = pageIdx * itemsPerPage + itemIdx
                    if (imageIndex >= totalItems) return null

                    return (
                      <motion.div
                        key={imageIndex}
                        whileHover={{ scale: 1.1, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative flex-shrink-0 cursor-pointer"
                        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
                        onClick={() => setSelectedImage(imageIndex + 1)}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={`/images/productos_sin_fondo/producto-${(imageIndex + 1).toString().padStart(2, '0')}.webp`}
                            alt={`Producto ${imageIndex + 1}`}
                            fill
                            sizes={`${imageSize}px`}
                            loading={pageIdx === 0 && itemIdx < 2 ? "eager" : "lazy"}
                            className="object-contain"
                            style={{
                              filter: 'drop-shadow(0 20px 40px rgba(0, 70, 255, 0.15))',
                            }}
                          />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-20 w-8 h-8 md:w-14 md:h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#0046FF] hover:text-white transition-all duration-300 group flex-shrink-0"
            aria-label="Next"
          >
            <svg className="w-4 h-4 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? 'w-8 md:w-10 bg-[#0046FF]'
                  : 'w-2 md:w-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button - Fixed position */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedImage(null)}
              className="fixed top-6 right-6 z-50 w-14 h-14 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-800 transition-all shadow-2xl hover:scale-110"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Image counter - Fixed position top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl"
            >
              <p className="text-base font-bold text-gray-800">
                {selectedImage} / 16
              </p>
            </motion.div>

            {/* Main Content Container */}
            <div className="w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="relative w-full h-full max-w-6xl max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src={`/images/productos_sin_fondo/producto-${selectedImage.toString().padStart(2, '0')}.webp`}
                    alt={`Producto ${selectedImage}`}
                    fill
                    sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1200px"
                    className="object-contain p-6 md:p-12"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0, 70, 255, 0.25))',
                    }}
                  />
                </div>

                {/* Navigation arrows - Outside of image container */}
                {selectedImage > 1 && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(selectedImage - 1)
                    }}
                    className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white hover:bg-[#0046FF] text-gray-800 hover:text-white rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110"
                  >
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}

                {selectedImage < 16 && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedImage(selectedImage + 1)
                    }}
                    className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white hover:bg-[#0046FF] text-gray-800 hover:text-white rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110"
                  >
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </motion.div>
            </div>

            {/* Hint text at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
              <p className="text-white/60 text-sm font-medium">
                Haz clic fuera de la imagen para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default function ProductosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
              Nuestros <span className="bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">Productos</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas en Packaging, etiquetas, catálogos, impresión lenticular,
              carpetas, tarjetas blister, cuadernos y libretas entre otros.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* First row - 4 products */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative aspect-[3/4] cursor-pointer card-flip"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Front - Image */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl card-front bg-white"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Title at top with white background */}
                    <div className="absolute top-0 left-0 right-0 pt-4 md:pt-8 pb-2 md:pb-4 px-2 md:px-6 bg-white z-10">
                      <h3 className="text-sm md:text-xl font-bold text-gray-900 text-center leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Image container with proper spacing */}
                    <div className="absolute inset-0 pt-14 md:pt-20 pb-12 md:pb-16">
                      <div className="relative w-full h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="eager"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Ver más at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                      <p className="text-xs md:text-sm font-medium bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">Ver más</p>
                    </div>
                  </div>

                  {/* Back - Description */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-gray-500 p-4 md:p-6 flex flex-col justify-center card-back"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-center overflow-y-auto max-h-full">
                      <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-white text-xs md:text-sm mb-2 md:mb-4 leading-tight md:leading-relaxed line-clamp-3 md:line-clamp-none">
                        {product.description}
                      </p>
                      <ul className="space-y-1 md:space-y-2 hidden md:block">
                        {product.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-xs md:text-sm text-white flex items-center justify-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#0046FF] rounded-full flex-shrink-0" />
                            <span className="text-left">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs md:text-sm text-white mt-2 md:mt-3 font-semibold bg-[#0046FF] px-3 md:px-4 py-1 md:py-1.5 rounded-full inline-block">Ampliar</p>
                    </div>

                    {/* Blue accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0046FF]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second row - 3 products centered */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 lg:max-w-4xl lg:mx-auto">
            {products.slice(4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative aspect-[3/4] cursor-pointer card-flip"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Front - Image */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl card-front bg-white"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Title at top with white background */}
                    <div className="absolute top-0 left-0 right-0 pt-4 md:pt-8 pb-2 md:pb-4 px-2 md:px-6 bg-white z-10">
                      <h3 className="text-sm md:text-xl font-bold text-gray-900 text-center leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Image container with proper spacing */}
                    <div className="absolute inset-0 pt-14 md:pt-20 pb-12 md:pb-16">
                      <div className="relative w-full h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="eager"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Ver más at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                      <p className="text-xs md:text-sm font-medium bg-gradient-to-r from-[#0046FF] to-cyan-500 bg-clip-text text-transparent">Ver más</p>
                    </div>
                  </div>

                  {/* Back - Description */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-gray-500 p-4 md:p-6 flex flex-col justify-center card-back"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-center overflow-y-auto max-h-full">
                      <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-white text-xs md:text-sm mb-2 md:mb-4 leading-tight md:leading-relaxed line-clamp-3 md:line-clamp-none">
                        {product.description}
                      </p>
                      <ul className="space-y-1 md:space-y-2 hidden md:block">
                        {product.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-xs md:text-sm text-white flex items-center justify-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#0046FF] rounded-full flex-shrink-0" />
                            <span className="text-left">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs md:text-sm text-white mt-2 md:mt-3 font-semibold bg-[#0046FF] px-3 md:px-4 py-1 md:py-1.5 rounded-full inline-block">Ampliar</p>
                    </div>

                    {/* Blue accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0046FF]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-5">
                {/* Image Side */}
                <div className="relative h-72 md:h-auto md:col-span-2 bg-gray-100">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

                {/* Content Side */}
                <div className="md:col-span-3 p-8 md:p-12 lg:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                      {selectedProduct.name}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {selectedProduct.fullDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-10"
                  >
                    <h4 className="text-xl font-bold text-gray-900 mb-5">Características principales:</h4>
                    <ul className="space-y-4">
                      {selectedProduct.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#0046FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-[#0046FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-base leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4"
                  >
                    <a
                      href="https://wa.me/573127201607?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 md:px-8 py-3 md:py-4 bg-[#0046FF] text-white text-sm md:text-base font-semibold rounded-xl hover:bg-[#0039CC] transition-all text-center shadow-lg hover:shadow-xl"
                    >
                      Solicitar cotización
                    </a>
                  </motion.div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-700 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Packaging Expertise Section */}
      <PackagingCollage />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0046FF] via-[#0039CC] to-[#002D99] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Necesitas un producto personalizado?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Contáctanos y te ayudamos a crear la solución perfecta para tu marca
            </p>
            <a
              href="https://wa.me/573127201607?text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-[#0046FF] text-sm md:text-base font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-xl"
            >
              Solicitar cotización
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
