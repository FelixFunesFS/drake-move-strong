import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

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
          <Card className="bg-card border-border shadow-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-2 h-full bg-drake-gold" />
            
            {/* Quote Icon */}
            <Quote className="w-10 h-10 md:w-12 md:h-12 text-drake-gold mb-6 opacity-80" />
            
            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl lg:text-3xl text-foreground font-medium leading-relaxed mb-8 italic">
              "{quote}"
            </blockquote>
            
            {/* Author & Result */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-lg md:text-xl font-semibold text-primary">
                  — {author}
                </p>
                {result && (
                  <p className="text-sm md:text-base text-muted-foreground">
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
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCard;
