import { z } from "zod";

export const _CreateSite = z.object({
  name: z.string().min(2).max(50),
  subdomain: z.string().min(2).max(13),
  description: z.string().min(0).max(200),
});
