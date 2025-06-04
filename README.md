# Kiosk Application - Interactive Information Display System

A modern, bilingual kiosk application built with **React Native (Expo)** and **Strapi CMS**. Originally developed for the **University of Silesia (Akademia Śląska)** to display institutional information, news, and services through an intuitive touchscreen interface.

> **Real-World Project**: This application was created as a functional information kiosk system for an educational institution, demonstrating practical experience in developing production-ready solutions for real client needs.

## 🚀 Features

- **Multilingual Support** - Polish/English with i18n
- **Dynamic Content Management** - Powered by Strapi CMS
- **Interactive Navigation** - Touch-optimized interface
- **Media-Rich Content** - Image galleries, videos, and QR codes
- **Real-time Updates** - Live content synchronization
- **Responsive Design** - Optimized for tablet/kiosk displays
- **News Integration** - Automated news scraping and translation from institutional websites
- **Social Media Integration** - QR codes for social platforms
- **WiFi Information Display** - Network credentials via QR

## 🏗️ Architecture

### Frontend (Client)
- **React Native** with Expo Router
- **TypeScript** for type safety
- **TanStack Query** for data fetching
- **Expo Video** for media playback
- **React Native Reanimated** for animations
- **i18next** for internationalization

### Backend (Server)
- **Strapi v5** headless CMS
- **PostgreSQL** database
- **TypeScript** throughout
- **Custom news scraping system** - Tailored for institutional websites with automated translation
- **RESTful API** with content localization

## 📂 Project Structure

```
├── client/                # React Native Expo app
│   ├── app/               # File-based routing (Expo Router)
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── constants/         # App constants (colors, styles)
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript definitions
└── server/                # Strapi CMS backend
    ├── src/               # Source code
    │   ├── api/           # API endpoints
    │   ├── lib/           # Utilities (news scraper, translator)
    │   └── components/    # Strapi components
    └── config/            # Configuration files
```

## 🛠️ Technology Stack

**Frontend:**
- React Native + Expo SDK 52
- TypeScript
- Expo Router (file-based routing)
- TanStack Query (data fetching)
- React Native Reanimated (animations)
- Expo Video (media playback)
- i18next (internationalization)
- React Native QR Code SVG

**Backend:**
- Strapi v5 (Headless CMS)
- PostgreSQL
- Node.js + TypeScript
- Axios + Cheerio (web scraping)
- Luxon (date handling)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (via Docker)

### Installation

#### Option 1: Automated Setup (Recommended)

1. **Clone the repository:**
```bash
git clone <repository-url>
cd kiosk-application
```

2. **Run setup script:**
```bash
# For Unix/Linux/macOS:
chmod +x setup.sh
./setup.sh

# For Windows:
setup.bat
```

The setup script will automatically:
- Install all dependencies for both client and server
- Create environment files from examples
- Start the PostgreSQL database with Docker
- Provide next steps for configuration

#### Option 2: Manual Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd kiosk-application
```

2. **Install dependencies:**
```bash
# Install root dependencies and workspace packages
npm install
npm run install:all
```

3. **Setup Backend (Strapi):**
```bash
cd server
cp .env.example .env
# Edit .env with your database credentials
docker-compose up -d  # Start PostgreSQL
npm run develop
```

4. **Setup Frontend (Expo):**
```bash
cd ../client
cp .env.example .env
# Edit .env with your Strapi URL and API token
npm start
```

### Environment Variables

**Server (.env):**
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=your_db_name
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password

# Generate these secrets
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_token_salt
ADMIN_JWT_SECRET=your_admin_secret
TRANSFER_TOKEN_SALT=your_transfer_salt
ENCRYPTION_KEY=your_encryption_key
```

**Client (.env):**
```env
STRAPI_URL=http://localhost:1337
API_TOKEN=your_strapi_api_token
```

### Development Workflow

After setup is complete:

1. **Start development servers:**
```bash
npm run dev  # Starts both client and server
```

