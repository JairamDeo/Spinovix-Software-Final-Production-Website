tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'Logo': "url('/assets/Logoi.png')",
        'Logonobg': "url('/assets/logonobg.png')",
        'hsec1': "url('/assets/blog-left-dec.png')",
        // 'footerbg': "url('/assets/quote-bg.jpg')",
        'ssec2bg': "url('/assets/solution-page/SSec2bg.png')",

        'hsec2': "url('/assets/bge.jpg')",
        'discoverbg': "url('/assets/discover-bg.jpg')",
        'custom-gradient': 'radial-gradient(64.97% 516.78% at 51.49% 45%, #4056a1 0%, #2385C6 100%)',
        'linear-bg': 'linear-gradient(to right, #4056a1, #2385C6)',
      },
      colors: {
        "background": "hsl(var(--background))",
        "primary": "hsl(var(--primary))",
        "secondary": "hsl(var(--secondary))",
      },
      screens: {
        'ds': '1080px'
      }
    }
  }
}