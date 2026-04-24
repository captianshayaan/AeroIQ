import { lazy, Suspense } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  Clock3,
  Compass,
  IndianRupee,
  MessageSquareText,
  PlaneTakeoff,
  Radar,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import ChatPage from './ChatPage'

const GlobeScene = lazy(() => import('./GlobeScene'))

const TELEGRAM_URL = import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/SkyMind01_bot'

const featureCards = [
  {
    icon: Search,
    title: 'Natural Language Search',
    description:
      'Type exactly how you think: routes, dates, budget, cabin class, and preferences in one sentence.',
  },
  {
    icon: Radar,
    title: 'Real-Time Prices',
    description:
      'Live fare intelligence surfaces fast-moving options with a premium view of price, time, and stop count.',
  },
  {
    icon: BrainCircuit,
    title: 'Best Route AI',
    description:
      'AeroIQ ranks the smartest routes, balancing price, duration, and layovers so you choose faster.',
  },
]

const steps = [
  {
    icon: MessageSquareText,
    title: 'Tell AeroIQ',
    description: 'Describe your trip naturally, from "Mumbai to Dubai next Friday" to complex multi-city intent.',
  },
  {
    icon: Search,
    title: 'AI Searches',
    description: 'The assistant parses dates, airports, and constraints while scanning routes and fare signals.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Get Results',
    description: 'Receive curated flight options with clear pricing, duration, and stop details inside one chat flow.',
  },
]

const flights = [
  {
    airline: 'IndiGo',
    price: 18450,
    duration: '3h 35m',
    stops: 'Non-stop',
  },
  {
    airline: 'Air India',
    price: 21680,
    duration: '4h 05m',
    stops: '1 stop',
  },
  {
    airline: 'Emirates',
    price: 28740,
    duration: '3h 50m',
    stops: 'Non-stop',
  },
]

function App() {
  const reduceMotion = useReducedMotion()

  if (window.location.pathname === '/chat') {
    return <ChatPage />
  }

  return (
    <div className="page-shell globe-page bg-[#05070d] text-white">
      <Suspense fallback={null}>
        <GlobeScene />
      </Suspense>
      <div className="noise-overlay" />

      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070d]/58 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          
          {/* UPDATED HEADER LOGO */}
          <a href="#top" className="flex items-center gap-3 select-none">
            <LogoMark />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                Aero<span className="text-blue-500">IQ</span>
              </span>
              <span className="text-[0.65rem] font-medium text-slate-400 tracking-[0.2em] uppercase mt-1 leading-none">
                AI Flight Intelligence
              </span>
            </div>
          </a>

          <nav className="hidden items-center rounded-full border border-white/10 bg-black/20 px-2 py-2 text-sm text-slate-300 shadow-[0_18px_60px_rgba(0,0,0,0.26)] md:flex">
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white" href="#top">
              Home
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white" href="#about">
              About Us
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white" href="#features">
              Features
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white" href="#how-it-works">
              How it works
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white" href="#contact">
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <Hero reduceMotion={reduceMotion} />
        <AboutSection reduceMotion={reduceMotion} />
        <ChatSection reduceMotion={reduceMotion} />
        <FeaturesSection reduceMotion={reduceMotion} />
        <HowItWorksSection reduceMotion={reduceMotion} />
      </main>

      <Footer />
    </div>
  )
}

function Hero({ reduceMotion }) {
  return (
    <section className="relative isolate">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-3xl pt-10 text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-6 inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-full border border-blue-200/20 bg-black/20 px-4 py-2 text-sm text-blue-100 backdrop-blur-xl sm:w-auto sm:max-w-full">
            <Sparkles size={16} className="text-blue-400" />
            <span className="truncate sm:whitespace-normal">Real-time routes, prices, and flight intent</span>
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-[4.25rem] lg:leading-[1.04]">
            Find Flights Instantly with AI
          </h1>

          <p className="text-balance mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200/88 sm:text-xl lg:mx-0">
            Just tell AeroIQ where you want to go. Natural language, real results.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="button-glow inline-flex min-w-52 items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#60A5FA]"
            >
              Try on Telegram
              <ArrowUpRight size={18} />
            </a>
            <a
              href="/chat"
              className="inline-flex min-w-52 items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.04] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/[0.08]"
            >
              Try Web Chat
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="w-full justify-self-end lg:pt-28"
        >
          <HeroPreviewCard />
        </motion.div>
      </div>
    </section>
  )
}

