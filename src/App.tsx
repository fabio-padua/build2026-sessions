import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { SessionCard } from './components/SessionCard';
import { LoadingState, ErrorState, EmptyState } from './components/States';
import { useSessions } from './hooks/useSessions';
import { useFilters } from './hooks/useFilters';

export default function App() {
  const { sessions, loading, error } = useSessions();
  const { filters, filterOptions, filteredSessions, updateFilter, resetFilters } =
    useFilters(sessions);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <>
            <FilterBar
              filters={filters}
              filterOptions={filterOptions}
              updateFilter={updateFilter}
              resetFilters={resetFilters}
              resultCount={filteredSessions.length}
              totalCount={sessions.length}
            />
            {filteredSessions.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="sessions-grid">
                {filteredSessions.map((session) => (
                  <SessionCard key={session.sessionId} session={session} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <footer className="app-footer">
        <p>Built for Microsoft Build 2026 • Data sourced from official event catalog</p>
      </footer>
    </div>
  );
}
