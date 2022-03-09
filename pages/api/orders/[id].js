import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import { TriangleUpIcon } from "@chakra-ui/icons";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
  }


  if (method === "PUT") {
    console.log(req.body);
    try{
      const order = await Order.findByIdAndUpdate(id, req.body, {new: true})
      res.status(200).json(order);
      
    }catch(err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {

  }
}
