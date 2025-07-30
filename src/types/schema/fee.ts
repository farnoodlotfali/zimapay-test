export type FeeTypes = "amount" | "percent";

export interface IFee {
  id: number;
  fee_type: FeeTypes;
  fee_value: number;
  max_amount: number;
}
