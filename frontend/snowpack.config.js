module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
    ['@snowpack/plugin-run-script', {
      'cmd': "eslint 'src/**/*.{js,jsx,ts,tsx}' --fix",
      'output': 'stream'
    }]
  ],
  devOptions: {
    port: 3000,
  },
  routes: [
    { match: "routes", src: ".*", dest: "/index.html" },
  ]
};
