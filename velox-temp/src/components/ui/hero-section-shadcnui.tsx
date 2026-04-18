import { Button } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";

export function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 77, 0, 0.15), transparent),
          radial-gradient(ellipse 60% 40% at 80% 60%, rgba(16, 185, 129, 0.1), transparent)
        `,
      }}
    >
      <motion.div variants={itemVariants} className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-gray-300">
          <Sparkles className="h-4 w-4 text-orange-500" />
          <span className="text-orange-500">847%</span> Average Conversion Increase
        </span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Your Website Is
        <br />
        <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
          Losing Customers
        </span>
        <br />
        Right Now
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl"
      >
        We turn underperforming websites into customer-generating machines. 
        This isn't a one-time fix—it's an ongoing system that continuously optimizes for revenue.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-base px-8">
          <Zap className="h-5 w-5" />
          Get Free Website Audit
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white gap-2 text-base px-8">
          <Target className="h-5 w-5" />
          See Results
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-gray-500"
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-emerald-500">$2.4M</div>
          <div className="text-left">
            <div className="text-white font-semibold">Revenue Generated</div>
            <div>For clients</div>
          </div>
        </div>
        <div className="h-12 w-px bg-gray-800 hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-orange-500">127</div>
          <div className="text-left">
            <div className="text-white font-semibold">Websites Optimized</div>
            <div>Across industries</div>
          </div>
        </div>
        <div className="h-12 w-px bg-gray-800 hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-emerald-500">99%</div>
          <div className="text-left">
            <div className="text-white font-semibold">Client Retention</div>
            <div>Long-term partnerships</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-1 rounded-full bg-gradient-to-b from-orange-500 to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
