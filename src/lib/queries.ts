import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import {
  _ChangeSiteDescription,
  _ChangeSiteName,
  _ChangeSiteSubdomain,
  _CreatePost,
  _CreateSite,
  _DeleteSite,
} from "./Validators";

export const changeUser = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await axios.post("/api/changeUser/" + name);
      return data;
    },
  });
};

export const createSite = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof _CreateSite>) => {
      const { data } = await axios.post("/api/site/create", {
        name: values.name,
        description: values.description,
        subdomain: values.subdomain,
      });
      return data;
    },
  });
};

export const createPost = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof _CreatePost>) => {
      const { data } = await axios.post("/api/site/post/create", {
        siteId: values.siteId,
        userId: values.userId,
      });
      return data;
    },
  });
};

export const deleteSite = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof _DeleteSite>) => {
      const { data } = await axios.post("/api/site/delete", {
        siteId: values.siteId,
      });
      return data;
    },
  });
};

export const changeSiteName = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof _ChangeSiteName>) => {
      const { data } = await axios.post("/api/site/update/name", {
        name: values.name,
        siteId: values.siteId,
      });
      return data;
    },
  });
};

export const changeSiteDescription = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof _ChangeSiteDescription>) => {
      const { data } = await axios.post("/api/site/update/description", {
        description: values.description,
        siteId: values.siteId,
      });
      return data;
    },
  });
};

export const changeSiteSubdomain = () => {
  return useMutation({
    mutationFn: async (values: z.infer<typeof _ChangeSiteSubdomain>) => {
      const { data } = await axios.post("/api/site/update/subdomain", {
        subdomain: values.subdomain,
        siteId: values.siteId,
      });
      return data;
    },
  });
};
