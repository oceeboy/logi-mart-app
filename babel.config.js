module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          blacklist: null, // older version of blocklist
          whitelist: null, // older version of allowlist
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
