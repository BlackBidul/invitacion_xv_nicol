'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Play,
  Pause,
  Crown,
  Church,
  PartyPopper,
  Shirt,
  Gift,
  MessageCircle,
  Heart,
  Sparkles,
  MapPin
} from 'lucide-react'

const WEDDING_DATE = new Date('2026-05-16T20:00:00').getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface LanternProps {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
}

function Lantern({ left, top, size, delay, duration }: LanternProps) {
  return (
    <div
      className="lantern"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: `lanternFloat ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Image
        src="/Linterna.png"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: 'auto' }}
      />
    </div>
  )
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`fade-in-section ${inView ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

export default function InvitationClient() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [lanterns, setLanterns] = useState<LanternProps[]>([])
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setMounted(true)
    // Pocas linternas (5-6) en posiciones aleatorias
    const generatedLanterns: LanternProps[] = []
    for (let i = 0; i < 6; i++) {
      generatedLanterns.push({
        id: i,
        left: Math.random() * 80 + 10, // Entre 10% y 90%
        top: Math.random() * 60 + 30, // Posición inicial aleatoria
        size: Math.random() * 30 + 40, // Tamaño entre 40-70px
        delay: Math.random() * 8, // Delay aleatorio
        duration: Math.random() * 8 + 15, // Duración entre 15-23s
      })
    }
    setLanterns(generatedLanterns)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = WEDDING_DATE - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const openEnvelope = useCallback(() => {
    setIsEnvelopeOpen(true)
    setTimeout(() => {
      setShowInvitation(true)
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          setIsPlaying(false)
        })
      }
    }, 800)
  }, [])

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  if (!mounted) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rapunzel-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Audio Element */}
      <audio ref={audioRef} src="/assets/Cancion.mp3" loop preload="auto" />

      {/* Background Decorations */}
      {showInvitation && (
        <>
          {/* Sun decorations */}
          <div className="sun-decoration" style={{ top: '5%', right: '5%', width: '150px', opacity: 0.06 }}>
            <Image src="/Sol.png" alt="" width={150} height={150} />
          </div>
          <div className="sun-decoration" style={{ bottom: '15%', left: '3%', width: '120px', opacity: 0.05 }}>
            <Image src="/Sol.png" alt="" width={120} height={120} />
          </div>
          <div className="sun-decoration" style={{ top: '40%', right: '2%', width: '100px', opacity: 0.04 }}>
            <Image src="/Sol.png" alt="" width={100} height={100} />
          </div>
          {/* Lanterns */}
          {lanterns.map((lantern) => (
            <Lantern key={lantern.id} {...lantern} />
          ))}
        </>
      )}

      {/* Envelope Screen */}
      <AnimatePresence>
        {!showInvitation && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 gradient-bg flex flex-col items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h1 className="font-script text-4xl sm:text-5xl text-rapunzel-purple-dark mb-2">
                Tienes una invitación
              </h1>
              <p className="text-rapunzel-purple font-light">
                Haz clic en el sobre para abrir
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="envelope-container"
              onClick={openEnvelope}
            >
              <div className={`envelope ${isEnvelopeOpen ? 'opened' : ''}`}>
                <div className="envelope-body">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-script text-2xl text-rapunzel-purple/60">XV</span>
                  </div>
                </div>
                <div className="envelope-flap" />
                <div className="envelope-seal">
                  <span className="font-script text-white text-xl">N</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <Sparkles className="w-6 h-6 text-rapunzel-gold animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Invitation */}
      {showInvitation && (
        <>
          {/* Floating Play Button */}
          <button
            onClick={toggleMusic}
            className="play-btn-float"
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-script text-5xl sm:text-7xl md:text-8xl shimmer-text mb-2">
                Nicol
              </h1>
              <p className="font-serif text-2xl sm:text-3xl text-rapunzel-purple-dark tracking-wider">
                Mis XV Años
              </p>
            </motion.div>

            {/* Hexagon Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="my-10 relative"
            >
              <div className="absolute -inset-8 bg-rapunzel-gold/20 blur-3xl rounded-full" />
              <div className="hexagon-outer relative z-10">
                <div className="hexagon-inner">
                  <Image
                    src="/assets/Nicol.jpeg"
                    alt="Nicol - Quinceañera"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Decorative sparkles */}
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-rapunzel-gold animate-pulse z-20" />
              <Sparkles className="absolute -bottom-4 -left-4 w-6 h-6 text-rapunzel-gold animate-pulse z-20" />
            </motion.div>

            {/* Emotional Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl text-center px-4"
            >
              <p className="font-serif text-lg sm:text-xl text-rapunzel-purple-dark leading-relaxed italic">
                "Hace quince años nació una niña muy especial que, a pesar de ser pequeñita, 
                vino al mundo con un corazón enorme. Con el tiempo, sus virtudes y belleza han 
                florecido y se ha convertido en una linda e inteligente mujer, capaz de alcanzar 
                sus sueños. Nicol, aún a tu corta edad has dejado una huella en los corazones de 
                todos los que tanto te queremos."
              </p>
            </motion.div>
          </section>

          {/* Date Section */}
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-lg mx-auto text-center glass-card rounded-3xl p-8 sm:p-10">
              <Crown className="w-12 h-12 mx-auto text-rapunzel-gold mb-4" />
              <h2 className="font-serif text-3xl sm:text-4xl text-rapunzel-purple-dark mb-4">
                Fecha del Evento
              </h2>
              <p className="font-script text-4xl sm:text-5xl text-rapunzel-gold mb-2">
                16 de mayo
              </p>
              <p className="font-serif text-2xl text-rapunzel-purple-dark">
                del 2026
              </p>
              <p className="text-xl text-rapunzel-purple mt-4 font-semibold">
                8:00 PM
              </p>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* Countdown Section */}
          <AnimatedSection className="py-12 px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-script text-3xl sm:text-4xl text-rapunzel-purple-dark mb-8">
                Solo faltan
              </h2>
              <div className="flex justify-center gap-3 sm:gap-6 flex-wrap">
                {[
                  { value: timeLeft.days, label: 'Días' },
                  { value: timeLeft.hours, label: 'Horas' },
                  { value: timeLeft.minutes, label: 'Minutos' },
                  { value: timeLeft.seconds, label: 'Segundos' },
                ].map((item, index) => (
                  <div key={index} className="count-box">
                    <span className="block font-serif text-3xl sm:text-4xl text-rapunzel-purple-dark font-semibold">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-rapunzel-purple font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* Misa Section */}
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-lg mx-auto glass-card rounded-3xl p-8 text-center">
              <Church className="w-12 h-12 mx-auto text-rapunzel-gold mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl text-rapunzel-purple-dark mb-2">
                Misa
              </h2>
              <p className="text-xl font-semibold text-rapunzel-purple mb-4">6:30 PM</p>
              <h3 className="font-medium text-rapunzel-purple-dark text-lg mb-2">
                Parroquia Santo Hermano Pedro
              </h3>
              <p className="text-rapunzel-purple mb-6 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                6a calle "B" 5-24, sector C-2, panorama
              </p>
              <a
                href="https://www.google.com/maps/dir/14.5874573,-90.5783248/14.5879487,-90.5802135/@14.5874685,-90.5816718,17z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-block"
              >
                Cómo llegar
              </a>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* Reception Section */}
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-lg mx-auto glass-card rounded-3xl p-8 text-center">
              <PartyPopper className="w-12 h-12 mx-auto text-rapunzel-gold mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl text-rapunzel-purple-dark mb-2">
                Recepción
              </h2>
              <p className="text-xl font-semibold text-rapunzel-purple mb-4">8:00 PM</p>
              <h3 className="font-medium text-rapunzel-purple-dark text-lg mb-2">
                Palacio Imperial
              </h3>
              <p className="text-rapunzel-purple mb-6 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                3 Calle 18-72 Centro Comercial San Cristóbal. Guatemala 01057-Mixco
              </p>
              <a
                href="https://www.google.com/maps/dir/14.5874573,-90.5783248/14.59815,-90.57838/@14.5927525,-90.5834775,16z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-block"
              >
                Cómo llegar
              </a>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* Dress Code Section */}
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-lg mx-auto glass-card rounded-3xl p-8 text-center">
              <Shirt className="w-12 h-12 mx-auto text-rapunzel-gold mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl text-rapunzel-purple-dark mb-4">
                Código de Vestimenta
              </h2>
              <p className="text-xl text-rapunzel-purple-dark font-medium mb-4">
                Elegante Formal
              </p>
              <div className="bg-rapunzel-lilac/50 rounded-2xl p-4 border border-rapunzel-lavender/40">
                <p className="text-rapunzel-purple-dark italic">
                  El color <span className="font-semibold text-rapunzel-purple">lila</span> está reservado exclusivamente para la quinceañera
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* Gift Section */}
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-lg mx-auto glass-card rounded-3xl p-8 text-center">
              <Gift className="w-12 h-12 mx-auto text-rapunzel-gold mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl text-rapunzel-purple-dark mb-6">
                Regalo
              </h2>
              <p className="font-serif text-lg text-rapunzel-purple-dark italic leading-relaxed">
                "Tu presencia es lo más importante, pero si deseas bendecirme, puede ser con lluvia de sobres."
              </p>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* RSVP Section */}
          <AnimatedSection className="py-16 px-4">
            <div className="max-w-lg mx-auto glass-card rounded-3xl p-8 text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-rapunzel-gold mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl text-rapunzel-purple-dark mb-4">
                Confirma tu Asistencia
              </h2>
              <p className="text-rapunzel-purple mb-6">
                No olvides confirmar tu asistencia haciendo clic en el siguiente botón:
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=+50254697108&text=%C2%A1Hola%20Nicol!%20Claro%20que%20asistiremos.%20Cuenten%20con%20nuestra%20presencia"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Confirmar Asistencia
              </a>
            </div>
          </AnimatedSection>

          <div className="section-divider" />

          {/* Final Section */}
          <AnimatedSection className="py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="w-10 h-10 mx-auto text-rapunzel-gold mb-6 animate-pulse" />
              <p className="font-script text-3xl sm:text-4xl text-rapunzel-purple-dark mb-4">
                Gracias por ser parte de este momento tan especial
              </p>
              <p className="font-serif text-lg text-rapunzel-purple italic">
                Será un honor compartir esta noche mágica contigo
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <Sparkles className="w-6 h-6 text-rapunzel-gold animate-pulse" />
                <Heart className="w-6 h-6 text-rapunzel-purple animate-pulse" />
                <Sparkles className="w-6 h-6 text-rapunzel-gold animate-pulse" />
              </div>
              <p className="font-script text-5xl sm:text-6xl shimmer-text mt-8">
                Nicol
              </p>
            </div>
          </AnimatedSection>

          {/* Footer spacing */}
          <div className="h-24" />
        </>
      )}
    </div>
  )
}
