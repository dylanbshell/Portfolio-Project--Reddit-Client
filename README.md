# Reddit Client

A modern, responsive Reddit client built with React and Redux that allows users to browse, search, and interact with Reddit content in an intuitive interface.

## Live Demo

[View Live Application](#) <!-- Add your deployed URL here -->

## Project Overview

This project is a Reddit client that provides users with a clean, modern interface to browse Reddit content. Users can view trending posts, search for specific content, filter by categories, and view detailed post information including comments.

## Technologies Used

### Frontend
- **React** - Component-based UI library
- **Redux** - State management
- **React Router** - Client-side routing
- **CSS3** - Styling and responsive design
- **JavaScript ES6+** - Modern JavaScript features

### Testing
- **Jest** - Unit testing framework
- **Enzyme** - React component testing utility
- **Cypress/Playwright** - End-to-end testing

### Development Tools
- **Create React App** - Project boilerplate
- **Git** - Version control
- **GitHub** - Code hosting and project management
- **GitHub Actions** - CI/CD pipeline (optional)

### APIs
- **Reddit JSON API** - Data source for posts and comments

## Wireframes

### Home Feed View
```
+------------------+
|    Header/Nav    |
+------------------+
| Sidebar | Feed   |
|         |        |
| - Home  | Post 1 |
| - Pop   | Post 2 |
| - Tech  | Post 3 |
| - News  |   ...  |
+------------------+
```

### Post Detail View
```
+------------------+
|    Header/Nav    |
+------------------+
|   Post Content   |
|                  |
|   Voting Buttons |
|                  |
|    Comments      |
|    - Comment 1   |
|      - Reply     |
|    - Comment 2   |
+------------------+
```

### Search Results View
```
+------------------+
|    Header/Nav    |
+------------------+
|   Search Bar     |
| [Posts|Users|etc]|
|                  |
|   Result 1       |
|   Result 2       |
|   Result 3       |
+------------------+
```

## Features

### Core Features
- [ ] **Initial Data View** - Users see trending posts when first visiting
- [ ] **Search Functionality** - Users can search Reddit content using terms
- [ ] **Category Filtering** - Filter posts by predefined categories (Technology, Gaming, Science, etc.)
- [ ] **Detailed Post View** - Click on posts to see full content and comments
- [ ] **Responsive Design** - Works on desktop, tablet, and mobile devices
- [ ] **Cross-Browser Support** - Compatible with modern browsers
- [ ] **Error Handling** - Users can recover from error states
- [ ] **Cohesive Design System** - Consistent UI/UX throughout the app
- [ ] **Smooth Animations** - Delightful transitions and micro-interactions

### User Stories
- As a user, I want to see popular Reddit posts when I first visit the site
- As a user, I want to search for specific topics or keywords
- As a user, I want to filter posts by different categories
- As a user, I want to click on a post to see its full content and comments
- As a user, I want the app to work well on my phone and computer
- As a user, I want smooth animations that make the app feel polished
- As a user, I want to be able to recover if something goes wrong

## Project Structure

```
reddit-client/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── PostList/
│   │   ├── PostDetail/
│   │   ├── SearchBar/
│   │   └── Sidebar/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Search/
│   │   └── PostDetail/
│   ├── redux/
│   │   ├── store/
│   │   ├── slices/
│   │   └── actions/
│   ├── services/
│   │   └── redditAPI.js
│   ├── utils/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── tests/
│   ├── components/
│   └── e2e/
├── README.md
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reddit-client.git
   cd reddit-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (use with caution)

## Testing

### Unit Tests
```bash
npm test
```
Tests are written using Jest and Enzyme, covering:
- Component rendering
- User interactions
- Redux state management
- Utility functions

### End-to-End Tests
```bash
npm run test:e2e
```
E2E tests cover:
- User workflows
- Cross-browser compatibility
- Mobile responsiveness

## Design System

### Color Palette
- **Primary Background**: `#181311` (Dark brown/black)
- **Secondary Background**: `#3a2c27` (Medium brown)
- **Accent Background**: `#55413a` (Light brown)
- **Primary Text**: `#ffffff` (White)
- **Secondary Text**: `#bba39b` (Light brown/beige)

### Typography
- **Primary Font**: Spline Sans
- **Secondary Font**: Noto Sans
- **Headings**: Bold, tracking tight
- **Body**: Regular weight, normal leading

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Smooth hover transitions
- **Icons**: Consistent sizing and style
- **Loading States**: Skeleton screens and spinners

## Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## Performance

### Lighthouse Scores Target
- **Performance**: 90+ (excluding Reddit media assets)
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Optimization Techniques
- Code splitting and lazy loading
- Image optimization and lazy loading
- Efficient Redux state management
- Memoization of expensive computations

## Future Enhancements

### Phase 2 Features
- [ ] User authentication and personalized feeds
- [ ] Upvote/downvote functionality
- [ ] Comment posting and replies
- [ ] Dark/light theme toggle
- [ ] Offline reading capabilities
- [ ] Advanced search filters

### Phase 3 Features
- [ ] Real-time notifications
- [ ] User profiles and karma tracking
- [ ] Subreddit creation tools
- [ ] Advanced moderation features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Process

### Project Management
- **Tool**: GitHub Projects
- **Methodology**: Agile/Scrum approach
- **Sprint Duration**: 1-2 weeks

### Git Workflow
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature development branches
- `hotfix/*` - Critical bug fixes

## Known Issues

- [ ] Issue tracking will be maintained here
- [ ] Performance with large datasets needs optimization
- [ ] Mobile keyboard sometimes overlaps search input

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

##  Author

**Your Name**
- GitHub: [@dylanbshell](https://github.com/dylanbshell)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## Acknowledgments

- Reddit API for providing the data
- Create React App for the project boilerplate
- The React and Redux communities for excellent documentation
- Bootcamp instructors and fellow students for support and feedback

---

**Built with ❤️ as part of a web development bootcamp project**