import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies } = req;
  const id = req.query.productID
  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      const products = await Product.findById(id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

}