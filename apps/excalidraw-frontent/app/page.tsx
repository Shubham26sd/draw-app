import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold">Drawify</h1>
        <div className="space-x-6 text-sm">
          <a href="#features" className="hover:text-gray-300">
            Features
          </a>
          <a href="#about" className="hover:text-gray-300">
            About
          </a>
          <Button variant="primary">Try Now</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
          Sketch. Collaborate. Create.
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          A minimal whiteboard tool inspired by Excalidraw. Draw diagrams,
          wireframes, and ideas effortlessly.
        </p>

        <div className="mt-8 flex gap-4">
          <Button>Start Drawing</Button>
          <Button variant="secondary">View Demo</Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-zinc-900">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Collaboration",
              desc: "Work with your team instantly with shared canvases.",
            },
            {
              title: "Infinite Canvas",
              desc: "Never run out of space while brainstorming.",
            },
            {
              title: "Export & Share",
              desc: "Download your drawings or share links easily.",
            },
          ].map((f, i) => (
            <Card key={i} title={f.title} desc={f.desc} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">Start creating today</h2>
        <p className="mt-4 text-gray-400">
          No signup required. Just open and draw.
        </p>

        <div className="mt-8">
          <Button>Launch App</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-zinc-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Drawify. All rights reserved.
      </footer>
    </div>
  )
}
