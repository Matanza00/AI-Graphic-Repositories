
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tool } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link to={`/tools/${tool.slug}`} className="block h-full">
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                <AspectRatio ratio={1}>
                  <img
                    src={tool.logoUrl}
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </CardTitle>
              </div>
            </div>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {tool.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;
