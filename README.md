# MoviesInfo Site - MERN

## A full-featured MERN application that allows users to explore movies, post reviews and ratings, filter by genres, and access a sleek user/admin experience.

### Features

- Browse movie details with filters and genre categorization
- Post comments and reviews with ratings
- Secure user authentication (JWT)
- Admin panel for managing movies, genres, and reviews
- Fully responsive UI with slick carousel and toast notifications
- Backend secured with Helmet, CORS, and MongoDB sanitization

### Tech Stack

🖥️ Frontend – Vite + React

- react-router-dom - SPA routing
- redux toolkit - State management and rtk query for Server Side Sate mgt
- react-slick, slick-carousel - Carousel slider for movies
- react-icons
- tailwindcss
- react-toastify - Notification system

🧪 Backend – Express + MongoDB

- express - API routing
- mongoose - ODM for MongoDB
- cors, cookie-parser - CORS handling and cookie parsing
- bcryptjs, jsonwebtoken - Auth, token handling
- helmet - Security headers
- express-mongo-sanitize - Prevent MongoDB operator injection
- multer, multer-storage-cloudinary - Image uploads using Cloudinary

### Deployment

- Frontend: Hosted on Netlify
- Backend: Hosted on Render
- Database: MongoDB Atlas
