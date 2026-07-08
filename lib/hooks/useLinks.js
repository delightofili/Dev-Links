"use client";
import { useState, useEffect } from "react";
import { get } from "../api.js";

export function useLinks({ category, page = 1, limit = 10 } = {}) {
  const [links, setLinks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, [category, page]);

  async function fetchLinks() {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      // URLSearchParams builds query strings
      // ?category=tools&page=1&limit=10

      if (category) params.append("category", category);
      params.append("page", page);
      params.append("limit", limit);

      const data = await get(`/api/links?${params.toString()}`);

      setLinks(data.data.data);
      // data.data.data because:
      // first .data — our { success, data } wrapper
      // second .data — the { data: links[], pagination } object

      setPagination(data.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { links, pagination, loading, error, refetch: fetchLinks };
}
