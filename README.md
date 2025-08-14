IELTS Mock Exam Platform

Oddiy IELTS test jarayonini simulyatsiya qiluvchi fullstack platforma. Admin test savollarini boshqaradi, foydalanuvchi esa testni ishlaydi va natijasini oladi. Minimal dizayn, lekin funksional imkoniyatlar bilan.

1. Texnologiyalar

Backend

Node.js

NestJS

Prisma ORM

PostgreSQL

Swagger API Docs

Frontend

React.js (Vite)

TypeScript

React Router

Axios

2. Funksiyalar

Admin:

Savol qo‘shish (matn, 4 ta variant, to‘g‘ri javob flag’i)

Savollarni ko‘rish, tahrirlash, o‘chirish

User:

Testni boshlash

Savollarga javob berish

Yakunda natijani olish (to‘g‘ri javoblar soni va foizi)

Qo‘shimcha:

10 daqiqalik taymer

Savollarni tasodifiy tartibda ko‘rsatish

Foydalanuvchi urinish tarixini ko‘rish

3. Loyihani o‘rnatish
3.1. Repository’ni klonlash
git clone https://github.com/imd1lzod/IELTS-mock.git
cd IELTS-mock

4. Backend
O‘rnatish
cd backend
npm install

.env fayl namunasi
DATABASE_URL="postgresql://postgres:password@localhost:5432/ielts

Prisma migratsiya
npx prisma generate
npx prisma migrate dev

Ishga tushirish
npm run start:dev

Swagger API Docs
http://localhost:3000/api

5. Frontend
O‘rnatish
cd frontend
pnpm install

.env fayl namunasi
VITE_API_BASE_URL=http://localhost:3000

Ishga tushirish
npm run dev


Frontend http://localhost:5173 da ishlaydi.

6. API Endpointlar
Quiz

GET /quiz — barcha savollar

POST /quiz — yangi savol qo‘shish

PUT /quiz/:id — savolni tahrirlash

DELETE /quiz/:id — savolni o‘chirish

Variantlar

GET /variant

POST /variant

PUT /variant/:id

DELETE /variant/:id

Attempt

POST /attempt — testni yakunlash va natijani yuborish

GET /attempt — urinishlar tarixini ko‘rish