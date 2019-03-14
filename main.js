function _(str) {
    return document.querySelector(str);
}
/*Reg Page*/
const regForm = _("#regForm");

if (regForm) {

    regForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = _("#rusername").value;
        const email = _("#remail").value;
        const pwd = _("#rpwd").value;
        const phone = _("#rphone").value;

        const userData = {
            username: username,
            email: email,
            password: pwd,
            phone: phone
        }

        const registerUrl = "https://goalsetapp.herokuapp.com/api/register";

        axios.post(registerUrl, userData).then(function (response) {
            console.log(response.data);
        }).catch(function (err) {
            console.log(err.response)
        })
    })
}
/*Login Page*/
const loginForm = _("#loginForm");

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = _("#lemail").value;
        const pwd = _("#lpwd").value;

        const userData = {
            email: email,
            password: pwd
        }
        
        


        const loginUrl = "https://goalsetapp.herokuapp.com/api/login";
        axios.post(loginUrl, userData).then(function (response) {
            console.log(response.data)

            const token = response.data.data.token
            console.log(token)

            localStorage.setItem('goaltoken', token);

            location.replace("profile.html")
        }).catch(function (err) {
            console.log(err.response)
        })
    })
}

//View Users
const profile = _("#profile");

console.log(_('#bigName'))

if (profile) {
    const profileUrl = "https://goalsetapp.herokuapp.com/api/profile";
    const token = localStorage.getItem("goaltoken");

    console.log(token)

    const options = {
        headers: {
            Authorization: token,
        }
    }
    console.log(_('#basicInfo').innerHTML)

    axios.get(profileUrl, options).then(function (response) {
                console.log(response.data);

                const user = response.data.data.username;
                localStorage.setItem('user', user)

                console.log(user.username)
                _('#bigName').innerHTML = user.username;

                _("#basicInfo").innerHTML = `
            <div class="col-md-8 col-6" >
                ${user.username}
            </div>
            <hr />
            <div class="col-md-8 col-6" >
                ${user.email}
            </div>
            <hr />
            <div class="col-md-8 col-6" >
                ${user.phone}
            </div>
            <hr />
            <div class="col-md-8 col-6" >
                ${new Date(user.created_at).toLocaleDateString()}
            </div>
            <hr />
            `;
    }).catch(function(err) {
        console.log(err.response);
    })
}