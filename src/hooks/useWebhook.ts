
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tool } from '../types/tool';
import { webhookHandler } from '../pages/api/webhook';

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

      const success = await webhookHandler(tool);

      if (!success) {
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
