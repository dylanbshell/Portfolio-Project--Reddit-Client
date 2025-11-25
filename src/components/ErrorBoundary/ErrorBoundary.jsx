import { Component } from 'react';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Displays a fallback UI when errors occur
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    // Reset error state and try to recover
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    // Reload the entire page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
          <div className="bg-bg-primary rounded-[36px] p-8 max-w-2xl w-full">
            <div className="text-center">
              {/* Error Icon */}
              <div className="mb-6">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-500 mx-auto"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              {/* Error Message */}
              <h1 className="font-primary text-2xl font-bold leading-[28px] text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="font-primary text-base font-normal leading-6 text-text-secondary mb-6">
                We encountered an unexpected error. This has been logged for our team to review.
              </p>

              {/* Error Details (Development only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-bg-dark rounded-lg p-4 mb-6 text-left">
                  <p className="font-mono text-sm text-red-400 mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-text-secondary cursor-pointer hover:text-white">
                        Stack trace
                      </summary>
                      <pre className="font-mono text-xs text-text-secondary mt-2 overflow-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="bg-bg-dark text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity font-primary text-base font-medium"
                >
                  Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="bg-bg-dark text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity font-primary text-base font-medium"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="bg-bg-dark text-white px-6 py-3 rounded-lg hover:opacity-80 transition-opacity font-primary text-base font-medium"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
