const midpoint = (latitude1, longitude1, latitude2, longitude2) => {
    const degToRad = Math.PI / 180;
    const lat1 = latitude1 * degToRad;
    const lat2 = latitude2 * degToRad;
    const lng1 = longitude1 * degToRad;
    const dLng = (longitude2 - longitude1) * degToRad;

    const bx = Math.cos(lat2) * Math.cos(dLng);
    const by = Math.cos(lat2) * Math.sin(dLng);
    const lat = Math.atan2(
        Math.sin(lat1) + Math.sin(lat2),
        Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + by * by)
    );
    const lng = lng1 + Math.atan2(by, Math.cos(lat1) + bx);

    return [lat / degToRad, lng / degToRad];
}

const distance = (lat1, lng1, lat2, lng2) => {
    const earthRad = 6371;
    const degToRad = Math.PI / 180;

    const dLat = (lat2 - lat1) * degToRad;
    const dLng = (lng2 - lng1) * degToRad;
    lat1 = lat1 * degToRad;
    lat2 = lat2 * degToRad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLng / 2) * Math.sin(dLng / 2) *
          Math.cos(lat1) * Math.cos(lat2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRad * c;
}

export default {
    midpoint,
    distance
}