"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, LogIn, Github, Trello } from "lucide-react";
import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { type User } from "@/types/User";

/**
 * App component
 * This is the main component for rendering the homepage
 * It manages user authentication and dynamically displays content
 * based on whether the user is logged in or not.
 */
export default function App() {
  const [user, setUser] = useState<User | null>(null); // State to store the authenticated user data
  const [loading, setLoading] = useState(true); // Loading state to track when user data is being fetched

  /**
   * useEffect hook for fetching the authenticated user's data.
   * Once the user is fetched from Supabase, it updates the user state
   * and stops the loading indicator.
   */
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser(); // Fetch user data from Supabase
      setUser(user); // Update the user state with fetched data
      setLoading(false); // Stop loading state
    };

    fetchUser();
  }, []);

  // Determine the button text based on loading state and user's authentication status
  const buttonText = loading ? "" : user ? "Abrir App" : "Iniciar sesión";

  return (
    <div className="bg-[#404EED] text-white flex flex-col min-h-screen">
      {/* Navigation bar */}
      <nav className="bg-[#404EED] py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold">
            Nestcord
          </Link>
          {/* Desktop navigation links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/download" className="hover:underline">
              Descargar
            </Link>
            <Link href="/people" className="hover:underline">
              Descubrir
            </Link>
            <Link href="/security" className="hover:underline">
              Seguridad
            </Link>
          </div>
          {/* Conditional button to log in or open the app based on user's status */}
          <Link href={loading ? "#" : user ? "/home" : "/login"}>
            <Button
              variant="secondary"
              disabled={loading}
              className="bg-white text-[#404EED] hover:bg-gray-200 hover:text-[#5865F2]"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-[#404EED] py-32 relative overflow-hidden">
          <div className="container mx-auto text-center px-6 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Conecta, Comparte y Explora Tu Entorno
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              La red social donde puedes conectar con tus amigos. Publica tus
              ideas, comparte tus momentos y explora perfiles para hacer nuevas
              amistades. Únete a la comunidad que te permite expresarte y
              mantenerte en contacto.
            </p>
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-[#404EED] hover:bg-gray-200 hover:text-[#5865F2]"
              >
                <Download className="mr-2 h-5 w-5" /> Descargar para Windows
              </Button>
              <Link href={loading ? "#" : user ? "/home" : "/login"}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#23272A] text-white hover:bg-[#2C2F33]"
                >
                  Abrir Nestcord en tu navegador
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative SVG wave shape */}
          <div className="absolute left-0 bottom-0 w-full">
            <svg
              className="w-full h-auto"
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Feature sections */}
        <section className="py-20 bg-white text-[#23272A]">
          <div className="container mx-auto px-6">
            {/* Feature: Creating posts */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-20">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Crea publicaciones
                </h2>
                <p className="text-lg">
                  ¡Publica y comparte tus pensamientos en Nestcord! Deja que
                  todos a tu alrededor descubran tus ideas, preguntas y momentos
                  especiales. Conéctate con tu comunidad y observa cómo tus
                  palabras pueden generar conversaciones y conexiones
                  significativas.
                </p>
              </div>
              <div>
                {/* Image showing a user post card */}
                <Image
                  src="/Post_Card.webp"
                  alt="Nestcord User Post Card"
                  width={580}
                  height={580}
                  className="rounded-lg shadow-lg"
                  quality={100}
                  priority={true}
                />
              </div>
            </div>

            {/* Feature: Chat with friends */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Habla con tus amigos
                </h2>
                <p className="text-lg">
                  Puedes enviar mensajes a tus amigos a través de un chat
                  cifrado y privado. Disfruta de conversaciones seguras, donde
                  solo tú y tus amigos pueden acceder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-action section */}
        <section className="py-20 bg-[#F6F6F6] text-[#23272A]">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¡Empieza a explorar tu alrededor!
            </h2>
            <Link href={loading ? "#" : user ? "/home" : "/login"}>
              <Button
                size="lg"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                disabled={loading}
              >
                <LogIn className="mr-2 h-5 w-5" /> {buttonText}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#23272A] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-[#5865F2] font-bold text-4xl mb-4">
                NESTCORD
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/nestcord"
                  className="text-white hover:text-[#5865F2] transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://trello.com/b/AsSQkCr8"
                  className="text-white hover:text-[#5865F2] transition-colors"
                >
                  <Trello className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Product section */}
            <div>
              <h4 className="text-[#5865F2] font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/download" className="hover:underline">
                    Descargar
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer bottom links */}
          <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
              Nestcord
            </Link>
            <div className="flex space-x-4">
              <Link href="/terms" className="hover:underline">
                Términos
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
