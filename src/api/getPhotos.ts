import env from "../env";

const API_BASE = "https://api.pexels.com/v1";
const { PEXEL_API_KEY } = env;

export async function getPhotos(query?: string, page = 1, perPage = 23) {
  const endpoint = query ? '/search': '/curated';
  const url = `${API_BASE}${endpoint}?page=${page}&per_page=${perPage}${
    query ? `&query=${encodeURIComponent(query)}` : ""
  }`;

  const response = await fetch(url, {
    headers: {
      Authorization: 'XzQ7PLNEJM5NH8zla6X0EOenBDGD1eufR8rDwcMedp8sIo7R9FgbF1R6',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  return response.json();
}