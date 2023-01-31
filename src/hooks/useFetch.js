import { useState } from 'react';

export default function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData(url) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return [data, loading, error, fetchData];
}
