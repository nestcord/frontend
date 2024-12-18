import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Github, Trello } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import Action from "./(authentication)/login/Action";

export default function Home() {
  return (
    <div className="bg-neutral-900 text-white flex flex-col min-h-screen ">
      <nav className="bg-neutral-950 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link href="/" className="text-2xl font-bold">
            Nestcord
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/download"
              className="hover:text-indigo-600 transition-colors"
            >
              Download
            </Link>
            <Link
              href="/people"
              className="hover:text-indigo-600 transition-colors"
            >
              Discover
            </Link>
          </div>
          <Action />
        </div>
      </nav>

      <main className="flex-grow">
        <section className="bg-neutral-900 py-16 md:py-32 relative overflow-hidden">
          <div className="container mx-auto text-center px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Connect, Share, and Explore Your Environment
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-neutral-300">
              The social network where you can connect with your friends. Post
              your ideas, share your moments, and explore profiles to make new
              friendships. Join the community that allows you to express
              yourself and stay in touch.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Download className="mr-2 h-5 w-5" /> Download for Windows
              </Button>
              <Action />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 w-full">
            <svg
              className="w-full h-auto"
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V100H0V0Z"
                fill="#262626"
              />
            </svg>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-neutral-800 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-20">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
                  Create Posts
                </h2>
                <p className="text-lg text-neutral-300">
                  Post and share your thoughts on Nestcord! Let everyone around
                  you discover your ideas, questions, and special moments.
                  Connect with your community and see how your words can
                  generate meaningful conversations and connections.
                </p>
              </div>
              <div className="md:w-1/2">
                <Card className="bg-neutral-700 border-neutral-600">
                  <CardContent className="p-0">
                    <Image
                      src="/Post_Card.webp"
                      alt="Nestcord User Post Card"
                      width={580}
                      height={580}
                      className="rounded-lg w-full h-auto"
                      quality={100}
                      priority={true}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
                  Chat with Your Friends
                </h2>
                <p className="text-lg text-neutral-300">
                  You can send messages to your friends through an encrypted and
                  private chat. Enjoy secure conversations, where only you and
                  your friends can access.
                </p>
              </div>
              <div className="md:w-1/2">
                <Card className="bg-neutral-700 border-neutral-600">
                  <CardContent className="p-6">
                    <div className="bg-neutral-800 rounded-lg p-4 mb-4">
                      <p className="text-sm text-neutral-300">
                        Hey, how's it going?
                      </p>
                    </div>
                    <div className="bg-blue-600 rounded-lg p-4 mb-4 ml-auto max-w-[80%]">
                      <p className="text-sm">
                        Great! Just finished a new project. How about you?
                      </p>
                    </div>
                    <div className="bg-neutral-800 rounded-lg p-4">
                      <p className="text-sm text-neutral-300">
                        That's awesome! I'd love to hear more about it.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-neutral-900 text-white">
          <div className="container mx-auto text-center px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
              Start Exploring Your Surroundings!
            </h2>
            <Action />
          </div>
        </section>
      </main>

      <footer className="bg-neutral-950 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-blue-400 font-bold text-4xl mb-4">
                NESTCORD
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/nestcord"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://trello.com/b/AsSQkCr8"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Trello className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-blue-400 font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/download"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Download
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-bold mb-4 md:mb-0">
              Nestcord
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/terms"
                className="hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
