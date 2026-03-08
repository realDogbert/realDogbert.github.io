/**
 * Type contracts for the Dark Mode Switch feature.
 * Feature: 001-dark-mode-switch
 */

/**
 * The two supported display modes for the site.
 */
export type ThemeMode = 'light' | 'dark';

/**
 * localStorage key used to persist theme preference.
 */
export const THEME_STORAGE_KEY = 'theme' as const;

/**
 * Props for the ThemeToggle component.
 * Currently no external props are required — the component is self-contained.
 */
export interface ThemeToggleProps {
  /** Optional CSS class for positioning within the layout. */
  className?: string;
}
