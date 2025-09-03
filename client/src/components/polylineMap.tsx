import { Polyline, Popup } from 'react-leaflet';
import uuid from 'react-uuid';

const PolyLineMap = ({ polylines }: any) => {
    const convertPolyLine = (data: any) => {
        const result = [];

        if (data.length > 0) {
            for (const item of data) {
                const content = (
                    <Polyline
                        key={uuid()}
                        pathOptions={{
                            //@ts-ignore
                            color: item.Color,
                            //@ts-ignore
                            weight: item.Weight,
                        }}
                        //@ts-ignore
                        positions={item.Lines}
                    >
                        <Popup>
                            {
                                //@ts-ignore
                                item.Content
                            }
                        </Popup>
                    </Polyline>
                );

                result.push(content);
            }
        }

        return result;
    };

    return convertPolyLine(polylines);
};

export default PolyLineMap;
