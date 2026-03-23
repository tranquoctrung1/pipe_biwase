import React from 'react';
import { Polyline, Popup } from 'react-leaflet';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PolylineItem {
    Lines: [[number, number], [number, number]];
    Color?: string;
    Weight?: number;
    Content?: React.ReactNode[];
}

interface PolyLineMapProps {
    polylines: PolylineItem[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const PolyLineMap = ({ polylines }: PolyLineMapProps) => (
    <>
        {polylines.map((item, index) => (
            <Polyline
                // Index is safe here: the polylines array is only replaced on a
                // full data refresh, never partially reordered at runtime.
                key={index}
                pathOptions={{ color: item.Color, weight: item.Weight }}
                positions={item.Lines}
            >
                {item.Content && <Popup>{item.Content}</Popup>}
            </Polyline>
        ))}
    </>
);

export default React.memo(PolyLineMap);
