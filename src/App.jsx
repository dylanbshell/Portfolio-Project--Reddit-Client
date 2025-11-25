import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import FilteredView from './pages/FilteredView';
import PostDetail from './pages/PostDetail';
import SearchResults from './pages/SearchResults';

function App() {
  const handleSearch = (query) => {
    // Navigation is handled by the Navigation component directly
    // This callback is kept for future use if needed
  };

  return (
    <Router>
      <div className="min-h-screen bg-bg-dark">
        {/* Navigation */}
        <Navigation onSearch={handleSearch} />

        {/* Main Layout with Sidebar */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-4">
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/r/:subreddit" element={<FilteredView />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
