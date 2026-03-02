export function tinyBlurDataURL() {
  return "data:image/svg+xml;base64," + Buffer.from(
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='20'>
      <rect width='100%' height='100%' fill='#f4f4f5'/>
    </svg>`
  ).toString("base64");
}