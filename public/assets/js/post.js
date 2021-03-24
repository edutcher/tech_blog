let addPost = () => {
    let newPost = {
        title: $('#title').val(),
        post: $('#newPost').val()
    }

    axios.post(`/api/posts/`, newPost)
        .then(res => {
            window.location.href = "/dashboard";
        })
        .catch(err => {
            console.log(err);

        })
}

$(document).ready(() => {

    $('#newPostForm').submit(e => {
        e.preventDefault();
        if ($('#title').val() === '' || $('#newPost').val() === '') return;
        addPost();
    })
})