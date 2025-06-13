"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import {
  BsArrowRightShort,
  BsPeopleFill,
  BsGraphUpArrow,
} from "react-icons/bs";
import { BiSolidComment } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Switch } from "@/components/ui/switch";

const onboardingSlides = [
  {
    title: {
      en: "Welcome to Kattunar Kuzhu",
      ta: "கட்டுனர் குழுவிற்கு வரவேற்கிறோம்"
    },
    description: {
      en: "Your community awaits",
      ta: "உங்கள் சமூகம் காத்திருக்கிறது"
    },
    icon: BiSolidComment,
  },
  {
    title: {
      en: "Connect with Your People",
      ta: "உங்கள் மக்களுடன் இணையுங்கள்"
    },
    description: {
      en: "Build meaningful relationships",
      ta: "அர்த்தமுள்ள உறவுகளை உருவாக்குங்கள்"
    },
    icon: BsPeopleFill,
  },
  {
    title: {
      en: "Collaborate & Grow",
      ta: "ஒத்துழையுங்கள் & வளருங்கள்"
    },
    description: {
      en: "Achieve more together",
      ta: "ஒன்றாக அதிகம் சாதியுங்கள்"
    },
    icon: BsGraphUpArrow,
  },
];

export default function Onboarding() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTamil, setIsTamil] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <main className="min-h-full flex flex-col bg-background relative">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span className="text-sm font-medium">EN</span>
        <Switch
          checked={isTamil}
          onCheckedChange={setIsTamil}
          className="data-[state=checked]:bg-primary"
        />
        <span className="text-sm font-medium">தமிழ்</span>
      </div>

      {/* Carousel Section */}
      <div className="flex-1 w-full">
        <Carousel
          ref={emblaRef}
          className="w-full h-full"
          opts={{
            align: "center",
            loop: false,
          }}
        >
          <CarouselContent>
            {onboardingSlides.map((slide, index) => (
              <CarouselItem key={index} className="h-[calc(100vh-7rem)]">
                <div className="flex flex-col h-full">
                  <div className="relative flex-1 bg-muted/5 flex items-center justify-center">
                    {/* Icon Container */}
                    <div className="w-full h-full rounded-b-4xl bg-primary/10 flex items-center justify-center mb-12">
                      {slide.icon && (
                        <slide.icon className="w-24 h-24 text-primary" />
                      )}
                    </div>
                    <div className="absolute bottom-8 left-0 right-0 text-center p-6 space-y-2">
                      <h2 className="text-2xl font-bold tracking-tight">
                        {isTamil ? slide.title.ta : slide.title.en}
                      </h2>
                      <p className="text-muted-foreground">
                        {isTamil ? slide.description.ta : slide.description.en}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

        </Carousel>
          {/* Dot indicators */}
      </div>
      <div className="flex justify-center gap-2 mt-4 absolute bottom-28 left-0 right-0">
        {onboardingSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      {/* Bottom Action */}
      <div className="w-full p-6">
        <Link href="/auth/login" className="block">
          <Button className="w-full h-14 text-lg rounded-full" size="lg">
            {isTamil ? "தொடங்குங்கள்" : "Get Started"}
            <BsArrowRightShort className="w-6 h-6 ml-2" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
