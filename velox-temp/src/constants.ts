/**
 * Configuration constants for Velox Website Analyzer
 * Centralized values for timeouts, delays, and thresholds
 */

// API Configuration
export const API_CONFIG = {
  ANALYSIS_TIMEOUT: 5000, // 5 seconds timeout for API calls
  RETRY_DELAY: 1000, // 1 second delay between retries
  MAX_RETRIES: 3,
  SIMULATED_DELAY: 3500, // Simulated API delay for realistic UX
  SIMULATED_DELAY_VARIANCE: 1500, // Random variance in API delay
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  FADE_DURATION: 500,
  SLIDE_DURATION: 800,
  HOVER_SCALE: 1.05,
  TAP_SCALE: 0.95,
  STAGGER_DELAY: 0.1,
} as const;

// Thresholds for Metrics
export const METRIC_THRESHOLDS = {
  // RVS Score thresholds
  CRITICAL_THRESHOLD: 25,
  WEAK_THRESHOLD: 50,
  FUNCTIONAL_THRESHOLD: 75,
  
  // Performance thresholds
  PAGE_SPEED_CRITICAL: 50,
  IMAGE_OPTIMIZATION_CRITICAL: 60,
  MOBILE_RESPONSIVE_CRITICAL: 70,
  
  // SEO thresholds
  STRUCTURED_DATA_CRITICAL: 60,
  
  // Conversion thresholds
  TRUST_SIGNALS_CRITICAL: 60,
  CONVERSION_TRACKING_CRITICAL: 50,
  BACKLINK_PROFILE_CRITICAL: 50,
} as const;

// Traffic and Revenue Estimates
export const REVENUE_CONFIG = {
  CONVERSION_RATE: 0.03, // 3% average conversion rate
  MONTHLY_VALUE_PER_CONVERSION: 0.12, // $0.12 average value
  TRAFFIC_TIERS: [500, 1200, 3500, 8000, 15000, 35000, 75000, 150000],
  MONTHLY_TO_ANNUAL_MULTIPLIER: 12,
} as const;

// UI Configuration
export const UI_CONFIG = {
  MAX_RECOMMENDATIONS: 8,
  ITEMS_PER_PAGE: 10,
  MODAL_ANIMATION_DELAY: 0.2,
  TOAST_DURATION: 3000, // 3 seconds
  SCROLL_BEHAVIOR: 'smooth' as const,
} as const;

// Status Indicators
export const STATUS_CONFIG = {
  CRITICAL: 'critical',
  WEAK: 'weak',
  FUNCTIONAL: 'functional',
  OPTIMIZED: 'optimized',
} as const;

// Color Mapping
export const STATUS_COLORS = {
  [STATUS_CONFIG.CRITICAL]: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-400',
  },
  [STATUS_CONFIG.WEAK]: {
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/50',
    text: 'text-orange-400',
  },
  [STATUS_CONFIG.FUNCTIONAL]: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/50',
    text: 'text-blue-400',
  },
  [STATUS_CONFIG.OPTIMIZED]: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/50',
    text: 'text-emerald-400',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_URL: 'Please enter a valid website URL.',
  API_ERROR: 'An error occurred while analyzing your website. Please try again.',
  TIMEOUT: 'The analysis took too long. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  ANALYSIS_COMPLETE: 'Website analysis completed successfully!',
  EXPORT_SUCCESS: 'Report exported successfully!',
  SHARE_SUCCESS: 'Report link copied to clipboard!',
} as const;
