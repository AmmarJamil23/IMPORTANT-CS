const TOTAL_ITEMS = 1000000;
const PAGE_SIZE = 30;

function generateItem(index) {
  return {
    id: index,
    title: `Item #${index}`,
    description: `This is a simulated record for index ${index}`
  };
}

export async function mockFetchItems({ cursor }) {
  await new Promise(resolve => setTimeout(resolve, 600));

  const startIndex = cursor ? Number(cursor) : 0;
  const endIndex = Math.min(startIndex + PAGE_SIZE, TOTAL_ITEMS);

  const items = [];

  for (let i = startIndex; i < endIndex; i++) {
    items.push(generateItem(i));
  }

  const nextCursor =
    endIndex < TOTAL_ITEMS ? String(endIndex) : null;

  return {
    items,
    nextCursor
  };
}
