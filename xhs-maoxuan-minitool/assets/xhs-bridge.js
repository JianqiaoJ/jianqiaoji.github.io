/**
 * 小红书小工具官方 Native API 封装（jsbridge-api.md 1.4.x）
 * 仅使用：postNote / saveImageToPhotosAlbum / writeTempFile
 */
(function (global) {
  'use strict';

  function getMiniTool() {
    return global.xhs && global.xhs.miniTool ? global.xhs.miniTool : null;
  }

  function unavailable(apiName) {
    var error = new Error(apiName + ': MiniTool bridge unavailable');
    error.code = 'XHS_BRIDGE_UNAVAILABLE';
    return Promise.reject(error);
  }

  function call(apiName, options) {
    var bridge = getMiniTool();
    if (!bridge || typeof bridge[apiName] !== 'function') {
      return unavailable(apiName);
    }
    try {
      return Promise.resolve(bridge[apiName](options || {}));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function isDataUri(str) {
    return typeof str === 'string' && /^data:[^;]+;base64,/.test(str);
  }

  global.XhsBridge = {
    isAvailable: function () {
      return !!getMiniTool();
    },

    writeTempFile: function (dataUri) {
      if (!isDataUri(dataUri)) {
        return Promise.reject(new Error('writeTempFile 需要完整的 data URI'));
      }
      return call('writeTempFile', { data: dataUri });
    },

    /**
     * filePath 支持 data URI 或 writeTempFile 返回的本地路径
     */
    saveImage: function (filePath) {
      if (!filePath) {
        return Promise.reject(new Error('saveImage 需要 filePath'));
      }
      return call('saveImageToPhotosAlbum', { filePath: filePath });
    },

    /**
     * urls 支持 data URI 或本地 filePath（1–18 张）
     */
    postImageNote: function (options) {
      options = options || {};
      var urls = Array.isArray(options.urls) ? options.urls : [];
      if (urls.length < 1 || urls.length > 18) {
        return Promise.reject(new Error('postImageNote 需要 1-18 张图片'));
      }
      var payload = {
        pageType: 'photo_publish',
        mediaInfo: {
          image_resources: urls.map(function (url) {
            return { url: url };
          })
        }
      };
      if (options.title) payload.title = String(options.title).slice(0, 20);
      if (options.content) payload.content = String(options.content).slice(0, 1000);
      if (options.tags) payload.tags = String(options.tags);
      return call('postNote', payload);
    }
  };
})(window);
