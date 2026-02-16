import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialBg from "@/assets/testimonial-group-training.jpg";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";

interface Testimonial {
  quote: string;
  author: string;
  result?: string;
}

interface TestimonialCardProps {
  testimonials: Testimonial[];
}

const TestimonialCard = ({ testimonials }: TestimonialCardProps) => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-drake-teal/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden shadow-card">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${testimonialBg})` }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-drake-dark/70" />
            
            {/* Gold Left Accent Bar */}
            <div className="absolute top-0 left-0 w-2 h-full bg-drake-gold z-10" />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 pl-10 md:pl-14 lg:pl-20">
              {/* Quote Icon */}
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-drake-gold mb-6 opacity-80" />
              
              {/* Animated Quote */}
              <div className="min-h-[120px] md:min-h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8 italic">
                      "{t.quote}"
                    </blockquote>
                    
                    <div className="flex flex-col gap-1">
                      <p className="text-lg md:text-xl font-semibold text-drake-gold">
                        — {t.author}
                      </p>
                      {t.result && (
                        <p className="text-sm md:text-base text-gray-300">
                          {t.result}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === current ? "bg-drake-gold w-6" : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Google Reviews Badge */}
              <div className="mt-6 flex justify-center">
                <GoogleReviewsBadge variant="hero" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCard;
