/**
 * Models for AI Crawler API
 */

export const ResearchRequest = (topic) => ({
  topic,
});

export const ResearchResponse = {
  topic: '',
  summary: '',
};

export const SearchRequest = (query) => ({
  query,
});

export const SearchResponse = {
  // Define expected search response structure based on SearchResult in C# if available
  results: [],
};

export const ScrapeRequest = (url) => ({
  url,
});

export const ScrapeResponse = {
  // Define expected scrape response structure based on ScrapeResult in C# if available
  content: '',
  metadata: {},
};
