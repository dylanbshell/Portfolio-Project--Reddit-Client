import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchCommunities,
  selectCommunities,
  selectCommunitiesStatus,
  selectCommunitiesError
} from '../../features/communities/communitiesSlice';

// Default community icon SVG (fallback when community doesn't have an icon)
const DefaultCommunityIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-text-secondary"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
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
      className="flex items-center gap-base h-14 px-base bg-bg-dark hover:bg-bg-primary hover:rounded-md hover:w-[272px] transition-all duration-200 cursor-pointer group"
    >
      {/* Community Icon */}
      <div className="flex items-center justify-center w-10 h-10 bg-bg-primary rounded-sm shrink-0">
        {communityIcon ? (
          <img
            src={communityIcon}
            alt={`${communityName} icon`}
            className="w-6 h-6 rounded-sm object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div style={{ display: communityIcon ? 'none' : 'block' }}>
          <DefaultCommunityIcon />
        </div>
      </div>

      {/* Community Name */}
      <div className="flex-1 min-w-0">
        <p className="font-secondary text-base font-normal leading-loose text-text-primary truncate overflow-hidden whitespace-nowrap">
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
    <aside className="hidden lg:flex flex-col w-sidebar bg-bg-dark overflow-y-auto h-screen sticky top-0">
      {/* Sidebar Title */}
      <div className="px-base pt-base pb-sm shrink-0">
        <h2 className="font-secondary text-lg font-bold leading-relaxed text-text-primary">
          Communities
        </h2>
      </div>

      {/* Communities List */}
      <div className="flex flex-col">
        {status === 'loading' && (
          <div className="px-base py-base text-text-secondary text-sm">
            Loading communities...
          </div>
        )}

        {status === 'failed' && (
          <div className="px-base py-base">
            <p className="text-red-500 text-sm mb-sm">{error}</p>
            <button
              onClick={() => dispatch(fetchCommunities())}
              className="text-text-secondary text-sm hover:text-text-primary transition-colors underline"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'succeeded' && communities.length === 0 && (
          <div className="px-base py-base text-text-secondary text-sm">
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
