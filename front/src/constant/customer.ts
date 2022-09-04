interface STATUS {
  [key: string]: string
}

// 客户身份
export const CustomerRoleList: STATUS = {
  0: '未知',
  1: '产权人',
  2: '家属',
  3: '租客'
}

// 转介商机状态
export const ReferralStatusList: STATUS = {
  0: '无效',
  1: '已提交',
  2: '跟进中',
  3: '有效',
  4: '已成交',
  5: '未成交'
}

export const CustomerSource: STATUS = {
  0: '个人转介',
  1: '新交付',
  2: '客户留资'
}

export const OrderStatus: STATUS = {
  0: '待付款',
  1: '已部分付款',
  2: '已付全款',
  3: '已交付',
  4: '已收货',
  5: '已验收',
  6: '已完成',
  7: '已关闭',
  8: '已取消'
}
