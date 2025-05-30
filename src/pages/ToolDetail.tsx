
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { generateToolJsonLd, generateBreadcrumbJsonLd } from '@/utils/seo';
import toolsData from '@/data/tools.json';
import { Tool } from '@/types/tool';

const ToolDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = toolsData.find((t: Tool) => t.slug === slug);

  if (!tool) {
    return (
      <Layout title="Tool Not Found">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tool Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The tool you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const structuredData = {
    tool: generateToolJsonLd(tool),
    breadcrumb: generateBreadcrumbJsonLd(tool)
  };

  // Add structured data to page
  React.useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    const toolScript = document.createElement('script');
    toolScript.type = 'application/ld+json';
    toolScript.textContent = JSON.stringify(structuredData.tool);
    document.head.appendChild(toolScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(structuredData.breadcrumb);
    document.head.appendChild(breadcrumbScript);

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [tool]);

  return (
    <Layout
      title={`${tool.name} - AI Graphic Tools Directory`}
      description={tool.description}
      ogImage={tool.logoUrl}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Navigation */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </Link>

        {/* Tool Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
              <AspectRatio ratio={1}>
                <img
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {tool.name}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit {tool.name}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            About {tool.name}
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {tool.fullDescription}
            </p>
          </div>
        </div>

        {/* Tool Link Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to try {tool.name}?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Click the button below to visit the official website and get started.
          </p>
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <ExternalLink className="w-5 h-5 mr-2" />
              Get Started with {tool.name}
            </Button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default ToolDetail;
