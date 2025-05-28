
import { Tool } from '../types/tool';

export const generateToolJsonLd = (tool: Tool) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.link,
    "image": tool.logoUrl,
    "keywords": tool.tags.join(", "),
    "applicationCategory": "Design Software",
    "operatingSystem": "Web Browser"
  };
};

export const generateBreadcrumbJsonLd = (tool?: Tool) => {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "/"
    }
  ];

  if (tool) {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": tool.name,
      "item": `/tools/${tool.slug}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  };
};

export const generateSiteJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AI Graphic Tools Directory",
    "description": "Discover the best AI-powered graphic design tools and resources",
    "url": "/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};
