import React, { useState } from 'react';
import TaskComponent from '../Task/Task';
import './Column.css';

const Column = ({ status, tasks, tableIndex, dragging, handleDragEnter, handleDragStart, getStyles }) => {
  const [displayedTasks, setDisplayedTasks] = useState({});
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleLoadMore = () => {
    setDisplayedTasks((prevState) => ({
      ...prevState,
      [tableIndex]: (prevState[tableIndex] || 4) + 2
    }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
    const target = event.target;
  
    // Check if target exists
    if (target && !target.classList.contains("table-content") && isDraggingOver && dragging) {
      const rect = target.getBoundingClientRect();
      // Determine if the mouse is near the bottom of the column
      const nearBottom = event.clientY >= rect.height / 2; // Adjust this value as needed
  
      let taskIndex;
      if (nearBottom) {
        // If near the bottom and there are tasks, insert after the last task
        taskIndex = tasks.length - 1;
      } else {
        // Calculate the index based on mouse position within the column
        const mouseY = event.clientY - rect.top;
        const taskHeight = rect.height / tasks.length;
        taskIndex = Math.floor(mouseY / taskHeight);
      }
  
      // Call handleDragEnter with calculated taskIndex to insert the task at the appropriate position
      handleDragEnter(event, { tableIndex, taskIndex });
    }
  };
  

  function handleDragLeave(event) {
    const relatedTarget = event.relatedTarget;
    const tableElement = event.currentTarget;
    if (!tableElement.contains(relatedTarget)) {
      setIsDraggingOver(false);
    }
  }

  const handleDrop = () => {
    setIsDraggingOver(false);
  };

  const getDisplayedTasksCount = () => {
    return displayedTasks[tableIndex] || 4;
  };

  let tableTitleColor;
  switch (status) {
    case 'TO DO':
      tableTitleColor = 'red';
      break;
    case 'IN PROGRESS':
      tableTitleColor = '#9f950a';
      break;
    case 'DONE':
      tableTitleColor = 'green';
      break;
    case 'FINAL':
      tableTitleColor = 'blue';
      break;
    default:
      tableTitleColor = 'pink';
  }

  return (
    <div
      className="single-table"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: isDraggingOver ? "5px solid rgb(68, 115, 243)" : `2px solid #616060 `,
      }}
      onDragEnter={dragging && !tasks.length
        ? (event) => handleDragEnter(event, { tableIndex, taskIndex: 0 })
        : undefined
      }
    >
      <div
        className="table-title"
        style={{ backgroundColor: tableTitleColor, display: "flex" }}
      >
        <h2 style={{ margin: 20 }}>{status}</h2>
        <h2 className="tasks-length">[{tasks.length}]</h2>
      </div>
      <div className='table-content' >
      {tasks.slice(0, getDisplayedTasksCount()).map((task, taskIndex) => (
           // Add null check for task and id
            <TaskComponent
              key={task.id}
              task={task}
              tableIndex={tableIndex}
              taskIndex={taskIndex}
              dragging={dragging}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              getStyles={getStyles}
            />
        ))}
        {getDisplayedTasksCount() < tasks.length && (
          <button
            type='button'
            onClick={handleLoadMore}
            className='load-more'
          >
            Load More
          </button>
        )}
      </div>
    </div>
  )
}

export default Column;
