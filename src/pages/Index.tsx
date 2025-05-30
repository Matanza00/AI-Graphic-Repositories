import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import SearchFilter from '@/components/SearchFilter';
import PaginationControls from '@/components/PaginationControls';
import { usePagination } from '@/hooks/usePagination';
import { generateSiteJsonLd, generateBreadcrumbJsonLd } from '@/utils/seo';
import toolsData from '../../data/tools.json';
import { Tool } from '@/types/tool';

const Index: React.FC = () => {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(toolsData);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    hasMore,
    showLoadMore,
    loadMore,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({
    items: filteredTools,
    itemsPerPage: 12,
  });

  const structuredData = {
    site: generateSiteJsonLd(),
    breadcrumb: generateBreadcrumbJsonLd()
  };

  // Add structured data to page
  React.useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    const siteScript = document.createElement('script');
    siteScript.type = 'application/ld+json';
    siteScript.textContent = JSON.stringify(structuredData.site);
    document.head.appendChild(siteScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(structuredData.breadcrumb);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <Layout
      title="AI Graphic Tools Directory - Discover the Best AI Design Tools"
      description="Explore the most comprehensive collection of AI-powered graphic design tools. Find the perfect AI tool for your creative projects."
    >
      <div className="space-y-12">
        {/* Search and Filter */}
        <div className="glass-effect rounded-2xl p-8 glow-blue">
          <SearchFilter
            tools={toolsData}
            onFilteredToolsChange={setFilteredTools}
          />
        </div>

        {/* Tools Grid - Responsive: 3 columns on large, 2 on iPad, 1 on mobile */}
        {paginatedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedItems.map((tool) => (
                <div key={tool.slug} className="card-3d">
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {filteredTools.length > 12 && (
              <div className="glass-effect rounded-2xl p-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onPrevious={prevPage}
                  onNext={nextPage}
                  showLoadMore={showLoadMore}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 glass-effect rounded-2xl">
            <div className="text-gray-500 mb-6">
              <svg className="mx-auto h-20 w-20 glow-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33l-.147-.15M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No tools found
            </h3>
            <p className="text-gray-400 text-lg">
              Try adjusting your search terms or filters to discover amazing AI tools.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
