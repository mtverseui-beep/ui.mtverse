import type { MetadataRoute } from "next";
import { generatedComponentRoutes } from "@/lib/generated-component-routes";
import { UI_SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return generatedComponentRoutes.map((component) => ({
    url: UI_SITE_URL + component.href,
    changeFrequency: "monthly" as const,
    priority: component.category === "Navbar" || component.category === "Hero" ? 0.8 : 0.7,
  }));
}