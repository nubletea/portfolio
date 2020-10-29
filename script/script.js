const SECTIONS = document.querySelectorAll(".tab_list");
const NAV_BTNS = document.querySelectorAll(".button-nav a");
const NAV_INPUTS = document.querySelectorAll(".gnb input");
const HAN_BTNS = document.querySelectorAll(".ham_nav_list a");
const HAM_ICON = document.querySelector(".hamburger_icon");
/* DOM 형식 */

// const DOM_LOAD = {
//   NAV_BAR: function () {
//     for (let i = 0; i < NAV_INPUTS.length; i++) {
//       NAV_INPUTS[i].onclick = nav_bar;
//     }
//   },
//   BTN_NAV: function () {
//     for (let i = 0; i < NAV_BTNS.length; i++) {
//       NAV_BTNS[i].onclick = btn_nav;
//     }
//   },
//   HAM_NAV: function () {
//     for (let i = 0; i < HAN_BTNS.length; i++) {
//       HAN_BTNS[i].onclick = ham_nav;
//     }
//   },
//   HAM_CALL: function () {
//     HAM_ICON.onclick = ham_call;
//   },
// };
/* DOM - load */
// window.onload = {
//   nav_bar: DOM_LOAD.NAV_BAR(),
//   btn_nav: DOM_LOAD.BTN_NAV(),
//   ham_nav: DOM_LOAD.HAM_NAV(),
//   ham_call: DOM_LOAD.HAM_CALL(),
// };
const addEventListener = (eventList, fn) => {
  for (let i = 0; i < eventList.length; i++) {
    eventList[i].onclick = fn;
  }
};
window.addEventListener("DOMContentLoaded", (e) => {
  // init

  // event를 여러곳에 걸지 않고 작업(예제)
  document.querySelector(".arrow").addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "expand_less":
        arrowFn(-1);
        break;
      case "expand_more":
        arrowFn(1);
        break;
      default:
        new Error("error");
        break;
    }
  });

  // 위와같은 방식으로 바꿔보는것도 좋음
  addEventListener(NAV_INPUTS, nav_bar);
  addEventListener(NAV_BTNS, btn_nav);
  addEventListener(HAN_BTNS, ham_nav);
  addEventListener([HAM_ICON], ham_call);
});

///스크롤 작업///
window.addEventListener("wheel", function (e) {
  if (e.deltaY < 0 && sc.sc_is === true) {
    sc.sc_is = false;
    arrowFn(-1);
  } else if (e.deltaY > 0 && sc.sc_is === true) {
    sc.sc_is = false;
    arrowFn(1);
  } else {
    return;
  }
  setTimeout(() => {
    sc.sc_is = true;
  }, 500);
});

// 오브젝트 모음 //
const sc = {
  sc_is: true,
};
const nav = {
  set_Attr: function (ME, value) {
    ME.setAttribute("value", value);
  },
  for_set_Attr: function (ME, value) {
    for (let i = 0; i < ME.length; i++) {
      nav.set_Attr(ME[i], value);
    }
  },
};
const style_change = {
  top: function (ME, count, value) {
    for (let i = count; i < ME.length; i++) {
      ME[i].style.top = value;
    }
  },
};
const count = {
  arrow: 0,
  arr_button: [],
  arr_ham: [],
  ham_is: true,
  for_arr_push: function (arrname, ME) {
    for (let i = 0; i < ME.length; i++) {
      arrname.push(ME[i]);
    }
  },
};
const class_change = {
  remove: function (ME, class_name) {
    for (let i = 0; i < ME.length; i++) {
      ME[i].classList.remove(class_name);
    }
  },
  add: function (ME, class_name) {
    ME.classList.add(class_name);
  },
};
//버튼 콜백
function aro_col(btn, arr, count) {
  style_change.top(arr, 0, "-100%");
  style_change.top(arr, count, "100%");
  class_change.remove(btn, "active");
  class_change.add(btn[count], "active");
  class_change.remove(arr, "active");
  class_change.add(arr[count], "active");
  arr[count].style.top = "0";
}
//button nav
function btn_nav() {
  count.for_arr_push(count.arr_button, NAV_BTNS);
  count.arrow = count.arr_button.indexOf(this);
  aro_col(NAV_BTNS, SECTIONS, count.arrow);
}
//ham_call
function ham_call() {
  if (count.ham_is === true) {
    ham_col(HAM_ICON, 0, "close", false);
  } else {
    ham_col(HAM_ICON, "-100%", "menu", true);
  }
}
function ham_col(ME, value, HTML, is) {
  let ham = document.querySelector(".mobile_menu");
  ham.style.left = value;
  ME.innerHTML = '<span class="material-icons">' + HTML + "</span>";
  count.ham_is = is;
  console.log(count.ham_is);
}
//hamburger nav
function ham_nav() {
  ham_call();
  count.for_arr_push(count.arr_ham, HAN_BTNS);
  count.arrow = count.arr_ham.indexOf(this);
  aro_col(HAN_BTNS, SECTIONS, count.arrow);
}

const arrowFn = (step) => {
  const { arrow } = count;
  const limit = SECTIONS.length;
  let pos = arrow + step;
  if (limit == pos) {
    pos = 0;
  } else if (pos < 0) {
    pos = limit - 1;
  }
  count.arrow = pos;
  aro_col(NAV_BTNS, SECTIONS, pos);
  aro_col(HAN_BTNS, SECTIONS, pos);
};
///네비게이션 클릭시///
function nav_bar() {
  let checked = this.checked;
  if (checked === true && this.getAttribute("value") === "Y") {
    nav.for_set_Attr(NAV_INPUTS, "N");
    this.checked = false;
  } else {
    nav.for_set_Attr(NAV_INPUTS, "N");
    nav.set_Attr(this, "Y");
  }
}
