# Sheikh Committee System

A comprehensive, modern web application designed to streamline the management and operations of the Sheikh Committee. This system provides tools for tracking members, managing daily contributions, scheduling payouts, and offering different views for administrators and guests.

## ✨ Features

- **Member Management**: Easily view and manage all committee members.
- **Daily Status Tracking**: Mark and save daily contribution statuses (Paid, Unpaid, Pending) for each member.
- **Payout Scheduling**: Automatically calculates and displays the payout schedule every 15 days.
- **Dynamic Payout Highlighting**: The next member due for a payout is automatically highlighted.
- **Real-time Data Sync**: Admin and Guest views are synchronized in real-time.
- **Responsive Design**: A seamless experience across desktops, tablets, and mobile devices.
- **Fallback Data Mode**: The application is fully functional even without a database connection, using placeholder data.

## 📸 Screenshots

Here's a sneak peek of the system in action:

| Login | Dashboard |
| :---: | :---: |
| ![Login Page](./Sheikh%20Committee%20System/login.png) | ![Dashboard View](./Sheikh%20Committee%20System/Dashboard.png) |

| Members | Guests |
| :---: | :---: |
| ![Members View](./Sheikh%20Committee%20System/members.png) | ![Guests View](./Sheikh%20Committee%20System/Guests.png) |

| Payouts |
| :---: |
| ![Payouts Schedule](./Sheikh%20Committee%20System/payouts.png) |

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.io/) (with a fallback to local data)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Deployment**: App Hosting

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/Sheikh-main.git
    cd Sheikh-main
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Setup the Environment:**
    This project can run with a Supabase backend or in a fallback mode with local data. For the full experience, setting up Supabase is recommended.

    Please see the detailed instructions in the **[SETUP.md](./SETUP.md)** file for configuring the database and environment variables.

## 🏃‍♂️ Running the Application

Once the setup is complete, you can run the application using the following commands:

```bash
# Start the development server
npm run dev

# Build the application for production
npm run build

# Start the production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.