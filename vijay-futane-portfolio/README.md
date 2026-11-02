# Vijay Futane - Full Stack Developer & Data Analyst Portfolio

A modern, responsive, high-performance Full Stack Developer Portfolio Web Application built with **React.js**, **Tailwind CSS**, **Python Flask**, and **MySQL**. Featuring an ultra-sleek **Glassmorphism UI** with dark navy and purple gradient themes, animated typography, interactive dashboards, dynamic REST API integration, and a secure **Admin Management Panel**.

---

## 🌟 Key Features

### 1. UI/UX & Glassmorphism Design
- **Dark Navy & Purple Gradient Theme**: Curated color palette (`#070913`, `#8b5cf6`, `#a855f7`, `#06b6d4`).
- **Glassmorphism Aesthetic**: Multi-layer frosted glass panels, translucent cards (`backdrop-filter: blur(16px)`), subtle neon borders, and dynamic ambient radial glow blobs.
- **Light & Dark Theme Switcher**: Persistent theme state preserved via `localStorage`.
- **Responsive Layout**: Engineered for mobile, tablet, and desktop screens with custom animations and smooth scrolling.
- **Scrollspy Navigation**: Interactive navbar that tracks reading position and highlights active sections.

### 2. Home Section
- Professional introduction for **Vijay Futane** (Python Full Stack Developer | Data Analyst, MCA).
- **Animated Typing Effect** rotating through technical roles and domain specializations.
- Custom vector developer avatar with orbital glowing rings and floating tech badges.
- **Download Resume** button (downloads formatted resume).
- Social links (GitHub, LinkedIn, Email, Twitter).
- Quick statistics counter pills (Degree, Projects, Core Stack, Data Visuals).

### 3. About Me Section
- Comprehensive professional summary emphasizing full-stack engineering and data analytics.
- **Education Focus**: Master of Computer Applications (MCA) with First Class Distinction.
- **Career Objective** and **Technical Interests** (Full Stack, Business Intelligence, RDBMS, Cloud Microservices).
- **Development Journey** visual roadmap from CS fundamentals to full-stack and analytics engineering.

### 4. Skills Section
- Interactive categorized skills grid:
  - **Frontend Development**: HTML (95%), CSS (90%), JavaScript (88%), React.js (85%)
  - **Backend & Core**: Python (92%)
  - **Databases**: SQL (90%), MySQL (88%)
  - **Data Analytics & BI**: Power BI (85%), Excel (85%)
- Category filtering tabs and animated glowing progress bars with level badges.

### 5. Projects Section (Featured Showcase)
Interactive project cards with image preview, live demo link, GitHub repository link, and modal inspection:
1. **E-commerce Dashboard**: Full-featured admin and analytics dashboard with real-time revenue KPIs, conversion funnels, and inventory monitoring (React.js, Flask, MySQL, Chart.js, Tailwind).
2. **Energy Consumption Dashboard**: Telemetry platform monitoring grid loads, peak demands, carbon footprint, and anomaly prediction (Python, Power BI, SQL, Pandas, Flask).
3. **React Portfolio Website**: Modern glassmorphic personal portfolio with dynamic REST API backend and admin control center (React.js, Tailwind CSS, Flask, MySQL, JWT).
4. **SQL HR Database Project**: Enterprise relational HR management schema with stored procedures, salary audit triggers, attrition analysis, and Power BI views (MySQL, Advanced SQL, Python, Excel ETL).

### 6. Experience & Education
- Vertical timeline with glowing connector dots and type indicators.
- **MCA** (Master of Computer Applications) - 2022 to 2024.
- **BCA / Computer Science** - 2019 to 2022.
- **Full Stack Python Developer & Data Analyst Intern** - 2023 to 2024.
- **Full Stack & Data Engineering Certifications** - 2023 to Present.

### 7. Contact Section & Database Integration
- Full contact form (Full Name, Email, Subject, Message).
- Real-time client-side form validation (length, regex email checks).
- Directly connected to the backend REST API (`POST /api/contacts`).
- Saves messages into the MySQL `contacts` table (or SQLite fallback).
- Interactive Toast feedback notification.

### 8. Admin Control Dashboard (`#/admin`)
- **Secure Authentication**: Username/password authentication with `werkzeug.security` password hashing and token management.
- **Default Credentials**:
  - **Username**: `admin`
  - **Password**: `Admin@123`
- **Dashboard Features**:
  - **Portfolio KPIs**: Total projects, skills, contact inquiries, and unread count.
  - **Messages Inbox**: View inquiries, mark as read/unread, delete messages.
  - **Projects CRUD**: Add, edit, or delete portfolio projects.
  - **Skills CRUD**: Add new skills, adjust proficiency percentages, delete skills.
  - **Change Password**: Change admin password directly from the panel.

---

## 📁 Project Directory Structure

