        let tableVisible = false;
        async function postJSON(event) {
            const formData = new FormData(document.querySelector('form'));
            const firstname = formData.get("firstname");
            const lastname = formData.get("lastname");
            const email = formData.get("email");
            const idade = formData.get("idade");
            const sexo = formData.get("sexo");
            try {
                const response = await fetch("https://crudcrud.com/api/b829e2fc15d1446a849250aff31c6d91/dadosUser", {
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
            await getJSON();
        }

        async function getJSON() {
            try {
                const response = await fetch("https://crudcrud.com/api/b829e2fc15d1446a849250aff31c6d91/dadosUser", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Dados obtidos com sucesso:', data);
                    populateTable(data);
                    toggleTable()
                } else {
                    console.error('Erro ao obter dados. Status:', response.status);
                }
            } catch (error) {
                console.error("Erro na solicitação:", error);
            }
        }
        
        function toggleTable() {
            const table = document.getElementById('data-table');
            table.style.display = tableVisible ? 'none' : 'table';
            tableVisible = !tableVisible;
        }
        function populateTable(data) {
            const tableBody = document.getElementById('data-body');
            tableBody.innerHTML = '';
            data.forEach(item => {
                const row = tableBody.insertRow();
                for (key in item) {
                    const cell = row.insertCell();
                    cell.innerHTML = item[key];
                }
            });
        }
        function toggleTable() {
            const table = document.getElementById('data-table');
            if (tableVisible) {
                table.style.display = 'none';
            } else {
                table.style.display = 'table';
            }
            tableVisible = !tableVisible; 
        }