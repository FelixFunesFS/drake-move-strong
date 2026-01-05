import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ExternalLink, X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: {
    class_name: string;
    start_time: string;
    instructor?: string | null;
    is_online?: boolean;
    punchpass_url?: string | null;
  } | null;
}

export function BookingModal({ isOpen, onClose, classData }: BookingModalProps) {
  const [loading, setLoading] = useState(true);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Build embed URL from punchpass_url
  const getEmbedUrl = () => {
    if (!classData?.punchpass_url) return null;
    const url = new URL(classData.punchpass_url);
    url.searchParams.set('embed', 'true');
    return url.toString();
  };

  const embedUrl = getEmbedUrl();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] md:max-w-[700px] h-[90vh] md:h-[80vh] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 md:p-6 pb-3 md:pb-4 border-b border-border shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogTitle className="font-hero text-lg md:text-xl font-bold uppercase truncate">
                {classData?.class_name || 'Book Class'}
              </DialogTitle>
              {classData && (
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{formatTime(classData.start_time)}</span>
                  </div>
                  {classData.instructor && (
                    <>
                      <span className="text-border">•</span>
                      <span>{classData.instructor}</span>
                    </>
                  )}
                  {classData.is_online && (
                    <Badge variant="secondary" className="text-xs">ZOOM</Badge>
                  )}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 -mr-2 -mt-2"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Iframe Container */}
        <div className="flex-1 relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center space-y-4">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-4 w-32 mx-auto" />
                <div className="space-y-2 mt-8">
                  <Skeleton className="h-12 w-64 mx-auto" />
                  <Skeleton className="h-12 w-64 mx-auto" />
                  <Skeleton className="h-12 w-64 mx-auto" />
                </div>
              </div>
            </div>
          )}
          
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`Book ${classData?.class_name || 'Class'}`}
              className="w-full h-full border-0"
              onLoad={() => setLoading(false)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Booking not available</p>
            </div>
          )}
        </div>

        {/* Footer with fallback link */}
        <div className="p-3 md:p-4 border-t border-border shrink-0 bg-muted/50">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Having trouble? Open in a new tab.
            </p>
            {classData?.punchpass_url && (
              <Button asChild variant="outline" size="sm">
                <a 
                  href={classData.punchpass_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  Open in New Tab
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;
