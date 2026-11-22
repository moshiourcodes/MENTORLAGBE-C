# 🎓 MentorLagbe – Find Your Perfect Tutor

## 📌 Project Purpose

**MentorLagbe** is a modern tuition management platform that connects students with qualified tutors. It provides an easy way for students to find tutors, post tuition requirements, and manage applications while helping tutors discover and apply for suitable teaching opportunities.

The platform includes role-based dashboards, tuition management, bookmarking, and a Pro subscription system to provide a better experience for both students and tutors.

## 🌐 Live Website

**Live URL:**&#x20;

## 🔐 Admin Access

Admin accounts are server-managed only. Public sign-up creates **Student** or **Tutor** accounts exclusively.

## ✨ Key Features

### 👨‍🎓 Student Features

- Browse available tutors and tuition opportunities.
- Post tuition requirements.
- View and manage tutor applications.
- Manage posted tuition information.
- Bookmark favorite tuition opportunities.
- Personalized student dashboard.
- Upgrade to Pro for additional features.

### 👨‍🏫 Tutor Features

- Explore available tuition opportunities.
- Apply for suitable tuition jobs.
- Manage tuition applications.
- Bookmark interesting tuition opportunities.
- Manage tutor profiles.
- Personalized tutor dashboard.
- Upgrade to Pro for additional features.

### 💎 Pro Subscription System

- Free users can post a maximum of 2 tuition requirements.
- Free tutors can submit a maximum of 2 applications.
- Free users can save a maximum of 2 bookmarks.
- Pro users get higher usage limits.
- Premium features for subscribed users.

### 🔐 Authentication & Authorization

- User registration and login.
- Role-based access control.
- Student, Tutor, and Admin roles.
- Protected dashboard routes.
- Secure authentication.
- Role-specific dashboard experiences.

### 📊 Admin Dashboard

- Manage platform users.
- Monitor students and tutors.
- Manage tuition posts.
- Monitor applications.
- Manage platform activities.
- Oversee subscription information.

### 🎨 UI & User Experience

- Modern and responsive design.
- Light and dark theme support.
- Responsive navigation.
- Reusable UI components.
- Interactive dashboards.
- Mobile, tablet, and desktop compatibility.

## 🛠️ Technologies Used

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Node.js
- Express.js
- MongoDB

## 📦 NPM Packages Used

| Package                    | Purpose                 |
| -------------------------- | ----------------------- |
| `next`                     | React framework         |
| `react`                    | UI development          |
| `react-dom`                | React DOM rendering     |
| `typescript`               | Type safety             |
| `tailwindcss`              | Styling                 |
| `lucide-react`             | Icons                   |
| `next-themes`              | Theme management        |
| `sonner`                   | Toast notifications     |
| `react-hook-form`          | Form management         |
| `zod`                      | Schema validation       |
| `class-variance-authority` | Component variants      |
| `clsx`                     | Conditional CSS classes |
| `tailwind-merge`           | Merge Tailwind classes  |

*Package list should be checked against the actual package.json before publishing.*

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
```

**2. Navigate to the project**

```bash
cd mentorlagbe-client
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file (see `.env.example`):

```env
BETTER_AUTH_DB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**5. Configure Stripe webhooks locally**

With the Stripe CLI installed, forward webhooks to the canonical route:

```bash
stripe listen --forward-to localhost:3000/api/payment/webhook
```

Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET`.

**6. Run the development server**

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

## 🔗 Backend Information

The client application communicates with a REST API built using:

- Node.js
- Express.js
- MongoDB

The backend manages authentication, users, tuition posts, applications, bookmarks, and subscription limits.

## 👨‍💻 Developer

**MD Moshiour Rahaman Munna**

Full-Stack Developer

- GitHub: [moshiourcodes](https://github.com/moshiourcodes)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/moshiour-rahaman-munna-275145380/)
- Email: [moshiourr2@gmail.com](mailto\:moshiourr2@gmail.com)
- Location: Bangladesh

---

⭐ If you like this project, don't forget to give it a star!

**MentorLagbe – Connecting Students with the Right Tutors.**

