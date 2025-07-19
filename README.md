# 🍽️ Food Delivery App (MERN Stack)

A full-featured food delivery web application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It supports customer browsing, cart management, order placement, and admin control for order tracking and menu updates.

---

## 🔗 Live Demo Links

- 🧑‍🍳 **User Site**: [https://food-delivery-cyan-kappa.vercel.app](https://food-delivery-cyan-kappa.vercel.app)
- 🛠️ **Admin Panel**: [https://food-delivery-jivc.vercel.app/orders](https://food-delivery-jivc.vercel.app/orders)

---

## 📦 Features

### 🧑 User Features
- Browse food items by name, image, price, and ratings
- Add items to cart and update quantities
- Checkout with delivery address and contact details
- View order history in “My Orders”
- JWT-based login system

### 🧑‍💼 Admin Features
- Admin login and authentication
- View all orders placed by users
- Update order status (e.g., paid/pending)
- Upload new food items with images, descriptions, and pricing
- Manage existing menu (edit/delete items)

### 💸 Payment & Upload
- Stripe or Razorpay integration (planned)
- Image handling with Cloudinary & Multer

---

## 🧰 Tech Stack

| Layer        | Tools/Frameworks                               |
|--------------|------------------------------------------------|
| Frontend     | React, Vite, React Router, Axios               |
| Backend      | Node.js, Express.js                            |
| Database     | MongoDB Atlas                                  |
| Authentication | JSON Web Token (JWT)                        |
| Image Upload | Cloudinary, Multer                             |
| Hosting      | Vercel (Frontend/Admin), Render (Backend)      |

---

## 🗂️ Project Structure

```
food-delivery/
├── backend/             # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── client/              # React (Vite) frontend
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
├── admin/               # Admin panel (optional as separate frontend)
```

---

## 🛠️ Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/food-delivery-app.git
cd food-delivery-app
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Set Up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_BACKEND_URL=https://your-backend-api-url.com
```

Start the frontend server:

```bash
npm run dev
```

### 4. (Optional) Admin Panel Setup

```bash
cd ../admin
npm install
npm run dev
```

---

## 🚀 Deployment

### Frontend & Admin
- Deployed on [Vercel](https://vercel.com)
- Make sure your `.env` files contain correct backend API URLs

### Backend
- Deploy to [Render](https://render.com) or [Railway](https://railway.app)
- Add your environment variables in the dashboard settings

---

## 📄 License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT).  
Feel free to fork, modify, and build your own food delivery application!

---

## 👨‍💻 Author

Developed by **Pahuldeep Singh**  
📫 [Connect on LinkedIn](https://www.linkedin.com/in/pahuldeep-singh/)
