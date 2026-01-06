/// <reference types="vite/client" />

// vite-imagetools query imports
declare module '*?format=webp&w=1920' {
  const src: string;
  export default src;
}

declare module '*?format=webp&w=768' {
  const src: string;
  export default src;
}

declare module '*?format=webp' {
  const src: string;
  export default src;
}
