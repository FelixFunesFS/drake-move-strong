import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Check } from "lucide-react";

// Import all site images
import classGroup from "@/assets/class-group.jpg";
import classesGallery1 from "@/assets/classes-gallery-1.jpg";
import classesGallery2 from "@/assets/classes-gallery-2.jpg";
import classesGallery3 from "@/assets/classes-gallery-3.jpg";
import classesGallery4 from "@/assets/classes-gallery-4.jpg";
import classesGallery5 from "@/assets/classes-gallery-5.jpg";
import classesGallery6 from "@/assets/classes-gallery-6.jpg";
import classesGallery7 from "@/assets/classes-gallery-7.jpg";
import classesGallery8 from "@/assets/classes-gallery-8.jpg";
import classesGallery9 from "@/assets/classes-gallery-9.jpg";
import classesGallery10 from "@/assets/classes-gallery-10.jpg";
import classesHeroMace from "@/assets/classes-hero-outdoor-mace.jpg";
import coachNickNew from "@/assets/coach-nick-new.jpg";
import coachNickPortrait from "@/assets/coach-nick-portrait.jpg";
import coachNick from "@/assets/coach-nick.jpg";
import coachingSession from "@/assets/coaching-session.jpg";
import communityGym from "@/assets/community-plank-rows-kettlebells.jpg";
import davidCoachingForm from "@/assets/david-coaching-form.jpg";
import davidDoubleKb from "@/assets/david-double-kb-storefront.jpg";
import davidGobletSquat from "@/assets/david-goblet-squat-kb-rack.jpg";
import davidMaceTraining from "@/assets/david-mace-training.jpg";
import davidOutdoorDumbbell from "@/assets/david-outdoor-dumbbell.jpg";
import davidOutside from "@/assets/david-outside.jpg";
import davidPlankRow from "@/assets/david-plank-row-outdoor.jpg";
import davidRenegadeRow from "@/assets/david-renegade-row-outdoor.jpg";
import groupKettlebell from "@/assets/group-kettlebell-training.jpg";
import groupTraining from "@/assets/group-training.jpg";
import gymAtmosphere from "@/assets/gym-atmosphere-1.jpg";
import gymInterior from "@/assets/gym-interior.jpg";
import heroBarbellDeadlift from "@/assets/hero-barbell-deadlift.jpg";
import heroBarbellTraining from "@/assets/hero-barbell-training.jpg";
import heroCoachingSession from "@/assets/hero-coaching-session.jpg";
import heroKettlebellFloor from "@/assets/hero-kettlebell-floor.jpg";
import heroKettlebellTraining from "@/assets/hero-kettlebell-training.jpg";
import heroMain from "@/assets/hero-main.jpg";
import heroTrainingSession from "@/assets/hero-training-session.png";
import kbStrong from "@/assets/kb-strong.jpg";
import kettlebellArtistic from "@/assets/kettlebell-artistic-floor.jpg";
import kettlebellCollection from "@/assets/kettlebell-collection.jpg";
import kettlebellFormCheck from "@/assets/kettlebell-form-check.jpg";
import kettlebellTraining from "@/assets/kettlebell-training.jpg";
import memberYogaPose from "@/assets/member-yoga-pose.jpg";
import mobilityClass from "@/assets/mobility-class.jpg";
import nickHolisticCoaching from "@/assets/nick-holistic-coaching.jpg";
import nickSandbagLunge from "@/assets/nick-sandbag-lunge.jpg";
import oneOnOneCoaching from "@/assets/one-on-one-coaching.jpg";
import oneOnOne from "@/assets/one-on-one.jpg";
import outdoorKettlebell from "@/assets/outdoor-kettlebell.jpg";
import outdoorSandbag from "@/assets/outdoor-sandbag-training.jpg";
import outdoorTraining from "@/assets/outdoor-training.jpg";
import pricingHeroKettlebell from "@/assets/pricing-hero-kettlebell.jpg";
import pricingKettlebellRack from "@/assets/pricing-kettlebell-rack.jpg";
import scheduleCommunityGroup from "@/assets/schedule-community-group.jpg";
import studioBarbellPlatform from "@/assets/studio-barbell-platform.jpg";
import studioDavidDogArt from "@/assets/studio-david-dog-art.jpg";
import studioDavidDog from "@/assets/studio-david-dog.jpg";
import studioDavidStorefront from "@/assets/studio-david-storefront.jpg";
import studioDualTraining from "@/assets/studio-dual-training.jpg";
import studioFloorExercise from "@/assets/studio-floor-exercise.jpg";
import studioFullView from "@/assets/studio-full-view.jpg";
import studioGroupOverhead from "@/assets/studio-group-overhead.jpg";
import studioGroupSquats from "@/assets/studio-group-squats.jpg";
import studioKbCloseup from "@/assets/studio-kb-closeup.jpg";
import studioKettlebellClass from "@/assets/studio-kettlebell-class.jpg";
import studioKettlebells from "@/assets/studio-kettlebells.jpg";
import studioLargeGroup from "@/assets/studio-large-group.jpg";
import studioMobilityTraining from "@/assets/studio-mobility-training.jpg";
import studioNickDavidTogether from "@/assets/studio-nick-david-together.jpg";
import studioOutdoorBanner from "@/assets/studio-outdoor-banner.jpg";
import studioTeamPhoto from "@/assets/studio-team-photo.jpg";
import studioTeamThree from "@/assets/studio-team-three.jpg";
import studioTrainingWithDog from "@/assets/studio-training-with-dog.jpg";

