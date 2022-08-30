import { client } from "../utils/lib/client"

async function fetchCategories() {
  const query = '*[_type == "catalog"]{name}';
  const catalog = await client.fetch(query);
  const categories = catalog.map(value => value.name)
  return Promise.resolve(categories)
}

export default fetchCategories