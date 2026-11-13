console.log('hello world detail')
const postBox = document.getElementById('post-box')
const alertBox = document.getElementById('alert-box')
const backBtn = document.getElementById('back-btn')
const updateBtn = document.getElementById('update-btn')
const deleteBtn = document.getElementById('delete-btn')

const url = window.location.href + 'data/'
const updateUrl = window.location.href + 'update/'
const deleteUrl = window.location.href + 'delete/'

const updateForm = document.getElementById('update-form')
const deleteForm = document.getElementById('delete-form')

const spinnerBox = document.getElementById('spinner-box')

const titleInput = document.getElementById('id_title')
const bodyInput = document.getElementById('id_body')

const csrf = document.getElementsByName('csrfmiddlewaretoken')

$.ajax({
    type: 'GET',
    url: url,
    success: function(response){
        console.log(response)
        const data = response.data

        if (data.logged_in !== data.author) {
            console.log('different')
        } else {
            console.log('the same')
            updateBtn.classList.remove('not-visible')
            deleteBtn.classList.remove('not-visible')
        }

        postBox.insertAdjacentHTML('beforeend', `
            <h3 class="mt-3" id="title">${data.title}</h3>
            <p class="mt-1" id="body">${data.body}</p>
            <hr>
            <div class="d-flex align-items-center">
                <img src="${data.avatar}" class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover;">
                <span>${data.author}</span>
            </div>
        `)

        titleInput.value = data.title
        bodyInput.value = data.body

        spinnerBox.classList.add('not-visible')
    },
    error: function(error){
        console.log(error)
    }
})

updateForm.addEventListener('submit', e => {
    e.preventDefault()

    const title = document.getElementById('title')
    const body = document.getElementById('body')

    $.ajax({
        type: 'POST',
        url: updateUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'title': titleInput.value,
            'body': bodyInput.value,
        },
        success: function(response){
            console.log(response)
            handleAlerts('success', 'post has been updated')
            title.textContent = response.title
            body.textContent = response.body
        },
        error: function(error){
            console.log(error)
        }
    })
})

deleteForm.addEventListener('submit', e => {
    e.preventDefault()

    $.ajax({
        type: 'POST',
        url: deleteUrl,
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
        },
        success: function(response){
            window.location.href = window.location.origin
            localStorage.setItem('title', titleInput.value)
        },
        error: function(error){
            console.log(error)
        }
    })
})