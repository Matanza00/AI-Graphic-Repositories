
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Tool } from '@/types/tool';

interface SearchFilterProps {
  tools: Tool[];
  onFilteredToolsChange: (filteredTools: Tool[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ tools, onFilteredToolsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from tools - with safety check
  const allTags = useMemo(() => {
    if (!tools || !Array.isArray(tools)) {
      return [];
    }
    
    const tagSet = new Set<string>();
    tools.forEach(tool => {
      if (tool && tool.tags && Array.isArray(tool.tags)) {
        tool.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [tools]);

  // Filter tools based on search term and selected tags - with safety check
  const filteredTools = useMemo(() => {
    if (!tools || !Array.isArray(tools)) {
      return [];
    }
    
    let filtered = tools;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(tool =>
        tool && (
          (tool.name && tool.name.toLowerCase().includes(searchLower)) ||
          (tool.description && tool.description.toLowerCase().includes(searchLower)) ||
          (tool.tags && tool.tags.some(tag => tag && tag.toLowerCase().includes(searchLower)))
        )
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(tool =>
        tool && tool.tags && selectedTags.every(selectedTag =>
          tool.tags.includes(selectedTag)
        )
      );
    }

    return filtered;
  }, [tools, searchTerm, selectedTags]);

  // Update parent component when filtered tools change
  React.useEffect(() => {
    onFilteredToolsChange(filteredTools);
  }, [filteredTools, onFilteredToolsChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const toolsCount = tools ? tools.length : 0;

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search AI tools by name, description, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-4 py-4 w-full text-lg glass-effect border-white/20 bg-white/5 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
        />
      </div>

      {/* Tag Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white/90">
            Filter by categories:
          </h3>
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 px-3 py-1 rounded-lg glass-effect border border-white/10 hover:border-blue-500/30 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 px-4 py-2 text-sm font-medium ${
                selectedTags.includes(tag)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent glow-blue hover:from-blue-500 hover:to-purple-500'
                  : 'glass-effect border-white/20 text-gray-300 hover:border-blue-500/50 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-400 text-sm flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <span>
          Showing <span className="text-blue-400 font-semibold">{filteredTools.length}</span> of <span className="text-white font-semibold">{toolsCount}</span> tools
          {searchTerm && (
            <span className="text-gray-300"> for "<span className="text-blue-400">{searchTerm}</span>"</span>
          )}
          {selectedTags.length > 0 && (
            <span className="text-gray-300"> with categories: <span className="text-purple-400">{selectedTags.join(', ')}</span></span>
          )}
        </span>
      </div>
    </div>
  );
};

export default SearchFilter;
