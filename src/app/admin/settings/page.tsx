'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save, Image as ImageIcon, Layout, Type, Gift, Command } from 'lucide-react';

interface SiteSetting {
  id: string;
  value: any;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*');
    if (error) {
      toast.error('Failed to load settings');
    } else {
      const settingsMap = data.reduce((acc: any, curr: SiteSetting) => {
        acc[curr.id] = curr.value;
        return acc;
      }, {});
      setSettings(settingsMap);
    }
    setLoading(false);
  };

  const handleUpdate = (id: string, key: string, val: any) => {
    setSettings(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: val
      }
    }));
  };

  const saveSetting = async (id: string) => {
    setSaving(id);
    const { error } = await supabase
      .from('site_settings')
      .update({ value: settings[id], updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      toast.error(`Failed to save ${id}`);
    } else {
      toast.success(`${id} updated successfully`);
    }
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C6A969]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-serif" style={{ fontFamily: 'Georgia, serif' }}>Site Settings</h1>
        <p className="text-muted-foreground mt-2">Manage dynamic content and images for the landing page.</p>
      </div>

      {/* Hero Banner Section */}
      <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C6A969]/10 text-[#C6A969]">
              <Layout className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>Hero Banner</CardTitle>
              <CardDescription>Main attention-grabber at the top of the homepage.</CardDescription>
            </div>
          </div>
          <Button 
            disabled={saving === 'hero_banner'} 
            onClick={() => saveSetting('hero_banner')}
            className="bg-[#C6A969] text-black hover:bg-[#d4b87a]"
          >
            {saving === 'hero_banner' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Type className="h-3 w-3" /> Heading</Label>
                <Input 
                  value={settings.hero_banner?.title || ''} 
                  onChange={(e) => handleUpdate('hero_banner', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Type className="h-3 w-3" /> Subheading</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.hero_banner?.subtitle || ''} 
                  onChange={(e) => handleUpdate('hero_banner', 'subtitle', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Background Image URL</Label>
                <Input 
                  placeholder="https://images.unsplash.com/..."
                  value={settings.hero_banner?.image || ''} 
                  onChange={(e) => handleUpdate('hero_banner', 'image', e.target.value)}
                />
              </div>
              <div className="aspect-video relative rounded-lg overflow-hidden border border-muted bg-muted/20">
                {settings.hero_banner?.image ? (
                  <img src={settings.hero_banner.image} alt="Hero Preview" className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-xs italic">Image preview will appear here</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collection Grid Section */}
      <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C6A969]/10 text-[#C6A969]">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>Collection Grid</CardTitle>
              <CardDescription>Featured collection images displayed below the hero section.</CardDescription>
            </div>
          </div>
          <Button 
            disabled={saving === 'collection_grid'} 
            onClick={() => saveSetting('collection_grid')}
            className="bg-[#C6A969] text-black hover:bg-[#d4b87a]"
          >
            {saving === 'collection_grid' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(settings.collection_grid?.images || []).map((url: string, index: number) => (
              <div key={index} className="space-y-3">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image {index + 1}</Label>
                <Input 
                  value={url} 
                  onChange={(e) => {
                    const newImages = [...settings.collection_grid.images];
                    newImages[index] = e.target.value;
                    handleUpdate('collection_grid', 'images', newImages);
                  }}
                />
                <div className="aspect-[4/5] relative rounded-lg overflow-hidden border border-muted bg-muted/20 mt-2">
                  <img src={url} alt={`Collection ${index + 1}`} className="object-cover w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discovery Set Section */}
      <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C6A969]/10 text-[#C6A969]">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>Discovery Set Section</CardTitle>
              <CardDescription>Promotional section for the discovery vial collection.</CardDescription>
            </div>
          </div>
          <Button 
            disabled={saving === 'discovery_set'} 
            onClick={() => saveSetting('discovery_set')}
            className="bg-[#C6A969] text-black hover:bg-[#d4b87a]"
          >
            {saving === 'discovery_set' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Type className="h-3 w-3" /> Heading</Label>
                <Input 
                  value={settings.discovery_set?.title || ''} 
                  onChange={(e) => handleUpdate('discovery_set', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Type className="h-3 w-3" /> Subheading</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.discovery_set?.subtitle || ''} 
                  onChange={(e) => handleUpdate('discovery_set', 'subtitle', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Section Image URL</Label>
                <Input 
                  value={settings.discovery_set?.image || ''} 
                  onChange={(e) => handleUpdate('discovery_set', 'image', e.target.value)}
                />
              </div>
              <div className="aspect-video relative rounded-lg overflow-hidden border border-muted bg-muted/20">
                <img src={settings.discovery_set?.image} alt="Discovery Preview" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Story Section */}
      <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#C6A969]/10 text-[#C6A969]">
              <Command className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-serif" style={{ fontFamily: 'Georgia, serif' }}>Brand Story Section</CardTitle>
              <CardDescription>Story and legacy section near the bottom of the page.</CardDescription>
            </div>
          </div>
          <Button 
            disabled={saving === 'brand_story'} 
            onClick={() => saveSetting('brand_story')}
            className="bg-[#C6A969] text-black hover:bg-[#d4b87a]"
          >
            {saving === 'brand_story' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Type className="h-3 w-3" /> Heading</Label>
                <Input 
                  value={settings.brand_story?.title || ''} 
                  onChange={(e) => handleUpdate('brand_story', 'title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Type className="h-3 w-3" /> Description</Label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.brand_story?.subtitle || ''} 
                  onChange={(e) => handleUpdate('brand_story', 'subtitle', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><ImageIcon className="h-3 w-3" /> Background Image URL</Label>
                <Input 
                  value={settings.brand_story?.image || ''} 
                  onChange={(e) => handleUpdate('brand_story', 'image', e.target.value)}
                />
              </div>
              <div className="aspect-video relative rounded-lg overflow-hidden border border-muted bg-muted/20">
                <img src={settings.brand_story?.image} alt="Story Preview" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="pt-10 border-t flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground italic">
          Tip: You can use Supabase Storage for your own images and paste the public URLs here.
        </p>
      </div>
    </div>
  );
}
