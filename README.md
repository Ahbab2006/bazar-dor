# 🛒 Bazar Dor (বাজার দর)

A modern, responsive full-stack web application designed to track and monitor daily essential commodity prices across major markets in Bangladesh.

---

## ✨ Features

- **📊 Real-time Price Tracking:** View daily retail and wholesale prices for rice, lentils, oil, vegetables, fish, meat, eggs, and spices.
- **🔒 Protected Product Details:** Detailed price breakdowns, trend shifts (rise/fall indicators), and market-wise range comparisons are exclusively available for authenticated users.
- **🔐 Robust Authentication:**
  - Secure Email/Password registration & login powered by **BetterAuth**.
  - Social OAuth integration with **Google** & **GitHub**.
  - Guaranteed server-side cookie deletion and cache busting on logout.
- **👤 Profile Management:** Authenticated users can view their credentials and update their account name directly in MongoDB.
- **⚡ Dynamic Localization:** Automated date display formatted in Bengali locale (`bn-BD`) and localized numeral rendering.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) (App Router, Turbopack) & React |
| **UI & Styling** | [Tailwind CSS](https://tailwindcss.com/) & [HeroUI](https://heroui.com/) |
| **Authentication** | [BetterAuth](https://better-auth.com/) with `@better-auth/mongodb-adapter` |
| **Database** | [MongoDB](https://www.mongodb.com/) (Native MongoClient / Atlas) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root folder with the following variables:

```env
# BetterAuth Configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_super_secret_key_at_least_32_characters_long

# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bazardor?retryWrites=true&w=majority

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Key Project Architecture

```text
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...all]/route.ts       # BetterAuth API handler
│   │   │   └── logout/route.ts         # Server-side cookie cleanup
│   │   └── user/update/route.ts        # Direct DB profile updates
│   ├── components/
│   │   ├── Header.tsx                  # Global navbar with live auth session
│   │   ├── Hero.tsx                    # Banner with dynamic Bangla date
│   │   ├── ProductCard.tsx             # Click-protected price cards
│   │   └── Footer.tsx                  # Disclaimer and branding footer
│   ├── product/[id]/page.tsx           # Authenticated product details
│   ├── profile/page.tsx                # Account settings & name updater
│   ├── signin/page.tsx                 # Credentials & Social Sign-In
│   ├── signup/page.tsx                 # Registration with auto-login flow
│   └── layout.tsx                      # Root layout wrapping global styles & toast
├── lib/
│   ├── auth.ts                         # Server-side BetterAuth configuration
│   ├── auth-client.ts                  # Client-side auth hooks & actions
│   └── utils.ts                        # Bengali digits & unit formatting utilities
└── types/                              # TypeScript interfaces and schemas
```

---

## 🛡️ License

This project is open-source and available under the [MIT License](LICENSE).