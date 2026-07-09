module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npx serve out -l 3000',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/services/retaining-walls',
        'http://localhost:3000/gallery',
        'http://localhost:3000/contact',
        'http://localhost:3000/about',
        'http://localhost:3000/blog',
        'http://localhost:3000/retaining-wall-in-cedar-falls',
        'http://localhost:3000/paver-patio-installation',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'max-potential-fid': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.02 }],
        'total-byte-weight': ['error', { maxNumericValue: 300 * 1024 }],
        'unused-javascript': ['warn', { maxNumericValue: 0 }],
        'uses-responsive-images': ['error'],
        'uses-optimized-images': ['error'],
        'offscreen-images': ['error'],
        'render-blocking-resources': ['warn'],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
