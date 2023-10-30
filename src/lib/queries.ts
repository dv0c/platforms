import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const changeUser = () => {
  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await axios.post("/api/changeUser/" + name);
      return data;
    },
  });
};
