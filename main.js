const API = "http://localhost:8000/contact";

let name = document.querySelector("#inp-name");
let surname = document.querySelector("#inp-Surname");
let photo = document.querySelector("#inp-Photo");
let number = document.querySelector("#inp-Number");
let email = document.querySelector("#inp-Email");
let btnAdd = document.querySelector("#btn-add");
let contactCard = document.querySelector(".contact-card");

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
  let contact = await fetch(API)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  contactCard.innerHTML = "";

  contact.forEach((element) => {
    console.log(element);
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
    <button>EDIT</button>
    </div>
    `;
    contactCard.append(newElem);
  });
}
render();

// ! Функция рендер для обновления =========== конец ===========

async function deleter(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}

// !

async function editer(id) {
  await fetch(`${API}/${id}`)
    .then((res) => res.json())
    .then((data) => {});
  editer(console.log(data));
  render();
}
