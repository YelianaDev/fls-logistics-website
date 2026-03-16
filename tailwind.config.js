/** @type {import('tailwindcss').Config} */

//  CAMBIO 3: Tipografías actualizadas
// Outfit  → display (headings, nav, botones, labels)
// DM Sans → body (párrafos, texto general)
//
// Después de guardar este archivo, recompilar con:
//   npx tailwindcss -i ./assets/css/input.css -o ./assets/css/tailwind.css --minify
//
// NOTA: El custom.css ya tiene overrides que funcionan sin recompilar,
// pero recompilar garantiza que las clases font-display y font-body
// queden correctas en el CSS final de producción.

module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        // ✅ CAMBIO 4: Para hacer el rojo definitivo permanente,
        // cambiar "#FE3742" por el valor que apruebe el cliente
        // y recompilar. El custom.css tiene el override temporal.
        "fls-red": "#FE3742",
        "fls-navy": "#012355",
        "fls-blue": "#025296",
        "fls-gray": "#AEB5BB",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"], // antes: Barlow Condensed
        body: ["Nunito Sans", "sans-serif"], // antes: Barlow
      },
    },
  },
  plugins: [],
};
