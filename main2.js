document.getElementById('addForm').addEventListener('submit', addForm)

function addForm(e) {
    e.preventDefault();

    let inputName = document.getElementById('rinputName').value;
    let inputEmail = document.getElementById('rinputEmail').value;
    let inputPassword = document.getElementById('rinputPassword').value;
    let inputPhone = document.getElementById('rinputPhone').value;

    if (inputName == "" || inputEmail == "" || inputPassword == "" || inputPhone == "") {
        let error = document.getElementById('error');

        error.style.display = "block";
        error.innerHTML = "Cannot submit an empty field!";

    }

    fetch('https://goalsetapp.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain,',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: inputName,
                email: inputEmail,
                password: inputPassword,
                phone: inputPhone

            })
        })
        .then((res) => res.json())
        .then((data) =>

            console.log(data)

        )
        
}

