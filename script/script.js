///스크롤 작업///
window.addEventListener("wheel", function (e) {
  if (e.deltaY < 0 && sc.sc_is === true) {
    sc.sc_is = false;
    arrow_up();
  } else if (e.deltaY > 0 && sc.sc_is === true) {
    sc.sc_is = false;
    arrow_down();
  } else {
    return;
  }
  setTimeout(() => {
    sc.sc_is = true;
  }, 500);
});

const SECTIONS = document.querySelectorAll(".tab_list");
const NAV_BTNS = document.querySelectorAll(".button-nav a");
const NAV_INPUTS = document.querySelectorAll(".gnb input");
const HAN_BTNS = document.querySelectorAll(".ham_nav_list a");

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
function btn_nav(ME) {
  count.for_arr_push(count.arr_button, NAV_BTNS);
  count.arrow = count.arr_button.indexOf(ME);
  aro_col(NAV_BTNS, SECTIONS, count.arrow);
}
//ham_call
function ham_call(ME) {
  if (count.ham_is === true) {
    ham_col(ME, 0, "close", false);
  } else {
    ham_col(ME, "-100%", "menu", true);
  }
}
function ham_col(ME, value, HTML, is) {
  let ham = document.querySelector(".mobile_menu");
  ham.style.left = value;
  ME.firstChild.innerHTML = HTML;
  count.ham_is = is;
}
//hamburger nav
function ham_nav(ME) {
  let ham_icon = document.querySelector(".hamburger_icon");
  ham_call(ham_icon);
  count.for_arr_push(count.arr_ham, HAN_BTNS);
  count.arrow = count.arr_ham.indexOf(ME);
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
};

// //up 버튼
// function arrow_up() {
//   if (count.arrow === 0) {
//     count.arrow = SECTIONS.length - 1;
//     aro_col(NAV_BTNS, SECTIONS, count.arrow);
//     //   aro_col(HAN_BTNS, SECTIONS, count.arrow);
//   } else {
//     count.arrow -= 1;
//     aro_col(NAV_BTNS, SECTIONS, count.arrow);
//     //   aro_col(HAN_BTNS, SECTIONS, count.arrow);
//   }
// }
// //down 버튼
// function arrow_down() {
//   if (count.arrow === SECTIONS.length - 1) {
//     count.arrow = 0;
//     aro_col(NAV_BTNS, SECTIONS, count.arrow);
//     //   aro_col(HAN_BTNS, SECTIONS, count.arrow);
//   } else {
//     count.arrow += 1;
//     aro_col(NAV_BTNS, SECTIONS, count.arrow);
//     //   aro_col(HAN_BTNS, SECTIONS, count.arrow);
//   }
// }
///네비게이션 클릭시///

function nav_bar(ME) {
  let checked = ME.checked;
  if (checked === true && ME.getAttribute("value") === "Y") {
    nav.for_set_Attr(NAV_INPUTS, "N");
    ME.checked = false;
  } else {
    nav.for_set_Attr(NAV_INPUTS, "N");
    nav.set_Attr(ME, "Y");
  }
}
