import React, { Component } from "react";
import './EditUser.css';
import axios from "axios";
import { withRouter } from 'react-router'

class EditUser extends Component {
  state = {
    id: '',
    firstname: "",
    lastname: "",
    date: "",
    email: "",
    bio: "",
    response: ""
  };

  onFirstName = e => this.setState({ [e.target.firstname]: e.target.value });
  onLastName = e => this.setState({ [e.target.lastname]: e.target.value });
  onEmail = e => this.setState({ [e.target.email]: e.target.value });
  onBio = e => this.setState({ [e.target.bio]: e.target.value });
  onDate = e => this.setState({ [e.target.date]: e.target.value });

  async componentDidMount() {
    try {
    let search =  this.props.location.search,
      id = search.substring(1, search.length);
    const updateUser = await axios(`/api/users/${id}`);
    const { firstname, lastname, email, date, bio } = updateUser.data.user;
    this.setState({ id, firstname, lastname, email, bio, date  });
    } catch (err) {
      this.setState({ response: "User not found!" })
    }
  };

  updateUserHandler = async (e) => {
    try {
      const user = await axios.put(`/api/users/${this.state.id}`, {
        firstname: this.refs.firstname.value,
        date: Date(this.refs.date.value),
        lastname: this.refs.lastname.value,
        email: this.refs.email.value,
        bio: this.refs.bio.value
      });
      this.setState({response: user.data.message });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };

  render() {
    if (this.state.response === "User not found!")
      return <h1>User not found!</h1>
    return (
      <div className="Edit-User-Wrapper">
        <h1>EDIT USER</h1>
        <form onSubmit={this.updateUserHandler}>
        <label htmlFor="name">First-Name:</label>
          <input
            type="text"
            value={this.state.firstname}
            placeholder="For example: Elon"
            firstname="firstname"
            onChange={this.onFirstName}
            ref="firstname"
            className="Add-User-Input"
            require
            id="firstname"
          />
          <label htmlFor="name">Last-Name:</label>
          <input
            type="text"
            value={this.state.lastname}
            placeholder="For example: Musk"
            lastname="lastname"
            onChange={this.onLastName}
            ref="lastname"
            className="Add-User-Input"
            require
            id="lastname"
          />
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            value={this.state.email}
            placeholder="abc@gmail.com"
            email="email"
            onChange={this.onEmail}
            ref="email"
            className="Add-User-Input"
            require
            id="email"
          />
          <label htmlFor="name">Short bio:</label>
          <input
            type="text"
            value={this.state.bio}
            placeholder="About Yourself"
            bio="bio"
            onChange={this.onBio}
            ref="bio"
            className="Add-User-Input"
            require
            id="bio"
          />
          <label htmlFor="name">DOB:</label>
          <input
            type="date"
            value={this.state.date}
            date="date"
            onChange={this.onDate}
            ref="date"
            className="Add-User-Input"
            require
            id="date"
          />
          <button type="submit" className="Edit-User-Submit fa fa-pencil"></button>
        </form>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default withRouter(EditUser);
