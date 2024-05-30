document.addEventListener('DOMContentLoaded',function(){
    const list = document.querySelector('#movie-list ul');
    const forms = document.forms;

    // delete movie
    list.addEventListener('click', (e)=>{
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }      
    });

    // add movie
    const addForm = orms['add-movie'];
    addForm.addEventListener('submit', function(e){
        e.parentDefault();


        //Creating Elements
        const value =addForm.querySelector("input[type ='text']").value;
        const li= document.createElement(li);
        const movieName = document.createElement('span');
        const deleteBtn = document.createElement('span');

        // add txt content
    movieName.textContent = value;
    deleteBtn.textContent  ='delete ';


    //add classes

    movieName.classList.add('name');
    deletebtn.classList.add('delete');

    //append to DOM

    li.appendChild(movieName);
    li.appendChild(deleteBtn);
    list.append(li);

    });
})