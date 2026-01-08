import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ExternalLink, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
    }
  }, [isOpen]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getEmbedUrl = () => {
    if (!classData?.punchpass_url) return null;
    const url = new URL(classData.punchpass_url);
    url.searchParams.set('embed', 'true');
    return url.toString();
  };

  const embedUrl = getEmbedUrl();

  const HeaderContent = () => (
    <div className="min-w-0">
      <div className="font-hero text-lg md:text-xl font-bold uppercase">
        {classData?.class_name || 'Book Class'}
      </div>
      {classData && (
        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-medium">{formatTime(classData.start_time)}</span>
          </div>
          {classData.instructor && (
            <>
              <span className="text-border">•</span>
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{classData.instructor}</span>
              </div>
            </>
          )}
          {classData.is_online && (
            <Badge variant="secondary" className="text-xs">ZOOM</Badge>
          )}
        </div>
      )}
    </div>
  );

  const IframeContent = () => (
    <div className="flex-1 relative overflow-hidden min-h-0">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
          <div className="text-center space-y-4 px-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
            <div className="space-y-3 mt-8">
              <Skeleton className="h-12 w-full max-w-[280px] mx-auto rounded-lg" />
              <Skeleton className="h-12 w-full max-w-[280px] mx-auto rounded-lg" />
              <Skeleton className="h-12 w-full max-w-[280px] mx-auto rounded-lg" />
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
  );

  const FooterContent = () => (
    <div className="p-4 border-t border-border shrink-0 bg-muted/30">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Having trouble loading?
        </p>
        {classData?.punchpass_url && (
          <Button asChild variant="outline" size="sm">
            <a 
              href={classData.punchpass_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              Open in Browser
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );

  // Mobile: Use Sheet sliding up from bottom
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent 
          side="bottom" 
          className="h-[100dvh] rounded-t-2xl p-0 flex flex-col"
        >
          {/* Swipe indicator */}
          <div className="flex justify-center py-3 shrink-0">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>
          
          <SheetHeader className="px-4 pb-3 border-b border-border shrink-0">
            <SheetTitle asChild>
              <HeaderContent />
            </SheetTitle>
          </SheetHeader>

          <IframeContent />
          <FooterContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Use Dialog
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[800px] h-[85vh] p-0 gap-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border shrink-0">
          <DialogTitle asChild>
            <HeaderContent />
          </DialogTitle>
        </DialogHeader>

        <IframeContent />
        <FooterContent />
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;
