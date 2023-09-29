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
  balance: any[]
  costsExpired: []
  costsGrouped: {}
  costsTotal: number
  costsTotalDocs: number
  from: string
  salesGrouped: {}
  salesTotal: number
  salesTotalDocs: number
  to: string
}
