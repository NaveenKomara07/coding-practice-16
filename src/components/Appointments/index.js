import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointsmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  OnAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      titleId: titleInput,
      dateId: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }

    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="main-container">
        <div className="bg-part">
          <div className="bg-container">
            <div className="bg-card-1">
              <form className="input" onSubmit={this.OnAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="title-design" htmlFor="input-method">
                  TITLE
                </label>
                <input
                  type="text"
                  value={titleInput}
                  id="input-method"
                  placeholder="Title"
                  autoComplete="OFF"
                  className="input-container"
                  alt="input"
                />
                <label className="title-design" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  className="input-container"
                  alt="date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                  id="date"
                />
                <button className="button-design" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="bg-card-2">
              <img
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image-design"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bg-part-2">
            <div className="second-container">
              <h1 className="second-header">Appointments</h1>
              <button
                type="button"
                className={`btn-design ${filterClassName}`}
                onClick={this.onClickFilter}
                alt="button"
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
