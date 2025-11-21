import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import FilteredView from './pages/FilteredView';

// Pages will be imported here as they are created
// import SearchResults from './pages/SearchResults/SearchResults';
// import PostDetail from './pages/PostDetail/PostDetail';

function App() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // TODO: Navigate to search results page
    // navigate(`/search?q=${query}`);
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

              {/* Future routes */}
              {/* <Route path="/search" element={<SearchResults />} /> */}
              {/* <Route path="/post/:postId" element={<PostDetail />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
