
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Tool {
  name: string;
  description: string;
  logoUrl: string;
  link: string;
  tags: string[];
  slug: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const toolData: Tool = req.body;

    // Validate required fields
    const requiredFields = ['name', 'description', 'logoUrl', 'link', 'tags'];
    for (const field of requiredFields) {
      if (!toolData[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    // Generate slug if not provided
    if (!toolData.slug) {
      toolData.slug = toolData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Read current tools data
    const dataPath = path.join(process.cwd(), 'src/data/tools.json');
    let tools: Tool[] = [];
    
    try {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      tools = JSON.parse(fileContent);
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      tools = [];
    }

    // Check if tool with same slug already exists
    const existingToolIndex = tools.findIndex(tool => tool.slug === toolData.slug);
    
    if (existingToolIndex !== -1) {
      // Update existing tool
      tools[existingToolIndex] = toolData;
    } else {
      // Add new tool
      tools.push(toolData);
    }

    // Write updated data back to file
    fs.writeFileSync(dataPath, JSON.stringify(tools, null, 2));

    return res.status(200).json({ 
      success: true, 
      message: existingToolIndex !== -1 ? 'Tool updated' : 'Tool added',
      tool: toolData 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
