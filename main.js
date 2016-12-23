todoItemsList = [
    {
        'task_id': 0,
        'task': 'Купить хлеб',
        'status': 'active',
        'time': 'чт, 8 дек 2016, 18:00',
        'period': 'Каждую неделю',
        'importance': 'green'
    },
    {
        'task_id': 1,
        'task': 'Купить муку',
        'status': 'active',
        'time': 'чт, 10 дек 2016, 18:00',
        'period': 'Каждый день',
        'importance': 'yellow'
    }
];

var canNotifyAudio = function () {
    return !$('#volume-toggle-container').hasClass('is-checked');
};

var canNotifyGrapically = function () {
    return !$('#notes-toggle-container').hasClass('is-checked');
};

filterSet = {};

var storage = function (key, value) {
    if (value === undefined) {
        var item = localStorage.getItem(key);
        return (item === null)? null : JSON.parse(item);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

var addTask = function (task_data) {
    tasks = storage('todoItemsList') || [];
    maxIdx = Math.max.apply(Math, array.map(function (item) { return item.task_id; })) + 1;

    task_data['task_id'] = maxIdx;
    tasks.unshift(task_data); // Как push, но добавляет в начало списка
    storage('todoItemsList', tasks);
};

var deleteTask = function (task_id) {
    tasks = storage('todoItemsList') || [];
    tasks_new = tasks.filter(function (task) {
        return task.task_id != task_id;
    });
    storage('todoItemsList', tasks_new);
};

var markTaskDone = function (task_id) {
    console.log('OOP');
    tasks = storage('todoItemsList') || [];
    if (tasks.hasOwnProperty(task_id)) {
        tasks[task_id].status = 'done';
    }
    storage('todoItemsList', tasks);
};

var getTodoListHtml = Handlebars.compile($("#todo-items-list-template").html());

var updateTodoItems = function () {
    $('#todo-items-list').html(getTodoListHtml(storage('todoItemsList')));
};

$(window).bind('storage', updateTodoItems());

storage('todoItemsList', todoItemsList);

var playAudio = function (wavFile) {
    if (canNotifyAudio()) {
        var sound = new Audio(wavFile);
        sound.play();
    }
};

var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
dialog.querySelector('.close').addEventListener('click', function() {
    dialog.close();
});


var showDialog = function (title, description) {
    if (canNotifyGrapically()) {
        $('#notification-title').html(title);
        $('#notification-content').html(description);
        dialog.showModal();
    }
};

console.log("playAudio('notification.wav')");
console.log("showDialog('Заголовок', 'Описание задачи такой-то.')")
