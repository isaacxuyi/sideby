import type { MetadataRoute } from "next";

const BASE_URL = "https://www.sideby.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/how-it-works", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
