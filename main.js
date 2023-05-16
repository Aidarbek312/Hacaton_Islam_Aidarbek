const API = "http://localhost:8000/contact";
let name = document.querySelector("#inp-name");
let photo = document.querySelector("#inp-Photo");
let name2 = document.querySelector("#inp-name2");
let photo2 = document.querySelector("#inp-Photo2");
let btnAdd = document.querySelector("#btn-add");
let btnSaveEdit = document.querySelector("#btn-saveEdit");
let contactCard = document.querySelector(".contact-card");
let searhInp = document.querySelector(".innSearch");
let btnAddModal = document.querySelector(".btn-add-modal");
let mainModal = document.querySelector(".main-modal");
let btnClose = document.querySelector(".btn-closer");
let btnAddinmodal = document.querySelector("#btn-addmodal");
let btnPub = document.querySelector("#btnPublick");
let pulicks = document.querySelector("#subscribers1");
let subscribers1 = document.getElementById("subscribers1");

let searhVal = ""; // глобальная видимость для поиска
let editId = 2; // глобальная видимость для добавления ID

// ! Добавление карточки контакта =========== старт ===========
btnAdd.addEventListener("click", async function () {
  // собираем обьект для добавления в db.json
  let obj = {
    name: name.value,
    photo: photo.value,
  };
  if (!obj.name.trim() || !obj.photo.trim()) {
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
  photo.value = "";
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
    <div class="card" onmouseover="showbutton(${element.id})" onmouseout="hidebutton(${element.id})">
      <div class="photo">
        <button class="btn-del" onclick="deleter(${element.id})" id="btn-del${element.id}">X</button>
          <img
          src="${element.photo}"
          class="img-card"
          style="width: 100%"
          alt="Картинка)"
          />
      </div>
          <div class="card-body">
            <p>Name: ${element.name}</p>
          </div>
        </div>
      </div>
    </div>
    `;
    contactCard.append(newElem);

    let pubss = fetch(API)
      .then((res) => res.json())
      .then((data) => {
        let pulicks2 = data.length;
        subscribers1.innerText = pulicks2;
        console.log(data.length);
      });
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

// ! Modal adder start =====================
function publication() {
  mainModal.style.display = "block";
}
function publicationX() {
  mainModal.style.display = "none";
}
function showbutton(id) {
  document.querySelector("#btn-del" + id).style.display = "block";
}
function hidebutton(id) {
  document.querySelector("#btn-del" + id).style.display = "none";
}
// ! Modal adder end =====================
function subscribe() {
  let subscribers = document.getElementById("subscribers");
  let count = parseInt(subscribers.innerText);
  subscribers.innerText = count + 1;
}
