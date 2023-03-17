import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
import { productsList } from "./types";

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {id} = req.query
    const { Client } = require("@notionhq/client")

    const data = await notion.databases.query({
        database_id: process.env.PRODUCTS_DATABASE_ID,
    })

    let product = findProduct(data.results, String(id))
    
    if (product != undefined) {
        product = productFormat(product)
        res.status(200).json(product)
    } else {
        res.status(404).send("")
    }
}

function findProduct(data:any, id:string) {
    return data.find((product:any) => product.properties.id.formula.string == id)
}

function productFormat(product:any) {
    return {
        id: product.properties.id.formula.string,
        name: product.properties.name.title[0].text.content,
        sale: product.properties.venda.number,
        resale: product.properties.revenda.number,
    }
}