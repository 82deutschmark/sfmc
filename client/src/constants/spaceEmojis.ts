// ARC-aligned space emoji palette
// -------------------------------------------------------------
// Every list is exactly length-10, enabling a direct mapping of
// emoji index → ARC colour digit (0-9).  This avoids null cells
// in our grids: colour-0 (black) is explicitly the first emoji.
// -------------------------------------------------------------
export const SPACE_EMOJIS = {
  // Status - Main Set (for basic sensor and status displays)
  status_main: ['⬛', '🟡', '🔴', '🟠', '🔵', '🟣', '⚪', '🟢', '🟤', '🚫'],

  // Celestial Bodies - Set 1 (Earth and celestial bodies)
  celestial_set1: ['⬛', '🌍', '🌎', '🌏', '⭐', '🌟', '✨', '💫', '🌠', '🪐'],

  // Celestial Bodies - Set 2 (Moon phases)
  celestial_set2: ['⬛', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '☀️', ],

  // Technology & Equipment - Set 1 (power and fuel)
  tech_set1: ['⬛', '⚡', '🔋', '🔌', '⛽', '☢️', '⚛️', '🔗', '⚙️', '🔧'],

  // Technology & Equipment - Set 2 (communication)
  tech_set2: ['⬛', '📡', '🛰️', '📞', '📱', '⌨️', '📶', '📋', '💻', '🎚️', '🎧'],

  // Navigation & Alerts (directional and compass)
  nav_alerts: ['⬛', '⬆️', '⬇️', '⬅️', '➡️', '↗️', '↖️', '↘️', '↙️', '🧭'],

  // Status & Alerts (warning and safety systems)
  status_alerts: ['⬛', '✅', '❌', '⚠️', '🚨', '🦺', '🔥', '❄️', '📍', '🎯'],

  // Weather & Climate (atmospheric conditions)
  weather_climate: ['⬛', '🌞', '🌝', '🌛', '🌜', '🌧️', '⛈️', '🌩️', '🌨️', '❄️']
} as const;

// Emoji set metadata for UI display
export const EMOJI_SET_INFO = {
  status_main: {
    name: 'Status Indicators',
    description: 'Basic sensor readings and system status',
    theme: 'Operational Status'
  },
  celestial_set1: {
    name: 'Planetary Bodies',
    description: 'Earth variants and lunar phases',
    theme: 'Celestial Navigation'
  },
  celestial_set2: {
    name: 'Stellar Objects',
    description: 'Stars, cosmic phenomena, and distant planets',
    theme: 'Deep Space'
  },
  tech_set1: {
    name: 'Power & Fuel Systems',
    description: 'Power & Fuel systems',
    theme: 'Power & Fuel'
  },
  tech_set2: {
    name: 'Communication Systems',
    description: 'Communication arrays and signal relays',
    theme: 'Communication'
  },
  nav_alerts: {
    name: 'Navigation Vectors',
    description: 'Directional indicators and compass systems',
    theme: 'Navigation'
  },
  status_alerts: {
    name: 'Alert Systems',
    description: 'Warnings, confirmations, and safety indicators',
    theme: 'Mission Safety'
  },
  weather_climate: {
    name: 'Atmospheric Data',
    description: 'Weather patterns and climate conditions',
    theme: 'Environmental'
  }
} as const;

export type EmojiSet = keyof typeof SPACE_EMOJIS;
export type SpaceEmoji = typeof SPACE_EMOJIS[EmojiSet][number];
