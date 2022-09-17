import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { memo, useCallback, useState } from 'react'

const containerStyle = {
  width: '100vw',
  height: '100vh',
}

// 東京駅
const center = {
  lat: 35.6809591,
  lng: 139.7673068,
}

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_ENV_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(Maps)
