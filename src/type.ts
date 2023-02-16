export type AliPayDataType = {
  "交易号": string;
  "商家订单号": string;
  "交易创建时间": string;
  "付款时间": string;
  "最近修改时间": string;
  "交易来源地": string;
  "类型": string;
  "交易对方": string;
  "商品名称": string;
  "金额（元）": string;
  "收/支": string;
  "交易状态": string;
  "服务费（元）": string;
  "成功退款（元）": string;
  "备注": string;
  "资金状态": string;
}

export type WePayDataType = {
  "交易时间": string;
  "交易类型": string;
  "交易对方": string;
  "商品": string;
  "收/支": string;
  "金额(元)": string;
  "支付方式": string;
  "当前状态": string;
  "交易单号": string;
  "商户单号": string;
  "备注": string;
}


export type DataType = {
  tradeId: string;
  orderId: string;
  name: string;
  counterparty: string;
  incomeExpenses: string;
  amount: number;
  transactionType: string;
  status: string;
  date: string | Date;
  bio: string;
  source: string;
}