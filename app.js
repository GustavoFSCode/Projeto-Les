// Seleção de elementos do DOM
var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    form = document.querySelector('form'),
    formInputFields = document.querySelectorAll('form input'),
    Name = document.getElementById("name"),
    genero = document.getElementById("genero"),
    cpf = document.getElementById("cpf"),
    nascimento = document.getElementById("sDate"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    password = document.getElementById("password"),
    confpassword = document.getElementById("confpassword"),
    confpasswordContainer = document.getElementById('confpasswordContainer'),
    typeAddress = document.getElementById('typeAddress'),
    estado = document.getElementById("estado"),
    city = document.getElementById("city"),
    cep = document.getElementById("cep"),
    neighborhood = document.getElementById('neighborhood'),
    street = document.getElementById('street'),
    houseNumber = document.getElementById('houseNumber'),
    typeCard = document.getElementById('typeCard'),
    cardName = document.getElementById('cardName'),
    cardNumber = document.getElementById('cardNumber'),
    expiryDate = document.getElementById('expiryDate'),
    cvv = document.getElementById('cvv'),
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

// Define a data maxima de nascimento para hoje
const hoje = new Date();  
const anoAtras = hoje.getFullYear() - 13;  
const mesHoje = hoje.getMonth() + 1;  
const diaHoje = hoje.getDate();  
const dataMaxima = anoAtras + '-' + (mesHoje < 10 ? '0' + mesHoje : mesHoje) + '-' + (diaHoje < 10 ? '0' + diaHoje : diaHoje);  
document.getElementById('sDate').setAttribute('max', dataMaxima);

// Esconde o campo de confirmação de senha no modo de edição
function toggleConfPasswordVisibility() {
    if (isEdit) {
        confpasswordContainer.style.display = 'none'; // Oculta o campo
    } else {
        confpasswordContainer.style.display = 'block'; // Mostra o campo
    }
}

// Ações ao adicionar um novo membro
/*
newMemberAddBtn.addEventListener('click', () => {
    isEdit = false;
    submitBtn.innerHTML = "Enviar";
    modalTitle.innerHTML = "Preencha o formulário";
    popupFooter.style.display = "block";
    darkBg.classList.add('active');
    popupForm.classList.add('active');
    
    formInputFields.forEach(input => input.disabled = false);

    toggleConfPasswordVisibility();
});
*/
// validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer coisa que não seja número

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // CPF inválido se todos os números forem iguais
    }

    let soma = 0;
    let resto;

    // Validação do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    // Validação do segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

// CPF único por pessoa
function isCPFUnique(cpf) {
    return !originalData.some((user) => user.cpf === cpf);
}

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
                    <td>${staff.name}</td>
                    <td>${staff.genero}</td>
                    <td>${staff.cpf}</td>
                    <td>${staff.email}</td>
                    <td>${staff.phone}</td>
                    <td>
                        <button onclick="readInfo('${staff.name}', '${staff.genero}', '${staff.cpf}', 
                        '${staff.nascimento}', '${staff.cep}', '${staff.password}', '${staff.confpassword}', '${staff.estado}', '${staff.city}', '${staff.email}', 
                        '${staff.phone}')"><i class="fa-regular fa-eye"></i></button>

                        <button onclick="editInfo(${i}, '${staff.name}', '${staff.genero}', '${staff.cpf}', 
                        '${staff.nascimento}', '${staff.cep}', '${staff.password}', '${staff.confpassword}',
                        '${staff.estado}', '${staff.city}', '${staff.email}', '${staff.phone}')"><i class="fa-regular fa-pen-to-square"></i></button>

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
function readInfo(nameVal, generoVal, cpfVal, nascimentoVal, cepVal, passwordVal, confpasswordVal, estadoVal, cityVal, emailVal, phoneVal) {
    Name.value = nameVal;
    genero.value = generoVal;
    cpf.value = cpfVal;
    nascimento.value = nascimentoVal;
    password.value = passwordVal;
    confpassword.value = passwordVal;
    cep.value = cepVal;
    estado.value = estadoVal;
    city.value = cityVal;
    email.value = emailVal;
    phone.value = phoneVal;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = "none";
    modalTitle.innerHTML = "Perfil";
    formInputFields.forEach(input => input.disabled = true);
    genero.disabled = true;
    estado.disabled = true;
    toggleConfPasswordVisibility();
}

function editInfo(id, nameVal, generoVal, cpfVal, nascimentoVal, cepVal, passwordVal, confpasswordVal, estadoVal, cityVal, emailVal, phoneVal) {
    isEdit = true;
    editId = id;

    Name.value = nameVal;
    genero.value = generoVal;
    cpf.value = cpfVal;
    nascimento.value = nascimentoVal;
    cep.value = cepVal;
    password.value = passwordVal;
    confpassword.value = passwordVal;
    estado.value = estadoVal;
    city.value = cityVal;
    email.value = emailVal;
    phone.value = phoneVal;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = "block";
    modalTitle.innerHTML = "Atualize suas informações";
    submitBtn.innerHTML = "Atualizar";
    formInputFields.forEach(input => {
        if (input.id !== 'cpf' && input.id !== 'sDate') {
            input.disabled = false;
        }
        else {
            input.disabled = true;
        }
    });
    genero.disabled = false;
    estado.disabled = false;
    toggleConfPasswordVisibility();
}

function deleteInfo(index) {
    if (confirm("Tem certeza que deseja deletar esse cliente?")) {
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


    const cpfVal = cpf.value.trim();
    if (!validarCPF(cpfVal)) {
        alert('CPF inválido. Por favor, insira um CPF válido.');
        return;
    }


    const password = document.getElementById('password').value.trim();
    const confPassword = document.getElementById('confpassword').value.trim();

    // Verifica se as senhas coincidem
    if (password !== confPassword) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }
    // Regex para validar a senha
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
     //Verifica se a senha e forte
     if (!regex.test(password)) {
        alert('A senha deve conter no mínimo 8 caracteres, sendo pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial.');
        return;
    }

    const cpfValue = cpf.value.trim();

    if (!isCPFUnique(cpfValue) && !isEdit) {
        alert("Este CPF já está cadastrado.");
        return;
    }

    
    const information = {
        id: isEdit ? originalData[editId].id : Date.now(),
        name: Name.value.trim(),
        genero: genero.value.trim(),
        cpf: cpf.value.trim(),
        nascimento: nascimento.value.trim(),
        password: password.trim(),
        confPassword: confPassword.trim(),
        cep: cep.value.trim(),
        estado: estado.value.trim(),
        city: city.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
    };

    if (isEdit) {
        originalData[editId] = information;
        submitBtn.innerHTML = "Enviar";
        modalTitle.innerHTML = "Preencha o formulário";
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

    showInfo();
    highlightIndexBtn();
    displayIndexBtn();
    window.location.href = "index.html";
});

// Busca e filtragem
filterData.addEventListener('keyup', function() {
    var filterValue = filterData.value.toLowerCase();

    getData = originalData.filter((item) => {
        return item.name.toLowerCase().includes(filterValue) ||
               item.genero.toLowerCase().includes(filterValue) ||
               item.cpf.includes(filterValue) ||
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
