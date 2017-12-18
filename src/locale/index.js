import Const from '../const';
// 本地化文案
const ErrorType = Const.ERROR_TYPE;

/* 业务-[通用|模块}'错误提示信息 */
const Errors = {
  // 网络异常
  [ErrorType.NETWORK]: {
    // 'default': '亲爱的用户现在网络异常，请检查网络连接或稍后重试!'
    default: '亲爱的用户现在网络异常，请稍后重试!'
  },
  // 取消
  [ErrorType.ABORT]: {
    default: '请求取消'
  },
  // 前端址时
  [ErrorType.TIMEOUT]: {
    default: '请求超时，请稍后重试'
  },
  // 解析错误， 返回数据结构异常
  [ErrorType.PARSER]: {
    default: '数据解析失败，请稍后重试'
  },
  [ErrorType.BUSINESS]: {
    // 通用错误, code, 首字符代表错误级别：4代表请求端错误，5带面server段发生错误）
    COMMON: {
      301: '接口更新', // 参数内容错误
      400: '参数错误', // 表单校验，参数校验，上传文件类型校验  服务端可以解决端错误
      401: '权限认证错误',
      403: '资源拒绝访问', // 登陆验证，权限验证，锁定，请求接口过快
      404: '请求资源不存在', // 请求资源不存在 url拼错
      500: '系统发生异常，请稍后重试', // 服务端错误
      default: '操作失败，请稍后重试' // 兜底文案
    },
    // 模块级错误， subcode
    MODULES: {
      // TODO
      // 商品
      // GOODS: {
      // 1901: '商品不存在' // 商品不存在
      // }
    }
  }
};

export default {
  Errors
};
