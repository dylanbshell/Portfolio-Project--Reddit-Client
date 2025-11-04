/**
 * Design Tokens - Reddit Client
 * Extracted from Figma: Portfolio Project- Reddit Client
 *
 * These tokens represent the design system values used throughout the application.
 * Use these tokens instead of hard-coded values to maintain consistency.
 */

const designTokens = {
  // ========================================
  // COLORS
  // ========================================
  colors: {
    // Background colors
    background: {
      primary: '#3b2b26',      // Main background for buttons, containers, search bar
      dark: '#171212',         // Dark background (search results cards)
      transparent: 'transparent'
    },

    // Text colors
    text: {
      primary: '#ffffff',      // Main text color (white)
      secondary: '#baa39c',    // Secondary text color (light brown/beige)
    },

    // Border colors
    border: {
      primary: '#54403b',      // Primary border (sorting bar bottom)
      accent: '#e5e8eb',       // Accent border (selected sorting button underline)
    },

    // Gradients (from Figma variables and annotations)
    gradients: {
      imageCard: 'linear-gradient(130deg, #171212 55.96%, #413333 116.73%)',     // Image Card Gradient (hover state)
      textCard: 'linear-gradient(154deg, #413333 -83.09%, #171212 57.07%)',      // Text Card Gradient (hover state)
      subtle: ''               // Subtle Gradient (search results hover - to be defined if different)
    },

    // Overlay colors
    overlay: {
      modal: 'rgba(0, 0, 0, 0.6)'  // Dark overlay for post detail modal
    }
  },

  // ========================================
  // TYPOGRAPHY
  // ========================================
  typography: {
    // Font families
    fontFamily: {
      splineSans: "'Spline Sans', sans-serif",
      inter: "'Inter', sans-serif"
    },

    // Font sizes
    fontSize: {
      xs: '13px',    // Extra small (vote/comment counts)
      sm: '14px',    // Small (subreddit names, post content, comments)
      base: '16px',  // Base (post titles, search placeholder, buttons)
      lg: '18px',    // Large (Reddit logo text)
      xl: '22px'     // Extra large (post detail view title)
    },

    // Font weights
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    },

    // Line heights
    lineHeight: {
      tight: '20px',   // Tight (post titles, counts)
      base: '21px',    // Base (subreddit names, post content, comments)
      relaxed: '23px', // Relaxed (Reddit logo)
      loose: '24px',   // Loose (search placeholder, post content)
      xl: '28px'       // Extra large (post detail view title)
    }
  },

  // ========================================
  // SPACING
  // ========================================
  spacing: {
    // Gap values (for flex/grid gaps)
    gap: {
      xs: '4px',     // Extra small gap
      sm: '8px',     // Small gap
      md: '12px',    // Medium gap (comment card)
      base: '16px',  // Base gap
      lg: '32px',    // Large gap
      xl: '36px',    // Extra large gap (comment votes)
      xxl: '77px'    // Extra extra large gap
    },

    // Padding values
    padding: {
      xs: '6px',     // Extra small padding
      sm: '8px',     // Small padding
      md: '12px',    // Medium padding
      sort: '13px',  // Sorting button padding (unselected state)
      base: '16px',  // Base padding
      lg: '19px',    // Large padding
      xl: '50px',    // Extra large padding
      xxl: '68px'    // Extra extra large padding (level 2 comment reply indent)
    }
  },

  // ========================================
  // BORDERS
  // ========================================
  borders: {
    width: {
      thin: '1px',   // Thin border (sorting bar bottom)
      thick: '3px'   // Thick border (selected sorting button underline)
    }
  },

  // ========================================
  // BORDER RADIUS
  // ========================================
  borderRadius: {
    sm: '8px',     // Small radius (buttons, containers, search bar, post cards, community icons)
    base: '15px',  // Base radius (search results card hover)
    lg: '20px',    // Large radius (user avatar icons, search result thumbnails)
    md: '21px',    // Medium radius (community container hover state)
    pill: '45px'   // Pill radius (post images, text post card hover)
  },

  // ========================================
  // EFFECTS
  // ========================================
  effects: {
    // Box shadows
    boxShadow: {
      soft: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'  // Soft shadow for sorting buttons
    },

    // Text shadows
    textShadow: {
      soft: '0px 4px 4px rgba(0, 0, 0, 0.25)'  // Soft shadow for text post card hover
    }
  },

  // ========================================
  // COMPONENT SPECIFIC TOKENS
  // ========================================
  components: {
    // Navigation bar
    navBar: {
      height: '65px',
      heightCompact: '48px',  // Compact height (search results page)
      padding: '12px 40px',
      backgroundColor: 'transparent'
    },

    // Search bar
    searchBar: {
      minWidth: '160px',
      maxWidth: '256px',
      height: '40px',
      heightLarge: '48px',    // Large height (search results page)
      backgroundColor: '#3b2b26',
      borderRadius: '8px'
    },

    // Sidebar
    sidebar: {
      width: '320px',
      padding: '20px 24px'
    },

    // Community container
    community: {
      height: '56px',
      iconSize: '40px',
      iconPadding: '8px',
      borderRadius: '8px',
      backgroundColor: '#3b2b26',
      hover: {
        borderRadius: '21px',
        backgroundColor: '#3b2b26'
      },
      selected: {
        borderRadius: '21px',
        backgroundColor: '#3b2b26'
      }
    },

    // Image post card
    imagePostCard: {
      height: '161px',
      borderRadius: '8px',
      imageWidth: '303px',
      imageBorderRadius: '45px',
      statsHeight: '32px',
      statsBorderRadius: '8px',
      statsBackgroundColor: '#3b2b26'
    },

    // Text post card
    textPostCard: {
      height: '228px',
      padding: '16px',
      borderRadius: '8px',
      hover: {
        borderRadius: '45px',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },

    // Main feed
    mainFeed: {
      width: '908px',
      spacerHeight: '56px'
    },

    // Post detail view
    postDetailView: {
      containerWidth: '960px',
      maxWidth: '960px',
      titleFontSize: '22px',
      titleLineHeight: '28px',
      contentFontSize: '16px',
      contentLineHeight: '24px',
      postContentHeight: '256px',
      overlay: {
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000
      },
      modal: {
        position: 'fixed',
        zIndex: 1000
      },
      commentsTitle: {
        height: '60px',
        fontSize: '22px',
        lineHeight: '28px'
      }
    },

    // Comment card
    commentCard: {
      padding: '16px',
      gap: '12px',
      userIconSize: '40px',
      userIconBorderRadius: '20px',
      voteIconSize: '20px',
      votesGap: '36px',
      level2Indent: '68px',  // Left padding for nested replies
      username: {
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 'bold'
      },
      content: {
        fontSize: '14px',
        lineHeight: '21px'
      },
      timestamp: {
        fontSize: '14px',
        lineHeight: '21px',
        color: '#baa39c'
      }
    },

    // Sorting bar (Filtered View)
    sortingBar: {
      height: '54px',
      containerHeight: '66px',
      gap: '32px',
      padding: '0 16px',
      borderBottom: '1px solid #54403b',
      button: {
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 'bold',
        padding: '16px 0',
        color: '#baa39c',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      selected: {
        color: '#ffffff',
        borderBottom: '3px solid #e5e8eb',
        boxShadow: 'none'
      }
    },

    // Sub-sorting bar (Search Results)
    subSortingBar: {
      height: '56px',
      padding: '12px',
      button: {
        height: '32px',
        padding: '0 16px',
        gap: '8px',
        backgroundColor: '#3b2b26',
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 'medium',
        color: '#ffffff'
      }
    },

    // Search results card (Search Results page)
    searchResultsCard: {
      height: '94px',
      padding: '12px 16px',
      gap: '16px',
      backgroundColor: '#171212',
      thumbnailSize: '70px',
      thumbnailBorderRadius: '20px',
      title: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 'medium',
        color: '#ffffff'
      },
      meta: {
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 'normal',
        color: '#baa39c'
      },
      hover: {
        borderRadius: '15px',
        backgroundColor: 'transparent'
      }
    }
  }
};

// Export for ES6 modules
export default designTokens;

// Export for CommonJS (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = designTokens;
}
