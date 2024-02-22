/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: "/training-planner",
        destination: "/training-planner/hypertrophy",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
