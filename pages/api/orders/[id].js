import dbConnect from '../../../util/mongo';
import Order from '../../../models/Order';

export default async function handler(req, res) {
    const { method, query: {id} } = req;
  
    if(method === 'GET'){}
    if(method === 'PUT'){}
    if(method === 'DELETE'){}
  }