// https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html

declare module 'jweixin-1.6.0' {
  type GETENVCB = (res: { miniprogram: string }) => void
  type NavigateTo = (data: { url: string }) => void
  interface MiniProgram {
    navigateTo: NavigateTo
    switchTab: NavigateTo
    navigateBack: () => void
    getEnv: (cb: GETENVCB) => {}
  }
  type PreviewImage = (data: { current: string; urls: string[] }) => void
  let previewImage: PreviewImage
  let miniProgram: MiniProgram
  export { miniProgram, previewImage }
}
