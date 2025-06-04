import React from 'react';

import { PageLayout } from '@ui/PageLayout';
import { Button } from '@models/page';

interface PageRendererProps {
  page: {
    title?: string | null;
    description?: string | null;
    media?: { url: string; mime?: string | null } | null;
    content?: string | null;
    buttons?: Button[] | null;
  };
}

const PageRenderer: React.FC<PageRendererProps> = ({ page }) => {
  return <PageLayout title={page.title} description={page.description} media={page.media} content={page.content} buttons={page.buttons} />;
};

export default PageRenderer;
