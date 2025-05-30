
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  showLoadMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  showLoadMore,
  hasMore,
  onLoadMore,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (showLoadMore) {
    return (
      <div className="flex flex-col items-center space-y-6">
        {hasMore && (
          <Button
            onClick={onLoadMore}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg glass-effect glow-blue transition-all duration-300"
          >
            Load More
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main Pagination */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={onPrevious}
          disabled={currentPage === 1}
          variant="outline"
          className="glass-effect border-white/20 hover:border-blue-500/50 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <div className="px-3 py-2 text-gray-400">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              ) : (
                <Button
                  onClick={() => onPageChange(page as number)}
                  variant={currentPage === page ? "default" : "outline"}
                  className={`w-10 h-10 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white glow-blue'
                      : 'glass-effect border-white/20 hover:border-blue-500/50 text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={currentPage === totalPages}
          variant="outline"
          className="glass-effect border-white/20 hover:border-blue-500/50 text-white hover:bg-white/10"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Load More Option */}
      <Button
        onClick={onLoadMore}
        variant="outline"
        className="px-6 py-2 glass-effect border-white/20 hover:border-purple-500/50 text-purple-300 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
      >
        Switch to Load More Mode
      </Button>
    </div>
  );
};

export default PaginationControls;
