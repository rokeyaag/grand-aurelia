import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  BedDouble, 
  Building, 
  ArrowUpRight, 
  Maximize2,
  CheckCircle2,
  Clock,
  Wrench
} from 'lucide-react';

const DEFAULT_SLIDES = [
  {
    id: 'slide_1',
    roomId: 'rm_101',
    roomNumber: '101',
    roomType: 'Deluxe Ocean Suite',
    tier: 'Luxury Suite',
    badge: 'Executive Control Hub • Suite Spotlight',
    title: 'Enterprise Hospitality Overview',
    subtitle: 'Real-time unified intelligence across Hotel Operations, Fine Dining, Kitchen KDS & Food Delivery Fleet.',
    pricePerNight: 180,
    size: '48 m²',
    bedType: '1 King Bed',
    status: 'Occupied',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=80',
    tags: ['Ocean View', 'Private Balcony', 'King Bed', '48 m²']
  },
  {
    id: 'slide_2',
    roomId: 'rm_201',
    roomNumber: '201',
    roomType: 'Presidential Penthouse',
    tier: 'Presidential Suite',
    badge: 'Crown Jewel Residence • VIP Penthouse',
    title: 'Presidential Penthouse Showcase',
    subtitle: '110 m² of supreme luxury with private rooftop jacuzzi, dining salon & dedicated 24/7 butler service.',
    pricePerNight: 450,
    size: '110 m²',
    bedType: '2 King Beds',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&auto=format&fit=crop&q=80',
    tags: ['Panoramic View', 'Private Jacuzzi', 'Butler Service', '110 m²']
  },
  {
    id: 'slide_3',
    roomId: 'rm_102',
    roomNumber: '102',
    roomType: 'Executive Business Suite',
    tier: 'Business Suite',
    badge: 'Corporate Intelligence • High-Speed Hub',
    title: 'Executive Business Suite Intelligence',
    subtitle: 'High-speed fiber connectivity, ergonomic Herman Miller workstation, separated meeting lounge & soundproof walls.',
    pricePerNight: 220,
    size: '56 m²',
    bedType: '1 King + 1 Sofa',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&auto=format&fit=crop&q=80',
    tags: ['Workstation Desk', 'Wi-Fi 6 Fiber', 'City View', '56 m²']
  },
  {
    id: 'slide_4',
    roomId: 'rm_202',
    roomNumber: '202',
    roomType: 'Grand Premium Room',
    tier: 'Premium Accommodations',
    badge: 'Premium Heritage • Skyline Living',
    title: 'Grand Premium Skyline Accommodations',
    subtitle: 'Sophisticated styling with city skyline views, plush queen bedding, automated ambient lighting and rainforest shower.',
    pricePerNight: 140,
    size: '38 m²',
    bedType: '1 Queen Bed',
    status: 'Cleaning',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&auto=format&fit=crop&q=80',
    tags: ['Skyline View', 'Rain Shower', 'Ambient Lighting', '38 m²']
  },
  {
    id: 'slide_5',
    roomId: 'rm_301',
    roomNumber: '301',
    roomType: 'Deluxe Twin Garden Room',
    tier: 'Deluxe Sanctuary',
    badge: 'Botanical Retreat • Garden Sanctuary',
    title: 'Deluxe Botanical Garden Wing',
    subtitle: 'Tranquil botanical garden vistas with twin luxury plush beds, artisanal tea bar, and private garden veranda.',
    pricePerNight: 120,
    size: '35 m²',
    bedType: '2 Twin Beds',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&auto=format&fit=crop&q=80',
    tags: ['Garden View', 'Twin Plush Beds', 'Tea Station', '35 m²']
  }
];

