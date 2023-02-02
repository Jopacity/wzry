import pinyin from "./pinyin";
//随机数
export function $random(min, max, num = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(num));
}

//小数百分比互转
export function $potEoPct(str, ret = 4) {
  if (typeof str === "string") {
    return str.replace("%", "") / 100;
  }
  return Number((str * 100).toFixed(ret));
}

//全局替换指定字符串
export function $repStr(str, match, rep = "") {
  return str.replace(new RegExp(match, "g"), rep);
}

// 时间格式化
export function $fmtTime(date, fmt = "YYYY-MM-DD hh:mm:ss") {
  date = new Date(date);
  let ret;
  const week = ["日", "一", "二", "三", "四", "五", "六"];
  const opt = {
    "Y+": date.getFullYear().toString(),
    "M+": (date.getMonth() + 1).toString(),
    "D+": date.getDate().toString(),
    "h+": date.getHours().toString(),
    "m+": date.getMinutes().toString(),
    "s+": date.getSeconds().toString(),
    w: week[date.getDay()],
    n: new Date(date).valueOf(),
  };
  for (const k in opt) {
    ret = new RegExp(`(${k})`).exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
}

//根据时间段问候
export function $timeGreet(greet = {}) {
  const {
    a = "午夜好",
    b = "早上好",
    c = "上午好",
    d = "中午好",
    e = "下午好",
    f = "晚上好",
  } = greet;
  const now = new Date().getHours();
  return now < 4 ? a : now < 10 ? b : now < 12 ? c : now < 14 ? d : now < 18 ? e : f;
}

//记录已过去时间或倒计时
export function $timeCount(time = "2021-04-01") {
  let now = new Date(time).getTime(),
    future = new Date().getTime(),
    times =
      future - now > 0 ? Math.floor((future - now) / 1000) : Math.floor((now - future) / 1000);

  const time_arr = [
    {
      y: times / 60 / 60 / 24 / 30 / 12,
    },
    {
      mon: (times / 60 / 60 / 24 / 30) % 12,
    },
    {
      d: (times / 60 / 60 / 24) % 30,
    },
    {
      h: (times / 60 / 60) % 24,
    },
    {
      min: (times / 60) % 60,
    },
    {
      s: times % 60,
    },
  ];
  let timeObj = {};
  time_arr.forEach((item) => {
    const arr = Object.entries(item)[0];
    const key = arr[0];
    const value = arr[1];
    item[key] = Math.floor(value).toString().padStart(2, "0");
    Object.assign(timeObj, item);
  });
  return timeObj;
}

// requestAnimationFrame计时器
export function $frameInterval(fn, fre = 0) {
  let time = 0;
  f();
  function f() {
    time += 10;
    if (time > fre) {
      fn();
      time = 0;
    }
    requestAnimationFrame(f);
  }
}
// 判断是否为数组
export function $isArray(type) {
  return Object.prototype.toString.call(type) === "[object Array]";
}

export const $pinyin = (str) => {
  if (typeof str !== "string") return str;
  let result = "";
  let abbreviation = "";
  const reg = /[a-zA-Z0-9]/;
  for (const val of str) {
    let name = "";
    for (const key in pinyin) {
      if (pinyin[key].includes(val)) {
        name = key;
        abbreviation += name[0].toLowerCase();
        break;
      }
    }
    result += reg.test(val) ? val : name;
  }
  return [result.toLowerCase(), abbreviation];
};

//正则搜索
export const $search = (data, value, keys) => {
  // 创建用于存储搜索结果的数组
  let arr = [];
  // 定义搜索函数，这个函数接收两个参数：搜索值和搜索键
  const fn = (item, key) => {
    // 使用正则表达式构造忽略大小写的搜索模式
    const reg = new RegExp(item.toString().toLowerCase(), "i");
    // 将过滤后的搜索结果添加到结果数组中
    arr.push(
      ...data.filter((item) => {
        let test = "";
        // 如果搜索的数据项的类型是数字，则直接搜索数据项
        if (typeof item[key] === "number") {
          test = item[key];
          return reg.test(test);
        }
        // 如果搜索的数据项的类型是字符串，则搜索数据项和拼音
        if (typeof item[key] === "string") {
          test = $pinyin(item[key]);
          return reg.test(test) || reg.test(item[key]);
        }
      })
    );
  };

  // 检查搜索值是否是数组
  if (Array.isArray(value)) {
    // 如果value为数组，则遍历数组的每个值并进行搜索
    value.forEach((val) => {
      // 遍历value中的每个值
      if (Array.isArray(keys)) {
        // 如果keys是数组，则遍历每个搜索键并进行搜索
        keys.map((key) => fn(val || "", key));
      } else {
        // 如果keys不是数组，则直接使用这个搜索键进行搜索
        fn(val || "", keys);
      }
    });
  } else {
    // 如果value不是数组，则直接对这个值进行搜索
    if (Array.isArray(keys)) {
      // 如果keys是数组，则遍历每个搜索键并进行搜索
      keys.map((key) => fn(value || "", key));
    } else {
      // 如果keys不是数组，则直接使用这个搜索键进行搜索
      fn(value || "", keys);
    }
  }

  // 返回搜索结果数组
  return arr;
};

// 防抖（默认延迟执行）
export const $debounce = (() => {
  let timer: Timeout = 0;
  return (callback: () => void, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

/* 清除无意义值 */
export function $removeEmptyField<T>(data, excludes = ["", null, undefined]) {
  let newObj = {};
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
  if (data instanceof Array) {
    newObj = [];
  }
  if (data instanceof Object) {
    for (const attr in data) {
      if (!excludes.includes(data[attr])) {
        if (data[attr] instanceof Object) {
          if (JSON.stringify(data[attr]) === "{}" || JSON.stringify(data[attr]) === "[]") {
            continue;
          }
          newObj[attr] = $removeEmptyField(data[attr]);
        } else if (
          typeof data[attr] === "string" &&
          ((data[attr].indexOf("{") > -1 && data[attr].indexOf("}") > -1) ||
            (data[attr].indexOf("[") > -1 && data[attr].indexOf("]") > -1))
        ) {
          try {
            const attrObj = JSON.parse(data[attr]);
            if (attrObj instanceof Object) {
              newObj[attr] = $removeEmptyField(attrObj);
            }
          } catch (e) {
            newObj[attr] = data[attr];
          }
        } else {
          newObj[attr] = data[attr];
        }
      }
    }
  }
  return newObj as T;
}

/* 对象深度去重 */
export function $objDelRep(arr, key) {
  let data = arr;
  let obj = {};
  data = data.reduce((a, b) => {
    obj[b[key]] ? "" : (obj[b[key]] = true && a.push(b));
    return a;
  }, []);
  return data;
}

/* 深拷贝 */
export function $deepCopy<T>(e): T {
  const t = new WeakMap(),
    r = (e) => {
      const t = Object.prototype.toString.call(e);
      return /^\[object (.*)\]$/.exec(t)[1];
    },
    n = (e) => "Array" === r(e),
    c = (e) => null !== e && ("object" == typeof e || "function" == typeof e),
    o = (e) => {
      const t = r(e);
      return [
        "Boolean",
        "Number",
        "String",
        "Symbol",
        "BigInt",
        "Date",
        "Map",
        "Set",
        "RegExp",
      ].includes(t);
    },
    s = (e) => {
      const t = r(e),
        n = e.constructor,
        c = e.valueOf();
      switch (t) {
        case "Boolean":
        case "Number":
        case "String":
        case "Symbol":
        case "BigInt":
          return Object(c);
        case "Date":
          return new n(c);
        case "RegExp": {
          const { source: t, flags: r, lastIndex: n } = e,
            c = new RegExp(t, r);
          return (c.lastIndex = n), c;
        }
        case "Map": {
          const t = new n();
          return (
            e.forEach((e, r) => {
              t.set(r, u(e));
            }),
            t
          );
        }
        case "Set": {
          const t = new n();
          return (
            e.forEach((e) => {
              t.add(u(e));
            }),
            t
          );
        }
        default:
          return;
      }
    },
    a = (e) => {
      if (void 0 === e.constructor) return Object.create(null);
      if ("function" == typeof e.constructor && (e !== e.constructor || e !== Object.prototype)) {
        const t = Object.getPrototypeOf(e);
        return Object.create(t);
      }
      return {};
    },
    u = (e) => {
      if ("function" == typeof e || !c(e)) return e;
      if (t.has(e)) return t.get(e);
      if (o(e)) return s(e);
      const r = n(e) ? [] : a(e);
      return (
        t.set(e, r),
        Reflect.ownKeys(e).forEach((t) => {
          e.propertyIsEnumerable(t) && (r[t] = u(e[t]));
        }),
        r
      );
    };
  return u(e);
}

/* 对象深度合并 */
export function $deepMearge(obj, target = {}) {
  for (let key in target) {
    let isA = Object.prototype.toString.call(obj[key]) === "[object Object]",
      isB = Object.prototype.toString.call(target[key]) === "[object Object]";
    if (isA && isB) {
      obj[key] = $deepMearge(obj[key], target[key]);
    } else if (Array.isArray(obj[key]) && Array.isArray(target[key])) {
      obj[key] = Array.from(new Set(obj[key].concat(target[key])));
    } else {
      obj[key] = target[key];
    }
  }
  return obj;
}

/* 获取浏览器版本 */
export const $browserV = (() => {
  const ua = navigator.userAgent;
  let browser = "";
  let version = 0;
  if (ua.indexOf("Chrome") > -1) {
    browser = "chrome";
    version = Number(
      ua
        .match(/Chrome\/[\d.]+/)[0]
        .split("/")[1]
        .split(".")[0]
    );
  } else if (ua.indexOf("Safari") > -1) {
    browser = "safari";
    version = Number(
      ua
        .match(/Version\/[\d.]+/)[0]
        .split("/")[1]
        .split(".")[0]
    );
  } else if (ua.indexOf("Firefox") > -1) {
    browser = "firefox";
    version = Number(
      ua
        .match(/Firefox\/[\d.]+/)[0]
        .split("/")[1]
        .split(".")[0]
    );
  }
  return { browser, version };
})();

/* 排序 */
export function $typeSort(data, key, rev = true) {
  const num = typeof key == "boolean" ? (key ? 1 : -1) : rev ? 1 : -1;
  return data.sort((a, b) => {
    if (typeof data[0] == "object") {
      if (typeof a[key] == "number") {
        return (a[key] - b[key]) * num;
      }
      if (typeof a[key] == "string") {
        return a[key].toString().localeCompare(b[key].toString()) * num;
      }
    }

    if (typeof a == "number") {
      return (a - b) * num;
    }

    if (typeof a == "string") {
      return a.toString().localeCompare(b.toString()) * num;
    }
  });
}

/* 保存为文件 */
export function $savefiles(data, name) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
}

/* 图片压缩 */
export function $imageOptimizer(obj) {
  // 先判断Dom树是否存在上次创建的canvas
  const c1 = document.createElement("canvas");
  c1.classList.add("imageOptimizer");
  document.body.appendChild(c1);
  const c2 = document.querySelector(".imageOptimizer");
  let files = "";
  let Blobs = "";
  let name = "";
  let ratio = obj.ratio || 1; //压缩率
  let maxsize = obj.maxsize || 1024; //超过多大进行压缩
  let width = obj.width || 10000; //压缩尺寸
  if (obj.el || obj.file) {
    files = (obj.el && obj.el.files[0]) || obj.file;
    name = files.name;
    let reader = new FileReader();
    reader.readAsDataURL(files);
    let p1 = new Promise(function (resolve, reject) {
      reader.onload = function (e) {
        resolve(e);
      };
      reader.onerror = function (e) {
        reject(e);
      };
    });
    p1.then(
      (e) => {
        let result = e.target.result;
        // 判断图片占用大小
        if (e.total / 1024 > maxsize) {
          let p2 = new Promise(function (resolve, reject) {
            let image = new Image();
            image.src = result;
            image.onload = function () {
              resolve(image);
            };
            image.onerror = function (e) {
              reject(e);
            };
          });
          p2.then(
            (e) => {
              let canvas = document.querySelector("canvas");
              let context = canvas.getContext("2d");
              // 如果图片尺寸大于规定尺寸，则压缩尺寸
              let scale = width / e.width;
              if (scale < 1) {
                canvas.width = e.width * scale;
                canvas.height = e.height * scale;
                context.drawImage(e, 0, 0, e.width * scale, e.height * scale);
              } else {
                canvas.width = e.width;
                canvas.height = e.height;
                context.drawImage(e, 0, 0, e.width, e.height);
              }
              let dataUrl = canvas.toDataURL("image/jpeg", ratio);
              Blobs = dataUrl;
              let file = dataURLtoFile(Blobs, name);
              obj.success(formData(file), file, Blobs);
              c2.remove();
            },
            (e) => {
              obj.fail && obj.fail(e);
            }
          );
        } else {
          let file = dataURLtoFile(result, name);
          obj.success(formData(file), file, result);
          c2.remove();
        }
      },
      (e) => {
        obj.fail && obj.fail(e);
      }
    );
  }

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime,
    });
  }

  function formData(file) {
    const data = new FormData();
    data.append("file", file);
    return data;
  }
}

