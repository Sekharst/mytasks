import {Component} from 'react'
import './App.css'
import {v4 as uuid} from 'uuid'

import Tasks from './components/Tasks'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    myTaskList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onChangeTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onSubmitTask = () => {
    const {selectTag, inputTask} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const id = uuid() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const bgColor = false

    if (taskName.length !== 0) {
      this.setState(prevState => ({
        myTaskList: [
          ...prevState.myTaskList,
          {id, taskName, taskCategory, bgColor},
        ],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
    // console.log(myTaskList)
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {inputTask, selectTag, activeTag, myTaskList} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)

    return (
      <div className="bg-container">
        <div className="left-container">
          <form className="form-container">
            <h1 className="heading">Create a Task!</h1>
            <div className="inputContainer">
              <label className="input-label" htmlFor="textInput">
                Task
              </label>
              <input
                id="textInput"
                type="text"
                className="input-field"
                placeholder="Enter the task here"
                value={inputTask}
                onChange={this.onChangeTask}
              />
              <label className="input-label" htmlFor="optionInput">
                Tags
              </label>
              <select
                id="optionInput"
                className="input-field"
                value={selectTag}
                onChange={this.onChangeSelectTag}
              >
                {tagsList.map(eachTag => (
                  <option value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="button"
              type="button"
              onClick={this.onSubmitTask}
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="right-Heading">Tags</h1>
          <ul className="tags-container">
            {tagsList.map(eachTag => {
              const isActive = activeTag === eachTag.optionId
              console.log(isActive)
              return (
                <li list="tab" key={eachTag.optionId}>
                  <button
                    className="tabs"
                    type="button"
                    value={eachTag.optionId}
                    onClick={this.onClickTag}
                    // isActive={isActive}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1 className="right-Heading">Tasks</h1>
          <ul className="no-task">
            {filterTaskList.length === 0 ? (
              <h1 className="no-Heading">No Tasks Added Yet</h1>
            ) : (
              filterTaskList.map(eachTask => (
                <Tasks key={eachTask.id} taskDetails={eachTask} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
