import React from 'react';
import './Task.css';

const TaskComponent = ({ task, tableIndex, taskIndex, dragging, handleDragStart, handleDragEnter, getStyles }) => {
  const onDragStartHandler = (e) => {
    handleDragStart(e, { tableIndex, taskIndex });
  };

  const onDragEnterHandler = dragging ? (e) => handleDragEnter(e, { tableIndex, taskIndex }) : undefined;

  const className = dragging ? getStyles({ tableIndex, taskIndex }) : "single-task";

  return (
    <div
      className={className}
      draggable
      onDragStart={onDragStartHandler}
      onDragEnter={onDragEnterHandler}
    >
      <h5 className='task-title'>{task.title}</h5>
      <p className='task-desc'>{task.desc}</p>
    </div>
  )
}

export default TaskComponent;
