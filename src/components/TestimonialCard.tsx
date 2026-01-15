import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialBg from "@/assets/testimonial-group-training.jpg";

interface TestimonialCardProps {
  quote: string;
  author: string;
  result?: string;
}

const TestimonialCard = ({
  quote,
  author,
  result,
}: TestimonialCardProps) => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
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
            <div className="absolute inset-0 bg-drake-dark/85" />
            
            {/* Gold Left Accent Bar */}
            <div className="absolute top-0 left-0 w-2 h-full bg-drake-gold z-10" />
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 lg:p-16 pl-10 md:pl-14 lg:pl-20">
              {/* Quote Icon */}
              <Quote className="w-10 h-10 md:w-12 md:h-12 text-drake-gold mb-6 opacity-80" />
              
              {/* Quote Text - White for contrast */}
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8 italic">
                "{quote}"
              </blockquote>
              
              {/* Author & Result */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-lg md:text-xl font-semibold text-drake-gold">
                    — {author}
                  </p>
                  {result && (
                    <p className="text-sm md:text-base text-gray-300">
                      {result}
                    </p>
                  )}
                </div>
                
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-drake-gold text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCard;
