/*
 * @Author: C.
 * @Date: 2021-08-13 13:40:19
 * @LastEditTime: 2021-10-29 09:29:14
 * @Description: file content
 */
export function handleProps(props) {
  return Object.assign(defaultProp(), props)
}

const defaultProp = () => {
  return {
    prop: '',
    label: '',
    fixed: false,
    align: 'left',
    show: true,
    cpn: '',
    filter: 'default',
    width: ''
  }
}
