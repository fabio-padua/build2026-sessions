import type { Session } from '../types/session';
import { safeLinkUrl, safeImageUrl } from '../utils/sanitize';

interface SessionCardProps {
  session: Session;
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function SessionCard({ session }: SessionCardProps) {
  const thumbnail = safeImageUrl(session.onDemandThumbnail) || safeImageUrl(session.ogImage);
  const onDemandUrl = safeLinkUrl(session.onDemand);
  const levelLabel = session.sessionLevel?.[0]?.displayValue || '';
  const typeLabel = session.sessionType?.displayValue || '';
  const locationLabel = session.location?.displayValue || '';

  return (
    <article className="session-card">
      {thumbnail && (
        <div className="card-thumbnail">
          <img src={thumbnail} alt="" loading="lazy" referrerPolicy="no-referrer" />
          {session.hasOnDemand && <span className="badge badge-ondemand">On Demand</span>}
          {session.heroSession && <span className="badge badge-hero">Featured</span>}
        </div>
      )}
      <div className="card-content">
        <div className="card-meta">
          {typeLabel && <span className="type-badge">{typeLabel}</span>}
          {levelLabel && <span className="level-badge">{levelLabel}</span>}
          <span className="session-code">{session.sessionCode}</span>
        </div>

        <h3 className="card-title">{session.title}</h3>

        {session.speakerNames && (
          <p className="card-speakers">
            <svg viewBox="0 0 20 20" fill="currentColor" className="speaker-icon">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {session.speakerNames}
          </p>
        )}

        <p className="card-description">
          {session.description.length > 180
            ? session.description.slice(0, 180) + '…'
            : session.description}
        </p>

        <div className="card-footer">
          <div className="card-schedule">
            {session.startDateTime && (
              <>
                <span className="schedule-date">{formatDate(session.startDateTime)}</span>
                <span className="schedule-time">
                  {formatTime(session.startDateTime)} – {formatTime(session.endDateTime)}
                </span>
              </>
            )}
            {session.durationInMinutes > 0 && (
              <span className="schedule-duration">{session.durationInMinutes} min</span>
            )}
          </div>
          {locationLabel && <span className="card-location">{locationLabel}</span>}
        </div>

        <div className="card-tags">
          {session.tags?.map((t) => (
            <span key={t.logicalValue} className="tag-chip">
              {t.displayValue}
            </span>
          ))}
          {session.deliveryTypes?.map((d) => (
            <span key={d.logicalValue} className="delivery-chip">
              {d.displayValue}
            </span>
          ))}
        </div>

        {session.hasOnDemand && onDemandUrl && (
          <a
            href={onDemandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="watch-btn"
          >
            ▶ Watch On Demand
          </a>
        )}
      </div>
    </article>
  );
}
