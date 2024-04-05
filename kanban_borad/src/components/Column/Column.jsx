import React, { useState } from 'react';
import TaskComponent from '../Task/Task';
import './Column.css';

const Column = ({ status, tasks, tableIndex, dragging, handleDragEnter, handleDragStart, getStyles }) => {
  const [displayedTasks, setDisplayedTasks] = useState({});
  const [highlighted, setHighlighted] = useState(false); 

  const handleLoadMore = () => {
    setDisplayedTasks((prevState) => ({
      ...prevState,
      [tableIndex]: (prevState[tableIndex] || 4) + 2
    }));
  };

  const getDisplayedTasksCount = () => {
    return displayedTasks[tableIndex] || 4;
  };
  let tableTitleColor;
  switch(status) {
    case 'TO DO':
      tableTitleColor = 'red';
      break;
    case 'IN PROGRESS':
      tableTitleColor = 'green';
      break;
    case 'DONE':
      tableTitleColor = 'yellow';
      break;
    case 'FINAL':
      tableTitleColor = 'blue';
      break;
    default:
      tableTitleColor = 'pink';
  }
  return (
    <div
      className='single-table'
      onDragEnter={dragging && !tasks.length
        ? (event) => handleDragEnter(event, { tableIndex, taskIndex: 0 })
        : undefined
      }
    >
      <div
        className="table-title"
        style={{ backgroundColor: tableTitleColor }}
      >
        <h2>{status}</h2>
      </div>
      <div className={`table-content${highlighted ? ' highlighted' : ''}`}
       onDragOver={() => setHighlighted(true)} 
       onDragLeave={() => setHighlighted(false)} >
        {tasks.slice(0, getDisplayedTasksCount()).map((task, taskIndex) => (
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
