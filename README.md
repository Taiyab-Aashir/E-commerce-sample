# E-Commerce Sample Application

A modern e-commerce application built with Next.js, featuring server-side rendering, dark mode support, and a responsive design.

## Features

- 🛍️ Product listing with infinite scroll
- 🌙 Dark mode support
- 🛒 Shopping cart functionality
- 📱 Responsive design
- ⚡ Server-side rendering
- 🎨 Modern UI with hover effects
- 🔍 Product search and filtering

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17.0 or later)
- npm (v9.6.7 or later)

You can check your versions by running:

```bash
node --version
npm --version
```

## Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-commerce-sample
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=https://dummyjson.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Project Structure

```
E-commerce-sample/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── cart/           # Cart page
│   │   ├── products/       # Product pages
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   ├── store/             # State management
│   └── types/             # TypeScript types
├── public/                # Static assets
└── package.json          # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Lucide Icons](https://lucide.dev/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Browser Support

The application is tested and works on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

1. **Node version issues**
   If you encounter any Node.js version-related errors, use [nvm](https://github.com/nvm-sh/nvm) to switch to the recommended version:

   ```bash
   nvm install 18.17.0
   nvm use 18.17.0
   ```

2. **Port already in use**
   If port 3000 is already in use, you can start the development server on a different port:

   ```bash
   npm run dev -- -p 3001
   ```

3. **Module not found errors**
   If you encounter module not found errors, try:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
