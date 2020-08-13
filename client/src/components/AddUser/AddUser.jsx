import React, { Component } from "react";
import './AddUser.css';
import axios from "axios";

class AddUser extends Component {
  state = {
    firstname: "",
    lastname:"",
    email: "",
    bio: "",
    date: ""
  };

  onFirstName = e => this.setState({ [e.target.firstname]: e.target.value });
  onLastName = e => this.setState({ [e.target.lastname]: e.target.value });
  onEmail = e => this.setState({ [e.target.email]: e.target.value });
  onBio = e => this.setState({ [e.target.bio]: e.target.value });
  onDate = e => this.setState({ [e.target.date]: e.target.value });

  addUser = async e => {
    e.preventDefault();
    try {
      const newUser = await axios.post("/api/users/", {
          firstname: this.refs.firstname.value,
          lastname: this.refs.lastname.value,
          date: Date(this.refs.date.value),
          bio: this.refs.bio.value,
          email: this.refs.email.value
        }
      );
      this.setState({ response: `User ${newUser.data.newUser.firstname} created!` });
    } catch (err) {
      this.setState({ response: err.message });
    }
  };

  render() {
    return (
      <div className="AddUser-Wrapper">
        <h1>ADD USER:</h1>
        <form onSubmit={this.addUser}>
          <label htmlFor="name">First-Name:</label>
          <input
            type="text"
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
            date="date"
            onChange={this.onDate}
            ref="date"
            className="Add-User-Input"
            require
            id="date"
          />
          <button type="submit" className="Add-User-Submit fa fa-plus"></button>
          <button type="reset" className="Add-User-Reset fa fa-eraser"></button>
        </form>
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default AddUser;
