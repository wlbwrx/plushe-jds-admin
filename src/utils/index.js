import { Base64 } from 'js-base64';
// productKey:  图片key值
// 
export const imageHandler = function(layout = 0, productKey) {
    if (!productKey) return;
    const resize = {
      0: {
        height: 40,
        fit: 'cover',
      },
      1: {
        fit: 'cover',
      },
    };
    const parameter = {
      bucket: process.env.VUE_APP_BUCKET || 'test-plushe', // 根据host来识别，如果是sit则填：test-plushe；如果是生产则填：pro-plushe
      key: productKey, // productKey, // 后台放回S3 图片key
      edits: {
        resize: resize[layout || 0],
      },
    };
    return `https://img.plushe.com/${Base64.encode(JSON.stringify(parameter))}`;
  };

  export const transitionTreeArray = (data, obj) => {
    const { parentId = 'parentId', parentVal = '-1,0', id = 'id' } = obj || {};
    const map = {};
    const val = [];
    const arr = JSON.parse(JSON.stringify(data));
    arr.forEach(item => {
      map[item[id]] = item;
    });
    arr.forEach(item => {
      const parent = map[item[parentId]];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else if (parentVal.includes(item[parentId])) {
        val.push(item);
      }
    });
    return val;
  };