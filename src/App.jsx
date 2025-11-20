import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

// Pages will be imported here as they are created
// import Home from './pages/Home/Home';
// import FilteredView from './pages/FilteredView/FilteredView';
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
              {/* Routes will be added as pages are created */}
              {/* <Route path="/" element={<Home />} /> */}
              {/* <Route path="/home" element={<Home />} /> */}
              {/* <Route path="/r/:subreddit" element={<FilteredView />} /> */}
              {/* <Route path="/search" element={<SearchResults />} /> */}
              {/* <Route path="/post/:postId" element={<PostDetail />} /> */}

              <Route path="/" element={
                <div className="flex justify-center items-center h-screen">
                  <div className="text-center">
                    <h1 className="text-white text-xl font-bold mb-4">
                      Reddit Client
                    </h1>
                    <p className="text-text-secondary text-base">
                      Navigation and Sidebar components are now visible!
                    </p>
                    <p className="text-text-secondary text-sm mt-2">
                      Try searching or clicking on a community in the sidebar.
                    </p>
                  </div>
                </div>
              } />

              {/* Placeholder route for community pages */}
              <Route path="/r/:subreddit" element={
                <div className="flex justify-center items-center h-screen">
                  <div className="text-center">
                    <h1 className="text-white text-xl font-bold mb-4">
                      Community View
                    </h1>
                    <p className="text-text-secondary text-base">
                      This page will show posts from the selected community.
                    </p>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
