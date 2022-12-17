// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import wines from "../../data/data.json";

export default async function handler(req, res) {
  const { byRegion } = req.query;
  const data = wines.filter(
    (wine) => wine.region_1 == byRegion || wine.region_2 == byRegion
  );
  res.status(200).json({ data });
}