```
vijay-futane-portfolio/
├── run.py                       # One-click application runner
├── README.md                    # Documentation & setup guide
├── backend/
│   ├── app.py                   # Main Flask application & static server
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example             # Environment variables template
│   ├── .env                     # Local environment configuration
│   ├── config/
│   │   ├── __init__.py
│   │   └── config.py            # App & database configuration
│   ├── controllers/
│   │   ├── __init__.py
│   │   ├── auth_controller.py   # Admin authentication & session management
│   │   ├── project_controller.py# Projects CRUD operations
│   │   ├── skill_controller.py  # Skills CRUD operations
│   │   ├── education_controller.py # Timeline CRUD operations
│   │   ├── contact_controller.py# Contact submissions & message inbox
│   │   └── stats_controller.py  # Portfolio statistics & system info
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth_routes.py       # /api/auth routes
│   │   ├── project_routes.py    # /api/projects routes
│   │   ├── skill_routes.py      # /api/skills routes
│   │   ├── education_routes.py  # /api/education routes
│   │   ├── contact_routes.py    # /api/contacts routes
│   │   └── stats_routes.py      # /api/stats routes
│   └── database/
│       ├── __init__.py
│       ├── schema.sql           # Production MySQL schema & seed data
│       ├── db.py                # Database connection adapter (MySQL + SQLite fallback)
│       └── seed.py              # Standalone database seed runner
└── frontend/
    ├── index.html               # Main HTML5 entry
    ├── assets/
    │   ├── css/
    │   │   └── style.css        # Glassmorphism styling, glows & keyframes
    │   ├── js/
    │   │   ├── api.js           # REST API client
    │   │   ├── utils.js         # Toast, formatting & resume download
    │   │   └── app.js           # Root React App component & theme engine
    │   └── images/
    │       ├── profile-avatar.svg
    │       ├── project-ecommerce.svg
    │       ├── project-energy.svg
    │       ├── project-portfolio.svg
    │       └── project-hr-sql.svg
    ├── components/
    │   ├── Navbar.js            # Glass navbar & mobile drawer
    │   ├── Hero.js              # Animated typing hero & CTA
    │   ├── About.js             # MCA summary & journey
    │   ├── Skills.js            # Animated skill progress bars
    │   ├── Projects.js          # Project showcase grid & filters
    │   ├── ProjectModal.js      # Architecture deep-dive modal
    │   ├── Experience.js        # Timeline layout
    │   ├── Contact.js           # Validated contact form
    │   ├── Toast.js             # Toast notification engine
    │   ├── BackToTop.js         # Scroll-to-top floating button
    │   └── Footer.js            # Footer with social & admin links
    └── pages/
        ├── HomePage.js          # Complete landing page
        ├── AdminLogin.js        # Admin login page
        └── AdminDashboard.js    # Administrative control center
```

---

## ⚙️ Installation & Execution Instructions

### Prerequisites
- **Python**: Version 3.10 or higher.
- **MySQL Server** (Optional for local testing; built-in SQLite auto-fallback ensures instant out-of-the-box execution).

---

### Step 1: Install Python Dependencies
Open PowerShell or Terminal in the project root:
```bash
pip install -r backend/requirements.txt
```
*(Dependencies: `flask`, `flask-cors`, `pymysql`, `werkzeug`, `cryptography`)*

---

### Step 2: Configure MySQL Database (Optional / Recommended for Production)
1. Start your local MySQL Server (e.g. MySQL Workbench, XAMPP, or Windows MySQL service).
2. Open MySQL CLI or GUI and execute the schema:
```bash
mysql -u root -p < backend/database/schema.sql
```
3. Update `backend/.env` with your MySQL credentials:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=portfolio_db
```
> **Note**: If MySQL is not running, the application will automatically fall back to the local SQLite database (`backend/database/portfolio.db`), so all features, contacts, and admin operations work without any blocking errors!

---

### Step 3: Run the Application
Run the master runner:
```bash
python run.py
```
Or run Flask directly:
```bash
python backend/app.py
```

Now open your browser and navigate to:
- **Portfolio Website**: `http://localhost:5000`
- **Admin Portal**: `http://localhost:5000/#/admin`
- **API Health**: `http://localhost:5000/api/health`

---

## 🔐 Admin Dashboard Access

- **URL**: `http://localhost:5000/#/admin`
- **Default Username**: `admin`
- **Default Password**: `Admin@123`

Inside the Admin Dashboard you can:
1. **View Contact Messages**: Inspect form submissions sent by visitors, toggle read/unread status, or delete messages.
2. **Manage Projects**: Add new projects, edit titles, tech stacks, GitHub/live links, and descriptions.
3. **Manage Skills**: Add skills, update proficiency sliders, and customize categories.
4. **Change Password**: Update the administrator password securely with one click.

---

## 📡 REST API Reference

| Endpoint | Method | Access | Description |
|---|---|---|---|
| `/api/health` | GET | Public | Health status & active DB engine |
| `/api/resume/download` | GET | Public | Downloads formatted resume |
| `/api/projects` | GET | Public | List all projects (supports `?category=...`) |
| `/api/projects/<id>` | GET | Public | Single project details |
| `/api/projects` | POST | Admin | Create project |
| `/api/projects/<id>` | PUT | Admin | Update project |
| `/api/projects/<id>` | DELETE | Admin | Delete project |
| `/api/skills` | GET | Public | List all skills |
| `/api/skills` | POST | Admin | Add a new skill |
| `/api/skills/<id>` | PUT | Admin | Update skill or proficiency |
| `/api/skills/<id>` | DELETE | Admin | Delete skill |
| `/api/education` | GET | Public | List education & experience milestones |
| `/api/contacts` | POST | Public | Submit contact form inquiry |
| `/api/contacts` | GET | Admin | View all contact messages |
| `/api/contacts/<id>/status` | PUT | Admin | Update message status (`unread`, `read`, `archived`) |
| `/api/contacts/<id>` | DELETE | Admin | Delete contact message |
| `/api/stats` | GET | Public | Total projects, skills, inquiries, and DB type |
| `/api/auth/login` | POST | Public | Authenticate admin, returns Bearer token |
| `/api/auth/me` | GET | Admin | Current session verification |
| `/api/auth/change-password` | POST | Admin | Change admin password |

---

## 👤 Author
**Vijay Futane**
- Role: Python Full Stack Developer | Data Analyst
- Degree: Master of Computer Applications (MCA)
- Portfolio: [https://vijayfutane.dev](https://vijayfutane.dev)
- GitHub: [https://github.com/vijayfutane](https://github.com/vijayfutane)
- LinkedIn: [https://linkedin.com/in/vijayfutane](https://linkedin.com/in/vijayfutane)