/* Promise定时器 */
export function $promiseTimeout(fn, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, delay);
  });
}

/* 判断是否为移动端 */
export const $isPhone = (() => /mobile/i.test(navigator.userAgent))();

/* 判断表单指定属性名是否为空 */
export const $existEmpty = (obj, arr: string[] = []) =>
  (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "").length > 0
    ? (arr.length > 0 ? arr : Object.keys(obj)).filter((key) => obj[key] === "")
    : false;

/* 节流(立即执行) */
export const $throttleInstant = (() => {
  let last = 0;
  return (callback, wait = 800) => {
    let now = +new Date();
    if (now - last > wait) {
      callback();
      last = now;
    }
  };
})();

/* 防抖立即执行 */
export const $debounceInstant = (() => {
  let timer;
  return (fn, delay, ...args) => {
    let context = this;
    if (timer) clearTimeout(timer);
    let callNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    if (callNow) fn.apply(context, args);
  };
})();

/* 视差动画 */
export class $Parallax {
  x = 0;
  y = 0;
  rx = 0;
  ry = 0;
  fn = null;
  constructor(fn, { x = 0, y = 0, rx = 0, ry = 0 }) {
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
    this.fn = fn;
  }

  move(e) {
    const { innerWidth: w, innerHeight: h } = window;
    const x = Number(((e.pageX - w / 2) / (w / 2)).toFixed(2));
    const y = Number(((e.pageY - h / 2) / (h / 2)).toFixed(2));

    const moveX = this.x * x;
    const moveY = this.y * y;

    const degX = this.rx * y;
    const degY = this.ry * -x;

    this.fn({ moveX, moveY, degX, degY });
  }
}

