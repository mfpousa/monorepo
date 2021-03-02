import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { UseFetchParams } from "./useFetch";

interface UsePaginatedFetchParams extends UseFetchParams {
  updateOn: Array<any>;
}

interface UsePaginatedFetchReturnType {
  entries: Array<any>;
  nextPage(): void;
  isLastPage: boolean;
  pages: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: any;
  response: Response;
  unauthorized: boolean;
  forceUpdate(): void;
}

export default function usePaginatedFetch(
  args: UsePaginatedFetchParams
): UsePaginatedFetchReturnType {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [entries, setEntries] = useState([]);
  const [updated, setUpdated] = useState(false);
  useEffect(() => setPage(0), args.updateOn);
  const {
    data,
    isLoading,
    error,
    response,
    unauthorized,
    forceUpdate,
  } = useFetch({
    ...args,
    search: {
      ...args.search,
      page: page,
    },
  });

  if (data && data.totalPages != null && data.totalPages !== pages) {
    setPages(data.totalPages);
  }
  useEffect(() => {
    if (!isLoading) {
      setUpdated(true);
      if (!error) {
        if (page === 0) {
          setEntries(data.content);
        } else {
          setEntries([...entries, ...(data.content || [])]);
        }
      }
    }
  }, [isLoading]);
  return {
    entries,
    nextPage: () => setPage(page + 1),
    isLastPage: page === pages,
    pages: pages,
    page: page,
    pageSize: data ? data.size : 0,
    isLoading: isLoading || !updated,
    error,
    response,
    unauthorized,
    forceUpdate,
  };
}
