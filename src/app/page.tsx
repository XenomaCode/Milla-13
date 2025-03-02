'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Home = () => {
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
      <main className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        {/* Sección izquierda con texto */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mb-12 md:mb-0"
        >
          <div className="max-w-lg">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-8xl font-bold text-amber-400 mb-6 font-serif"
            >
              Para un día con mala suerte, el 13 para la suerte
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-gray-300">
                Bienvenido a Milla 13, tu refugio de café de especialidad. 
                Disfruta de nuestros granos seleccionados y ambiente acogedor.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4"
            >
              <Link
                href="/menu"
                className="px-6 py-3 bg-amber-400 text-zinc-900 font-medium hover:bg-amber-300 transition-colors"
              >
                Ver Menú
              </Link>
              <Link
                href="/pedido"
                className="px-6 py-3 border border-amber-400 text-amber-400 font-medium hover:bg-amber-400/10 transition-colors"
              >
                Realiza tu pedido
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Sección derecha con imagen */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full md:w-1/2 flex justify-center"
        >
        </motion.div>
      </main>

      {/* Sección de categorías */}
      <section className="relative z-10 bg-gray-300 py-12 mt-18">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { src: "/images/hotcoffe.png", alt: "Café Caliente", text: "Café Caliente" },
              { src: "/images/cold_coffe.png", alt: "Café Helado", text: "Café Helado" },
              { src: "/icons/cup-coffee.svg", alt: "Café para Llevar", text: "Para Llevar" },
              { src: "/icons/tea.svg", alt: "Té", text: "Té" },
              { src: "/icons/dessert.svg", alt: "Postres", text: "Postres" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <Image src={item.src} alt={item.alt} width={60} height={60} />
                <p className="mt-3 text-zinc-900">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};
export default Home;
