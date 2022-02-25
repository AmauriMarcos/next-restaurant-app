module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    mongodburl: process.env.MONGO_URL,
  },
};
