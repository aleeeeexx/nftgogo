// import BMap from 'BMap'
// import { Toast } from 'vant'
// 返回的定位结果
// 经纬度，等位置信
// interface PositionOptions {
//   coords: {
//     latitude: number
//     longitude: number
//   }
// }

export function getCity() {
  // return new Promise<string>((resolve, reject) => {
  //   const geoShowPosition = (position: PositionOptions) => {
  //     if (position.coords.latitude) {
  //       const { latitude, longitude } = position?.coords
  //       // 坐标转换
  //       const pt = new BMap.Point(latitude, longitude)
  //       const convertor = new BMap.Convertor()
  //       const pointArr = []
  //       pointArr.push(pt)
  //       convertor.translate(pointArr, 1, 5, translateCallback)
  //     } else {
  //       reject()
  //     }
  //   }
  //   function translateCallback(data: { points: { lat: number; lng: number }[] }) {
  //     if (data.points && data.points.length > 0) {
  //       const myGeo = new BMap.Geocoder()
  //       const pt = new BMap.Point(data.points[0].lat, data.points[0].lng)
  //       // 解析城市
  //       myGeo.getLocation(pt, (result: { addressComponents: { city: string } }) => {
  //         resolve(result?.addressComponents?.city)
  //       })
  //     }
  //   }
  //   const geoShowError = (error: { code: number; message: string }) => {
  //     Toast.fail(`getPosError:${error.code},${navigator.geolocation},${error.message}`)
  //     reject()
  //   }
  //   navigator.geolocation.getCurrentPosition(geoShowPosition, geoShowError)
  // })
}
