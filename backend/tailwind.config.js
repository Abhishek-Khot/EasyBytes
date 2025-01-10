module.exports = {
    theme: {
      extend: {
        animation: {
          'border-neon': 'border-neon 2s infinite',
        },
        keyframes: {
          'border-neon': {
            '0%, 100%': { borderColor: '#ff7eb3' },
            '50%': { borderColor: '#f9d423' },
          },
        },
      },
    },
    plugins: [],
  };