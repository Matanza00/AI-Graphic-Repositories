
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
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
        <div className="text-center py-20 glass-effect rounded-2xl">
          <h1 className="text-3xl font-bold text-white mb-6">
            Tool Not Found
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            The tool you're looking for doesn't exist in our hyper-realistic directory.
          </p>
          <Link to="/">
            <Button className="glow-blue">
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
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Navigation */}
        <Link to="/">
          <Button variant="ghost" className="mb-8 glass-effect glow-blue">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </Link>

        {/* Tool Header */}
        <div className="glass-effect rounded-3xl p-10 glow-purple card-3d">
          <div className="flex items-start gap-8">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0 glow-blue">
              <AspectRatio ratio={1}>
                <img
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">{tool.name}</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {tool.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="glass-effect text-blue-300 border-blue-500/30 px-4 py-2 text-sm glow-blue"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="holographic text-white font-semibold px-8 py-3 rounded-xl glow-blue text-lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Experience {tool.name}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="glass-effect rounded-3xl p-10 glow-blue card-3d">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-gradient">About {tool.name}</span>
          </h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              {tool.fullDescription}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass-effect rounded-3xl p-12 text-center glow-purple card-3d">
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-gradient">Ready to create with {tool.name}?</span>
          </h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of creators using cutting-edge AI technology to bring their visions to life in stunning 4K quality.
          </p>
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="holographic text-white font-bold px-10 py-4 rounded-xl glow-blue text-xl">
              <ExternalLink className="w-6 h-6 mr-3" />
              Launch {tool.name}
            </Button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default ToolDetail;
