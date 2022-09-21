import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { CSSProperties, memo, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Color, MapPageInfoQuery } from '../graphql/generated'
import MapActionButton from './MapActionButton'

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
  onClickExhumeSign: (index: number) => void
  showSignDetail: (index: number) => void
}

function GoogleMaps(props: GoogleMaps) {
  const { data, onClickExhumeSign, showSignDetail } = props
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [zoomValue, setZoomValue] = useState<number>(19)
  const [showAction, setShowAction] = useState(false)
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_ENV_GOOGLE_MAPS_API_KEY,
  })

  const onLoad = useCallback((map: google.maps.Map) => {
    data.mapInfo.signs.map((signData, i) => {
      const signPosition: google.maps.LatLngLiteral = {
        lat: signData.coordinate.latitude,
        lng: signData.coordinate.longitude,
      }
      const marker = new google.maps.Marker({
        position: signPosition,
        icon: signData.group
          ? signData.group === Color.Red
            ? {
                url: '/images/pin-red.png',
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
                url: '/images/pin-green.png',
                scaledSize: new google.maps.Size(
                  zoomValue * markerSizeConstant,
                  zoomValue * markerSizeConstant
                ),
                anchor: new google.maps.Point(
                  (zoomValue * markerSizeConstant) / 2,
                  zoomValue * markerSizeConstant - 11
                ),
              }
          : null, // 誰にも取られていない時
      })
      marker.addListener('click', () => {
        map.setCenter(signPosition)
        setShowAction(true)
        setSelectedMarkerIndex(i)
      })
      marker.setMap(map)
    })
    data.mapInfo.links.map((link) => {
      const mapPolyline = new google.maps.Polyline({
        path: [
          {
            lat: link.oneCoordinate.latitude,
            lng: link.oneCoordinate.longitude,
          },
          {
            lat: link.otherCoordinate.latitude,
            lng: link.otherCoordinate.longitude,
          },
        ],
        geodesic: true,
        strokeColor: link.group === Color.Red ? 'red' : 'green',
        strokeWeight: 2,
      })
      mapPolyline.setMap(map)
    })
    data.mapInfo.polygons.map((polygon) => {
      const newPolygons: google.maps.LatLngLiteral[] = []
      polygon.coordinates.map((value) => {
        newPolygons.push({ lat: value.latitude, lng: value.longitude })
      })
      newPolygons.push({
        lat: polygon.coordinates.slice(-1)[0].latitude,
        lng: polygon.coordinates.slice(-1)[0].longitude,
      })
      const mapPolygon = new google.maps.Polygon({
        paths: newPolygons,
        strokeOpacity: 0,
        fillColor: polygon.group === Color.Red ? 'red' : 'green',
        fillOpacity: 0.15,
      })
      mapPolygon.setMap(map)
    })

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
            onClickExhumeSign={() => onClickExhumeSign(selectedMarkerIndex)}
            onClickSignDetailButton={() => showSignDetail(selectedMarkerIndex)}
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
