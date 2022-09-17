import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { CSSProperties, memo, useCallback, useState } from 'react'

type Markers = {
  position: google.maps.LatLngLiteral
  icon: 'red' | 'green'
}

const containerStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
}

// 東京駅
const tokyoStationPosition: google.maps.LatLngLiteral = {
  lat: 35.6809591,
  lng: 139.7673068,
}

const tangaPosition: google.maps.LatLngLiteral = {
  lat: 33.88199160909438,
  lng: 130.87870371446132,
}

const markerSizeConstant = 5

function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [zoomValue, setZoomValue] = useState<number>(19)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_ENV_GOOGLE_MAPS_API_KEY,
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(tangaPosition)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const markers: Markers[] = [
    {
      position: tangaPosition,
      icon: 'red',
    },
    {
      position: {
        lat: 33.88220610094518,
        lng: 130.8794740275319,
      },
      icon: 'green',
    },
  ]

  const mapOptions: google.maps.MapOptions = {
    minZoom: 12,
    maxZoom: 20,
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={tangaPosition}
      onLoad={onLoad}
      options={mapOptions}
      onUnmount={onUnmount}
      onZoomChanged={() => {
        setZoomValue(map?.getZoom() ?? 19)
      }}
    >
      {markers.map((marker, i) => {
        return (
          <Marker
            position={marker.position}
            key={i}
            icon={
              marker.icon == 'red'
                ? {
                    url: '../assets/kitsune_pin.png',
                    scaledSize: new google.maps.Size(
                      zoomValue * markerSizeConstant,
                      zoomValue * markerSizeConstant
                    ),
                  }
                : {
                    url: '../assets/tanuki_pin.png',
                    scaledSize: new google.maps.Size(
                      zoomValue * markerSizeConstant,
                      zoomValue * markerSizeConstant
                    ),
                  }
            }
          />
        )
      })}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default memo(Map)
