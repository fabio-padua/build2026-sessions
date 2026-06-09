export function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-spinner" />
      <p>Loading Build 2026 sessions...</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="error-state">
      <svg viewBox="0 0 20 20" fill="currentColor" className="error-icon">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <p>Failed to load sessions: {message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 20 20" fill="currentColor" className="empty-icon">
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
      <p>No sessions match your filters</p>
      <p className="empty-hint">Try adjusting your search or clearing filters</p>
    </div>
  );
}
