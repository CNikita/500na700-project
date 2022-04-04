const burgerMenu = document.querySelector(".burger-menu");
const burgerMenuOpen = document.querySelector(".burger-menu-open");
const burgerMenuClose = document.querySelector(".burger-menu-close");
const menuListItem = document.getElementsByClassName("menu-list")[0].children;
const fadeElement = document.createElement('div');
const questionsElements = document.getElementsByClassName("questions__element");
const burgerMenuElements = document.getElementsByClassName("burger-menu__element");

fadeElement.classList.add("fade");
fadeElement.addEventListener("click", function (event) {
  event.preventDefault()
  document.body.style.overflow = "initial";
  fadeElement.remove();
  isOpenBurgerMenu(false);
  [].forEach.call(menuListItem, function (elem) {
    elem.classList.remove("active");
    elem.children[1].classList.remove("active-dropdown");
  });
})

//START burger-menu
function isOpenBurgerMenu(open) {
  burgerMenuOpen.children[0].style.transform = open ? 'rotate(90deg)' : '';
  burgerMenuClose.children[0].style.transform = open ? '' : 'rotate(90deg)';
  burgerMenu.style.right = open ? '0px' : '-250px';
  open ? document.body.prepend(fadeElement) : fadeElement.remove();
  document.body.style.overflow = open ? "hidden" : "initial";
}

burgerMenuOpen.addEventListener("click", () => isOpenBurgerMenu(true));
burgerMenuClose.addEventListener("click", () => isOpenBurgerMenu(false));
// END burger-menu

// START submenu-visibility
for (let i = 0; i < menuListItem.length; i++) {
  menuListItem[i].addEventListener("click", function (event) {
    if (event.target.href == location.href) { event.preventDefault() }
    if (!this.classList.contains("active")) {
      [].forEach.call(menuListItem, (elem) => removeOrAdd(elem, 'remove'));
      removeOrAdd(this, 'add');
    } else {
      removeOrAdd(this, 'remove');
    }
  });
};

function removeOrAdd(elem, func) {
  elem.classList[func]("active");
  elem.children[1].classList[func]("active-dropdown")
  if (func == "remove") {
    fadeElement[func]();
    document.body.style.overflow = "initial"
  } else if (func == "add") {
    document.body.prepend(fadeElement)
    document.body.style.overflow = "hidden"
  }
}
// END submenu-visibility

// START SLIDER
let padding = document.documentElement.scrollWidth < 576 ? "15px" : "5rem"
var splide = new Splide('.splide', {
  arrows: false,
  type: 'loop',
  padding: padding,
  pagination: false,
  start: 1,
  gap: 20,
});
splide.mount();

var splide_news = new Splide('.news-splide', {
  arrows: false,
  type: 'loop',
  pagination: false,
  start: 0,
  gap: 20,
  fixedWidth: 200,
  height: 412,
});
splide_news.mount();
// END SLIDER

// START ACCORDIONS
function accordion(elements, childProp) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function (event) {
      if (event.target.href == location.href) { event.preventDefault() }
      const panel = this[childProp][1];
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.classList.remove("active");
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.classList.add("active");
      }
    });
  }
}
accordion(questionsElements, 'childNodes')
accordion(burgerMenuElements, 'children')
// END ACCORDIONS

// START MASK
document.addEventListener('DOMContentLoaded', () => {
  const mask = (dataValue, options) => {
    const elements = document.querySelectorAll(`[data-mask="${dataValue}"]`)
    if (!elements) return
    elements.forEach(el => { IMask(el, options) })
  }
  mask('phone', { mask: '+{7}(000)000-00-00' })
  mask('date', { mask: Date, min: new Date(1900, 0, 1), })
  mask('time', { mask: '00:00' })
})
// END MASK

// START Validation
const form = document.forms.subscription
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const errorElements = document.getElementsByClassName("error");
  while (errorElements.length != 0) {
    errorElements[0].remove()
  }
  let countError = 4
  for (var i = 0; i < form.elements.length; i++) {
    switch (form.elements[i].name) {
      case 'email':
        const email = form.elements[i].value;
        if (!/\S+@\S+\.\S+/.test(email)) {
          let errorEmail = document.createElement('div')
          errorEmail.className = 'error'
          errorEmail.innerHTML = 'Введите Email в формате example@example.com'
          form.elements[i].before(errorEmail)
        } else { countError-- }
        break;
      case 'date':
        const date = form.elements[i].value;
        if (!/^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/.test(date)) {
          let errorDate = document.createElement('div')
          errorDate.className = 'error'
          errorDate.innerHTML = 'Введите дату в формате ДД.ММ.ГГГ'
          form.elements[i].before(errorDate)
        } else { countError-- }
        break;
      case 'phone':
        const phone = form.elements[i].value;
        if (phone.length != 16) {
          let errorPhone = document.createElement('div')
          errorPhone.className = 'error'
          errorPhone.innerHTML = 'Введите номер в формате +7(911)123-45-67'
          form.elements[i].before(errorPhone)
        } else { countError-- }
        break;
      case 'time':
        const time = form.elements[i].value;
        console.log(time)
        if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)) {
          let errorTime = document.createElement('div')
          errorTime.className = 'error'
          errorTime.innerHTML = 'Введите время в формате 23:59'
          form.elements[i].before(errorTime)
        } else { countError-- }
        break;
    }
  }

  if (!countError) {
    sendData(form)
    let errorEl = document.createElement('span')
    errorEl.style.color = 'green'
    errorEl.innerHTML = 'Вы успешно подписались'
    form.append(errorEl)
    setTimeout(() => errorEl.remove(), 2000);
    form.reset()
  }
})
// END Validation

function sendData(data) {
  // Отправка данных на сервер
  console.log(JSON.stringify({
    "email": data.email.value,
    "date": data.date.value,
    "phone": data.phone.value,
    "time": data.time.value
  }))
}