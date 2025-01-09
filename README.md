# Invoice Pro

Invoice Pro is a web application designed to simplify the process of creating, managing, and printing invoices. It features a robust history system for tracking invoices and provides an intuitive interface for generating professional invoices.

## Features

- History: View a list of previously created invoices with detailed information.
- Create Invoice: Quickly create and save new invoices using a user-friendly form.
- Print: Generate print-ready invoices for seamless documentation and sharing.

## Tech Stack
### Frontend

- Framework: React.js
- Styling: Tailwind CSS
- Build Tool: Vite

### Backend
- Server: Node.js with Express
- ORM: Prisma
- Database: PostgreSQL

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/invoice-pro.git
   ```
2. Navigate to the client directory and install dependencies:
   ```
   cd client
   pnpm install
   ```
3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   pnpm install
   ```
4. Set up the PostgreSQL database and apply Prisma migrations:
   ```
   pnpm prisma migrate dev
   ```

## Usage
### Development

Run the frontend and backend simultaneously for local development:
1. Start the client:
```
pnpm run dev
```
2. 
```
pnpm run start
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.
