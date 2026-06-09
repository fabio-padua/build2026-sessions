import { useMemo, useState } from 'react';
import type { Session } from '../types/session';

export interface Filters {
  search: string;
  sessionType: string;
  level: string;
  tag: string;
  delivery: string;
  day: string;
}

const defaultFilters: Filters = {
  search: '',
  sessionType: '',
  level: '',
  tag: '',
  delivery: '',
  day: '',
};

export function useFilters(sessions: Session[]) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filterOptions = useMemo(() => {
    const types = new Set<string>();
    const levels = new Set<string>();
    const tags = new Set<string>();
    const deliveries = new Set<string>();
    const days = new Set<string>();

    sessions.forEach((s) => {
      if (s.sessionType?.displayValue) types.add(s.sessionType.displayValue);
      s.sessionLevel?.forEach((l) => {
        if (l.displayValue) levels.add(l.displayValue);
      });
      s.tags?.forEach((t) => {
        if (t.displayValue) tags.add(t.displayValue);
      });
      s.deliveryTypes?.forEach((d) => {
        if (d.displayValue) deliveries.add(d.displayValue);
      });
      if (s.startDateTime) {
        const day = new Date(s.startDateTime).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        });
        days.add(day);
      }
    });

    return {
      types: Array.from(types).sort(),
      levels: Array.from(levels).sort(),
      tags: Array.from(tags).sort(),
      deliveries: Array.from(deliveries).sort(),
      days: Array.from(days).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      ),
    };
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    const q = filters.search.toLowerCase();
    return sessions.filter((s) => {
      if (q && !s.title.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q) && !s.speakerNames.toLowerCase().includes(q) && !s.sessionCode.toLowerCase().includes(q)) {
        return false;
      }
      if (filters.sessionType && s.sessionType?.displayValue !== filters.sessionType) return false;
      if (filters.level && !s.sessionLevel?.some((l) => l.displayValue === filters.level)) return false;
      if (filters.tag && !s.tags?.some((t) => t.displayValue === filters.tag)) return false;
      if (filters.delivery && !s.deliveryTypes?.some((d) => d.displayValue === filters.delivery)) return false;
      if (filters.day) {
        const sessionDay = new Date(s.startDateTime).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        });
        if (sessionDay !== filters.day) return false;
      }
      return true;
    });
  }, [sessions, filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return { filters, filterOptions, filteredSessions, updateFilter, resetFilters };
}
