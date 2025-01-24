import invoiceRouter from "./invoice/routes";

export const routes = [invoiceRouter] as const;

export type Route = (typeof routes)[number];
