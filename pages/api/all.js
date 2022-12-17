// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from "../../data/data.json";

export default async function handler(req, res) {
  res.status(200).json({ data });
}
