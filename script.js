async function postJSON(event) {
    const formData = new FormData(document.querySelector('form'));
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const idade = formData.get("idade");
    const sexo = formData.get("sexo");
    try {
        const response = await fetch("https://crudcrud.com/api/f5d34d56dbdb458c93d430d08c0eced4/lista-de-usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                idade: idade,
                sexo: sexo
            }),
        });
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error("Error:", error);
    }
    const form = event.target;
    form.reset();
}

async function getJSON() {
    try {
        const response = await fetch("https://crudcrud.com/api/f5d34d56dbdb458c93d430d08c0eced4/lista-de-usuarios", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados obtidos com sucesso:', data);
            populateTable(data); /*alteração*/
        } else {
            console.error('Erro ao obter dados. Status:', response.status);
        }
    } catch (error) {
        console.error("Erro na solicitação:", error);
    }
}
function populateTable(data) {
    const headTable = document.getElementById('head-table');
    headTable.innerHTML = `
    <th>Nome</th>
    <th>Sobrenome</th>
    <th>Email</th>
    <th>Idade</th>
    <th>Sexo</th>
    `;
    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = ''; // Limpa o conteúdo anterior da tabela
    data.forEach(item => {
        const row = tableBody.insertRow();
        for (key in item) {
            if(key !== '_id') {
                const cell = row.insertCell();
                cell.innerHTML = item[key];
            }
        }
    });
}