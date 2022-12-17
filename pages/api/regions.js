import wines from "../../data/data.json";

export default async function handler(req, res) {
  const data = wines.filter(
    (wine, index) =>
      wine.region_1 &&
      wine.region_2 &&
      wines.find(
        (item, indexes) =>
          item.region_1 === wine.region_1 &&
          item.region_2 === wine.region_2 &&
          indexes < index
      ) === undefined
  );
  res.status(200).json({ data });
}