2. **Set up Strapi admin:**
   - Visit http://localhost:1337/admin
   - Create your admin account
   - Configure content types and permissions
   - Generate API tokens for the client

3. **Start translation service (Optional):**
   ```bash
   # For news translation functionality, run LibreTranslate:
   docker run -td --name libretranslate \
     -p 8888:5000 \
     -e LT_LOAD_ONLY=pl,en,uk \
     libretranslate/libretranslate
   ```

4. **Configure the client:**
   - Update `client/.env` with your Strapi URL and API token
   - Restart the client if needed

5. **Available scripts:**
```bash
npm run dev              # Start both client and server
npm run dev:client       # Start client only
npm run dev:server       # Start server only
npm run build            # Build both applications
npm run lint             # Lint both codebases
npm run clean            # Clean build artifacts
npm run docker:up        # Start PostgreSQL with Docker
npm run docker:down      # Stop PostgreSQL
```

### Production Deployment

1. **Environment Configuration:**
   - Set `NODE_ENV=production`
   - Generate secure API keys and secrets
   - Configure production database
   - Set up proper CORS policies

2. **Build applications:**
```bash
npm run build
```

3. **Deploy server:**
   - Deploy Strapi to your preferred hosting (Heroku, DigitalOcean, AWS, etc.)
   - Set up production PostgreSQL database
   - Configure environment variables

4. **Deploy client:**
   - Build for Android: `cd client && npx expo build:android`
   - Build for iOS: `cd client && npx expo build:ios`
   - Or use EAS Build for more advanced builds

## 🔧 Specialized Features

### Custom News Scraping System
The application includes a sophisticated news scraping system specifically designed for institutional websites:

- **Institution-Specific Parser** - Custom scraping logic tailored for university/academic websites
- **Category-Based Filtering** - Events, achievements, announcements, etc.
- **Automated Translation** - Integration with translation APIs for multi-language content
- **Content Normalization** - Clean formatting and consistent data structure
- **Scheduled Updates** - Automated content refresh via cron jobs

> **Note**: The news scraper is configured for specific institutional website structures. For production use, adapt the scraping logic in `server/src/lib/news-scrapper.ts` to match your target website's HTML structure.

### Real-World Implementation
This project demonstrates practical solutions for:
- Content management for public-facing displays
- Multi-language support for international institutions
- Automated content aggregation from existing websites
- Touch-friendly interfaces for public kiosks
- Media handling and optimization for digital displays

## 📱 Key Features

### Dynamic Content Management
- Multi-language content via Strapi CMS
- Real-time content updates
- Media management and optimization
- Structured content with custom components

### Interactive Navigation
- Touch-optimized interface
- Breadcrumb navigation
- History management
- Automatic timeout and reset

### News Integration
- Automated news scraping from institutional websites
- Multi-language translation via external APIs
- Content categorization and filtering
- Scheduled updates via cron jobs

### Media Display
- Image galleries with carousel navigation
- Video playback with custom controls
- QR code generation for quick access
- Responsive media scaling

## 📋 Content Types

- **Pages** - Dynamic page content
- **Articles** - News and announcements  
- **Social Media** - Platform links with QR codes
- **WiFi Information** - Network credentials
- **Media Libraries** - Image and video galleries
- **Localization** - Multi-language support

## 🤝 Contributing

This project serves as a portfolio piece demonstrating real-world development experience. While primarily for showcase purposes, contributions and suggestions are welcome.

## 📄 License

This project is available for educational and portfolio purposes. Please note that it was originally developed for a specific institutional client (University of Silesia).

## 👨‍💻 Developer

Created as part of professional development work, showcasing skills in:
- Full-stack TypeScript development
- React Native and Expo framework
- Headless CMS integration (Strapi)
- Database design and management
- API development and integration
- Automated content scraping and processing
- Multi-language application development
- Touch-optimized UI/UX design

---

*This project demonstrates practical experience in developing production-ready applications for real-world institutional needs.*