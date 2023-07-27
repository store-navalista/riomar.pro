const withEnvVars = {
   env: {}
}

for (const key in process.env) {
   if (key.startsWith('NEXT_PUBLIC_')) {
      withEnvVars.env[key] = process.env[key]
   }
}

module.exports = {
   webpack: (config, { defaultLoaders }) => {
      config.module.rules.push({
         test: /\.md$/,
         use: 'raw-loader'
      })

      return config
   },
   ...withEnvVars
}
