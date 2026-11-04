import React, { useEffect, useRef, useState } from 'react';

// Extend the Window interface to include google for TypeScript
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface MapProps {
  lat: number;
  lng: number;
}

// Optional. Without a key the component falls back to Google's keyless embed.
const mapsApiKey: string | undefined = ((import.meta as any).env ?? {}).VITE_GOOGLE_MAPS_API_KEY;

const Map: React.FC<MapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isApiLoaded, setApiLoaded] = useState(!!(window.google && window.google.maps));

  // Effect for loading the Google Maps script
  useEffect(() => {
    if (isApiLoaded || !mapsApiKey) return;

    // Define the callback function on the window object
    window.initMap = () => {
      setApiLoaded(true);
    };
    
    // Create and append the script tag
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(mapsApiKey)}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the global callback function when component unmounts
      delete window.initMap;
    };
  }, [isApiLoaded]);

  // Effect for initializing the map once the API is loaded
  useEffect(() => {
    if (isApiLoaded && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        disableDefaultUI: true, // Clean look, matching the app's aesthetic
        styles: [ // Custom minimalist style to match the app theme
          {
            "featureType": "poi.business",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "transit",
            "stylers": [{ "visibility": "off" }]
          }
        ]
      });

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Kantor HalloHukum',
        animation: window.google.maps.Animation.DROP,
      });
      
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div class="p-1 font-sans"><strong>Kantor HalloHukum</strong><br>Kami berada di sini!</div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open({
          anchor: marker,
          map,
        });
      });

      // Open the InfoWindow by default for immediate context
      infoWindow.open({
          anchor: marker,
          map,
      });
    }
  }, [isApiLoaded, lat, lng]);

  if (!mapsApiKey && !isApiLoaded) {
    return (
      <iframe
        title="Peta lokasi kantor HalloHukum"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        className="h-80 w-full rounded-2xl shadow-md border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div 
        ref={mapRef} 
        className="h-80 w-full rounded-2xl shadow-md z-10"
        aria-label="Peta lokasi kantor HalloHukum"
    />
  );
};

export default Map;