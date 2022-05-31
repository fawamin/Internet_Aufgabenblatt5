function render() {
    //Clearen

    this.clear()

    //Hinzufuegen
    let main = document.getElementById('todo-list-entries')
    //fetch
    let response = fetch("http://localhost:3000/api/todo")
        .then(response => response.json())
        .then(data =>
            data.forEach(
                eintrag => {
                    console.log(eintrag);
                    //Neuen eintrag erstellen
                    let entry = document.createElement('div');
                    entry.classList.add("todo-entry");
                    let title = eintrag.title;
                    const datetime = new Date(eintrag.due);
                    let date = datetime.toLocaleDateString(Navigator.language);
                    let time = datetime.toLocaleTimeString(Navigator.language);
                    let id = eintrag._id;
                    let comment = eintrag.comment;
                    let status = eintrag.status;
                    
                    //Textinhalt
                    entry.insertAdjacentHTML('beforeend', `<header>${title} </header>`);
                    entry.insertAdjacentHTML('beforeend', `<p> Due Date: ${date} <br> Due Time: ${time}<br> Status: ${status} <br> Kommentar: <br> ${comment} </p>`);
                    //Update und Entfernen knopf
                    entry.insertAdjacentHTML('beforeend', `<input type= "button" id = "submit-${id}" name = "submit" value = "Updaten">`);
                    entry.insertAdjacentHTML('beforeend', `<input type= "button" id = "delete-${id}" name = "delete" value = "Entfernen">`);

                    main.appendChild(entry);
                    
                    //Eventlistener update
                    document.getElementById(`submit-${id}`).addEventListener('click', () => {
                        if (status == "open"){
                            status = "doing";
                        }

                        else if(status == "doing")
                        {
                            status = "done";
                        }

                        if(status != null)
                        {
                            let answer = fetch(`http://localhost:3000/api/todo/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: `${status}` }) })
                            .then(response => {
                                entry.getElementsByTagName("p")[0].innerHTML = `Due Date: ${date} <br> Due Time: ${time}<br> Status: ${status} <br> Kommentar: <br> ${comment}`;
                            })
                        }
                    });
                    
                    //eventlistener Delete
                    document.getElementById(`delete-${id}`).addEventListener('click', () => {
                            let answer = fetch(`http://localhost:3000/api/todo/${id}`, { method: 'DELETE' })
                            .then(response => {
                                entry.remove();
                            })
                    });
                    
                    
                }
            )

        )

    }



function clear() {
        var div = document.getElementById('todo-list-entries');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

    }


function addEntry(evt) {
    evt.preventDefault();
    let titel = document.getElementById('title').value
    let due_by = document.getElementById('due').value
    let extra = document.getElementById('comment').value
    let state = "open";
    let element = { title: titel, due: due_by, status: state, comment: extra };
    console.log(element)
    let response = fetch("http://localhost:3000/api/todo", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(element) })
        .then(response => {
            console.log(response)
            render();
            document.getElementById('title').value = "";
            document.getElementById('due').value= "";
            document.getElementById('comment').value= "";
        });
}