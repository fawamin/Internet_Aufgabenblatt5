//Function that adds all entries to the page and is only called once
function firstrender() {
    //Get all Todos from database
    let response = fetch("http://localhost:3000/api/todo")
        .then(response => response.json())
        .then(data =>
            data.forEach(
                eintrag => {
                    console.log(eintrag)
                    rendernewTodo(eintrag);
                }
            )
        );
    }
//Function that adds a new Todo to the Page
function rendernewTodo(eintrag)
{
    //Find the todo-list-entries div
    let main = document.getElementById('todo-list-entries');
    //Neuen eintrag erstellen
    let entry = document.createElement('div');
    entry.classList.add("todo-entry");
    //Pull data from the json
    let title = eintrag.title;
    //Seperate Date and Time
    const datetime = new Date(eintrag.due);
    let date = datetime.toLocaleDateString(Navigator.language);
    let time = datetime.toLocaleTimeString(Navigator.language);

    //Get Variables from the json
    let id = eintrag._id;
    let comment = eintrag.comment;
    let status = eintrag.status;
    //Entry Text containing title, date , time ,status and comment
    entry.insertAdjacentHTML('beforeend', `<header>${title} </header>`);
    entry.insertAdjacentHTML('beforeend', `<p> Due Date: ${date} <br> Due Time: ${time}<br> Status: ${status} <br> Kommentar: <br> ${comment} </p>`);
    //Buttons for updating and deleting the entry
    entry.insertAdjacentHTML('beforeend', `<input type= "button" id = "submit-${id}" name = "submit" value = "Updaten">`);
    entry.insertAdjacentHTML('beforeend', `<input type= "button" id = "delete-${id}" name = "delete" value = "Entfernen">`);
    //Add the entry to the page
    main.appendChild(entry);
    
    //Eventlistener update
    document.getElementById(`submit-${id}`).addEventListener('click', () => {
        //Updating the Status Variable depending on current status
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
                //Update the Element entry in the page with the new status
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

//Function that adds a new Todo to the Database and adds it to the Page 
function addEntry(evt) {
    evt.preventDefault();
    //Werte aus den Inputfeldern holen
    let titel = document.getElementById('title').value
    let due_by = document.getElementById('due').value
    let extra = document.getElementById('comment').value
    let state = "open";
    //JSON element zusammensetzen
    let element = { title: titel, due: due_by, status: state, comment: extra };
    //POST Request an den Server
    let newentry = fetch("http://localhost:3000/api/todo", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(element) })
        .then(response => response.json())
        .then(data =>  {
            let id = data.insertedId;
            element._id = id;
            rendernewTodo(element);
            document.getElementById('title').value = "";
            document.getElementById('due').value= "";
            document.getElementById('comment').value= "";
        });  
}