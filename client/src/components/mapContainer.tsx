import React from 'react';
import { MapContainer } from 'react-leaflet';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MapContainerComponentProps {
    children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Constants — defined outside the component, never recreated
// ---------------------------------------------------------------------------

const MAP_CENTER: [number, number] = [10.597631, 106.535453];
const MAP_ZOOM = 12;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const MapContainerComponent = ({ children }: MapContainerComponentProps) => (
    <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        scrollWheelZoom
        attributionControl={false}
        zoomControl={false}
        id="mapContainer"
    >
        {children}
    </MapContainer>
);

export default React.memo(MapContainerComponent);