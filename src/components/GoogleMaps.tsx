import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { CSSProperties, memo, useCallback, useState } from 'react'
import { Color } from '../graphql/generated'

type Markers = {
  position: google.maps.LatLngLiteral
  icon: Color
}

const containerStyle: CSSProperties = {
  width: '100vw',
  height: '90vh',
}

const mapOptions: google.maps.MapOptions = {
  minZoom: 12,
  maxZoom: 20,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
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

const placedMarkers: Markers[] = [
  {
    position: positionA,
    icon: Color.Red,
  },
  {
    position: positionB,
    icon: Color.Red,
  },
  {
    position: positionC,
    icon: Color.Green,
  },
]

const markerSizeConstant = 5

function GoogleMaps() {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [zoomValue, setZoomValue] = useState<number>(19)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_ENV_GOOGLE_MAPS_API_KEY,
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    placedMarkers.map((placedMarker) => {
      const marker = new google.maps.Marker({
        position: placedMarker.position,
        icon:
          placedMarker.icon == Color.Red
            ? {
                url: '../assets/images/pin-red.png',
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
                url: '../assets/images/pin-green.png',
                scaledSize: new google.maps.Size(
                  zoomValue * markerSizeConstant,
                  zoomValue * markerSizeConstant
                ),
                anchor: new google.maps.Point(
                  (zoomValue * markerSizeConstant) / 2,
                  zoomValue * markerSizeConstant - 11
                ),
              },
      })
      marker.setMap(map)
    })

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

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          // 現在地
          const bounds = new window.google.maps.LatLngBounds({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          // const bounds = new window.google.maps.LatLngBounds(positionA)
          map.fitBounds(bounds)
        },
        (error) => {
          alert(`位置情報の取得に失敗しました。エラーコード：${error.code}`)
        }
      )
    }

    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      options={mapOptions}
      onUnmount={onUnmount}
      onZoomChanged={() => {
        setZoomValue(map?.getZoom() ?? 19)
      }}
    />
  ) : (
    <p>...Loading</p>
  )
}

export default memo(GoogleMaps)
