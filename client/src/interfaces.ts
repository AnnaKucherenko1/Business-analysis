export interface StateInterface {
  data: StateDataInterface;
}

export interface BalanceInterface {
  costsAmount: number;
  costsTax: number;
  month: string;
  salesAmount: number;
  salesTax: number;
}
export interface StateDataInterface {
  balance: BalanceInterface[];
  costsExpired: [];
  costsGrouped: {};
  costsTotal: number;
  costsTotalDocs: number;
  from: string;
  salesGrouped: {};
  salesTotal: number;
  salesTotalDocs: number;
  to: string;
}

export interface BalanceItem {
  costsAmount: number;
  costsAmountFormatted: string;
  costsTax: number;
  difference: number;
  differenceFormatted: string;
  month: string;
  salesAmount: number;
  salesAmountFormatted: string;
  salesTax: number;
}
