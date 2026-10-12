
import React, { Component, ErrorInfo, ReactNode } from 'react';
import Icon from './Icon';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Switched from a class property to a constructor for state initialization.
  // This can resolve tooling issues where `this.props` might not be correctly inferred.
  // Explicitly calling `super(props)` ensures the component is set up correctly.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRefresh = () => {
    // A full page reload is often the most reliable way to recover from an unknown error state.
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-800 m-4" role="alert">
          <Icon className="w-12 h-12 mx-auto text-red-400 mb-4">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </Icon>
          <h2 className="text-xl font-bold mb-2">Oops! Terjadi Kesalahan</h2>
          <p className="mb-4">
            Maaf, terjadi kesalahan pada bagian ini. Tim kami telah diberitahu.
          </p>
          <button
            onClick={this.handleRefresh}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
