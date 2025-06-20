# BevArena

![Vercel Deploy](https://img.shields.io/badge/deployed-Vercel-000?logo=vercel)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

A next-generation, full-stack platform for the beverage industry, powered by the latest web technologies. Engineered for fast prototyping, SaaS scalability, and practical business solutions.

## Repository Structure

This project uses a dual repository approach:

- **Development Repository (Private)**: https://github.com/2701kai/dev-bevarena-one

  - Contains all development code, branches, and artifacts
  - For development team use only

- **Client Repository (Public)**: https://github.com/2701kai/bevarena-one
  - Clean codebase for client viewing
  - Single branch only
  - No development artifacts

For more details on the repository workflow, see [Documentation](../../doc/repository-workflow.md).

## Why BevArena?

- **For Innovators:** Rapidly prototype and launch new digital products for the beverage sector.
- **For Businesses:** Scalable SaaS foundation, ready for real-world integrations (CRM, ERP, CMS, and more).
- **For Teams:** Empower non-devs to manage content and workflows with ease.
- **For Investors:** Modern, modular, and built for growth—ready to adapt to any business model.

## 🚀 Live Demo

[https://bevarena-one.vercel.app/](https://bevarena-one.vercel.app/)

## 📸 Screenshot

[BevArena Screenshot](./public/images/ScreenShot.png)

## Features

- **Modern Tech Stack:** Vite, React 19, TailwindCSS 4.1
- **Authentication:** Clerk (Google, Email, Phone, etc.)
- **Protected Routes:** Marketplace, Jobs, and more only accessible after login
- **Open Search:** Used machinery search available without login (redirects to bevmaq)
- **Fast Prototyping:** Supabase backend for rapid iteration (easily swappable for Neon/Postgres or your stack)
- **Production Hosting:** Vercel (Next.js for bevmaq, React for BevArena)
- **Great UX:** Persistent login via local storage, clean UI, mobile-ready

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Developer Tools

BevArena includes powerful developer tools that are automatically available in development mode but never included in production builds:

### Context7 AI Integration

Context7 is automatically initialized in all BevArena projects to assist developers:

- **Access via Console**:
  - Type `useContext7("react")` for quick library help
  - Type `window.__C7.getLibraryHelp("react")` for more advanced options
- **Keyboard Shortcuts**:
  - Press `Ctrl+Shift+Numpad8` to toggle the developer panel
  - Press `Alt+7` to quickly use Context7 (alias for "Use context7")
- **Import Helpers**: Use `import { kaiTools } from "../utils/devtools/kai-helper";` in your components

For detailed documentation, see [Context7 Usage Guide](./dev-notes/context7-usage.md).

> **Note**: All developer tools are automatically removed from client-facing code during the build process.

## Test Login

- **Username:** `bevarena`
- **Password:** `bevarena`

## Roadmap

- [ ] Real backend integration (Postgres/Neon/Supabase)
- [ ] Custom user roles & permissions
- [ ] Advanced marketplace features
- [ ] UI/UX polish & branding
- [ ] **API Integrations:**
  - CRM (Customer Relationship Management): e.g., Salesforce, HubSpot, Pipedrive
  - ERP (Enterprise Resource Planning): e.g., SAP, Microsoft Dynamics, Odoo
  - Other SaaS tools: payment providers, analytics, logistics, or marketing platforms
  - **CMS (Content Management System) integrations:** Connect to headless CMS solutions (Contentful, Strapi, Sanity, or custom) so web editors, marketers, or non-devs can manage content, news, and product listings directly in the app.

> _Web development is real work: Integrating business systems, automating workflows, and enabling non-dev teams to manage content is where digital value is created._

## About the Author

This project is developed by the founder of [elita.dev](https://elita.dev/) — a new SaaS agency and innovation lab for rapid, modern product development. If you're interested in collaboration, SaaS consulting, or want to build your own digital product fast, let's connect!

## Contact

📧 **Email:** [hey@elita.dev](mailto:hey@elita.dev)

---

👥 Founders

<table>
<tr>
<td align="center">
<img src="./public/images/kai.png" width="115" style="border-radius: 50%;" alt="Kai"/><br/>
<b>Kai</b><br/>
Founder & Creator<br>
<sub>Product & Full-Stack<br/></sub>
<sub>Vision, Tech, Delivery</sub>
</td>
<td align="center">
<img src="./public/images/felix.png" width="120" style="border-radius: 50%;" alt="Felix"/><br/>
<b>Felix</b><br/>
Co-Founder<br/>
<sub>Full-Stack Web Development,<br></sub>
<sub> Product, Tech Vision<br/>
<!-- <em>Bright Mind & Tech Lead</em></sub> -->
</td>
</tr>
</table>

---

_Inspired by the best of the beverage and SaaS world. Built for speed, scale, and real business impact._

[&copy; NuovaEsperanza](./public/images/IMG_1377.JPG)

---

## 💡 Why Invest?

- **Proven Team:** Visionary founders with deep full-stack expertise and a track record of rapid delivery.
- **Market-Ready Platform:** Already live, scalable, and built for real B2B needs in a massive industry.
- **Speed as a Superpower:** From idea to MVP in days, not months—giving us and our clients a true competitive edge.
- **Purpose Beyond Profit:** Agency revenue fuels pro bono, high-impact tech for the greater good.
- **No Fuzz, Just Results:** We remove technical barriers so our clients (and investors) can focus on what matters.

_We're open to strategic partnerships and investment to accelerate our mission.<br>If you want to be part of the next wave of SaaS and digital enablement, let's talk._
