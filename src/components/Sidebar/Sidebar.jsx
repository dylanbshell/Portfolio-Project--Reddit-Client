import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCommunities,
  selectCommunities,
  selectCommunitiesStatus,
  selectCommunitiesError
} from '../../features/communities/communitiesSlice';

// Default community icon - Hashtag symbol
const DefaultCommunityIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white"
    >
      <path d="M10 3L8 21M16 3L14 21M4 9H20M3 15H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

/**
 * CommunityItem Component
 * Displays a single community with icon and name
 */
function CommunityItem({ community }) {
  const communityName = community.display_name || community.name;
  const communityIcon = community.icon_img || community.community_icon;

  return (
    <Link
      to={`/r/${communityName}`}
      className="flex items-center gap-4 h-14 px-4 bg-bg-dark hover:bg-bg-primary hover:rounded-[21px] hover:w-[272px] transition-all duration-200 cursor-pointer group"
    >
      {/* Community Icon */}
      <div className="flex items-center justify-center w-10 h-10 bg-bg-primary rounded-lg shrink-0">
        {communityIcon ? (
          <img
            src={communityIcon}
            alt={`${communityName} icon`}
            className="w-6 h-6 rounded-lg object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div style={{ display: communityIcon ? 'none' : 'flex' }} className="w-full h-full items-center justify-center">
          <DefaultCommunityIcon />
        </div>
      </div>

      {/* Community Name */}
      <div className="flex-1 min-w-0">
        <p className="font-secondary text-base font-normal leading-6 text-white truncate overflow-hidden whitespace-nowrap">
          {communityName}
        </p>
      </div>
    </Link>
  );
}

/**
 * Sidebar Component
 * Displays a list of popular communities
 */
export default function Sidebar() {
  const dispatch = useDispatch();
  const communities = useSelector(selectCommunities);
  const status = useSelector(selectCommunitiesStatus);
  const error = useSelector(selectCommunitiesError);

  // Fetch communities on mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  return (
    <aside className="hidden lg:flex flex-col w-[320px] bg-bg-dark overflow-y-auto h-screen sticky top-0">
      {/* Sidebar Title */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <h2 className="font-secondary text-lg font-bold leading-[23px] text-white">
          Communities
        </h2>
      </div>

      {/* Communities List */}
      <div className="flex flex-col">
        {status === 'loading' && (
          <div className="px-4 py-4 text-text-secondary text-sm">
            Loading communities...
          </div>
        )}

        {status === 'failed' && (
          <div className="px-4 py-4">
            <p className="text-red-500 text-sm mb-2">{error}</p>
            <button
              onClick={() => dispatch(fetchCommunities())}
              className="text-text-secondary text-sm hover:text-white transition-colors underline"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'succeeded' && communities.length === 0 && (
          <div className="px-4 py-4 text-text-secondary text-sm">
            No communities found
          </div>
        )}

        {status === 'succeeded' && communities.map((community) => (
          <CommunityItem
            key={community.id || community.name}
            community={community}
          />
        ))}
      </div>
    </aside>
  );
}
