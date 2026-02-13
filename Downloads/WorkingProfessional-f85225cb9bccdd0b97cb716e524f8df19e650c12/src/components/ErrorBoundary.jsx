import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        // Auto-reload on chunk load errors
        const chunkErrorStrings = [
            "Failed to fetch dynamically imported module",
            "error loading dynamically imported module",
            "ChunkLoadError"
        ];

        if (chunkErrorStrings.some(str => error?.message?.includes(str) || error?.toString()?.includes(str))) {
            console.warn("Chunk load error detected in ErrorBoundary, reloading in 1s...");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f8fafc',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'Inter, system-ui, sans-serif'
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '3rem',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        maxWidth: '500px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{
                            background: '#fee2e2',
                            color: '#ef4444',
                            width: '64px',
                            height: '64px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem'
                        }}>
                            <AlertTriangle size={32} />
                        </div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1rem' }}>
                            Something went wrong
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            An unexpected error occurred. We've been notified and are looking into it.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '12px',
                                    background: '#1a1a1a',
                                    color: '#fff',
                                    border: 'none',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <RefreshCw size={18} /> Reload Page
                            </button>
                            <a
                                href="/"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '12px',
                                    background: '#fff',
                                    color: '#1a1a1a',
                                    border: '1px solid #e2e8f0',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <Home size={18} /> Back Home
                            </a>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <pre style={{
                                marginTop: '2rem',
                                padding: '1rem',
                                background: '#f1f5f9',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                textAlign: 'left',
                                overflowX: 'auto',
                                color: '#ef4444'
                            }}>
                                {this.state.error?.toString()}
                            </pre>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
