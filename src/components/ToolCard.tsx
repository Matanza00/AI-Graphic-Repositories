
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tool } from '@/types/tool';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link to={`/tools/${tool.slug}`} className="block h-full">
      <Card className="group glass-effect border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer h-full glow-blue hover:glow-purple bg-transparent backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex-shrink-0 glass-effect border border-white/10">
                <AspectRatio ratio={1}>
                  <img
                    src={tool.logoUrl}
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                  {tool.name}
                </CardTitle>
              </div>
            </div>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg glass-effect border border-white/10 hover:border-blue-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {tool.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs glass-effect border-white/20 text-blue-300 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-200 rounded-full"
              >
                <Sparkles className="w-3 h-3 mr-1" />
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