function HeroPreviewCard() {
  return (
    <div className="panel-glass relative overflow-hidden rounded-[1.35rem] p-4 sm:p-5">
      <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
            Live AI search workflow
          </div>
          <div className="mt-6 space-y-5">
            <PromptBubble align="right">
              Find me the cheapest nonstop flight from Bangalore to Dubai on 20 May. Evening departures only.
            </PromptBubble>

            <PromptBubble align="left" icon={<Sparkles size={16} className="text-blue-300" />}>
              AeroIQ understood:
              <span className="mt-2 block text-slate-300">
                BLR to DXB, 20 May, nonstop, lowest fare, evening departure preference.
              </span>
            </PromptBubble>

            <div className="rounded-[1.5rem] border border-blue-400/[0.12] bg-[#0D152B]/[0.88] p-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
                <PlaneTakeoff size={16} className="text-blue-400" />
                Top matches in under 2.3 seconds
              </div>
              <div className="grid gap-3">
                {flights.slice(0, 2).map((flight) => (
                  <FlightCard key={flight.airline} flight={flight} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/16 p-5 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-blue-200">
            Premium intelligence
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white">
            Designed for intent, not filters.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            AeroIQ removes the friction of traditional travel search. Ask naturally, compare instantly, and move with confidence.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              ['Fast parsing', 'Dates, routes, budgets, and cabin classes understood together.'],
              ['Signal-rich results', 'Price, duration, and stop quality surfaced without clutter.'],
              ['Built for action', 'Go from idea to bookable options inside one premium flow.'],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="mt-1 rounded-xl border border-blue-400/[0.16] bg-blue-500/10 p-2 text-blue-300">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="font-medium text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-400">{copy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutSection({ reduceMotion }) {
  return (
    <section id="about" className="relative scroll-mt-28 px-5 py-20 lg:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"
      >
        <SectionHeading
          eyebrow="About Us"
          title="Flight search built around how people actually ask."
          copy="AeroIQ turns everyday travel intent into structured route discovery, helping travellers compare price, duration, and route quality without fighting filters."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Global', 'Route intelligence across domestic and international travel.'],
            ['Instant', 'Natural prompts become focused search context in seconds.'],
            ['Useful', 'Results stay readable, direct, and ready for action.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-5 backdrop-blur-md">
              <div className="text-lg font-semibold text-white">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ChatSection({ reduceMotion }) {
  return (
    <section id="chat" className="relative scroll-mt-28 px-6 py-24 lg:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <SectionHeading
          eyebrow="Web Chat"
          title="A dedicated workspace for live flight search."
          copy="Open AeroIQ as a full-screen assistant with saved conversations, direct webhook responses, and a focused travel chat flow."
        />
        <a
          href="/chat"
          className="button-glow inline-flex items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#60A5FA]"
        >
          Launch Web Chat
          <ArrowUpRight size={18} />
        </a>
      </motion.div>
    </section>
  )
}

function FeaturesSection({ reduceMotion }) {
  return (
    <section id="features" className="scroll-mt-28 px-6 py-24 lg:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading
          eyebrow="Why AeroIQ"
          title="Everything that matters, reduced to signal."
          copy="Every card is intentionally quiet: rich enough to inform, disciplined enough to keep you moving."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
              className="panel-glass rounded-[1.75rem] p-7"
            >
              <div className="inline-flex rounded-2xl border border-blue-400/[0.18] bg-blue-500/10 p-3 text-blue-300">
                <feature.icon size={22} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 max-w-sm text-base leading-7 text-slate-300">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function HowItWorksSection({ reduceMotion }) {
  return (
    <section id="how-it-works" className="relative scroll-mt-28 px-6 py-24 lg:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-7xl"
      >
        <SectionHeading
          eyebrow="How It Works"
          title="Three deliberate steps from request to route."
          copy="AeroIQ keeps the workflow intuitive, so the intelligence stays powerful without ever feeling heavy."
        />

        <div className="relative mt-12">
          <div className="absolute left-1/2 top-12 hidden h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                className="panel-glass relative rounded-[1.75rem] p-7"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="inline-flex rounded-2xl border border-blue-400/[0.18] bg-blue-500/10 p-3 text-blue-300">
                    <step.icon size={22} />
                  </div>
                  <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-400">
                    0{index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-black/18 px-6 py-10 backdrop-blur-sm lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        
        {/* UPDATED FOOTER LOGO */}
        <div className="flex items-center gap-3 select-none">
          <LogoMark />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white leading-none">
              Aero<span className="text-blue-500">IQ</span>
            </span>
            <span className="text-[0.65rem] font-medium text-slate-400 tracking-[0.2em] uppercase mt-1 leading-none">
              Natural language flight search
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
          <a className="transition hover:text-white" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
            Telegram Bot
          </a>
          <a className="transition hover:text-white" href="#top">
            Privacy
          </a>
          <a className="transition hover:text-white" href="mailto:hello@aeroiq.ai">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.22em] text-blue-300">{eyebrow}</div>
      <h2 className="mt-4 text-balance text-4xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{copy}</p>
    </div>
  )
}

function PromptBubble({ align, icon, children }) {
  const isUser = align === 'right'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-[1.4rem] px-4 py-3 text-sm leading-7 sm:px-5 ${
          isUser
            ? 'bg-[#2563EB] text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)]'
            : 'border border-white/10 bg-[#0F172A]/[0.92] text-white'
        }`}
      >
        {!isUser && icon ? <div className="mb-2 flex items-center gap-2 text-slate-200">{icon}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  )
}

function FlightCard({ flight }) {
  const price = new Intl.NumberFormat('en-IN').format(flight.price)

  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-[#09101F]/[0.92] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-base font-medium text-white">
            <PlaneTakeoff size={16} className="text-blue-400" />
            {flight.airline}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-slate-400">
            <InfoPill icon={<IndianRupee size={14} />} label={`INR ${price}`} />
            <InfoPill icon={<Clock3 size={14} />} label={flight.duration} />
            <InfoPill icon={<Route size={14} />} label={flight.stops} />
          </div>
        </div>
        <div className="text-sm font-medium text-blue-300">Recommended</div>
      </div>
    </div>
  )
}

function InfoPill({ icon, label }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
      <span className="text-blue-300">{icon}</span>
      <span>{label}</span>
    </div>
  )
}

{/* UPDATED LOGO MARK FUNCTION */}
function LogoMark() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4 0 .9.4 1.2l6.8 4.9-3.2 3.2-2.8-.9c-.4-.1-.8.1-1 .5l-1 2c-.2.4 0 .8.4 1l4.5 1.5 1.5 4.5c.2.4.6.6 1 .4l2-1c.4-.2.6-.6.5-1l-.9-2.8 3.2-3.2 4.9 6.8c.3.4.8.5 1.2.4l3.6-1.2c.5-.2.8-.6.7-1.1z"/>
      </svg>
    </div>
  )
}

export default App