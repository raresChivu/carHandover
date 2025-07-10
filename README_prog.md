# carHandover

Car handover app for enterprises

## Overview
This is a full-featured React/Next.js frontend for a car handover management system. It is designed for enterprise use, supporting both admin and normal users, and includes mock data, authentication, navigation, and a helping agent. The app is currently frontend-only, with all data stored in localStorage or mock files, but is structured to be easily connected to a backend.

## Main Functionalities
- **User Registration & Login:** Users can register (as admin or normal), login, and use "Remember Me" for persistent sessions. All authentication is currently localStorage-based.
- **Role-based Navigation:** Admins and users see different navigation bars and options.
- **Account Management:** Users can access profile, change password, notifications, privacy settings, logout, and sign out (which clears session data).
- **Car List:** All users can view a styled list of cars, with details loaded from mock data (or localStorage, initialized on first app load).
- **Modal & Forms:** The app uses modal dialogs for forms and details, with reusable form components.
- **Password/Email Restrictions:** Registration and login enforce password/email rules with live feedback.
- **Helping Agent:** An AI-powered chat assistant helps users with app usage and features.
- **Order Management:** Users can request/assign cars, and orders are stored per user. Orders are displayed in a compact table with all car/order details.
- **Notifications:** Users receive notifications for car requests/assignments, with a notification counter in the UI.
- **Email Order as PDF:** Users can send an order as a PDF attachment to the recipient/donor via email (uses backend API and Gmail SMTP/App Password).

## App Flow
1. **Landing Page (`pages/index.tsx`):**
   - User chooses to Login or Register.
   - If "Remember Me" is set, login is bypassed.
2. **Registration (`screens/Register.tsx`):**
   - User fills out registration form (with admin checkbox).
   - User data is saved to localStorage (`registeredUsers` array).
3. **Login (`screens/Login.tsx`):**
   - User logs in; credentials are checked against `registeredUsers`.
   - On success, user is saved as `currentUser` in localStorage.
   - "Remember Me" saves email for auto-login.
4. **Main Screen (`screens/MainScreen.tsx`):**
   - Loads either `AdminNavBar` or `UserNavBar` based on `currentUser.isAdmin`.
   - Shows `AccountOptions` (right), `HelpingAgent` (center).
5. **Navigation:**
   - Left navbars route to Dashboard, Cars, Employees/Orders, Reports, Settings, PV, etc.
   - "Cars" routes to `screens/Cars.tsx` which displays the car list.
6. **Car List (`generalComps/lists/CarList.tsx`):**
   - Loads cars from `mockery/carMockery/CarMockData.tsx`.
   - Styled table, row click can open modal (future: car details, actions).
7. **Account Options:**
   - Profile, Change Password, Notifications, Privacy, Logout, Sign Out.
   - "Sign Out" clears both `rememberedUser` and `currentUser`.
8. **Helping Agent (`helpAgent/HelpingAgent.tsx`):**
   - Chat UI, powered by Gemini API (API key required).
   - Lists all app features and answers usage questions.

## Key Files & Structure
- `src/pages/index.tsx` - Landing page, login/register entry.
- `src/pages/screens/` - All main screens (Login, Register, MainScreen, Cars, etc).
- `src/generalComps/forms/` - RegisterForm, LoginForm, and form state logic.
- `src/generalComps/mainPageComps/navbars/` - AdminNavBar, UserNavBar.
- `src/generalComps/mainPageComps/AccountOptions.tsx` - Account sidebar.
- `src/generalComps/lists/CarList.tsx` - Car list component.
- `src/mockery/carMockery/CarMockData.tsx` - Mock car data.
- `src/mockery/usersMockery/` - Mock user data (for dev/testing).
- `src/helpAgent/HelpingAgent.tsx` - AI chat assistant.
- `src/styles/globals.css` - Global styles.

## Data Flow & State
- **Users:** Registered users are stored in localStorage as an array (`registeredUsers`). The currently logged-in user is stored as `currentUser`.
- **Cars:** Car data is always loaded from localStorage (`cars`), initialized from mock data on first app load.
- **Orders:** Each user has their own `orders` array in localStorage. Orders include car and user details, and can be sent as PDF via email.
- **Notifications:** Each user has a `notifications` array in localStorage, and a notification counter is shown in the UI.
- **Session:** "Remember Me" stores the user's email in localStorage as `rememberedUser`.
- **Role Logic:** Admin/user distinction is based on the `isAdmin` property of the user object.

## Extending to a Backend
To connect this frontend to a backend:
1. **Replace localStorage logic** in registration, login, and session management with API calls to your backend.
2. **Replace mock data imports** (cars, users) with fetches to backend endpoints.
3. **Protect routes/screens** using backend session/auth tokens.
4. **Move sensitive logic** (like password validation, admin checks) to the backend for security.
5. **Update the helping agent** to use backend-powered help if needed.

## Development Notes
- All navigation is handled via Next.js router.
- All forms use React state and custom hooks for validation.
- The app is styled for clarity and usability, with all text visible on white backgrounds.
- The AI agent requires a valid Gemini API key; do not expose sensitive keys in production frontend code.


## Email Notification Backend (Order as PDF)
- The backend API (`/api/sendOrderEmail`) uses Nodemailer and Gmail SMTP to send order details as a PDF attachment.
- PDF is generated on the fly using `pdfkit`.
- Requires a Gmail App Password (not your real password) and 2-Step Verification enabled on the sender account.
- If running locally, ensure your network/firewall allows outbound SMTP connections.
- For production, consider using a transactional email API (SendGrid, Mailgun, etc) if SMTP is blocked.

## Setup & Run

**Install dependencies:**

```sh
npm install
npm install nodemailer pdfkit
```

**Start the app:**

```sh
npm run dev
```

**Environment variables (recommended for production):**

Set your Gmail credentials as environment variables and use them in `sendOrderEmail.ts`:

```sh
GMAIL_USER=your@email.com
GMAIL_PASS=your-app-password
```

**Note:** Never commit real passwords or app passwords to your codebase.

## For Backend Developers
- Review all localStorage usages and replace with secure backend endpoints.
- Implement user, car, and session management APIs.
- Add authentication/authorization middleware.
- Consider using JWT or session cookies for auth.
- Ensure all sensitive operations (registration, login, car CRUD) are handled server-side.
- The frontend expects JSON responses and standard RESTful patterns.

---
