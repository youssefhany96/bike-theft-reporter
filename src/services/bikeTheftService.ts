const BASE_URL = "https://bikeindex.org:443/api/v3";

interface FetchBikesParams {
  page: number;
  perPage: number;
  query?: string;
}

// Function to fetch bike thefts
export const fetchBikeThefts = async ({
  page,
  perPage,
  query,
}: FetchBikesParams) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    location: "Munich",
    distance: "50",
    stolenness: "proximity",
  });

  if (query) queryParams.set("query", encodeURIComponent(query));

  try {
    const response = await fetch(
      `${BASE_URL}/search?${queryParams.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.bikes;
  } catch (error) {
    console.error("Error fetching bike thefts:", error);
    throw error;
  }
};

// Function to fetch total number of bike thefts
export const fetchBikeTheftsCount = async ({ query }: FetchBikesParams) => {
  const queryParams = new URLSearchParams({
    location: "Munich",
    distance: "50",
    stolenness: "proximity",
  });

  if (query) queryParams.set("query", encodeURIComponent(query));

  try {
    const response = await fetch(
      `${BASE_URL}/search/count?${queryParams.toString()}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.proximity;
  } catch (error) {
    console.error("Error fetching bike thefts count:", error);
    throw error;
  }
};
