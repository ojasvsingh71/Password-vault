
# 🔐 Password Vault - Secure Password Manager

A modern, privacy-first password manager built with Next.js, featuring secure client-side encryption and a minimalist interface.

## ✨ Features

### 🔧 Core Functionality
- **Strong Password Generator** with customizable length and character sets
- **Secure Vault** for storing login credentials (title, username, password, URL, notes)
- **Client-Side Encryption** - server never sees your plaintext data
- **User Authentication** with email and password
- **Copy to Clipboard** with auto-clear functionality
- **Search & Filter** through saved entries

### 🛡️ Security Features
- All vault data encrypted before leaving the browser
- Secure password hashing for authentication
- Auto-clear clipboard after 15 seconds
- No plaintext passwords stored on server

## 🚀 Live Demo

[**Live Demo URL**](https://password-vault-six.vercel.app/) 

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) with TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Encryption**: CryptoJS for client-side encryption
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 🔐 Encryption Details

**Library Used**: CryptoJS (AES encryption)

**Why CryptoJS?**
- Proven and widely-used encryption library
- Simple API for client-side encryption/decryption
- Supports AES-256 which provides strong security
- Lightweight and doesn't require complex setup

**Encryption Flow**:
1. User creates a master password during registration
2. Master password derives an encryption key
3. All vault items are encrypted with this key before sending to server
4. Data is decrypted only on client-side when needed

## 📦 Installation & Local Development

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ojasvsingh71/Password-vault.git
   cd Password-vault

2.  **Install dependencies**
    
    bash
    
    npm install
    
3.  **Environment Setup**  
    Create a `.env.local` file in the root directory:
    
    env
    
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000
    
4.  **Run the development server**
    
    bash
    
    npm run dev
    
5.  **Open your browser**  
    Navigate to [http://localhost:3000](http://localhost:3000/)
    

## 🎯 Usage

1.  **Sign Up** - Create a new account with email and password
    
2.  **Generate Passwords** - Use the password generator with custom options
    
3.  **Save Credentials** - Add new items to your secure vault
    
4.  **Manage Entries** - View, edit, delete, or search through saved items
    
5.  **Copy Passwords** - One-click copy with auto-clear protection
    

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                # Utility functions
│   ├── encryption.ts   # Client-side encryption
│   └── auth.ts        # Authentication helpers
```

## 🎥 Demo Video


https://github.com/user-attachments/assets/8867f6c5-a84f-461e-8415-4db5beda0a7d



## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1.  Push your code to GitHub
    
2.  Connect your repository to Vercel
    
3.  Add environment variables in Vercel dashboard
    
4.  Deploy automatically on every push
    

## 📝 Assignment Completion

This project fulfills all **must-have** requirements from the assignment:

-   ✅ Password generator with customizable options
    
-   ✅ Email/password authentication
    
-   ✅ Complete CRUD operations for vault items
    
-   ✅ Client-side encryption using CryptoJS
    
-   ✅ Copy to clipboard with auto-clear
    
-   ✅ Search and filter functionality
    
-   ✅ Deployed live demo
    
-   ✅ TypeScript implementation
    

## 👨‍💻 Developer

**Ojasv Singh**  
[GitHub](https://github.com/ojasvsingh71) 
