"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/app/components/ui/btn"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/drodropdown-menu"
import home from "@/public/img/img11.jpg"
import img2 from "@/public/img/img2.png"
import img3 from "@/public/img/img3.png"
import img4 from "@/public/img/img4.png"
import img5 from "@/public/img/img5.png"





export default function Page() {

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-4 py-6 md:px-6 border-b">
        <div className="flex items-center gap-2">
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg"
            alt="Duolingo"
            width={120}
            height={32}
            className="w-32 md:w-38"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="text-[#777] hover:text-[#555] flex items-center gap-1 text-sm">
            SITE LANGUAGE: ENGLISH
            <ChevronRight className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px]">
            <div className="grid grid-cols-2 gap-2 p-2">
              {[
                { flag: "🇸🇦", name: "العربية" },
                { flag: "🇧🇩", name: "বাংলা" },
                { flag: "🇨🇿", name: "Čeština" },
                { flag: "🇩🇪", name: "Deutsch" },
                { flag: "🇬🇷", name: "Ελληνικά" },
                { flag: "🇺🇸", name: "English" },
                { flag: "🇪🇸", name: "Español" },
                { flag: "🇫🇷", name: "Français" },
              ].map((lang) => (
                <DropdownMenuItem key={lang.name} className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="max-w-[1080px] mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            <div className="w-full max-w-[440px]">
              <Image
                src={home}
                alt="Duolingo Characters"
                width={440}
                height={440}
                className="w-full h-auto"
              />
            </div>

            <div className="flex flex-col items-center md:items-start gap-8 max-w-[440px] text-center md:text-left">
              <h1 className="text-[32px] md:text-[48px] leading-tight font-bold text-[#4B4B4B]">
                The free, fun, and effective way to learn a language!
              </h1>
              <div className="flex flex-col gap-3 w-full max-w-[320px]">
                <Link href="/languageselection">
                <Button
                  className="w-full h-12 text-[15px] font-bold bg-[#58CC02] hover:bg-[#4CAF00] text-white rounded-2xl"
                >
                  GET STARTED
                </Button>
                </Link>
                


                <Link href="/auth/sign-up">
                <Button
                  variant="outline"
                  className="w-full h-12 text-[15px] font-bold text-[#1CB0F6] border-[#1CB0F6] hover:bg-[#1CB0F6]/5 rounded-2xl"
                >
                  I ALREADY HAVE AN ACCOUNT
                </Button>
                </Link>
         
         

              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-24">
          <div className="max-w-[1080px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="max-w-[520px]">
                <h2 className="text-[48px] md:text-[64px] leading-none font-bold mb-8">
                  <span className="text-[#58CC02] block">free.</span>
                  <span className="text-[#58CC02] block">fun.</span>
                  <span className="text-[#58CC02] block">effective.</span>
                </h2>
                <p className="text-xl text-[#4B4B4B] mb-12">
                  Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons,
                  you&apos;ll earn points and unlock new levels while gaining real-world communication skills.
                </p>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-bold text-[#4B4B4B] mb-4">stay motivated</h3>
                    <p className="text-lg text-[#777]">
                      We make it easy to form a habit of language learning with game-like features, fun challenges, and
                      reminders from our friendly mascot, Duo the owl.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#4B4B4B] mb-4">backed by science</h3>
                    <p className="text-lg text-[#777]">
                      We use a combination of research-backed teaching methods and delightful content to create courses
                      that effectively teach reading, writing, listening, and speaking skills!
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative w-full max-w-[440px]">
                <Image
                  src={img2}
                  alt="Duolingo App Interface"
                  width={440}
                  height={440}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Scientific Method Section */}
        <section className="bg-[#F7F7F7] py-24">
          <div className="max-w-[1080px] mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16">
              <div className="max-w-[520px]">
                <h2 className="text-[48px] md:text-[64px] leading-none font-bold mb-8 text-[#58CC02]">
                  une méthode scientifique
                </h2>
                <p className="text-xl text-[#4B4B4B] leading-relaxed">
                  On utilise des méthodes d'enseignement fondées sur la recherche associées à du contenu ludique pour
                  créer des cours qui enseignent efficacement la compréhension et l'expression écrites et orales !
                </p>
              </div>
              <div className="w-full max-w-[500px]">
                <Image
                  src={img3}
                  alt="Scientific Method Illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Motivation Section */}
        <section className="bg-white py-24">
          <div className="max-w-[1080px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="max-w-[520px]">
                <h2 className="text-[48px] md:text-[64px] leading-none font-bold mb-8 text-[#58CC02]">
                  une motivation toujours au top
                </h2>
                <p className="text-xl text-[#4B4B4B] leading-relaxed">
                  On t'aide à prendre l'habitude de pratiquer les langues grâce à nos fonctionnalités ludiques, à nos
                  défis amusants et aux rappels de notre mascotte, Duo le hibou.
                </p>
              </div>
              <div className="w-full max-w-[500px]">
                <Image
                  src={img4}
                  alt="Motivation Illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Personalized Learning Section */}
        <section className="bg-[#F7F7F7] py-24">
          <div className="max-w-[1080px] mx-auto px-4">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-16">
              <div className="max-w-[520px]">
                <h2 className="text-[48px] md:text-[64px] leading-none font-bold mb-8 text-[#58CC02]">
                  un apprentissage personnalisé
                </h2>
                <p className="text-xl text-[#4B4B4B] leading-relaxed">
                  Conçues pour s'adapter à ton niveau et t'aider à apprendre à ton rythme, nos leçons combinent le
                  meilleur de l'intelligence artificielle et de la linguistique.
                </p>
              </div>
              <div className="w-full max-w-[500px]">
                <Image
                  src={img5}
                  alt="Personalized Learning Illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="bg-white py-24 overflow-hidden">
          <div className="max-w-[1080px] mx-auto px-4 text-center">
            <h2 className="text-[48px] md:text-[64px] leading-none font-bold mb-16 text-[#042c60]">
              learn anytime,
              <br />
              anywhere
            </h2>
          </div>
        </section>

        {/* Language Selection */}
        <div className="border-t">
          <div className="max-w-[1080px] mx-auto px-4 py-4 flex items-center justify-center">
            <button className="p-2 text-[#777] hover:text-[#555]">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-8 px-4 overflow-hidden">
              {[
                { code: "SPANISH", flag: "🇪🇸" },
                { code: "FRENCH", flag: "🇫🇷" },
                { code: "GERMAN", flag: "🇩🇪" },
                { code: "ITALIAN", flag: "🇮🇹" },
                { code: "PORTUGUESE", flag: "🇵🇹" },
                { code: "DUTCH", flag: "🇳🇱" },
                { code: "JAPANESE", flag: "🇯🇵" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  className="text-[#777] hover:text-[#555] text-sm font-medium whitespace-nowrap flex items-center gap-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.code}</span>
                </button>
              ))}
            </div>

            <button className="p-2 text-[#777] hover:text-[#555]">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#58CC02] text-white">
        <div className="max-w-[1080px] mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <div>
              <h4 className="font-bold mb-4 text-lg">About us</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Courses</Link></li>
                <li><Link href="#" className="hover:underline">Mission</Link></li>
                <li><Link href="#" className="hover:underline">Approach</Link></li>
                <li><Link href="#" className="hover:underline">Efficacy</Link></li>
                <li><Link href="#" className="hover:underline">Team</Link></li>
                <li><Link href="#" className="hover:underline">Research</Link></li>
                <li><Link href="#" className="hover:underline">Careers</Link></li>
                <li><Link href="#" className="hover:underline">Brand guidelines</Link></li>
                <li><Link href="#" className="hover:underline">Store</Link></li>
                <li><Link href="#" className="hover:underline">Press</Link></li>
                <li><Link href="#" className="hover:underline">Investors</Link></li>
                <li><Link href="#" className="hover:underline">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Duolingo</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo for Schools</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo English Test</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo ABC</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo Math</Link></li>
                <li><Link href="#" className="hover:underline">Podcast</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo for Business</Link></li>
                <li><Link href="#" className="hover:underline">Super Duolingo</Link></li>
                <li><Link href="#" className="hover:underline">Gift Super Duolingo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Apps</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Duolingo for Android</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo for iOS</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo ABC (iOS)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Help and support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Duolingo FAQs</Link></li>
                <li><Link href="#" className="hover:underline">Schools FAQs</Link></li>
                <li><Link href="#" className="hover:underline">Duolingo English Test FAQs</Link></li>
                <li><Link href="#" className="hover:underline">Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Privacy and terms</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Community guidelines</Link></li>
                <li><Link href="#" className="hover:underline">Terms</Link></li>
                <li><Link href="#" className="hover:underline">Privacy</Link></li>
                <li>
                  <Link href="#" className="hover:underline">
                    Respecting your "do not sell my personal information" rights
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Social</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline">Blog</Link></li>
                <li><Link href="#" className="hover:underline">Instagram</Link></li>
                <li><Link href="#" className="hover:underline">Facebook</Link></li>
                <li><Link href="#" className="hover:underline">Twitter</Link></li>
                <li><Link href="#" className="hover:underline">YouTube</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20">
          <div className="max-w-[1080px] mx-auto px-4 py-6">
            <div className="text-sm">
              <span className="font-medium">Site language:</span>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="#" className="hover:underline">العربية</Link>
                <Link href="#" className="hover:underline">বাংলা</Link>
                <Link href="#" className="hover:underline">Čeština</Link>
                <Link href="#" className="hover:underline">Deutsch</Link>
                <Link href="#" className="hover:underline">Ελληνικά</Link>
                <Link href="#" className="hover:underline">English</Link>
                <Link href="#" className="hover:underline">Español</Link>
                <Link href="#" className="hover:underline">Français</Link>
                <Link href="#" className="hover:underline">Magyar</Link>
                <Link href="#" className="hover:underline">Bahasa Indonesia</Link>
                <Link href="#" className="hover:underline">Italiano</Link>
                <Link href="#" className="hover:underline">日本語</Link>
                <Link href="#" className="hover:underline">한국어</Link>
                <Link href="#" className="hover:underline">Nederlands</Link>
                <Link href="#" className="hover:underline">Polski</Link>
                <Link href="#" className="hover:underline">Português</Link>
                <Link href="#" className="hover:underline">Română</Link>
                <Link href="#" className="hover:underline">Русский</Link>
                <Link href="#" className="hover:underline">ייִדיש</Link>
                <Link href="#" className="hover:underline">ภาษาไทย</Link>
                <Link href="#" className="hover:underline">Tagalog</Link>
                <Link href="#" className="hover:underline">Türkçe</Link>
                <Link href="#" className="hover:underline">Українською</Link>
                <Link href="#" className="hover:underline">Tiếng Việt</Link>
                <Link href="#" className="hover:underline">中文</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

