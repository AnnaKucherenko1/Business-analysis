import { StateDataInterface } from "../interfaces";

export const initialState: StateDataInterface = {
  balance: [],
  costsExpired: [],
  costsGrouped: {},
  costsTotal: 0, 
  costsTotalDocs: 0,
  from: "2022-01-31T00:00:00+01:00", 
  salesGrouped: {},
  salesTotal: 0,
  salesTotalDocs: 0,
  to: "2023-04-30T23:59:59+02:00"
};