# Wellnest
## About Project
WellNest is a web app designed to keep seniors connected and safe. It allows elderly users to:
- Check in daily with one tap to confirm their well-being.
- Alert caregivers automatically if a check-in is missed.
- Build community by sharing statuses with approved friends.
### Why WellNest?
- Solves the anxiety of long-distance caregiving.
- Simple, senior-friendly interface (no tech skills needed).
- Privacy-first: Only trusted contacts see check-in data.

## Tech Stack

**Frontend**: React (UI), TailwindCSS (styling), Mapbox (maps)  
**Backend**: Firebase (database), Node.js (server logic)  
**Services**: Clerk (auth), Resend (emails), Mapbox API (locations)  

*Combining developer efficiency with senior-friendly accessibility*

## Features

### One-Tap Check-In
- Seniors confirm their safety with a single, large button press
- Daily check-ins take less than 5 seconds to complete

### Missed Check-In Alerts
- Automatic email notifications to caregivers when check-ins are missed
- Configurable alert thresholds (e.g., 24hrs no check-in)

### Friend Network
- Private status sharing between approved friends
- "Circle of care" visibility for added peace of mind

### Admin Dashboard
- Real-time monitoring of all user check-ins
- Case management for follow-ups on missed check-ins

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-org/WellNest.git
   ```

2. **Install dependencies**  
   ```bash
   cd WellNest && npm install
   ```

3. **Set up environment variables**  
   ```bash
   cp .env.example .env
   ```

   Then update `.env` with your actual keys:  
   ```env
   CLERK_PUBLISHABLE_KEY=your_key_here  
   FIREBASE_CONFIG=your_config_here
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000)

## Contributing

We welcome contributions! To get started:

1. **Fork the repository**

2. **Create a feature branch**  
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**  
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to your branch**  
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

Feel free to suggest improvements, report bugs, or add new features!
