const ajaxPromise = (paramsJson) => {
  // 将函数封装为'Promise'这个对象
  return new Promise((resolve, reject) => {
    // 具体异步操作封装

    // 1.创建XMLHttprequest
    const xhr = new window.XMLHttpRequest;
    // 2.建立连接
    xhr.open(paramsJson.method, paramsJson.url, true);
    // 3.发送请求
    xhr.send();
    // 4.处理响应结果
    xhr.onreadystatechange = function (e) {
      const target = e.target;
      if (target.readyState == 4) { // 表示数据已经响应完成
        if (target.status == 200) { //状态码 200: ok
          resolve(target.responseText); // 函数调用,content实参
        } else {
          reject(target);
        }
      }
    }
  })
}

// 暴露ajax封装函数
export default ajaxPromise;
