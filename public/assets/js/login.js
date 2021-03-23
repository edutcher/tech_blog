function login() {
    let userInfo = {
        name: $('#name').val(),
        password: $('#password').val()
    }
    axios.post('/api/users/login', userInfo)
        .then(res => {
            console.log(res);
            if (res.status === 400) location.reload();
            if (res.status === 200) window.location.href = "/dashboard";
        }).catch(err => {
            console.log(err);
        })
}

$(document).ready(() => {
    $('#loginForm').submit((e) => {
        e.preventDefault();
        if ($('#name').val() === '' || $('#password').val() === '') return;
        login();
    })
})