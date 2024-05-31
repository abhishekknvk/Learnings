document.addEventListener('DOMContentLoaded',function(){
    const list = document.querySelector('#movie-list ul');
    const forms = document.forms;


    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('star')) {
            let value = e.target.getAttribute('data-value');
            let stars = e.target.parentNode.querySelectorAll('.star');
            stars.forEach(star => {
                if (star.getAttribute('data-value') <= value) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });
        }
    });
    
    // delete movie
    list.addEventListener('click', (e)=>{
    if(e.target.className == 'delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
    }      
    });

    // add movie
    const addForm = forms['add-movie'];
    addForm.addEventListener('submit', function(e){
        e.preventDefault();


        //Creating Elements
        const value =addForm.querySelector('input[type ="text"]').value;

         // Input Validation
    if(value === '' || value == null) {
        alert('Please enter a movie name');
        return;
    }

        const li= document.createElement('li');
        const movieName = document.createElement('span');
        const deleteBtn = document.createElement('span');

         // Create stars
    const starsContainer = document.createElement('div');
    for(let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.dataset.value = i;
        star.className = 'star';
        starsContainer.appendChild(star);
    }


        // add txt content
    movieName.textContent = value;
    deleteBtn.textContent  ='delete ';


    //add classes

    movieName.classList.add('name');
    deleteBtn.classList.add('delete');

    //append to DOM

    li.appendChild(movieName);
    li.appendChild(deleteBtn);
    li.appendChild(starsContainer);
    list.appendChild(li);

    });
})