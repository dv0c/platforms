import { getSession } from "./auth";
import { db } from "./db";

export const withSiteAuth = async (siteId: string) => {
  const session = await getSession();
  if (!session) {
    return {
      error: "Not authenticated",
    };
  }
  const site = await db.site.findUnique({
    where: {
      id: siteId,
    },
  });
  if (!site || site.userId !== session.user.id) {
    return {
      error: "Not authorized",
    };
  }
  return site;
};
