# Car E-Commerce - Next.js Demo

A modern, responsive car marketplace built with Next.js, React, and CSS Modules. This project demonstrates a full-stack e-commerce flow with cart management, checkout, and order history—ideal for portfolio showcases.

## 🚀 Features

- **Responsive Design**: Mobile-first, adaptive layouts for all screen sizes
- **Car Listings**: Browse cars with search and category filters
- **Shopping Cart**: Add to cart with quantity management and toast notifications
- **Checkout Flow**: Complete order form with validation and order persistence
- **Order History**: View past orders with detailed breakdowns
- **Modern UI**: Clean, professional interface with hover states and transitions
- **State Management**: React Context API for centralized cart state
- **Local Storage**: Persistent cart and order data across sessions

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, React 18
- **Styling**: CSS Modules with responsive design
- **State**: React Context API
- **Storage**: localStorage for cart and orders
- **Icons**: Custom SVG components
- **Routing**: Next.js file-based routing

## 📦 Project Structure

```
car-ecommerce-next-js/
├── components/
│   ├── context/          # React Context (CartContext)
│   ├── icons/            # Custom SVG icons
│   ├── layout/           # Layout components
│   ├── module/           # Reusable UI components
│   └── template/         # Page-specific templates
├── data/
│   └── carsData.js       # Sample car data
├── src/
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS Modules
│   └── lib/             # Utilities (orderStorage)
└── public/              # Static assets
```

## 🚀 Getting Started

1. **Clone repository**
   ```bash
   git clone https://github.com/negar-younesi/car-ecommerce-next-js.git
   cd car-ecommerce-next-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Key Pages & Features

### Home (`/`)
- Hero section with navigation to car listings

### Car Listings (`/cars`)
- Browse all available cars
- Search by price range
- Category filtering
- Responsive grid layout

### Car Details (`/cars/[id]`)
- Detailed car information
- Add to cart functionality
- "Buy Now" quick checkout

### Shopping Cart (`/cart`)
- View cart items with quantities
- Update/remove items
- Clear cart option
- Proceed to checkout

### Checkout (`/checkout`)
- Order summary
- Customer information form
- Form validation
- Order submission

### Order Success (`/success`)
- Order confirmation
- Order details display
- Navigation options

### Order History (`/orders`)
- List of past orders
- Order statistics
- Individual order details (`/orders/[id]`)

## 🎨 UI/UX Highlights

- **Responsive Grid**: Adapts from 2-column to single column on mobile
- **Micro-interactions**: Hover effects, smooth transitions
- **Toast Notifications**: Non-intrusive feedback system
- **Loading States**: Proper loading indicators
- **Accessibility**: Focus states, semantic HTML
- **Modern Design**: Clean cards, subtle shadows, accent colors

## 💾 Data Persistence

- **Cart Data**: Stored in localStorage with React Context sync
- **Order History**: Persistent order records in localStorage
- **Form Data**: Temporary during checkout session

## 🛠️ Development Notes

- Uses CSS Modules for scoped styling
- Custom SVG icons for consistency
- Responsive breakpoints: 768px, 600px, 480px
- Component-based architecture for maintainability
- No external UI libraries - pure CSS implementation

## 📱 Responsive Breakpoints

- **Desktop**: > 900px (2-column layout)
- **Tablet**: 600px - 900px (adjusted spacing)
- **Mobile**: < 600px (single column, full-width buttons)

## 🚀 Deployment

This project can be deployed to any platform supporting Next.js:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy `out` directory to Netlify
```

### Other Platforms
- AWS Amplify
- Google Cloud Platform
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Portfolio Value

This project demonstrates:
- **Full-stack development** with Next.js
- **State management** with React Context
- **Responsive design** implementation
- **Form handling** and validation
- **Local storage** integration
- **Component architecture**
- **Modern CSS** techniques
- **User experience** best practices

Perfect for showcasing frontend development skills to potential employers!
