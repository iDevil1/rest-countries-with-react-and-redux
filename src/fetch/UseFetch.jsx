import { useEffect, useState } from "react";

function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [api, setApi] = useState(null);

  async function fetchApi(api) {
    try {
      setLoading(true);
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("Meal not found");
      }
      const data = await response.json();
      if (data.meals.length > 0) {
        setData(data);
        setError(null);
        setLoading(false);
      }
    } catch (e) {
      setData([]);
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (api) {
      fetchApi(api);
    }
  }, [api]);

  return [data, loading, error, setApi];
}
export default useFetch;
