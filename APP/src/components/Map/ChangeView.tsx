import { useMap } from 'react-leaflet'


export function ChangeView({ center, zoom }: any) {


    const map = useMap();
    map.setView(center, zoom);

    return null;
}