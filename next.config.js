const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "productos.almacenconsciente.com",
      "www.modobarista.com",
      "www.dhresource.com",
      "http2.mlstatic.com",
      "bagleyslane.com",
      "acdn.mitiendanube.com",
      "llebarias.es",
      "mallorca-hogar.cl",
      "www.mallorca-hogar.cl",
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
