import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { fetcher } from "@/api/axios";
import { API_URL } from "@/constant/api-url";
import { QUERY_KEYS } from "@/constant/keys";
import { renderQueryKey } from "@/lib/render-query-key";
import { HookApiSimpleOptions, ResponseType } from "@/types";
import { BuyCryptoRuleResponse } from "@/types/buy-crypto-rule-response";

type Parameters = { options?: HookApiSimpleOptions; id: number | string };
type ReturnType = ResponseType<BuyCryptoRuleResponse>;

// queryOptions
export const buyCryptoRuleQueryOptions = ({ id, options }: Parameters) => {
  return queryOptions({
    queryKey: renderQueryKey([QUERY_KEYS.services.cryptoBuy, id]),
    queryFn: () =>
      fetcher.get<ReturnType>(`${API_URL.services.cryptoBuy.rules}/${id}`).then((res) => res),
    staleTime: 30 * 1000,
    ...options,
  });
};

// normal
export const useBuyCryptoRule = (props: Parameters) => {
  const rule = useQuery<ReturnType>(buyCryptoRuleQueryOptions(props));

  return rule;
};

// suspense
export const useSuspenseBuyCryptoRule = (props: Parameters) => {
  const rule = useSuspenseQuery<ReturnType>(buyCryptoRuleQueryOptions(props));

  return rule;
};
