const StatusEnum = Object.freeze({
    TODO: 'TO DO',
    IN_PROGRESS: 'IN PROGRESS',
    DONE: 'DONE',
    FINAL: 'FINAL'
});

const Task = {
    id: 0,
    title: '',
    desc: ''
};

const Data = {
    id: 0,
    status: StatusEnum.TODO,
    tasks: []
};

export { StatusEnum, Task, Data };
