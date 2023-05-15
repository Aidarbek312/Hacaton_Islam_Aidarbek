const API = "http://localhost:8000/contact";

let name = document.querySelector("#inp-name");
let surname = document.querySelector("#inp-Surname");
let photo = document.querySelector("#inp-Photo");
let number = document.querySelector("#inp-Number");
let email = document.querySelector("#inp-Email");
let btnAdd = document.querySelector("#btn-add");
let btnSaveEdit = document.querySelector("#btn-saveEdit");
let contactCard = document.querySelector(".contact-card");
let searhInp = document.querySelector(".innSearch");

let editId = 0;

// ! Добавление карточки контакта =========== старт ===========
btnAdd.addEventListener("click", async function () {
  // собираем обьект для добавления в db.json
  let obj = {
    name: name.value,
    surname: surname.value,
    photo: photo.value,
    number: number.value,
    email: email.value,
  };
  if (
    !obj.name.trim() ||
    !obj.surname.trim() ||
    !obj.photo.trim() ||
    !obj.number.trim() ||
    !obj.email.trim()
  ) {
    alert("Заполните все поля");
    return;
  }
  //   запрос для добавления
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  //   Очищаем инпуты
  name.value = "";
  surname.value = "";
  photo.value = "";
  number.value = "";
  email.value = "";

  render(); //   отрисовка - рендер обнавленного db.json
});
// ! Добавление карточки контакта =========== конец ===========

// ! Функция рендер для обновления =========== старт ===========
async function render() {
  let contact = await fetch(`${API}?q=${searhVal}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  contactCard.innerHTML = "";

  contact.forEach((element) => {
    // console.log(element);
    let newElem = document.createElement("div");
    newElem.innerHTML = `
    <div class="card">
    <img src="${element.photo}" alt="" style="width:100%">
    <div class="card-body">
    <p>${element.name}</p>
    <p>${element.surname}</p>
    <p>${element.number}</p>
    <p>${element.email}</p></div>
    <button class="btn-del" onclick="deleter(${element.id})">DEL</button>
    <button onclick="editer(${element.id})" >EDIT</button>
    </div>
    `;
    contactCard.append(newElem);
  });
}
render();

// ! Функция рендер для обновления =========== конец ===========

// ! Функция удаления =========== начало ===========
async function deleter(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}
// ! Функция удаления =========== конец ===========

// ! Функция изменения =========== начало ===========
async function editer(id) {
  editId = id;
  let data = await fetch(`${API}/${id}`).then((res) => res.json());
  console.log(data);
  btnSaveEdit.style.display = "block";
  btnAdd.style.display = "none";

  if (data?.name) {
    name.value = data.name;
    surname.value = data.surname;
    photo.value = data.photo;
    number.value = data.number;
    email.value = data.email;
  }

  render();
}

btnSaveEdit.addEventListener("click", () => {
  let obj = {
    name: name.value,
    surname: surname.value,
    photo: photo.value,
    number: number.value,
    email: email.value,
  };
  if (
    !obj.name.trim() ||
    !obj.surname.trim() ||
    !obj.photo.trim() ||
    !obj.number.trim() ||
    !obj.email.trim()
  ) {
    alert("Заполните все поля");
    return;
  }

  //запрос на изменение контакта

  fetch(`${API}/${editId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => {
    render();
    //   Очищаем инпуты
    name.value = "";
    surname.value = "";
    photo.value = "";
    number.value = "";
    email.value = "";

    btnAdd.style.display = "block";
    btnSaveEdit.style.display = "none";

    editId = 0;
  });
});
// ! Функция изменения =========== конец ===========

searhInp.addEventListener("input", (e) => {
  searhVal = e.target.value;
  searhVal.value = "";
  render();
});
