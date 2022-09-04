// 检查手机号
export const validateMobile = (value: string) => {
  if (!value) {
    return Promise.reject('手机号不能为空')
  }
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return Promise.reject('请输入正确的手机号')
  }
  return Promise.resolve()
}
