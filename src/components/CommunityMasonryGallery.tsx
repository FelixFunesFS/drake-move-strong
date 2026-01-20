import OptimizedImage from "./OptimizedImage";
import AnimatedSection from "./AnimatedSection";

interface GalleryImage {
  src: string;
  alt: string;
}

interface CommunityMasonryGalleryProps {
  images: GalleryImage[];
}

const CommunityMasonryGallery = ({ images }: CommunityMasonryGalleryProps) => {
  // 2-row masonry: varied sizes for visual interest
  const getLayoutClasses = (index: number): string => {
    switch (index) {
      case 0: // First image spans 2 columns on desktop
        return "md:col-span-2";
      case 5: // Last image spans 2 columns on desktop
        return "md:col-span-2";
      default:
        return "";
    }
  };

  const getAspectRatio = (index: number): "video" | "square" => {
    // Wide images for spanning, square for single cells
    if (index === 0 || index === 5) return "video";
    return "square";
  };

  return (
    <section className="py-16 md:py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeInUp">
          <p className="section-eyebrow text-primary text-center">COMMUNITY</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            Training <span className="text-primary">Together</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            At Drake Fitness, you're never alone. Our supportive community of all ages and fitness levels trains side-by-side, lifting each other up every step of the way.
          </p>
        </AnimatedSection>
        
        {/* 2-Row Full Width Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
          {images.map((img, index) => (
            <AnimatedSection 
              key={index}
              animation="scaleIn"
              delay={index * 0.08}
              className={`${getLayoutClasses(index)} overflow-hidden rounded-xl shadow-lg group`}
            >
              <div className="h-full">
                <OptimizedImage 
                  src={img.src} 
                  alt={img.alt} 
                  aspectRatio={getAspectRatio(index)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityMasonryGallery;
