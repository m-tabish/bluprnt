'use client';;
import * as React from 'react';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SlidingNumber } from '@repo/sliding-number';

// Synchronously get cached stars (runs before first render)
function getCachedStars(username, repo) {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = `github-stars-${username}-${repo}`;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { stars, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

    if (!isExpired && typeof stars === 'number') {
      return stars;
    }
  } catch {
    // Invalid cache
  }
  return null;
}

function GitHubStarsButton({
  username,
  repo,
  className,
  ...props
}) {
  // Initialize with cached value synchronously to prevent flash
  const [stars, setStars] = React.useState(() =>
    getCachedStars(username, repo));

  const repoUrl = `https://github.com/${username}/${repo}`;

  React.useEffect(() => {
    const cacheKey = `github-stars-${username}-${repo}`;

    // If we already have stars from cache, still fetch in background to update
    const shouldFetch = stars === null || true; // Always fetch to keep fresh

    if (shouldFetch) {
      fetch(`https://api.github.com/repos/${username}/${repo}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.stargazers_count) {
            setStars(data.stargazers_count);
            localStorage.setItem(cacheKey, JSON.stringify({
              stars: data.stargazers_count,
              timestamp: Date.now(),
            }));
          }
        })
        .catch(() => {});
    }
  }, [username, repo, stars]);

  const buttonClassName = cn(
    "flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 h-10 has-[>svg]:px-3 cursor-pointer whitespace-nowrap font-medium transition-colors [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[18px] shrink-0 [&_svg]:shrink-0",
    className
  );

  // Fixed-width container for digits to prevent layout shift
  // Uses ch units to match SlidingNumber's w-[1ch] per digit
  const renderNumber = () => {
    if (stars === null) {
      // Placeholder with exact same width as 3-digit number (3ch)
      return (
        <span className="inline-flex items-center w-[3ch]">
          <span className="w-full h-[1em] bg-primary-foreground/20 rounded animate-pulse" />
        </span>
      );
    }

    const digits = stars.toString().split('');

    return (
      <span className="inline-flex items-center">
        {digits.map((digit, i) => (
          <SlidingNumber key={i} number={+digit} />
        ))}
      </span>
    );
  };

  return (
    <a
      href={repoUrl}
      rel="noopener noreferrer"
      target="_blank"
      className={buttonClassName}
      {...props}>
      <svg role="img" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      <span>GitHub Stars</span>
      <Star className="fill-yellow-500 text-yellow-500" size={18} aria-hidden="true" />
      {renderNumber()}
    </a>
  );
}

export { GitHubStarsButton };
