import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages will be imported here as they are created
// import Home from './pages/Home/Home';
// import FilteredView from './pages/FilteredView/FilteredView';
// import SearchResults from './pages/SearchResults/SearchResults';
// import PostDetail from './pages/PostDetail/PostDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes will be added as pages are created */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/r/:subreddit" element={<FilteredView />} /> */}
        {/* <Route path="/search" element={<SearchResults />} /> */}
        {/* <Route path="/post/:postId" element={<PostDetail />} /> */}

        <Route path="/" element={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: '#ffffff',
            fontSize: '24px'
          }}>
            Reddit Client - Setup Complete
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
