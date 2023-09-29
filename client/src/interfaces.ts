
export interface BalanceInterface {
  costsAmount: number;
  costsTax: number;
  month: Date;
  salesAmount: number;
  salesTax: number;
}
export interface State {
  balance: any[]
  costsExpired: []
  costsGrouped: {}
  costsTotal: number
  costsTotalDocs: number
  from: Date
  salesGrouped: {}
  salesTotal: number
  salesTotalDocs: number
  to: Date
}