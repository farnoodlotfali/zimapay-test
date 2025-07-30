export type SubmitCryptoBuyRequest = {
  rule_id: number;
  network_id: number;
  amount: number;
};

export type SubmitCryptoBuyResponse = {
  order_id: number;
  order_type: string;
  url: string;
  title: string;
  message: string;
};
