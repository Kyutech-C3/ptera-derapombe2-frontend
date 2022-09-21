import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { CSSProperties, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Color, MapPageInfoQuery } from '../graphql/generated'
import MapActionButton from './MapActionButton'
import PinRedImage from '../assets/images/pin-red.png'
import PinGreenImage from '../assets/images/pin-green.png'

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

const Container = styled.div`
  position: relative;
`

const Blur = styled.div`
  position: absolute;
  width: 100vw;
  height: 92%;
  bottom: 0;
  box-shadow: inset 0px -25px 20px 5px rgb(0 0 0 / 57%);
`

type GoogleMaps = {
  data: MapPageInfoQuery
  showSignDetail: () => void
}

function GoogleMaps(props: GoogleMaps) {
  const { data, showSignDetail } = props
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [zoomValue, setZoomValue] = useState<number>(19)
  const [showAction, setShowAction] = useState(false)

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
                url: PinRedImage,
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
                url: PinGreenImage,
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
      marker.addListener('click', () => {
        map.setCenter(placedMarker.position)
        setShowAction(true)
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
    <Container>
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        options={mapOptions}
        onUnmount={onUnmount}
        onZoomChanged={() => {
          setZoomValue(map?.getZoom() ?? 19)
        }}
      />
      {showAction ? (
        <>
          <Blur />
          <MapActionButton
            onClickCloseButton={() => setShowAction(false)}
            onClickSignDetailButton={() => showSignDetail()}
          />
        </>
      ) : (
        <></>
      )}
    </Container>
  ) : (
    <p>...Loading</p>
  )
}

export default memo(GoogleMaps)