export default function GMBannerCarousel({ 
  rooms = [], 
  onRefresh, 
  onNavigate 
}) {
  // Merge prop rooms if available to make slides fully dynamic
  const slides = DEFAULT_SLIDES.map((defaultSlide, idx) => {
    const matchingRoom = (rooms || []).find(
      r => r.id === defaultSlide.roomId || String(r.number) === String(defaultSlide.roomNumber)
    ) || (rooms || [])[idx];

    if (!matchingRoom) return defaultSlide;

    const highResImg = matchingRoom.image 
      ? (matchingRoom.image.includes('unsplash.com') 
          ? matchingRoom.image.split('?')[0] + '?w=1200&auto=format&fit=crop&q=85' 
          : matchingRoom.image)
      : defaultSlide.image;

    return {
      ...defaultSlide,
      roomType: matchingRoom.type || defaultSlide.roomType,
      status: matchingRoom.status || defaultSlide.status,
      pricePerNight: matchingRoom.pricePerNight || defaultSlide.pricePerNight,
      size: matchingRoom.size || defaultSlide.size,
      bedType: matchingRoom.bedType || defaultSlide.bedType,
      image: highResImg,
      tags: matchingRoom.amenities ? matchingRoom.amenities.slice(0, 4) : defaultSlide.tags
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const currentSlide = slides[currentIndex];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Occupied':
        return (
          <span className="gm-carousel-status-chip occupied">
            <span className="status-dot-pulse bg-danger"></span> Occupied (Room {currentSlide.roomNumber})
          </span>
        );
      case 'Cleaning':
        return (
          <span className="gm-carousel-status-chip cleaning">
            <Clock size={11} /> Housekeeping Cleaning
          </span>
        );
      case 'Maintenance':
        return (
          <span className="gm-carousel-status-chip maintenance">
            <Wrench size={11} /> Maintenance
          </span>
        );
      default:
        return (
          <span className="gm-carousel-status-chip available">
            <CheckCircle2 size={11} /> Available for Booking
          </span>
        );
    }
  };

  return (
    <div 
      className="gm-banner gm-carousel-banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slides with Cross-Fade */}
      <div className="gm-carousel-slides-container">
        {slides.map((slide, idx) => (
          <div 
            key={slide.id} 
            className={`gm-carousel-slide ${idx === currentIndex ? 'active' : ''}`}
            aria-hidden={idx !== currentIndex}
          >
            <img 
              src={slide.image} 
              alt={slide.roomType} 
              className="gm-carousel-bg-image" 
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
            {/* Color-Preserving Overlay matching the original theme */}
            <div className="gm-carousel-overlay" />
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="gm-carousel-inner">
        <div className="gm-carousel-content">
          {/* Top Badges Row */}
          <div className="gm-carousel-badges-row">
            <div className="badge badge-primary gm-badge-highlight">
              <Sparkles size={13} className="text-amber-300" /> 
              <span>{currentSlide.badge}</span>
            </div>
            {getStatusBadge(currentSlide.status)}
          </div>

          {/* Heading */}
          <h1 className="gm-carousel-title">
            {currentSlide.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="gm-carousel-desc">
            {currentSlide.subtitle}
          </p>

          {/* Tags & Suite Specs Bar */}
          <div className="gm-carousel-specs-row">
            <span className="gm-spec-pill room-name">
              <BedDouble size={13} />
              <strong>{currentSlide.roomType}</strong> (Room {currentSlide.roomNumber})
            </span>
            <span className="gm-spec-pill price">
              ${currentSlide.pricePerNight} / night
            </span>
            <span className="gm-spec-pill">
              <Maximize2 size={12} /> {currentSlide.size}
            </span>
            {(currentSlide.tags || []).slice(0, 3).map((tag, i) => (
              <span key={i} className="gm-spec-pill tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side Actions & Navigation */}
        <div className="gm-carousel-actions-col">
          {/* Top Action Buttons */}
          <div className="gm-carousel-action-buttons">
            <button 
              className="btn btn-outline btn-sm gm-refresh-btn" 
              onClick={handleRefreshClick}
              title="Refresh Live Operational Intelligence"
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh Live Data</span>
            </button>
            
            {onNavigate && (
              <button 
                className="btn btn-outline btn-sm gm-explore-btn"
                onClick={() => onNavigate('hotel')}
                title="View All Luxury Suites in Grid"
              >
                <Building size={14} />
                <span>Explore Suites</span>
                <ArrowUpRight size={13} />
              </button>
            )}
          </div>

          {/* Slide Arrow Navigation & Counter */}
          <div className="gm-carousel-nav-controls">
            <span className="gm-carousel-counter">
              <span className="current-idx">0{currentIndex + 1}</span>
              <span className="divider">/</span>
              <span className="total-idx">0{totalSlides}</span>
            </span>

            <div className="gm-carousel-arrow-group">
              <button 
                className="gm-carousel-arrow-btn prev"
                onClick={prevSlide}
                aria-label="Previous Slide"
                title="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                className="gm-carousel-arrow-btn next"
                onClick={nextSlide}
                aria-label="Next Slide"
                title="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pagination Dots / Progress Bars */}
      <div className="gm-carousel-pagination" role="tablist" aria-label="Slide Selector">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to slide ${idx + 1}: ${slide.roomType}`}
            className={`gm-carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          >
            <span className="gm-dot-fill" />
            <span className="gm-dot-tooltip">{slide.roomType} (${slide.pricePerNight})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
