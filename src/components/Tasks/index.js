import './index.css'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taskCategory} = taskDetails

  return (
    <li className="listText">
      <h1 className="taskName">{taskName}</h1>
      <p className="taskCat">{taskCategory}</p>
    </li>
  )
}

export default Tasks
