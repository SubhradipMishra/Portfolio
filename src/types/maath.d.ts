declare module 'maath/random/dist/maath-random.esm' {
  export function inSphere(array: Float32Array, options?: { radius?: number; center?: number[] }): Float32Array;
  
  // You can export any other functions from maath/random here if needed
  // For now, this covers the function used in AmbientBackground.tsx
}
