let delPost = id => {
    axios.delete(`/api/posts/${id}`)
        .then(res => {
            location.reload();
        })
        .catch(err => {
            console.log(err);

        })
}


$(document).ready(() => {

    $('.delBtn').click(function() {
        let id = $(this).attr('data-id');
        delPost(id);
    })

    $('.editBtn').click(function() {
        let id = $(this).attr('data-id');
        location.href = `/editPost/${id}`
    })
})