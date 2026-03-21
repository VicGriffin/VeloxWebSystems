import { useState } from "react"
import { HeroSection } from "@/components/ui/hero-section-shadcnui"
import { WebsiteEvaluationTool } from "@/components/website-evaluation-tool"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Demo() {
  const [showEvaluation, setShowEvaluation] = useState(false)

  // If showing evaluation tool, render it
  if (showEvaluation) {
    return <WebsiteEvaluationTool />
  }

  // Otherwise show the hero section with navigation
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <HeroSectionWithCTA 
        onGetAudit={() => setShowEvaluation(true)} 
      />
      
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 text-sm font-semibold tracking-wider uppercase">
              What We Do
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6">
              Revenue-Focused <span className="text-orange-500">Optimization</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We don't build pretty websites. We build systems that generate revenue.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Conversion Rate Optimization",
                desc: "Every visitor is a potential customer. We optimize every element to maximize conversions.",
                metric: "+247% avg. conversion lift"
              },
              {
                icon: "⚡",
                title: "Performance Engineering",
                desc: "Speed is revenue. We optimize load times down to milliseconds for maximum retention.",
                metric: "3.2s avg. load time reduction"
              },
              {
                icon: "🎯",
                title: "Funnel Architecture",
                desc: "We design strategic funnels that guide visitors from interest to purchase with zero friction.",
                metric: "89% funnel completion rate"
              },
              {
                icon: "🔍",
                title: "SEO Domination",
                desc: "We optimize for search engines to capture high-intent traffic actively looking for your services.",
                metric: "+312% organic traffic growth"
              },
              {
                icon: "📱",
                title: "Mobile-First Design",
                desc: "67% of users will leave if your site isn't mobile-optimized. We ensure every pixel performs.",
                metric: "100% mobile compatibility"
              },
              {
                icon: "🧪",
                title: "Continuous Testing",
                desc: "We run ongoing A/B tests to constantly improve and adapt to changing user behavior.",
                metric: "52 tests running monthly"
              },
            ].map((service, i) => (
              <div 
                key={i}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">{service.desc}</p>
                <div className="pt-4 border-t border-gray-800">
                  <span className="text-emerald-500 font-semibold">{service.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-500 text-sm font-semibold tracking-wider uppercase">
              Proof
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-6">
              Real <span className="text-emerald-500">Revenue</span> Results
            </h2>
            <p className="text-xl text-gray-400">
              Numbers don't lie. Here's what we've delivered for our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { percent: "+847%", label: "Conversions", company: "E-Commerce Fashion Brand" },
              { percent: "+523%", label: "Leads", company: "B2B SaaS Company" },
              { percent: "+312%", label: "Revenue", company: "Local Service Business" },
              { percent: "+189%", label: "Traffic", company: "Healthcare Provider" },
            ].map((result, i) => (
              <div 
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex items-center gap-6"
              >
                <div className="bg-emerald-500/20 rounded-xl p-6 text-center min-w-[120px]">
                  <div className="text-4xl font-bold text-emerald-500">{result.percent}</div>
                  <div className="text-gray-500 text-sm">{result.label}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{result.company}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    Redesigned for maximum conversion and revenue generation
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Stop Leaving Money on the Table?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get your free website analysis and discover exactly how much revenue 
            you're leaving on the table every month.
          </p>
          <Button 
            onClick={() => setShowEvaluation(true)}
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-lg px-10 py-6 gap-3"
          >
            Get Free Website Audit
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <span className="text-xl font-bold">Velox</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2024 Velox Web Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Modified HeroSection with navigation
function HeroSectionWithCTA({ onGetAudit }: { onGetAudit: () => void }) {
  return (
    <div className="relative overflow-hidden" style={{
      background: `
        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 77, 0, 0.15), transparent),
        radial-gradient(ellipse 60% 40% at 80% 60%, rgba(16, 185, 129, 0.1), transparent)
      `,
    }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <span className="text-xl font-bold">Velox</span>
          </div>
          <Button 
            onClick={onGetAudit}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Get Free Audit
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-300 mb-6">
            <span className="text-orange-500">847%</span> Average Conversion Increase
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Your Website Is
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Losing Customers
            </span>
            <br />
            Right Now
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl">
            We turn underperforming websites into customer-generating machines. 
            This isn't a one-time fix—it's an ongoing system that continuously optimizes for revenue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onGetAudit}
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-lg px-8 gap-2"
            >
              🚀 Get Free Website Audit
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8"
            >
              See Results
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 md:gap-16 mt-16">
            <div>
              <div className="text-3xl font-bold text-emerald-500">$2.4M</div>
              <div className="text-gray-500">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">127</div>
              <div className="text-gray-500">Websites Optimized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-500">99%</div>
              <div className="text-gray-500">Client Retention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
