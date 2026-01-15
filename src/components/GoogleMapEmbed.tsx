interface GoogleMapEmbedProps {
  height?: string;
  className?: string;
}

export function GoogleMapEmbed({ height = "400px", className = "" }: GoogleMapEmbedProps) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`} style={{ minHeight: height }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.8!2d-79.9848064!3d32.7821814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe795c1f0c57c5%3A0xa0f037f1f68991d5!2sDrake%20Fitness!5e0!3m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: height }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Drake Fitness Location - 2 Avondale Ave, Charleston, SC 29407"
      />
    </div>
  );
}

export default GoogleMapEmbed;
