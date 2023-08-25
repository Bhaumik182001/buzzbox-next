# BuzzBox Web Application

**Live Demo**: [BuzzBox on Vercel](https://buzzbox-next.vercel.app)

BuzzBox is a social media web application inspired by platforms like Twitter and Reddit. Built with Next.js and React.js, BuzzBox offers a full range of CRUD functionalities as well as additional features such as real-time changes, post sharing, and user authentication. Read below to learn more about its features and the technologies used.

<img src="https://i.imgur.com/P9kx0BQ.png" alt="BuzzBox Preview" height="500">


---

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)

---

## Live Demo

Check out the live demo of the application here: [BuzzBox on Vercel](https://buzzbox-next.vercel.app).


---

## Features

- **User Authentication**: Users can authenticate via trusted providers like Google, GitHub, Reddit, and Discord.
- **CRUD Functionality**: Users can create, read, update, and delete posts and spaces.
- **Real-time Interaction**: Real-time upvotes, downvotes, comments, and post sharing.
- **Intuitive UI**: The application is styled with TailwindCSS for better performance and user experience.

---

## Technologies

- **Next.js**: For server-side rendering and page routing.
- **React.js**: For building the UI components.
- **Supabase**: For real-time PostgreSQL database changes.
- **Stepzen**: To convert PostgreSQL to GraphQL for queries and mutations.
- **Apollo Client**: To interact with the database through the frontend.
- **react-share**: To enable share functionality for each post.
- **next-auth**: For authenticating users.
- **Dicebear**: To generate profile pictures and space images.
- **Heroicons**: To provide SVG icons.
- **TailwindCSS**: For styling.
- **Vercel**: For hosting and custom domain setup.

---

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/BuzzBox.git
```

2. Install dependencies:

```bash
cd BuzzBox
npm install
```

3. Set up environment variables:

```bash
# .env file
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
```

4. Run the development server:

```bash
npm run dev
```

---

## Usage

Open [http://localhost:3000](http://localhost:3000) with your web browser to see the application.


