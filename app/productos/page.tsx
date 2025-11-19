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
    image: '/images/productos/plegadizas.jpg',
    description: 'Excelentes impresiones que mejoran la presentación del producto. Almacenamiento eficiente por capacidad de doblamiento.',
    fullDescription: 'Pueden lograrse excelentes impresiones, lo que mejora la presentación del producto, pues además dan muy buena apariencia al exhibirse. Protegen al producto. Se almacenan fácilmente debido a que pueden ser dobladas, ocupando un mínimo de espacio.',
    features: ['Excelentes impresiones que mejoran la presentación', 'Almacenamiento eficiente por capacidad de doblamiento', 'Protección durante exhibición y transporte']
  },
  {
    id: 2,
    name: 'Catálogos',
    image: '/images/productos/catalogo.jpg',
    description: 'Importantes medios publicitarios y de promoción. Presentación detallada de bienes y servicios.',
    fullDescription: 'Éstos son de gran utilidad, porque se convierten en importantes medios publicitarios y de promoción para la venta de los bienes y/o servicios que brinda la empresa. Son herramientas que permiten la presentación detallada de los productos que ofrece una organización.',
    features: ['Importantes medios publicitarios y de promoción', 'Presentación detallada de bienes y servicios', 'Herramienta efectiva para venta empresarial']
  },
  {
    id: 3,
    name: 'Material P.O.P.',
    image: '/images/productos/pop.jpg',
    description: 'Promoción y difusión de marca, categoría o producto. Posicionamiento de marca efectivo.',
    fullDescription: 'Recursos gráficos, de publicidad para la promoción y difusión de una marca, categoría o producto. Ayuda al posicionamiento de una marca que podría traducirse en un alza en las ventas.',
    features: ['Promoción y difusión de marca, categoría o producto', 'Posicionamiento de marca efectivo', 'Incremento potencial en ventas']
  },
  {
    id: 4,
    name: 'Carpetas',
    image: '/images/productos/carpetas.jpg',
    description: 'Impresos personalizados con imágenes, textos y logotipos. Formas recortadas personalizadas.',
    fullDescription: 'Aunque a veces confiamos más en otros medios de comunicación, imprimir carpetas personalizadas puede ofrecer muchos beneficios a cualquier negocio, independientemente de su tamaño. La capacidad de agregar imágenes, texto, logotipos, formas recortadas y una amplia gama de opciones despierta el interés del destinatario en los productos y/o servicios que ofrecemos.',
    features: ['Impresos personalizados con imágenes, textos y logotipos', 'Formas recortadas personalizadas', 'Despiertan interés en productos y servicios']
  },
  {
    id: 5,
    name: 'Etiquetas',
    image: '/images/productos/etiquetas.jpg',
    description: 'Elementos profesionales para transmitir valores de marca con precisión.',
    fullDescription: 'No se trata de hacer una simple etiqueta, se trata de saber qué elementos tenemos a nuestra disposición para convertir una etiqueta común y corriente en una etiqueta de aspecto profesional y que transmita con precisión los valores de una marca o producto.',
    features: ['Elementos profesionales para transmitir valores de marca', 'Aspecto profesional y distintivo', 'Personalización completa']
  },
  {
    id: 6,
    name: 'Cuadernos y Libretas',
    image: '/images/productos/cuaderno.jpg',
    description: 'Herramientas de marketing que promocionan marca con cada uso.',
    fullDescription: 'Los cuadernos y libretas de negocios personalizados son una excelente manera de aumentar el conocimiento de la marca. Cuando distribuye cuadernos a clientes, empleados y proveedores, ellos promocionan su marca cada vez que los utilizan. Cuantas más personas utilicen los cuadernos y libretas, más exposición tendrá su marca.',
    features: ['Herramientas de marketing que promocionan marca', 'Aumentan visibilidad constante', 'Uso frecuente por clientes y empleados']
  },
  {
    id: 7,
    name: 'Tarjetas Blister',
    image: '/images/productos/tarjetas-blister.jpg',
    description: 'Empaques económicos con burbujas adheridas a etiquetas para expositores.',
    fullDescription: 'Los blíster se utilizan para adherir burbujas a la etiqueta y ser colgados en expositores y dar visibilidad al producto. Además, son un tipo de embalaje económico, a prueba de robos, a prueba de filtraciones de sustancias y que ofrece buena protección al producto.',
    features: ['Empaques económicos', 'Burbujas adheridas a etiquetas para expositores', 'Protección contra robos y filtraciones', 'Buena presentación visual']
  },
]

export default function ProductosPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Nuestros Productos
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative h-96 cursor-pointer card-flip"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Front - Image */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl card-front"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">Ver más</p>
                    </div>
                  </div>

                  {/* Back - Description */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex flex-col justify-center card-back"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      <ul className="space-y-2">
                        {product.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-400 flex items-center justify-center gap-2"
                          >
                            <span className="w-2 h-2 bg-[#0046FF] rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-[#0046FF] mt-4">Ampliar</p>
                    </div>

                    {/* Blue accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0046FF]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last row centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-8 xl:max-w-5xl xl:mx-auto">
            {products.slice(4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 4) * 0.1 }}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative h-96 cursor-pointer card-flip"
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Front - Image */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl card-front"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-xl font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">Ver más</p>
                    </div>
                  </div>

                  {/* Back - Description */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex flex-col justify-center card-back"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      <ul className="space-y-2">
                        {product.features.map((feature, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-400 flex items-center justify-center gap-2"
                          >
                            <span className="w-2 h-2 bg-[#0046FF] rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-[#0046FF] mt-4">Ampliar</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 md:h-[500px]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <motion.h2
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                  >
                    {selectedProduct.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 mb-6 leading-relaxed"
                  >
                    {selectedProduct.fullDescription}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">Características:</h4>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <span className="w-2 h-2 bg-[#0046FF] rounded-full flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    href="/contacto"
                    className="inline-block mt-8 px-6 py-3 bg-[#0046FF] text-white font-semibold rounded-lg hover:opacity-90 transition-all text-center"
                  >
                    Solicitar cotización
                  </motion.a>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Somos Expertos en{' '}
              <span className="text-[#0046FF]">Packaging</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 50 años transformando ideas en soluciones gráficas de alta calidad
            </p>
          </motion.div>
        </div>

        {/* Infinite Marquee - First Row (Left to Right) */}
        <div className="relative mb-6">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 flex-shrink-0">
                {[9, 10, 11, 12].map((num) => (
                  <div
                    key={`${setIndex}-${num}`}
                    className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group"
                  >
                    <Image
                      src={`/images/productos/producto-${num.toString().padStart(2, '0')}.jpg`}
                      alt={`Producto ${num}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Infinite Marquee - Second Row (Right to Left) */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [-1920, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 flex-shrink-0">
                {[13, 14, 15, 16].map((num) => (
                  <div
                    key={`${setIndex}-${num}`}
                    className="relative w-80 h-56 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 group"
                  >
                    <Image
                      src={`/images/productos/producto-${num.toString().padStart(2, '0')}.jpg`}
                      alt={`Producto ${num}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Necesitas un producto personalizado?
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Contáctanos y te ayudamos a crear la solución perfecta para tu marca
            </p>
            <a
              href="/contacto"
              className="inline-block px-8 py-4 bg-[#0046FF] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
            >
              Solicitar cotización
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
