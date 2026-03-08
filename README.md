# Buy Me a Coffee Clone

A beautifully designed, minimalistic web application built with Next.js that allows users to receive support and payments from their audience through various UPI apps.

## Features

- Clean and modern user interface
- Custom payment amount selection
- QR code generation for quick UPI payments
- Direct deep links to popular UPI applications (Google Pay, PhonePe, Paytm)
- Responsive design tailored for both mobile and desktop experiences

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **QR Code**: qrcode.react
- **Fonts**: Manrope (Google Fonts)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have Node.js (version 20 or higher) installed on your system.

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Buy-me-a-coffee
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server with the following command:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Project Structure

- `app/` - Contains the main Next.js application routes and layouts
- `lib/` - Utility functions and helpers
- `hooks/` - Custom React hooks
- `public/` - Static assets like images and icons

## Configuration

You can customize the recipient's UPI ID and details in `app/page.tsx` by updating the following variables inside the `Home` component:

```typescript
const upiId = 'your_upi_id@upi';
const payeeName = 'Your Name';
```

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

After a successful build, you can start the production server with:

```bash
npm run start
```