/* 查看图片 */
export class $ScaleImage {
  src: string;
  scale: number;
  x: number;
  y: number;
  overlay!: HTMLElement;
  zoomInButton!: HTMLElement;
  zoomOutButton!: HTMLElement;
  closeButton!: HTMLElement;
  img!: HTMLImageElement;
  isDragging!: boolean;
  startX!: number;
  startY!: number;

  constructor(src: string) {
    this.src = src;
    this.scale = 1;
    this.x = 0;
    this.y = 0;

    this.createOverlay();
    this.creatButton();
    this.createImage();
    this.bindEvents();
  }

  /* 创建容器 */
  createOverlay() {
    this.overlay = document.createElement("div");
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      display: flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      transition: all 0.25s;
      z-index: 3;
      opacity: 0;
    `;
    document.body.appendChild(this.overlay);

    setTimeout(() => {
      this.overlay.style.opacity = "1";
    });
  }

  /* 创建图片 */
  createImage() {
    this.img = document.createElement("img");
    this.img.style.cssText = `
      max-width: 75%;
      max-height: 75%;
      transform: scale(${this.scale});
      user-select: none;
      transition: all 0.25s;
    `;
    this.img.src = this.src;
    this.overlay.appendChild(this.img);
  }

  /* 创建按钮 */
  creatButton() {
    const button_style = `
    position: absolute;
    font-size: 50px;
    color: #fff;
    z-index: 1;
    `;

    //关闭按钮
    this.closeButton = document.createElement("button");
    this.closeButton.style.cssText = button_style;
    this.closeButton.className += "cursor-pointer iconfont wzry-guanbi";
    this.closeButton.style.top = "0";
    this.closeButton.style.right = "0";
    this.closeButton.style.transform = "translate(-100%, 100%) scale(0.75)";

    //放大按钮
    this.zoomInButton = document.createElement("button");
    this.zoomInButton.style.cssText = button_style;
    this.zoomInButton.className += "cursor-pointer iconfont wzry-fangda";
    this.zoomInButton.style.bottom = "0";
    this.zoomInButton.style.left = "50%";
    this.zoomInButton.style.transform = "translate(-150%, -100%)";

    //缩小按钮
    this.zoomOutButton = document.createElement("button");
    this.zoomOutButton.style.cssText = button_style;
    this.zoomOutButton.className += "cursor-pointer iconfont wzry-suoxiao";
    this.zoomOutButton.style.bottom = "0";
    this.zoomOutButton.style.left = "50%";
    this.zoomOutButton.style.transform = "translate(50%, -100%)";

    this.overlay.appendChild(this.closeButton);
    this.overlay.appendChild(this.zoomInButton);
    this.overlay.appendChild(this.zoomOutButton);
  }

  /* 绑定事件 */
  bindEvents() {
    this.overlay.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        this.scale /= 1.25;
        if (this.scale < 0.25) this.scale = 0.25;
      } else {
        this.scale *= 1.25;
        if (this.scale > 20) this.scale = 20;
      }
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.img.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });

    /* 拖动 */
    document.addEventListener("mousedown", (event) => {
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.isDragging = true;
      this.img.style.transition = "all 0s";
    });
    document.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    });
    document.addEventListener("mousemove", (event) => {
      if (!this.isDragging) return;
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    /* 兼容移动端 */
    document.addEventListener("touchstart", (event) => {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.isDragging = true;
      this.img.style.transition = "all 0s";
    });
    document.addEventListener("touchend", () => {
      this.isDragging = false;
      this.img.style.transition = "all 0.25s";
    });
    document.addEventListener("touchmove", (event) => {
      if (!this.isDragging) return;
      const deltaX = event.changedTouches[0].clientX - this.startX;
      const deltaY = event.changedTouches[0].clientY - this.startY;
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.x += deltaX / this.scale;
      this.y += deltaY / this.scale;
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    });

    this.closeButton.addEventListener("click", () => {
      this.overlay.style.opacity = "0";
      setTimeout(() => {
        this.overlay.remove();
      }, 250);
    });

    /* 缩放 */
    const fn1 = () => {
      this.scale *= 2;
      this.scale = Math.min(this.scale, 20);
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    };
    const fn2 = () => {
      this.scale /= 2;
      this.scale = Math.max(this.scale, 0.25);
      this.img.style.transform = `scale(${this.scale}) translate(${this.x}px, ${this.y}px)`;
    };
    this.zoomInButton.addEventListener("mouseup", fn1);
    this.zoomInButton.addEventListener("touchend", fn1);
    this.zoomOutButton.addEventListener("mouseup", fn2);
    this.zoomOutButton.addEventListener("touchend", fn2);
  }
}
