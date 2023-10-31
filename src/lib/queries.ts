import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { _CreateSite } from "./Validators";

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
