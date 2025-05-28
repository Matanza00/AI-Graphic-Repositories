
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Tool {
  name: string;
  description: string;
  logoUrl: string;
  link: string;
  tags: string[];
  slug: string;
}

export const useWebhook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addTool = async (toolData: Omit<Tool, 'slug'>) => {
    setIsLoading(true);
    try {
      // Generate slug from name
      const slug = toolData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const tool: Tool = {
        ...toolData,
        slug
      };

      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tool),
      });

      if (!response.ok) {
        throw new Error('Failed to add tool');
      }

      toast({
        title: "Success",
        description: "Tool added successfully!",
      });

      return true;
    } catch (error) {
      console.error('Error adding tool:', error);
      toast({
        title: "Error",
        description: "Failed to add tool. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addTool,
    isLoading
  };
};
