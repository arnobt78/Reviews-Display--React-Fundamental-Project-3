# Reviews Card Display - React, Vite, JavaScript, Custom CSS Fundamental Project 3

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.1-646CFF)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React Icons](https://img.shields.io/badge/React%20Icons-4.7-ff69b4)](https://react-icons.github.io/react-icons/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3)](https://eslint.org/)

A React application that displays user reviews in a card layout. Users can navigate through reviews with previous/next buttons, jump to a random review with "surprise me," and see each reviewer's photo, name, job, and quote. This project is built for learning React fundamentals: state with `useState`, list indexing, event handlers, and conditional rendering—all without a backend or API.

- **Live Demo:** [https://reviews-display.vercel.app/](https://reviews-display.vercel.app/)

![Screenshot 2026-03-10 at 16 27 00](https://github.com/user-attachments/assets/27f82b6e-0d13-4859-9283-c2068cdf6d66)

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Features & Functionalities](#features--functionalities)
- [How to Run & Use](#how-to-run--use)
- [Environment Variables & .env](#environment-variables--env)
- [Components & How It Works](#components--how-it-works)
- [Data & API](#data--api)
- [Teaching Walkthrough](#teaching-walkthrough)
- [Reusing Components in Other Projects](#reusing-components-in-other-projects)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)
- [Happy Coding!](#happy-coding-)

---

## Introduction

This repository is **Fundamental Project 3** in a React learning path. It focuses on:

- Managing a single **index state** to control which review is shown.
- **Bounded navigation**: wrapping from last → first and first → last (carousel behavior).
- **Random selection** with simple logic to avoid showing the same review twice in a row.
- **Static data** in a JavaScript module (no backend or REST API), so you can run it locally with no server or keys.

The UI is a single card: avatar, quote icon, author name, job title, review text, and three controls (prev, next, surprise me). Styling uses plain CSS with custom properties in `index.css`.

---

## Project Structure

```
03-reviews/
├── index.html              # Entry HTML; root div, meta tags, script to main.jsx
├── package.json            # Dependencies (React, Vite, react-icons) and scripts
├── vite.config.js          # Vite config; React plugin
├── eslint.config.js       # ESLint 9 flat config for React/JSX
├── public/
│   └── vite.svg           # Favicon / default asset
├── src/
│   ├── main.jsx           # React root: createRoot, renders <App />
│   ├── App.jsx            # Main component: state, navigation, review card UI
│   ├── Alternative.jsx    # Alternate implementation using modulus (%) for index
│   ├── data.js            # Array of review objects (id, name, job, image, text)
│   └── index.css          # Global styles and review card layout
└── README.md
```

- **No routes** — single page; one view.
- **No backend** — all data lives in `src/data.js`.
- **Entry point** — `index.html` loads `src/main.jsx`, which mounts `App` into `#root`.

---

## Technology Stack

| Layer          | Technology                                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| **Framework**  | React 18                                                                      |
| **Build tool** | Vite 4                                                                        |
| **Language**   | JavaScript (ES modules)                                                       |
| **Icons**      | react-icons (Font Awesome: `FaChevronLeft`, `FaChevronRight`, `FaQuoteRight`) |
| **Styling**    | Vanilla CSS (custom properties, no preprocessor)                              |
| **Linting**    | ESLint 9 (flat config) + React + React Hooks + React Refresh                  |

---

## Features & Functionalities

1. **Display one review at a time**  
   Shows current reviewer's image, name, job, and quote text.

2. **Previous / Next**  
   Buttons move to the previous or next review. At the ends, index wraps (last → first, first → last).

3. **Surprise me**  
   Picks a random index and shows that review. Logic avoids repeating the same review if possible.

4. **Responsive card layout**  
   Centered card with image, quote icon overlay, and buttons; layout and typography defined in `index.css`.

5. **No API or backend**  
   All data is in `src/data.js`; images use external URLs (e.g. course-api.com). No auth or env secrets required to run.

---

## How to Run & Use

### Prerequisites

- **Node.js** (v16+ recommended) and **npm**.

### Install and run

```sh
# Clone the repo (replace with your repo URL)
git clone <repository-url>
cd 03-reviews

# Install dependencies
npm install

# Start development server (e.g. http://localhost:5173)
npm run dev
```

### Other scripts

```sh
# Production build (output in dist/)
npm run build

# Preview production build locally
npm run preview

# Lint source files
npm run lint

# Lint and auto-fix where possible
npm run lint:fix
```

### Using the app

1. Open the dev URL (e.g. `http://localhost:5173`) in a browser.
2. Use **&lt;** and **&gt;** to move to previous/next review.
3. Click **surprise me** to show a random review.

---

## Environment Variables & .env

This project **does not use any environment variables** for its current features. All data is in `src/data.js` and image URLs are hardcoded there. You can run, build, and preview without a `.env` file.

If you later add a backend or API:

1. **Create a `.env` file in the project root** (same level as `package.json`).
2. **Use the `VITE_` prefix** so Vite exposes them to the client:

   ```env
   VITE_API_BASE_URL=https://api.example.com
   VITE_APP_NAME=Reviews Display
   ```

3. **Access in code** via `import.meta.env`:

   ```js
   const apiBase = import.meta.env.VITE_API_BASE_URL;
   ```

4. **Do not commit secrets** (API keys, tokens) to the repo. Add `.env` to `.gitignore` if it contains sensitive data; use `.env.example` to document required variable names only.

For this educational project, **no .env setup is required**.

---

## Components & How It Works

### `main.jsx`

- Imports React, ReactDOM, `App`, and `index.css`.
- Creates a root with `ReactDOM.createRoot(document.getElementById('root'))`.
- Renders `<App />` inside `<React.StrictMode>`.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

### `App.jsx`

- **State:** `const [index, setIndex] = useState(0);` — which review (0-based) is shown.
- **Current review:** `const { name, job, image, text } = people[index];` from the `people` array imported from `data.js`.
- **Helpers:**
  - `checkNumber(number)` — keeps index in `[0, people.length - 1]` by wrapping (e.g. 4 → 0, -1 → 3).
  - `nextPerson` / `prevPerson` — increment/decrement index using `checkNumber`.
  - `randomPerson` — `Math.floor(Math.random() * people.length)`; if it equals current index, add 1 then wrap with `checkNumber`.
- **UI:** One `<main>` with an `<article class="review">`: image container with quote icon, author name, job, text, prev/next buttons, and "surprise me" button. Icons from `react-icons/fa`: `FaChevronLeft`, `FaChevronRight`, `FaQuoteRight`.

Flow: user clicks → handler calls `setIndex` → React re-renders → `people[index]` and thus the card content update.

---

### `Alternative.jsx`

Same UI and behavior as `App.jsx`, but index wrapping uses the **modulus operator** instead of `checkNumber`:

- Next: `(index + 1) % people.length`
- Previous: `(index - 1 + people.length) % people.length`
- Random: `randomNumber % people.length` for the new index

Useful for teaching how `%` gives a cyclic 0 … n-1 index.

---

### `data.js`

Exports one array, `reviews` (imported as `people` in App/Alternative). Each item:

```js
{
  id: 1,
  name: 'susan smith',
  job: 'web developer',
  image: 'https://www.course-api.com/images/people/person-1.jpeg',
  text: '...'
}
```

No API calls; this is the only “data layer” in the project.

---

## Data & API

- **Data source:** `src/data.js` — a static array. No REST API, no GraphQL, no backend.
- **Images:** URLs point to external CDN (e.g. `https://www.course-api.com/images/people/...`). No auth.
- **Routes:** None. Single page; no router.
- **State:** Only the current index in React state; no global store or server state.

To plug in a real API later, you could replace the `people` import with data from `fetch(import.meta.env.VITE_API_BASE_URL + '/reviews')` and use `useState`/`useEffect` (or a data-fetching library) to hold the list and loading/error state.

---

## Teaching Walkthrough

### 1. Explore the data

Open `src/data.js`. See the array of objects with `id`, `name`, `job`, `image`, `text`. This is the only “database” the app uses.

### 2. One index drives the UI

In `App.jsx`, a single state holds the position:

```jsx
const [index, setIndex] = useState(0);
const { name, job, image, text } = people[index];
```

Changing `index` changes which object is shown. No need to store the whole list in state here.

### 3. Bounded navigation (wrap around)

Two approaches:

- **Conditionals (App.jsx):** `checkNumber` clamps/wraps the index so it never goes out of bounds.
- **Modulus (Alternative.jsx):** `(index + 1) % people.length` and `(index - 1 + people.length) % people.length` achieve the same wrap in one expression.

Good moment to explain `%` (remainder) and how it gives a repeating 0 … n-1 cycle.

### 4. Random review

```js
let randomNumber = Math.floor(Math.random() * people.length);
if (randomNumber === index) randomNumber = index + 1;
setIndex(checkNumber(randomNumber)); // or % people.length
```

Teaches: random index, avoiding “same again,” and reusing the same wrapping logic.

### 5. React Icons

Icons are imported from `react-icons/fa` and rendered as components:

```jsx
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';
// ...
<FaChevronLeft />  <FaChevronRight />  <FaQuoteRight />
```

No image files or icon fonts to manage; good for rapid UI and teaching component composition.

### 6. Optional: extract a sub-component

You could teach component reuse by extracting the card:

```jsx
// ReviewCard.jsx
export default function ReviewCard({
  name,
  job,
  image,
  text,
  onPrev,
  onNext,
  onRandom,
}) {
  return (
    <article className="review">{/* ... same JSX using props ... */}</article>
  );
}
```

Then in `App.jsx`: `<ReviewCard {...people[index]} onPrev={prevPerson} onNext={nextPerson} onRandom={randomPerson} />`. Same behavior, clearer separation of layout and logic.

---

## Reusing Components in Other Projects

- **Review card UI** — Copy the `<article className="review">` block (and its CSS from `index.css`) into another React app. Drive it with props: `name`, `job`, `image`, `text`, and optional `onPrev`, `onNext`, `onRandom`. You can keep using `react-icons` or swap to another icon set.
- **Index + wrap logic** — Reuse `checkNumber` and the next/prev/random handlers in any carousel or “one-of-n” viewer (tabs, slides, testimonials). Replace `people` with your own array.
- **Data shape** — Use the same object shape (`id`, `name`, `job`, `image`, `text`) for other review/testimonial UIs, or extend it (e.g. `rating`, `date`) and still use the same navigation pattern.
- **CSS** — The `:root` variables and `.review` styles in `index.css` can be copied or adapted; change `--primary-*` and spacing to match your design system.

---

## Keywords

React, Vite, useState, carousel, reviews, testimonials, index state, modulus, wrap-around navigation, random selection, react-icons, single-page app, static data, no backend, no API, educational project, fundamental project, JavaScript, CSS custom properties, ESLint.

---

## Conclusion

This project is a minimal React app that teaches:

- **State:** one number (index) controlling what’s on screen.
- **Event handlers:** buttons updating that index.
- **List indexing and wrapping:** conditionals or modulus for prev/next.
- **Random choice:** `Math.random()` and bounds.
- **Composition:** one main component reading from a data module and rendering a card with icons.

It uses no backend, no API, and no environment variables, so it’s easy to clone and run for learning or as a starting point for a reviews/testimonials section in a larger site.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
