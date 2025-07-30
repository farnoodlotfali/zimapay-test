import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export interface ResponseType<T = []> {
  message: string;
  meta: { response_time: string };
  data: T;
}

export type HookApiSimpleOptions = Omit<
  UseQueryOptions<ResponseType<any>, Error, ResponseType<any>, QueryKey>,
  "queryKey" | "queryFn"
>;
