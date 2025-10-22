# Reddit Client

> A modern Reddit client built with React and Redux for browsing and searching Reddit content.

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764abc?logo=redux)](https://redux-toolkit.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[View Live Demo](#) · [Report Bug](#) · [Request Feature](#)

---

## 📋 About

A bootcamp portfolio project demonstrating React and Redux best practices. Browse Reddit posts, search content, filter by communities, and view detailed posts with comments—all without requiring a Reddit account.

### Key Features

- 🏠 **Home Feed** - Browse trending posts from multiple subreddits
- 🔍 **Search** - Find posts across all of Reddit
- 🏷️ **Filter** - View posts from specific communities with sorting (Best, Hot, New, Top, Rising)
- 💬 **Post Details** - Read full posts with nested comment threads
- 📱 **Responsive** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Fast** - Optimized performance with code splitting and lazy loading

---

## 📸 Screenshots

### Home Screen
![Home Screen](screenshots/home-screen.png)

### Post Detail with Comments
![Post Detail](screenshots/post-detail.png)

### Filtered View
![Filtered View](screenshots/filtered-view.png)

### Search Results
![Search Results](screenshots/search-results.png)

---

## 🛠️ Technologies

- **React 18** - UI components with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Jest & React Testing Library** - Unit testing
- **Cypress** - End-to-end testing
- **Reddit JSON API** - Data source (no API key required)

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+ and npm
- Git

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/dylanbshell/reddit-client.git
   cd reddit-client
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```
   Opens at `http://localhost:3000`

3. **Run tests** (optional)
   ```bash
   npm test
   ```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm test` | Run tests in watch mode |
| `npm run build` | Production build |
| `npm run lint` | Check code quality |

---

## 📁 Project Structure

```
reddit-client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── navigation/      # NavBar, SearchBar, HomeButton
│   │   ├── posts/           # PostCard, ImagePostCard, TextPostCard
│   │   ├── sidebar/         # Sidebar, CommunityButton
│   │   ├── comments/        # CommentCard, CommentCardReply
│   │   └── shared/          # Button, Spinner, ErrorMessage
│   ├── pages/               # Route components
│   │   ├── HomeScreen.jsx
│   │   ├── FilteredView.jsx
│   │   ├── PostDetailView.jsx
│   │   └── SearchResults.jsx
│   ├── features/            # Redux slices
│   │   ├── posts/
│   │   ├── search/
│   │   ├── filter/
│   │   └── currentPost/
│   ├── services/            # API integration
│   ├── styles/              # Design system (tokens, CSS)
│   └── utils/               # Helper functions
├── tests/
│   ├── components/
│   ├── integration/
│   └── e2e/
└── public/
```

---

## 🎨 Design System

### Colors
```javascript
Primary:    #FF4500  // Reddit orange
Secondary:  #0079D3  // Reddit blue  
Background: #DAE0E6  // Light gray
Cards:      #FFFFFF  // White
Text:       #1c1c1c  // Dark gray
```

### Spacing (8px grid)
```javascript
xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px
```

### Typography
- System font stack for instant loading
- Sizes: h1 (32px), h2 (24px), h3 (20px), body (16px), caption (14px)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🧪 Testing

### Unit Tests (Jest + React Testing Library)
```bash
npm test              # Watch mode
npm test -- --coverage  # Coverage report
```

Target coverage: 80%+ for statements, functions, and lines

### End-to-End Tests (Cypress)
```bash
npm run cypress:open  # Interactive
npm run cypress:run   # Headless
```

Tests cover:
- Home feed loading
- Search functionality
- Post detail navigation
- Community filtering
- Error handling

### Testing Strategy
Following the Testing Trophy:
1. Many integration tests (high value)
2. Some unit tests (fast feedback)
3. Few E2E tests (confidence)

---

## 🗺️ Roadmap

### Phase 1: MVP ✅
- [x] Home feed, search, filter, post details
- [x] Responsive design
- [x] Error handling
- [x] Tests (unit + E2E)

### Phase 2: Enhancements 🚧
- [ ] Infinite scroll
- [ ] Image lazy loading
- [ ] Skeleton loading states
- [ ] Advanced search filters
- [ ] Sort preference persistence

### Phase 3: Polish
- [ ] Dark mode
- [ ] Offline support (PWA)
- [ ] Performance optimization
- [ ] Accessibility improvements

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👤 Contact

**Dylan Shell**

- GitHub: [@dylanbshell](https://github.com/dylanbshell)
- LinkedIn: [linkedin.com/in/dylanbshell](https://linkedin.com/in/dylanbshell)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

**Project Link**: [github.com/dylanbshell/reddit-client](https://github.com/dylanbshell/reddit-client)

---

<div align="center">

**Built with ❤️ as part of a web development bootcamp**

⭐ Star this repo if it helped you learn!

</div>
