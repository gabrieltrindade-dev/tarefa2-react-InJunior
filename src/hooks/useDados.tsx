import { useState, useEffect } from "react";
import axios from "axios";

interface DadosState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useDados = <T,>(url: string): DadosState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Erro ao carregar dados");
          setLoading(false);
        });
    };
    
    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};