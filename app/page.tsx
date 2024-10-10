import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, LogIn, Github, Trello } from "lucide-react"

export default function App() {
  return (
    <div className="bg-white text-gray-900 flex flex-col min-h-screen">
      {/* Barra de navegación */}
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          Nestcord
        </Link>

        <Link href="/login" className="hover:underline">
          <Button variant="outline">Iniciar sesión</Button>
        </Link>
      </nav>

      <main className="flex-grow">
        {/* Sección Hero */}
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Conecta, Comparte y Explora Tu Entorno</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            La red social donde puedes conectar con tus amigos. 
            Publica tus ideas, comparte tus momentos y explora perfiles para hacer nuevas amistades. 
            Únete a la comunidad que te permite expresarte y mantenerte en contacto.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600">
                <Download className="mr-2 h-5 w-5" /> Descargar
              </Button>
            </div>
          </div>
        </section>

        {/* Secciones de características */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Crea publicaciones</h2>
                <p className="text-lg">
                ¡Publica y comparte tus pensamientos en Nestcord! Deja que todos a tu alrededor descubran tus ideas, preguntas y momentos especiales. 
                Conéctate con tu comunidad y observa cómo tus palabras pueden generar conversaciones y conexiones significativas. ¡Es tu espacio para ser escuchado!
                </p>
              </div>
              <div className="h-64 rounded-lg relative">
                <Image
                  src="/Post_Card.webp"
                  alt="Nestcord User Post Card"
                  className="rounded-lg"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                  priority={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-200 h-64 rounded-lg md:order-first"></div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Habla con tus amigos</h2>
                <p className="text-lg">
                Puedes enviar mensajes a tus amigos a través de un chat cifrado y totalmente privado. 
                Disfruta de conversaciones seguras, donde solo tú y tus amigos pueden acceder a lo que compartan. ¡No esperes más para conectar de forma más cercana y confidencial!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de llamada a la acción */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¡Empieza a explorar tu alrededor!</h2>
            <Link href="/login">
              <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600">
                <LogIn className="mr-2 h-5 w-5" /> Iniciar sesión
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo y redes sociales */}
            <div>
              <h3 className="text-indigo-500 font-bold text-2xl mb-4">Nestcord</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/nestcord" className="text-gray-300 hover:text-white transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://trello.com/b/AsSQkCr8" className="text-gray-300 hover:text-white transition-colors">
                  <Trello className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Enlaces importantes */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Políticas</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Botón de abrir app */}
            <div className="flex items-center justify-center md:justify-end">
              <Link href="/home">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white w-full md:w-auto py-3 px-6 flex items-center justify-center">
                  <LogIn className="mr-2 h-5 w-5" /> Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 text-center text-gray-500">
            © {new Date().getFullYear()} Nestcord. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}