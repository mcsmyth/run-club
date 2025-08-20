# Run Club App

A comprehensive publicly accessible web application for run club members to manage events, track workouts, purchase merchandise, and stay connected with the community.

## Features

- **Event Management**: Interactive calendar of running events with RSVP functionality
- **Workout Tracking**: Personal workout logging and progress tracking
- **E-commerce**: Store catalog with shopping cart and checkout
- **Community Features**: About section, member directory, and news
- **Responsive Design**: Mobile-first design approach

## Tech Stack

### Frontend
- **Framework**: ReactJS with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: React Hooks (ready for Redux/Zustand)

### Backend (Coming Soon)
- **Runtime**: NodeJS
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: AWS S3
- **Payment Processing**: Stripe integration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd run-club
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
run-club/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── store/          # State management
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                # Node.js backend (coming soon)
├── docs/                   # Documentation
└── README.md
```

## Available Scripts

In the frontend directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Design System

- **Primary Color**: Blue (#3B82F6)
- **Secondary Color**: Green (#10B981)
- **Accent Color**: Orange (#F59E0B)
- **Typography**: Inter font family
- **Icons**: Lucide React icon library

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

- Email: info@runclub.com
- Phone: (555) 123-4567
