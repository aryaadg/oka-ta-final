import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
 const baseUrl = "https://blustereast.com";

 return [
 {
 url: `${baseUrl}/id`,
 lastModified: new Date(),
 changeFrequency: "weekly",
 priority: 1,
 },
 {
 url: `${baseUrl}/en`,
 lastModified: new Date(),
 changeFrequency: "weekly",
 priority: 1,
 },
 {
 url: `${baseUrl}/id/about`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/id/gallery`,
 lastModified: new Date(),
 changeFrequency: "daily",
 priority: 0.9,
 },
 {
 url: `${baseUrl}/id/services`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/id/contact`,
 lastModified: new Date(),
 changeFrequency: "yearly",
 priority: 0.7,
 },
 // Adding english variants
 {
 url: `${baseUrl}/en/about`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/en/gallery`,
 lastModified: new Date(),
 changeFrequency: "daily",
 priority: 0.9,
 },
 {
 url: `${baseUrl}/en/services`,
 lastModified: new Date(),
 changeFrequency: "monthly",
 priority: 0.8,
 },
 {
 url: `${baseUrl}/en/contact`,
 lastModified: new Date(),
 changeFrequency: "yearly",
 priority: 0.7,
 },
 ];
}
