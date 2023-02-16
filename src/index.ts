import csv from "csvtojson/v2";
import fs from "fs/promises";

import type { AliPayDataType, WePayDataType, DataType } from "./type";

const DATA_PATH = process.env.PWD + "/data";

async function getDirFiles(): Promise<Array<string>> {
  try {
    const fileNames = await fs.readdir(DATA_PATH);
    return fileNames.filter((name) => name.indexOf(".csv") >= 1);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function stringToFloat(str: string): number {
  if (/[¥]/.test(str)) {
    const result = parseFloat(str.replace(/^[¥]/, ""));
    return !!result ? result : 0;
  }
  return !!parseFloat(str) ? parseFloat(str) : 0;
}

function transformData(item: WePayDataType & AliPayDataType): DataType {
  const tradeId = item["交易单号"] || item["交易号"];
  const orderId = item["商家订单号"] || item["商户单号"];
  const counterparty = item["交易对方"];
  const transactionType = item["交易来源地"] || item["交易类型"];
  const name = item["商品名称"] || item["商品"];
  const incomeExpenses = item["收/支"];
  const amount = item["金额（元）"] || item["金额(元)"];
  const status = item["交易状态"] || item["当前状态"];
  const date = item["交易创建时间"] || item["交易时间"];
  const source = !!item["支付方式"] ? "微信" : "支付宝";
  const bio = item["备注"];
  return {
    tradeId,
    orderId,
    name,
    counterparty,
    incomeExpenses,
    amount: stringToFloat(amount),
    transactionType,
    status,
    date,
    bio,
    source,
  };
}

async function writeFile(data: string) {
  try {
    await fs.writeFile("./bills.json", data, { encoding: "utf-8" });
    console.log("OK");
  } catch (error) {
    console.log(error?.toString());
  }
}

async function main() {
  const bills: Array<DataType> = [];
  const fileNames = await getDirFiles();
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const filePath = DATA_PATH + "/" + fileName;
    const fileData = await csv().fromFile(filePath);
    fileData.map((item) => {
      const data = transformData(item);
      bills.push(data);
    });
  }
  const sortBills = bills.sort((a, b) => {
    const prev = +new Date(a.date)
    const next = +new Date(b.date)
    return prev - next;
  });

  console.log(sortBills);
}

main();
