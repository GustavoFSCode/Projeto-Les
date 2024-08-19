// Seleção de elementos do DOM
var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    imgInput = document.querySelector('.img'),
    imgHolder = document.querySelector('.imgholder'),
    form = document.querySelector('form'),
    formInputFields = document.querySelectorAll('form input'),
    uploadimg = document.querySelector("#uploadimg"),
    Name = document.getElementById("name"),
    genero = document.getElementById("genero"),
    cpf = document.getElementById("cpf"),
    rg = document.getElementById("rg"),
    nascimento = document.getElementById("sDate"),
    cep = document.getElementById("cep"),
    estado = document.getElementById("estado"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    entries = document.querySelector(".showEntries"),
    tabSize = document.getElementById("table_size"),
    userInfo = document.querySelector(".userInfo"),
    table = document.querySelector("table"),
    filterData = document.getElementById("search");

// Carregar dados do localStorage ou iniciar com um array vazio
let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
let getData = [...originalData];

// Variáveis de controle
let isEdit = false, editId;
var arrayLength = 0, tableSize = 10, startIndex = 1, endIndex = 0, currentIndex = 1, maxIndex = 0;

// Exibe as informações inicialmente
showInfo();

// Ações ao adicionar um novo membro
newMemberAddBtn.addEventListener('click', () => {
    isEdit = false;
    submitBtn.innerHTML = "Enviar";
    modalTitle.innerHTML = "Preencha o formulário";
    popupFooter.style.display = "block";
    imgInput.src = "./img/pic1.png";
    darkBg.classList.add('active');
    popupForm.classList.add('active');
    
    formInputFields.forEach(input => input.disabled = false);
    imgHolder.style.pointerEvents = "auto";
});

// Fechar o modal ao clicar no botão de fechar
crossBtn.addEventListener('click', () => {
    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    form.reset();
});

// Fechar o modal ao clicar fora dele
darkBg.addEventListener('click', (event) => {
    if (event.target === darkBg) {
        darkBg.classList.remove('active');
        popupForm.classList.remove('active');
        form.reset();
    }
});


// Upload de imagem com validação de tamanho
uploadimg.onchange = function() {
    if (uploadimg.files[0].size < 2000000) { // Limite de 1MB
        var fileReader = new FileReader();

        fileReader.onload = function(e) {
            imgInput.src = e.target.result;
        };

        fileReader.readAsDataURL(uploadimg.files[0]);
    } else {
        alert("O arquivo é muito grande! O limite máximo é 2MB");
    }
};

// Funções de Paginação
function preLoadCalculations() {
    arrayLength = getData.length;
    maxIndex = Math.ceil(arrayLength / tableSize);
}

function displayIndexBtn() {
    preLoadCalculations();

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '<button onclick="prev()" class="prev">Anterior</button>';

    for (let i = 1; i <= maxIndex; i++) {
        pagination.innerHTML += `<button onclick="paginationBtn(${i})" index="${i}">${i}</button>`;
    }

    pagination.innerHTML += '<button onclick="next()" class="next">Próximo</button>';
    highlightIndexBtn();
}

function highlightIndexBtn() {
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = Math.min(startIndex + tableSize - 1, arrayLength);
    
    entries.textContent = `Mostrando ${startIndex} de ${endIndex} das ${arrayLength} entradas`;

    var paginationBtns = document.querySelectorAll('.pagination button');
    paginationBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('index') === currentIndex.toString());
    });

    showInfo();
}

