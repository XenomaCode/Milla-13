'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Nosotros = () => {
  const socialMedia = [
    { name: 'Instagram', icon: '/icons/instagram.svg', url: 'https://instagram.com/milla13cafe' },
    { name: 'Facebook', icon: '/icons/facebook.svg', url: 'https://facebook.com/milla13cafe' },
    { name: 'Twitter', icon: '/icons/twitter.svg', url: 'https://twitter.com/milla13cafe' },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/fondoo.png"
          alt="Fondo de granos de café"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Barra de navegación */}
      <header className="relative z-10 pt-6 px-4">
        <div className="container mx-auto flex flex-col items-center">
          <Navbar/>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-amber-400 mb-8 text-center font-serif"
        >
          Nuestra Historia
        </motion.h1>

        {/* Sección de historia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">De la pasión nace Milla 13</h2>
            <p className="text-gray-300 mb-4">
              Fundada en 2020, Milla 13 nació de la pasión por el café de especialidad y el deseo de crear un espacio 
              donde la comunidad pudiera disfrutar de una experiencia única.
            </p>
            <p className="text-gray-300">
              Nuestro nombre hace referencia al kilómetro 13 de la ruta cafetera, donde encontramos los mejores granos 
              que ahora traemos directamente a tu taza. Trabajamos directamente con productores locales, asegurando 
              prácticas sostenibles y comercio justo.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-80 rounded-lg overflow-hidden"
          >
            <Image
              src="/images/cafe-interior.jpg"
              alt="Interior de Milla 13"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Sección de valores */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-amber-400 mb-6 text-center">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-800 p-6 rounded-lg border border-amber-400/20">
              <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image src="/icons/coffee-bean.svg" alt="Calidad" width={32} height={32} />
              </div>
              <h3 className="text-xl font-medium text-amber-400 mb-2 text-center">Calidad</h3>
              <p className="text-gray-300 text-center">
                Seleccionamos cuidadosamente cada grano para ofrecerte la mejor experiencia en cada taza.
              </p>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-lg border border-amber-400/20">
              <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image src="/icons/community.svg" alt="Comunidad" width={32} height={32} />
              </div>
              <h3 className="text-xl font-medium text-amber-400 mb-2 text-center">Comunidad</h3>
              <p className="text-gray-300 text-center">
                Creamos un espacio acogedor donde todos son bienvenidos a compartir momentos especiales.
              </p>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-lg border border-amber-400/20">
              <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image src="/icons/sustainability.svg" alt="Sostenibilidad" width={32} height={32} />
              </div>
              <h3 className="text-xl font-medium text-amber-400 mb-2 text-center">Sostenibilidad</h3>
              <p className="text-gray-300 text-center">
                Nos comprometemos con prácticas responsables con el medio ambiente y el comercio justo.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sección de equipo */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-amber-400 mb-6 text-center">Nuestro Equipo</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/barista1.jpg"
                  alt="Barista Principal"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-amber-400">Carlos Mendoza</h3>
              <p className="text-gray-300">Barista Principal</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/barista2.jpg"
                  alt="Chef Pastelera"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-amber-400">Laura Sánchez</h3>
              <p className="text-gray-300">Chef Pastelera</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/barista3.jpg"
                  alt="Gerente"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-amber-400">Miguel Ángel</h3>
              <p className="text-gray-300">Gerente</p>
            </div>
          </div>
        </motion.div>

        {/* Sección de redes sociales */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-amber-400 mb-6">Síguenos en Redes Sociales</h2>
          
          <div className="flex justify-center space-x-6">
            {socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 p-4 rounded-full hover:bg-amber-400/20 transition-colors"
              >
                <Image 
                  src={social.icon} 
                  alt={social.name} 
                  width={32} 
                  height={32} 
                />
              </a>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Nosotros;