import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import type { DataType } from "./type";

dotenv.config();

const AUTH = process.env["NOTION_TOKEN"]!;
const DATABASEID = process.env["DATABASE_ID"]!;



export async function addPage(item: DataType) {
  try {
    const notion = new Client({
      auth: AUTH,
    });
    
    await notion.pages.create({
      parent: {
        database_id: DATABASEID
      },
      properties: {
        "名称": {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: item.name,
              },
            },
          ],
        },
        "收支": {
          type: "select",
          select: {
            name: item.incomeExpenses,
          },
        },
        "金额": {
          type: "number",
          number: item.amount,
        },
        "状态": {
          type: "select",
          select: {
            name: item.status,
          },
        },
        "时间": {
          type: "date",
          date: {
            start: new Date(item.date).toISOString(),
            time_zone: "Asia/Shanghai",
          },
        },
        "来源": {
          type: "select",
          select: {
            name: item.source,
          },
        },
        "类型": {
          type: "select",
          select: {
            name: item.transactionType,
          },
        },
        "对象": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: item.counterparty,
              },
            },
          ],
        },
        "备注": {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: item.bio,
              },
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log("❌", item);
    const err = error as { code: string; message: string };
    console.error(err.code, err.message);
    throw error;
  }
}
