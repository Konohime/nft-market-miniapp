async redirects() {
  return [
    {
      source: '/.well-known/farcaster.json',
      destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/0199108a-d959-19da-5e48-9b7a9927d062',
      permanent: false, // triggers a 307 redirect
    },
  ];
}
