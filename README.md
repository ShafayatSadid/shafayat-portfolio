# Shafayat Sadid — Personal Portfolio (Client)

A modern, fully responsive, and production-ready personal portfolio website. This repository contains the frontend (Next.js) of the portfolio, featuring a clean user interface for visitors and a secure, fully functional custom CMS (Content Management System) dashboard for the administrator.

## 🔗 Live Links
- **Live Website:** [https://shafayat-sadid.vercel.app/](https://shafayat-sadid.vercel.app/)
- **Backend API Repository:** [https://github.com/ShafayatSadid/shafayat-portfolio-server](https://github.com/ShafayatSadid/shafayat-portfolio-server)

## 📝 Project Overview
This portfolio is built to showcase my skills, projects, and journey as a Full-Stack Developer. It goes beyond a static site by including a complete Admin Dashboard where I can create, update, and delete content (Blogs, Projects, Testimonials) and view messages sent by visitors in real-time.

## ✨ Key Features

### 🌐 Public Facing Site
- **Hero Section:** Engaging introduction with a dynamic background and resume download.
- **Dynamic Projects:** Fetches projects from the database. Includes a carousel on the home page and a dedicated `/my-work` grid. Clicking "View Details" opens a dynamic route with markdown-supported challenges and future improvements.
- **Blog System:** Fully dynamic blog listing with search, markdown rendering for articles, and code syntax highlighting.
- **Testimonials:** Auto-sliding carousel fetching client reviews from the database.
- **Contact Form:** Secure contact form that saves messages to the database and sends email notifications via Web3Forms.
- **System-Based Dark/Light Mode:** Seamlessly adapts to the user's device preferences.

### 🔐 Admin Dashboard (Protected)
- **Secure Authentication:** Powered by Better Auth (JWT-based).
- **Blog Management:** Create, Edit, and Delete blog posts with Cloudinary image uploads and live Markdown preview.
- **Project Management:** Manage projects, tech stacks, live links, and GitHub links.
- **Testimonial Management:** Add and remove client reviews.
- **Inbox:** Read and delete messages received from the contact form.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (Strict Mode)
- **UI & Styling:** Tailwind CSS 4, shadcn/ui (Base UI), Lucide React
- **Authentication:** Better Auth (MongoDB Adapter)
- **Animations:** Motion (Framer Motion)
- **Markdown Editor:** React Markdown, Remark GFM
- **Image Upload:** Cloudinary
- **Form Handling:** Web3Forms

## 🚀 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShafayatSadid/shafayat-portfolio.git
   cd shafayat-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables. *(Note: You will also need the Express backend server running for full functionality).*
   ```env
   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # Backend API URL
   NEXT_PUBLIC_API_URL="http://localhost:5000"

   # Better Auth & MongoDB
   MONGODB_URI="your_mongodb_connection_string"
   DB_NAME="shafayatSadid"
   BETTER_AUTH_SECRET="your_generated_secret"

   # Cloudinary (For Image Uploads)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_upload_preset"

   # Web3Forms (For Contact Form)
   WEB3FORMS_ACCESS_KEY="your_access_key"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📍 Route Summary

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Home Page (Hero, Featured Projects, About, Testimonials, CTA) | Public |
| `/my-work` | All Projects grid | Public |
| `/my-work/[id]` | Detailed project case study | Public |
| `/blog` | Blog listing page | Public |
| `/blog/[slug]` | Single blog post view | Public |
| `/about` | Detailed journey, skills, education & hobbies | Public |
| `/contact` | Contact form and info | Public |
| `/login` | Admin login page | Public |
| `/register` | Admin registration page | Public |
| `/dashboard` | Admin Overview & Stats | Protected (Admin) |
| `/dashboard/blogs` | Manage Blogs | Protected (Admin) |
| `/dashboard/projects`| Manage Projects | Protected (Admin) |
| `/dashboard/testimonials`| Manage Testimonials | Protected (Admin) |
| `/dashboard/messages` | View Contact Messages | Protected (Admin) |

## 👨‍💻 Author
**Shafayat Sadid (Shafayat Hossain)**
- GitHub: [@ShafayatSadid](https://github.com/ShafayatSadid)
- LinkedIn: [Md Shafayat Hossain Sadid](https://www.linkedin.com/in/md-shafayat-hossain-sadid)
- Portfolio: [shafayat-sadid.vercel.app](https://shafayat-sadid.vercel.app/)
