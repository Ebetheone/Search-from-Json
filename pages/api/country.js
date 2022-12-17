import wines from "../../data/data.json";

export default async function handler(req, res) {
  const data = wines.filter(
    (wine, index) =>
      wine.country !== undefined &&
      wine.country !== null &&
      wines.find(
        (item, indexes) => item.country === wine.country && index > indexes
      ) === undefined
  );
  console.log(data + "data");
  res.status(200).json({ data });
}
