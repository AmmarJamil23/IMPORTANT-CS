export async function fetchItems({ cursor }) {
    const url = new URL("/api/items", window.location.origin);

    if (cursor) {
        url.searchParams.set("cursor", cursor);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }

    const data = await response.json();

    return {
        items: data.items,
        nextCursor: data.nextCursor
    }
}