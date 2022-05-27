
class ToDo {
    render() {
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
                        let entry = document.createElement('div');
                        entry.classList.add("todo-entry");
                        let title = eintrag.title;
                        const datetime = new Date(eintrag.due);
                        let date = datetime.toLocaleDateString(Navigator.language);
                        let time = datetime.toLocaleTimeString(Navigator.language);
                        let comment = eintrag.comment;
                        let status = eintrag.status;
                        entry.insertAdjacentHTML('beforeend', `<header>${title}</a> </header>`);
                        entry.insertAdjacentHTML('beforeend', `<p> ${date}<br> ${time} <br> Status:  ${status} <br> Kommentar: ${comment} <p>`);
                        main.appendChild(entry);
                    }
                )

            )

    }





    clear()
    {
        var div = document.getElementById('todo-list-entries');
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

    }

}

function addEntry(evt) {
    evt.preventDefault();
    let titel = document.getElementById('title').value
    let due_by = document.getElementById('due').value
    let extra = document.getElementById('comment').value
    let state = "open";
    let element = { title: titel, due: due_by, status: state, comment: extra };
    console.log
    let response = fetch("http://localhost:3000/api/todo", {method: 'POST', body: JSON.stringify(element)});
    //onsole.log(evt.target)
    todo.render()
}

let todo = new ToDo()