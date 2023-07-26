const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList')

const Random = Mock.Random

module.exports = [
  {
    // 获取单个问卷信息
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          //...
        },
        // errno: 1002,
        // msg: '错误测试'
      }
    },
  },
  {
    // 创建问卷
    url: '/api/question',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      }
    },
  },
  {
    // 获取（查询）问卷列表
    url: '/api/question',
    method: 'get',
    response(ctx) {
      const { url = '', query } = ctx
      const isDeleted = url.includes('isDeleted=true')
      const isStar = url.includes('isStar=true')
      const { page = 1, pageSize = 10 } = query
      return {
        errno: 0,
        data: {
          list: getQuestionList({ isDeleted, isStar, len: pageSize }), // 当前页
          total: 100, // 总条数，分页
        },
      }
    },
  },
]
