import { mockFetchItems } from "./mockServer";

export async function fetchItems({ cursor }) {
  return mockFetchItems({ cursor });
}
