
import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

export const usePagination = <T,>({ items, itemsPerPage }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    if (showLoadMore) {
      // Show all items up to current page when load more is active
      return items.slice(0, currentPage * itemsPerPage);
    }
    // Show only current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage, showLoadMore]);

  const hasMore = currentPage * itemsPerPage < items.length;

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
      setShowLoadMore(true);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setShowLoadMore(false);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    hasMore,
    showLoadMore,
    loadMore,
    goToPage,
    nextPage,
    prevPage,
  };
};
