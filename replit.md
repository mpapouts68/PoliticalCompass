# Ιδεολόγος - Political Survey Application

## Overview

This is a full-stack political survey application built with React, Express, and PostgreSQL. The application allows users to take political surveys of varying lengths and receive results showing their alignment with different Greek political parties. The app is called "Ιδεολόγος" and features auto-advancing questions for better user experience with real-time election-style analytics.

## User Preferences

Preferred communication style: Simple, everyday language.
User requested: Auto-advance to next question upon selection (implemented with 800ms delay).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (TanStack Query) for server state
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution
- **Production Build**: esbuild for server bundling

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Connection**: Uses `@neondatabase/serverless` for database connectivity

## Key Components

### Survey Flow
1. **Welcome Screen**: User selects survey length (15, 30, 60, or 100 questions)
2. **Question Screen**: Sequential presentation of political questions with 5-point Likert scale and auto-advance (800ms delay)
3. **Results Screen**: Displays party alignment percentages with visual progress bars

### Recent Changes (Jan 2025)
- Rebranded application to "Ιδεολόγος" with new political compass logo design
- Implemented auto-advance functionality: questions automatically proceed after user selects an answer
- Removed manual navigation buttons in favor of smoother user experience
- Updated welcome screen with "Μάθε ποιος είσαι πολιτικά" messaging and Ιδεολόγος online branding
- Implemented PostgreSQL database storage for persistent survey results and analytics
- Added comprehensive election-style results dashboard with real-time statistics
- Modified welcome screen to auto-start survey when user clicks on question count (no "Start Test" button needed)
- Added ability to continue with more questions while preserving existing answers
- Added "Back to Home" button for navigation
- Expanded to include all 9 parliamentary parties: ΝΔ, ΣΥΡΙΖΑ, ΠΑΣΟΚ, ΚΚΕ, ΕΛ, Πλεύση Ελευθερίας, Νίκη, Σπαρτιάτες, Νέα Αριστερά
- Updated all 100+ questions with political positions for all parties
- Enhanced header with distinctive SVG logos for all 9 parties
- Added party logos to results display for better visual identification
- Created vertical sidebar with larger party logos and clickable links to official websites
- Simplified header layout by removing small party logos
- Implemented Political Compass visualization: 2D chart showing party positions and user alignment
- Added toggle between percentage view and compass view for comprehensive result analysis
- Implemented donation section with PayPal integration supporting project sustainability
- Added three donation tiers: Coffee (€3.50), Support (€7.00), Development (€15.00)
- Included prominent "Free for all users" messaging to clarify no payment required
- Added comprehensive social sharing functionality for survey results
- Social sharing includes Twitter, Facebook, copy-to-clipboard, and native mobile sharing
- PayPal button sizing properly constrained within donation cards (40px height, 100% width)
- Added mini results graph prominently displayed on main page showing real-time survey statistics
- Fixed Facebook sharing to automatically copy result text to clipboard with user instruction
- Added Open Graph meta tags for better social media sharing appearance
- Enhanced social sharing with preview text display
- Fixed PayPal and social sharing popup functionality with comprehensive error handling
- Resolved all popup blocking issues with direct window.open calls and proper error detection
- Confirmed PayPal API integration working correctly with successful order creation (Status 201)
- Added detailed logging for debugging payment and sharing functionality
- Application fully tested and ready for production deployment
- PayPal integration confirmed working - opens sandbox checkout popup correctly for development
- All popup functionality (PayPal donations, Twitter sharing, Facebook sharing) verified working
- Ready for production deployment where PayPal will use live environment automatically
- Added comprehensive contact information section with multiple email addresses for different purposes
- Contact section includes privacy information, social media links, and project background
- Full bilingual support for contact information in both Greek and English languages

### Data Models
- **Questions**: Political statements with category and party position mappings for all 9 parliamentary parties
- **Parties**: All Greek parliamentary parties including ΝΔ, ΣΥΡΙΖΑ, ΠΑΣΟΚ, ΚΚΕ, ΕΛ, Πλεύση Ελευθερίας, Νίκη, Σπαρτιάτες, Νέα Αριστερά
- **Survey Responses**: User answers linked to sessions
- **Survey Results**: Calculated party alignments per session

### Storage Layer
- **Interface**: `IStorage` abstraction for data operations
- **Implementation**: `MemStorage` class for in-memory development storage
- **Future**: Designed to support PostgreSQL implementation

## Data Flow

1. User starts survey and selects question count
2. Frontend fetches random questions from `/api/questions/:count`
3. User answers are saved via `/api/responses` as they progress
4. Upon completion, `/api/results` calculates party alignments
5. Results are displayed with party information from `/api/parties`

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **date-fns**: Date manipulation utilities

### State and Data
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling with Zod validation
- **Wouter**: Lightweight client-side routing

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety and enhanced DX
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Development
- **Server**: Express with Vite middleware for HMR
- **Database**: Uses DATABASE_URL environment variable
- **Scripts**: `npm run dev` for development mode

### Production
1. **Build Process**: 
   - Vite builds client assets to `dist/public`
   - esbuild bundles server code to `dist/index.js`
2. **Static Serving**: Express serves built client files
3. **Environment**: NODE_ENV=production with optimized builds

### Configuration
- **TypeScript**: Shared config for client, server, and shared code
- **Path Aliases**: Configured for clean imports (`@/`, `@shared/`)
- **Database**: Drizzle config points to shared schema with PostgreSQL dialect

The application is designed for easy deployment to platforms like Replit, with built-in support for development banners and runtime error overlays in development mode.