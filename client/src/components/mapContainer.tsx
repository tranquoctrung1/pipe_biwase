import { MapContainer } from 'react-leaflet';
//import { useLayoutEffect } from 'react';

const MapContainerComponent = ({ /*detectIOS,*/ children }: any) => {
    // useLayoutEffect(() => {
    //     if (detectIOS === true) {
    //         document.getElementById('mapContainer')?.classList.add('ios');
    //         document
    //             .getElementById('mapContainer')
    //             ?.attributes.removeNamedItem('tabIndex');
    //     } else {
    //         document.getElementById('mapContainer')?.classList.remove('ios');
    //     }
    // }, [detectIOS]);

    return (
        <MapContainer
            center={[10.597631, 106.535453]}
            zoom={12}
            scrollWheelZoom={true}
            attributionControl={false}
            zoomControl={false}
            id="mapContainer"
        >
            {children}
        </MapContainer>
    );
};

export default MapContainerComponent;
