import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialHeroProps {
  quote: string;
  author: string;
  result?: string;
  backgroundImage: string;
  variant?: "default" | "dark";
}

const TestimonialHero = ({
  quote,
  author,
  result,
  backgroundImage,
  variant = "default",
}: TestimonialHeroProps) => {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-drake-dark/80" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote Icon */}
          <Quote className="w-12 h-12 md:w-16 md:h-16 text-drake-gold mx-auto mb-6 opacity-80" />
          
          {/* Quote Text */}
          <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8 italic">
            "{quote}"
          </blockquote>
          
          {/* Author */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg md:text-xl font-semibold text-drake-gold">
              — {author}
            </p>
            {result && (
              <p className="text-sm md:text-base text-gray-300">
                {result}
              </p>
            )}
            
            {/* Stars */}
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-drake-gold text-xl">★</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialHero;
