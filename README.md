# AccManage - Accounting Software

A modern accounting software built with Next.js, Redux, React Query, and Tailwind CSS.

## Features

- User Authentication (Login/Register)
- Dashboard with Quick Stats
- Account Management
- Transaction Tracking
- Financial Reports
- User Management
- Modern and Responsive UI

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **State Management:** Redux Toolkit
- **UI Components:** Lit UI
- **Styling:** Tailwind CSS
- **Data Fetching:** React Query
- **Forms:** Formik with Yup validation
- **Icons:** Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd accmanage
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (protected)/       # Protected routes (dashboard, etc.)
│   └── api/               # API routes
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── layouts/          # Layout components
├── store/                # Redux store configuration
│   └── features/         # Redux slices
└── middleware.ts         # Route protection middleware
```

## Default Credentials

For testing purposes, you can use these credentials:
- Email: admin@example.com
- Password: password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 