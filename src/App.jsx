import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Header from './features/Header/Header';
import Home from './features/Home/Home';
import Subreddits from './features/Subreddits/Subreddits';

function App() {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const subreddits = useSelector((state) => state.subreddits);

  const onToggleComments = (index) => {
    const getComments = (permalink) => {
      // TODO: Implement comment fetching
    };

    if (reddit.posts[index].showingComments) {
      // Hide comments
      // TODO: Implement hide comments action
    } else {
      // Show comments
      getComments(reddit.posts[index].permalink);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#181311]">
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Subreddits
            subreddits={subreddits.subreddits}
            isLoading={subreddits.isLoading}
            error={subreddits.error}
            selectedSubreddit={selectedSubreddit}
          />
          <Home
            posts={reddit.posts}
            isLoading={isLoading}
            error={error}
            onToggleComments={onToggleComments}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;