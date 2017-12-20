var ESC_KEYCODE = 27;
var EMPTY_STRING = "";

var addMessageError = function (obj) {
  obj.classList.remove("modal-error");
  obj.offsetWidth = obj.offsetWidth;
  obj.classList.add("modal-error");
};

var removeMessageError = function (obj) {
  obj.classList.remove("modal-error");
};

var checkContent = function (obj, event) {
  if (!obj.value) {
    event.preventDefault();
    addMessageError(obj);
  } else {
    removeMessageError(obj);
    localStorage.setItem("name", contactName.value);
    localStorage.setItem("email", contactEmail.value);
  }
};

var checkActiveElement = function (obj) {
  if (obj === document.activeElement) {
    return true;
  }
};

var checkStorageValue = function (storage, obj) {
  if (storage) {
    obj.value = storage;
  }
};

var resetForm = function () {
  contactName.value = EMPTY_STRING;
  contactEmail.value = EMPTY_STRING;
  contactDescription.value = EMPTY_STRING;
  removeMessageError(contactName);
  removeMessageError(contactEmail);
  removeMessageError(contactDescription);
};

var pressEsc = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup(contactPopup, event);
    closePopup(mapPopup, event);
  }
};

var openPopup = function (obj, event) {
  event.preventDefault();
  obj.classList.add("modal-show");
  contactName.focus();
  checkStorageValue(storageName, contactName);
  checkStorageValue(storageEmail, contactEmail);
}

var closePopup = function (obj, event) {
  if (!checkActiveElement(contactName) || !checkActiveElement(contactEmail) || !checkActiveElement(contactDescription)) {
    event.preventDefault();
    if (obj.classList.contains("modal-show")) {
      obj.classList.remove("modal-show");
    }
    resetForm();
  }
};

window.addEventListener("keydown", function(event) {
  pressEsc(event);
});

// Форма обратной связи

var contactOpen = document.querySelector(".js-open-contact");
var contactPopup = document.querySelector(".modal-contact");
var contactClose = contactPopup.querySelector(".modal-close");
var contactForm = contactPopup.querySelector(".modal-form");
var contactName = contactPopup.querySelector("[name=name]");
var contactEmail = contactPopup.querySelector("[name=email]");
var contactDescription = contactPopup.querySelector("[name=description]");
var storageName = localStorage.getItem("name");
var storageEmail = localStorage.getItem("email");

contactOpen.addEventListener("click", function(event) {
  openPopup(contactPopup, event);
});

contactClose.addEventListener("click", function(event) {
  closePopup(contactPopup, event);
});

contactForm.addEventListener("submit", function(event) {
  checkContent(contactName, event);
  checkContent(contactEmail, event);
  checkContent(contactDescription, event);
});

contactName.addEventListener("blur", function(event) {
  checkContent(contactName, event);
});

contactEmail.addEventListener("blur", function(event) {
  checkContent(contactEmail, event);
});

contactDescription.addEventListener("blur", function(event) {
  checkContent(contactDescription, event);
});

// Интерактивная карта

var mapOpen = document.querySelector(".js-open-map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

mapOpen.addEventListener("click", function(event) {
  openPopup(mapPopup, event);
});

mapClose.addEventListener("click", function(event) {
  closePopup(mapPopup, event);
});