// Exibição de informações na tabela
function showInfo() {
    userInfo.innerHTML = ""; // Limpar o conteúdo anterior
    var tab_start = startIndex - 1;
    var tab_end = endIndex;

    if (getData.length > 0) {
        for (var i = tab_start; i < tab_end; i++) {
            var staff = getData[i];

            if (staff) {
                let createElement = `<tr class="employeeDetails">
                    <td>${i + 1}</td>
                    <td><img src="${staff.picture}" alt="" width="40" height="40"></td>
                    <td>${staff.name}</td>
                    <td>${staff.genero}</td>
                    <td>${staff.cpf}</td>
                    <td>${staff.rg}</td>
                    <td>${staff.cep}</td>
                    <td>${staff.estado}</td>
                    <td>${staff.city}</td>
                    <td>${staff.email}</td>
                    <td>${staff.phone}</td>
                    <td>
                        <button onclick="readInfo('${staff.picture}', '${staff.name}', '${staff.genero}', '${staff.cpf}', '${staff.rg}', '${staff.nascimento}', '${staff.cep}', '${staff.estado}', '${staff.city}', '${staff.email}', '${staff.phone}')"><i class="fa-regular fa-eye"></i></button>

                        <button onclick="editInfo(${i}, '${staff.picture}', '${staff.name}', '${staff.genero}', '${staff.cpf}', '${staff.rg}', '${staff.nascimento}', '${staff.cep}', '${staff.estado}', '${staff.city}', '${staff.email}', '${staff.phone}')"><i class="fa-regular fa-pen-to-square"></i></button>

                        <button onclick="deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>`;
                userInfo.innerHTML += createElement;
            }
        }
    } else {
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="12" align="center">Sem dados disponíveis na tabela</td></tr>`;
    }
}

// Funções para visualizar, editar e excluir informações
function readInfo(pic, nameVal, generoVal, cpfVal, rgVal, nascimentoVal, cepVal, estadoVal, cityVal, emailVal, phoneVal) {
    imgInput.src = pic;
    Name.value = nameVal;
    genero.value = generoVal;
    cpf.value = cpfVal;
    rg.value = rgVal;
    nascimento.value = nascimentoVal;
    cep.value = cepVal;
    estado.value = estadoVal;
    city.value = cityVal;
    email.value = emailVal;
    phone.value = phoneVal;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = "none";
    modalTitle.innerHTML = "Profile";
    formInputFields.forEach(input => input.disabled = true);
    imgHolder.style.pointerEvents = "none";
}

function editInfo(id, pic, nameVal, generoVal, cpfVal, rgVal, nascimentoVal, cepVal, estadoVal, cityVal, emailVal, phoneVal) {
    isEdit = true;
    editId = id;

    imgInput.src = pic;
    Name.value = nameVal;
    genero.value = generoVal;
    cpf.value = cpfVal;
    rg.value = rgVal;
    nascimento.value = nascimentoVal;
    cep.value = cepVal;
    estado.value = estadoVal;
    city.value = cityVal;
    email.value = emailVal;
    phone.value = phoneVal;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = "block";
    modalTitle.innerHTML = "Atualize suas informações";
    submitBtn.innerHTML = "Atualizar";
    formInputFields.forEach(input => input.disabled = false);
    imgHolder.style.pointerEvents = "auto";
}

function deleteInfo(index) {
    if (confirm("Are you sure you want to delete?")) {
        originalData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(originalData));
        getData = [...originalData];

        preLoadCalculations();

        if (getData.length === 0) {
            currentIndex = 1;
            startIndex = 1;
            endIndex = 0;
        } else if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        showInfo();
        highlightIndexBtn();
        displayIndexBtn();
    }
}

// Submissão do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        id: isEdit ? originalData[editId].id : Date.now(),
        picture: imgInput.src || "./img/pic1.png",
        name: Name.value.trim(),
        genero: genero.value.trim(),
        cpf: cpf.value.trim(),
        rg: rg.value.trim(),
        nascimento: nascimento.value.trim(),
        cep: cep.value.trim(),
        estado: estado.value.trim(),
        city: city.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
    };

    if (isEdit) {
        originalData[editId] = information;
        submitBtn.innerHTML = "Submit";
        modalTitle.innerHTML = "Fill the Form";
        isEdit = false;
    } else {
        originalData.push(information);
    }

    localStorage.setItem("userProfile", JSON.stringify(originalData));
    getData = [...originalData];
    preLoadCalculations();

    form.reset();
    darkBg.classList.remove('active');
    popupForm.classList.remove('active');

    highlightIndexBtn();
    displayIndexBtn();
});

// Busca e filtragem
filterData.addEventListener('keyup', function() {
    var filterValue = filterData.value.toLowerCase();

    getData = originalData.filter((item) => {
        return item.name.toLowerCase().includes(filterValue) ||
               item.genero.toLowerCase().includes(filterValue) ||
               item.cpf.includes(filterValue) ||
               item.rg.includes(filterValue) ||
               item.cep.includes(filterValue) ||
               item.estado.toLowerCase().includes(filterValue) ||
               item.city.toLowerCase().includes(filterValue) ||
               item.email.toLowerCase().includes(filterValue) ||
               item.phone.includes(filterValue);
    });

    currentIndex = 1;
    highlightIndexBtn();
    displayIndexBtn();
});

// Navegação de paginação
function paginationBtn(index) {
    currentIndex = index;
    highlightIndexBtn();
}

function next() {
    if (currentIndex < maxIndex) {
        currentIndex++;
        highlightIndexBtn();
    }
}

function prev() {
    if (currentIndex > 1) {
        currentIndex--;
        highlightIndexBtn();
    }
}

// Inicialização
displayIndexBtn();
