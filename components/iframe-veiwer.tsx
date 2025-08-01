// IframeViewer.tsx (or .jsx)
import React from 'react';

interface IframeViewerProps {
  url: string;
  width?: string;
  height?: string;
}

const IframeViewer: React.FC<IframeViewerProps> = ({
  url,
  width = '100%',
  height = '600px',
}) => {
  return (
    <iframe
      src={url}
      width={width}
      height={height}
      frameBorder="0"
      allowFullScreen
      style={{ border: 'none' }}
    />
  );
};

export default IframeViewer;
