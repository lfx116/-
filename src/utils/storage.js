// 存储数据
export function setItem(key, value){
    // 将数组、对象类型的数据转换为 JSON 格式字符串进行存储
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
  }
  
  /**
   * 获取数据
   */
  export function getItem(key) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (err) {}
    return value
  }
  
  /**
   * 删除数据
   */
  export const removeItem = key => {
    window.localStorage.removeItem(key)
  }