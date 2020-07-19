"use strict";

/**
	@fileoverview 实现Books数据模型
	@author keepalive@126.com
*/
class Books {
  /**
  	Books的类 获取后台有关于图书的相关数据类
  	@class
  */

  /**
  	@constructor
  	@param {object} app koa2的上下文
  */
  constructor() {}
  /**
  	@param {*} options 配置项
  	@example
  		return new Promise
  		getData(options)
  */


  getData(options) {
    return Promise.resolve('数据信息');
  }

}

module.exports = Books;