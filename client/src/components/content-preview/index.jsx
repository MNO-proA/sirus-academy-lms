/* eslint-disable react/prop-types */
;import { Card } from "@/components/ui/card";
import { ExternalLink, Youtube } from "lucide-react";

const ContentPreview = ({ type, url, width = 450, height = 200 }) => {
  if (!url) return null;

  const isYoutubeEmbed = (code) => {
    return code.includes("<iframe") && code.toLowerCase().includes("youtube");
  };

  const getYoutubeEmbedSrc = (embedCode) => {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const renderYoutubePreview = (embedCode) => {
    const videoSrc = getYoutubeEmbedSrc(embedCode);
    if (!videoSrc) return null;

    return (
      <div className="relative w-full overflow-hidden rounded-xl">
        <div className="max-w-full" style={{ 
          width: Math.min(width, window.innerWidth - 32), // 32px for padding
        }}>
          <iframe
            width={width}
            height={height}
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="max-w-full"
          />
        </div>
      </div>
    );
  };

  const renderUrlPreview = (url) => {
    return (
      <div className="max-w-full overflow-hidden rounded-xl">
        <Card className="p-4 flex items-center gap-3 bg-slate-50 max-w-2xl">
          <ExternalLink className="w-6 h-6 text-slate-600 flex-shrink-0" />
          <div className="flex-1 min-w-0"> {/* min-w-0 enables text truncation */}
            <h4 className="font-medium text-slate-900">External Resource</h4>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline block truncate"
            >
              {url}
            </a>
          </div>
        </Card>
      </div>
    );
  };

  const renderPreview = () => {
    switch (type) {
      case "youtube":
        if (isYoutubeEmbed(url)) {
          return renderYoutubePreview(url);
        }
        return (
          <div className="text-amber-600 flex items-center gap-2 text-sm">
            <Youtube className="w-4 h-4 flex-shrink-0" />
            Please enter a valid YouTube embed code
          </div>
        );
      case "url":
        return renderUrlPreview(url);
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 w-full overflow-hidden">
      {renderPreview()}
    </div>
  );
};

export default ContentPreview;