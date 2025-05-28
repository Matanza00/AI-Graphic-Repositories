
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';
import SearchFilter from '@/components/SearchFilter';
import { generateSiteJsonLd, generateBreadcrumbJsonLd } from '@/utils/seo';
import toolsData from '@/data/tools.json';
import { Tool } from '@/types/tool';

const Index: React.FC = () => {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(toolsData);

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
      <div className="space-y-8">
        {/* Search and Filter */}
        <SearchFilter
          tools={toolsData}
          onFilteredToolsChange={setFilteredTools}
        />

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                onClick={() => {
                  // Navigation would be handled by router in a real app
                  console.log(`Navigating to: /tools/${tool.slug}`);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33l-.147-.15M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
