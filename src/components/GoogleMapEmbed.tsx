interface GoogleMapEmbedProps {
  height?: string;
  className?: string;
}

export function GoogleMapEmbed({ height = "400px", className = "" }: GoogleMapEmbedProps) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`} style={{ minHeight: height }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.8!2d-79.99067!3d32.78766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7a42f96c1f47%3A0x9f5a8c7b6d4e3f2a!2s2%20Avondale%20Ave%2C%20Charleston%2C%20SC%2029407!5e0!3m2!1sen!2sus"
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
