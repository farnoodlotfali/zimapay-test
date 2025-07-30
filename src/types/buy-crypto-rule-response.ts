import { IRule } from "./schema/rule";

export type BuyCryptoRuleResponse = {
  is_active: boolean;
  rule: IRule;
};
