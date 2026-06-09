import type { Filters } from '../hooks/useFilters';

interface FilterBarProps {
  filters: Filters;
  filterOptions: {
    types: string[];
    levels: string[];
    tags: string[];
    deliveries: string[];
    days: string[];
  };
  updateFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  resultCount: number;
  totalCount: number;
}

export function FilterBar({
  filters,
  filterOptions,
  updateFilter,
  resetFilters,
  resultCount,
  totalCount,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="filter-bar">
      <div className="filter-bar-top">
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search sessions, speakers, codes..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
          {filters.search && (
            <button className="clear-search" onClick={() => updateFilter('search', '')}>
              ✕
            </button>
          )}
        </div>
        <div className="result-count">
          <span className="count-number">{resultCount}</span> of {totalCount} sessions
        </div>
      </div>

      <div className="filter-selects">
        <select
          value={filters.day}
          onChange={(e) => updateFilter('day', e.target.value)}
          className="filter-select"
        >
          <option value="">All Days</option>
          {filterOptions.days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={filters.sessionType}
          onChange={(e) => updateFilter('sessionType', e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          {filterOptions.types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={filters.level}
          onChange={(e) => updateFilter('level', e.target.value)}
          className="filter-select"
        >
          <option value="">All Levels</option>
          {filterOptions.levels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <select
          value={filters.tag}
          onChange={(e) => updateFilter('tag', e.target.value)}
          className="filter-select"
        >
          <option value="">All Topics</option>
          {filterOptions.tags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={filters.delivery}
          onChange={(e) => updateFilter('delivery', e.target.value)}
          className="filter-select"
        >
          <option value="">All Formats</option>
          {filterOptions.deliveries.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button className="reset-btn" onClick={resetFilters}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
