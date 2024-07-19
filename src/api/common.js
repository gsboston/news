import Axios from './index.js'

// 栏目列表
export async function getMenuApi() {
  return await Axios.get('/h5webad/app/api/quiz/menu')
}

/* quiz 列表
    1.用于根据 sSign 获取 quiz 列表
    sSign: 栏目 id
    currentPage: 页面
    pageSize: 每页条数

    2.用于获取热门推荐
    "sortAttribute": "iPosition",  //排序字段-iPosition：根据显示位置排序
    "order": "ascending",  //排序方式-ascending：升序，descending：倒序
*/
export async function getQuizApi(data) {
  return await Axios.post('/h5webad/app/api/quiz/', data)
}

/* quiz 题目
    qSign: 套题id
*/
export async function getThemeApi(data) {
  return await Axios.get('/h5webad/app/api/quiz/' + data.qSign, data)
}

// 答案
export async function getResultApi(data) {
  return await Axios.get(
    '/h5webad/app/api/quiz/' + data.qSign + '/result',
    data
  )
}

export async function getIpApi() {
  return await Axios.get('https://api.ipify.org/?format=json', {}, { isFullReturn: true })
}
