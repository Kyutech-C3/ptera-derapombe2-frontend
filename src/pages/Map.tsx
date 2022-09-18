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

const positionA: google.maps.LatLngLiteral = {
  lat: 33.88199160909438,
  lng: 130.87870371446132,
}

const positionB: google.maps.LatLngLiteral = {
  lat: 33.88220610094518,
  lng: 130.8794740275319,
}

const positionC: google.maps.LatLngLiteral = {
  lat: 33.881944125152216,
  lng: 130.8789380227444,
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
    const bounds = new window.google.maps.LatLngBounds(positionA)
    map.fitBounds(bounds)
    const path = new google.maps.Polyline({
      path: [
        { lat: positionA.lat, lng: positionA.lng },
        { lat: positionB.lat, lng: positionB.lng },
        { lat: positionC.lat, lng: positionC.lng },
        { lat: positionA.lat, lng: positionA.lng },
      ],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeWeight: 2,
    })
    path.setMap(map)
    const polygon = new google.maps.Polygon({
      paths: [
        { lat: positionA.lat, lng: positionA.lng },
        { lat: positionB.lat, lng: positionB.lng },
        { lat: positionC.lat, lng: positionC.lng },
        { lat: positionA.lat, lng: positionA.lng },
      ],
      strokeOpacity: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.15,
    })
    polygon.setMap(map)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const markers: Markers[] = [
    {
      position: positionA,
      icon: 'red',
    },
    {
      position: positionB,
      icon: 'green',
    },
    {
      position: positionC,
      icon: 'green',
    },
  ]

  const mapOptions: google.maps.MapOptions = {
    minZoom: 12,
    maxZoom: 20,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={positionA}
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
                    anchor: new google.maps.Point(
                      (zoomValue * markerSizeConstant) / 2,
                      zoomValue * markerSizeConstant - 7
                    ),
                  }
                : {
                    url: '../assets/tanuki_pin.png',
                    scaledSize: new google.maps.Size(
                      zoomValue * markerSizeConstant,
                      zoomValue * markerSizeConstant
                    ),
                    anchor: new google.maps.Point(
                      (zoomValue * markerSizeConstant) / 2,
                      zoomValue * markerSizeConstant - 11
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
