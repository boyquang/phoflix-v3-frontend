// Fix: Cannot find module 'lunar-javascript' or its corresponding type declarations
declare module "lunar-javascript";

// Fix: Cannot find module '.mp4'
declare module "*.mp4" {
  const src: string;
  export default src;
}
