$(document).ready(onReady);
function onReady() {
    console.log('so ready');
    $('#choresBtn').on('click', postTask);

    getTasks();

    $(document).on('click', '.updated', completeOrDelete);
}

function postTask() {
    console.log('onAdd');

    let newTask = $('#taskInput').val();
    console.log('new task:', newTask);

    $.ajax({
        method: 'POST',
        url: '/to-do',
        data: { task: newTask }
    })
        .then(function(response) {
            console.log('ajax POST task:', response);

            $('#taskInput').val('');
            getTasks();
        })
        .catch(function(error) {
            console.log('ajax POST failed!', error);
        });
}


function getTasks() {
    console.log('in getTasks');

    $.ajax({
        method: 'GET',
        url: '/to-do'
    })
        .then(function(response) {
            console.log('ajax GET task:', response);
            render(response);
        })
        .catch((error) => {
            console.log('ajax GET failed!', error);
        })
}



function render(response) {
    console.log('in render');

    $('#taskList').empty();

    for (let i = 0; i < response.length; i ++) {
        let task = response[i];
        let done = task.complete
        if (done === true) {
            $('#taskList').append(`
            <tr data-id="${task.id}" data-completed="${task.complete}" class="list">

                <td>${task.task}</td>
                <td>
                    <select id="selector">
                        <option value="delete" data-rc="delete"> delete </option>
                </td>
                <td>
                    <button class="updated"> update </button>
                </td>
            </tr>
        `);
        }
        else{
        $('#taskList').append(`
            <tr data-id="${task.id}" data-completed="${task.complete}">

                <td>${task.task}</td>
                <td>
                    <select id="selector">
                        <option value="complete" data-rc="complete"> 
                            complete 
                        </option>
                        <option value="delete" data-rc="delete"> delete </option>
                </td>
                <td>
                    <button class="updated"> update </button>
                </td>
            </tr>
        `);
        }
    }
}

function completeOrDelete() {
    console.log('completeOrDelete');

    let option = $(this).parents("tr").find("option:selected").attr('data-rc')
    console.log('option:', option);

    let taskId = $(this).parents("tr").data("id");
    let taskCompleted = $(this).parents("tr").data("completed");
    console.log('update:', taskId, taskCompleted)
    

    if (option === 'complete') {
        updateTask(taskId, taskCompleted);
    }
    else if (option === 'delete') {
        deleteTask(taskId);
    }
}


function updateTask(taskId, taskCompleted) {
    console.log('in updateTask', taskId, taskCompleted);
    $.ajax({
        method: 'PUT',
        url: `/to-do/${taskId}`,
        data: { completed: taskCompleted = true }
    })
        .then(() => {
            console.log('ajax PUT task:', taskId, taskCompleted);
            getTasks();
        })
        .catch((error) => {
            console.log('ajax PUT failed!', error);
        });
}

function deleteTask(taskId) {
    console.log('in deleteTask', taskId);

    $.ajax({
        method: 'DELETE',
        url: `/to-do/${taskId}`
    })
        .then((res) => {
            console.log('ajax DELETE task:', res);

            getTasks();
        })
        .catch((error) => {
            console.log('ajax DELETE failed!', error);
        });
}