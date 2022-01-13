const loader = document.querySelector('.file-loader');
const image = document.querySelector('.resume-photo');
const windowAddBlock = document.querySelector('.modal-add');
const windowAddDescr = document.querySelector('.modal');
const mainInfo = document.querySelector('.main-info')
const addBlockButton = document.querySelector('.add-block');
const body = document.querySelector('body');
const fullName = document.querySelector('.info-name');
const birthday = document.querySelector('.info-birthday');
const phone = document.querySelector('.info-phone');
const email  = document.querySelector('.info-email');
const submitButton = document.querySelector('.info-button');
const headerInfo = document.querySelector('.header-info');

addBlockButton.addEventListener('click', ()=>{
    modalWindowOn(windowAddBlock);
    closeChecking(windowAddBlock);
    const confirmButton = windowAddBlock.querySelector('.modal-confirm');
    const title = windowAddBlock.querySelector('.modal-title');
    confirmButton.addEventListener('click', (e) => {
        addBlock(title.value);
        modalWindowOff(windowAddBlock);
        title.value = '';
    });
});

submitButton.addEventListener('click', ()=>{
    validMail();
    validPhone();
    validFullName();
});

loader.addEventListener('change', function(e) {
    const file = loader.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      image.src = reader.result;
    }
      reader.readAsDataURL(file);
});

function modalWindowOff(modalWindow) {
    modalWindow.classList.add('hidden');
    body.classList.remove('stop-scrolling');
}

function modalWindowOn(modalWindow) {
    modalWindow.classList.remove('hidden');
    body.classList.add('stop-scrolling');
}

function closeChecking(modalWindow){
    const cancelButton = modalWindow.querySelector('.modal-cancel');
    cancelButton.addEventListener('click', ()=>{modalWindowOff(modalWindow)});
}

function createElement(elementName,elementClasses){
    const element = document.createElement(elementName);
    const classes = elementClasses;
    classes.forEach((e)=>{
        element.classList.add(e);
    });
    return element
}  
 
function addBlock(text){
    const parent = createElement('div',['info-block']);
    const title = createElement('div',['info-block-title']);
    title.innerText = text;
    const button = addButton(); 

    parent.append(title,button);
    mainInfo.append(parent);
    debugger
}

function addButton(){
    const button = createElement('button',['add-info']);
    button.innerText = 'Add';
    button.addEventListener('click', ()=>{
        modalWindowOn(windowAddDescr);
        closeChecking(windowAddDescr);

        const confirmButton = windowAddDescr.querySelector('.modal-confirm');
        const title = windowAddDescr.querySelector('.modal-title');
        const description = windowAddDescr.querySelector('.modal-description');
        const buttonParent = button.parentElement;

        confirmButton.addEventListener('click', () => {
            addChild(title.value,description.value,buttonParent);
            modalWindowOff(windowAddDescr);
            title.value = '';
            description.value = '';
        });
    })
    return button;
}

function addChild(title,descr,parent){
    const titleElem = createElement('div',['add-info__title']);
    const descrElem = createElement('div',['add-info__description']);
    const childParent = createElement('div',['add-info__item']);
    const parentElem = parent;
    titleElem.innerText = title;
    descrElem.innerText = descr;
    childParent.append(titleElem);
    childParent.append(descrElem);
    parentElem.append(childParent)
}

function validMail() {
    const values = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    const valid = values.test(email.value);
    if (!valid){
        alert('Адрес электронной почты введен неправильно!')
    }
    return valid
}
 
function validPhone() {
    const values = /^\d[\d\(\)\ -]{4,14}\d$/;
    const valid = values.test(phone.value);
    if (!valid){
        alert('Номер телефона введен неправильно!')
    }
    return valid;
} 

function validFullName() {
    const values = /([а-яА-яa-zA-z]+\s)+([а-яА-яa-zA-z]+)/ig;
    const valid = values.test(fullName.value);
    if (!valid){
        alert('ФИО введена неправильно!')
    }
    return valid;
}
