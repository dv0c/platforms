import { z } from "zod";

export const _CreateSite = z.object({
  name: z.string().min(2).max(32),
  subdomain: z.string().min(2).max(13),
  description: z.string().min(0).max(200),
});

export const _CreatePost = z.object({
  siteId: z.string(),
  userId: z.string(),
});

export const _DeleteSite = z.object({
  siteId: z.string(),
});

export const _ChangeSiteName = z.object({
  name: z.string().min(2).max(32),
  siteId: z.string(),
});

export const _ChangeSiteDescription = z.object({
  description: z.string(),
  siteId: z.string(),
});

export const _ChangeSiteSubdomain = z.object({
  subdomain: z.string().min(2).max(50),
  siteId: z.string(),
});
