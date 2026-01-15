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
  // Define layout pattern for each image position
  const getLayoutClasses = (index: number): string => {
    switch (index) {
      case 0: // Large featured image - tall on desktop
        return "row-span-2";
      case 4: // Wide image spans 2 columns on desktop
        return "md:col-span-2";
      default:
        return "";
    }
  };

  const getAspectRatio = (index: number): "portrait" | "video" | "square" => {
    switch (index) {
      case 0:
        return "portrait"; // Tall featured
      case 3:
        return "portrait"; // KB rack pair 
      case 6:
        return "square"; // Studio scene
      default:
        return "video"; // 16:9 for most
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeInUp">
          <p className="section-eyebrow text-primary text-center">COMMUNITY</p>
          <h2 className="font-hero text-3xl md:text-4xl font-bold text-center mb-12 uppercase">
            Training <span className="text-primary">Together</span>
          </h2>
        </AnimatedSection>
        
        {/* Responsive Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto auto-rows-fr">
          {images.map((img, index) => (
            <AnimatedSection 
              key={index}
              animation="scaleIn"
              delay={index * 0.1}
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
