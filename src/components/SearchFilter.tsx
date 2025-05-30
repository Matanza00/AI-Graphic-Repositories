
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

  // Get all unique tags from tools
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    tools.forEach(tool => {
      tool.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [tools]);

  // Filter tools based on search term and selected tags
  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(tool =>
        selectedTags.every(selectedTag =>
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

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search tools by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {/* Tag Filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by tags:
            </h3>
            {(searchTerm || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredTools.length} of {tools.length} tools
          {searchTerm && (
            <span> for "{searchTerm}"</span>
          )}
          {selectedTags.length > 0 && (
            <span> with tags: {selectedTags.join(', ')}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