interface ImageItem {
  src: string;
  name: string;
  category: string;
}

const IMAGES: ImageItem[] = [
  // Coaches - David
  { src: davidCoachingForm, name: "David Coaching Form", category: "coaches" },
  { src: davidDoubleKb, name: "David Double KB", category: "coaches" },
  { src: davidGobletSquat, name: "David Goblet Squat", category: "coaches" },
  { src: davidMaceTraining, name: "David Mace Training", category: "coaches" },
  { src: davidOutdoorDumbbell, name: "David Outdoor Dumbbell", category: "coaches" },
  { src: davidOutside, name: "David Outside", category: "coaches" },
  { src: davidPlankRow, name: "David Plank Row", category: "coaches" },
  { src: davidRenegadeRow, name: "David Renegade Row", category: "coaches" },
  // Coaches - Nick
  { src: coachNickNew, name: "Coach Nick New", category: "coaches" },
  { src: coachNickPortrait, name: "Coach Nick Portrait", category: "coaches" },
  { src: coachNick, name: "Coach Nick", category: "coaches" },
  { src: nickHolisticCoaching, name: "Nick Holistic Coaching", category: "coaches" },
  { src: nickSandbagLunge, name: "Nick Sandbag Lunge", category: "coaches" },
  // Team
  { src: studioNickDavidTogether, name: "Nick & David Together", category: "coaches" },
  { src: studioTeamPhoto, name: "Team Photo", category: "coaches" },
  { src: studioTeamThree, name: "Team Three", category: "coaches" },
  
  // Training Action
  { src: heroMain, name: "Hero Main", category: "training" },
  { src: heroBarbellDeadlift, name: "Barbell Deadlift", category: "training" },
  { src: heroBarbellTraining, name: "Barbell Training", category: "training" },
  { src: heroCoachingSession, name: "Coaching Session", category: "training" },
  { src: heroKettlebellFloor, name: "Kettlebell Floor", category: "training" },
  { src: heroKettlebellTraining, name: "Kettlebell Training", category: "training" },
  { src: heroTrainingSession, name: "Training Session", category: "training" },
  { src: coachingSession, name: "Coaching Session 2", category: "training" },
  { src: kettlebellFormCheck, name: "KB Form Check", category: "training" },
  { src: kettlebellTraining, name: "Kettlebell Training 2", category: "training" },
  { src: oneOnOneCoaching, name: "1:1 Coaching", category: "training" },
  { src: oneOnOne, name: "One on One", category: "training" },
  
  // Group/Community
  { src: classGroup, name: "Class Group", category: "group" },
  { src: groupKettlebell, name: "Group Kettlebell", category: "group" },
  { src: groupTraining, name: "Group Training", category: "group" },
  { src: communityGym, name: "Community Gym", category: "group" },
  { src: scheduleCommunityGroup, name: "Community Group", category: "group" },
  { src: studioGroupOverhead, name: "Group Overhead", category: "group" },
  { src: studioGroupSquats, name: "Group Squats", category: "group" },
  { src: studioKettlebellClass, name: "Kettlebell Class", category: "group" },
  { src: studioLargeGroup, name: "Large Group", category: "group" },
  
  // Studio/Facility
  { src: gymAtmosphere, name: "Gym Atmosphere", category: "studio" },
  { src: gymInterior, name: "Gym Interior", category: "studio" },
  { src: studioBarbellPlatform, name: "Barbell Platform", category: "studio" },
  { src: studioDualTraining, name: "Dual Training", category: "studio" },
  { src: studioFloorExercise, name: "Floor Exercise", category: "studio" },
  { src: studioFullView, name: "Full View", category: "studio" },
  { src: studioMobilityTraining, name: "Mobility Training", category: "studio" },
  { src: studioOutdoorBanner, name: "Outdoor Banner", category: "studio" },
  { src: studioDavidStorefront, name: "Storefront", category: "studio" },
  { src: studioDavidDog, name: "David with Dog", category: "studio" },
  { src: studioDavidDogArt, name: "David Dog Art", category: "studio" },
  { src: studioTrainingWithDog, name: "Training with Dog", category: "studio" },
  
  // Equipment
  { src: kbStrong, name: "KB Strong", category: "equipment" },
  { src: kettlebellArtistic, name: "KB Artistic", category: "equipment" },
  { src: kettlebellCollection, name: "KB Collection", category: "equipment" },
  { src: studioKbCloseup, name: "KB Closeup", category: "equipment" },
  { src: studioKettlebells, name: "Kettlebells", category: "equipment" },
  { src: pricingHeroKettlebell, name: "Pricing Hero KB", category: "equipment" },
  { src: pricingKettlebellRack, name: "KB Rack", category: "equipment" },
  
  // Outdoor
  { src: classesHeroMace, name: "Outdoor Mace", category: "outdoor" },
  { src: outdoorKettlebell, name: "Outdoor Kettlebell", category: "outdoor" },
  { src: outdoorSandbag, name: "Outdoor Sandbag", category: "outdoor" },
  { src: outdoorTraining, name: "Outdoor Training", category: "outdoor" },
  
  // Mobility/Wellness
  { src: mobilityClass, name: "Mobility Class", category: "mobility" },
  { src: memberYogaPose, name: "Yoga Pose", category: "mobility" },
  
  // Gallery
  { src: classesGallery1, name: "Gallery 1", category: "gallery" },
  { src: classesGallery2, name: "Gallery 2", category: "gallery" },
  { src: classesGallery3, name: "Gallery 3", category: "gallery" },
  { src: classesGallery4, name: "Gallery 4", category: "gallery" },
  { src: classesGallery5, name: "Gallery 5", category: "gallery" },
  { src: classesGallery6, name: "Gallery 6", category: "gallery" },
  { src: classesGallery7, name: "Gallery 7", category: "gallery" },
  { src: classesGallery8, name: "Gallery 8", category: "gallery" },
  { src: classesGallery9, name: "Gallery 9", category: "gallery" },
  { src: classesGallery10, name: "Gallery 10", category: "gallery" },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coaches", label: "Coaches" },
  { id: "training", label: "Training" },
  { id: "group", label: "Group" },
  { id: "studio", label: "Studio" },
  { id: "equipment", label: "Equipment" },
  { id: "outdoor", label: "Outdoor" },
  { id: "mobility", label: "Mobility" },
  { id: "gallery", label: "Gallery" },
];

interface ImageSelectorProps {
  selectedImage: string;
  onSelect: (src: string) => void;
}

export function ImageSelector({ selectedImage, onSelect }: ImageSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = IMAGES.filter((img) => {
    const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || img.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Select Image</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="w-full flex-wrap h-auto gap-1 bg-transparent p-0 mb-3">
            {CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="text-xs px-2 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
            {filteredImages.map((img) => (
              <button
                key={img.src}
                onClick={() => onSelect(img.src)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-90 ${
                  selectedImage === img.src
                    ? "border-primary ring-2 ring-primary/50"
                    : "border-transparent hover:border-border"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
                {selectedImage === img.src && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary-foreground bg-primary rounded-full p-1" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No images found
            </p>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
