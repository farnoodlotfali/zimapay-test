import { useMutation } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constant/api-url";
import type { ResponseType } from "@/types";
import { SubmitCryptoBuyRequest, SubmitCryptoBuyResponse } from "@/types/submit-crypto-buy";

export const useSubmitCryptoBuy = () => {
  return useMutation({
    mutationFn: (body: SubmitCryptoBuyRequest) => {
      return fetcher.post<ResponseType<SubmitCryptoBuyResponse>>(
        `${API_URL.services.cryptoBuy.submit}`,
        body,
        {
          showToast: true,
        }
      );
    },
  });
};
