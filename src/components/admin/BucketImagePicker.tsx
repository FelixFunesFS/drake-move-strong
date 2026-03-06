import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

interface BucketImagePickerProps {
  bucket: string;
  selectedUrl: string;
  onSelect: (url: string) => void;
}

interface BucketFile {
  name: string;
  url: string;
}

export default function BucketImagePicker({ bucket, selectedUrl, onSelect }: BucketImagePickerProps) {
  const [files, setFiles] = useState<BucketFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from(bucket)
        .list('', { limit: 200, sortBy: { column: 'name', order: 'asc' } });

      if (!error && data) {
        const imageFiles = data
          .filter(f => !f.id?.startsWith('.') && /\.(jpg|jpeg|png|webp)$/i.test(f.name))
          .map(f => ({
            name: f.name,
            url: `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${f.name}`,
          }));
        setFiles(imageFiles);
      }
      setLoading(false);
    };
    fetchFiles();
  }, [bucket]);

  const filtered = search
    ? files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
    : files;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">Loading images…</span>
      </div>
    );
  }

  if (files.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">No images found in bucket.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter by filename…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-8 h-9 text-sm"
        />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
        {filtered.map(file => {
          const isSelected = selectedUrl === file.url;
          return (
            <button
              key={file.name}
              type="button"
              onClick={() => onSelect(file.url)}
              className={cn(
                'relative rounded border-2 overflow-hidden aspect-video transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring',
                isSelected ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
              )}
              title={file.name}
            >
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-0.5">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-muted-foreground py-2 text-center">No matches</p>
        )}
      </div>
    </div>
  );
}
