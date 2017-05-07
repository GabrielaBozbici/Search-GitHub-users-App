import React, {Component} from 'react';
import List from './List.js';
import RaisedButton from 'material-ui/RaisedButton';
import Photo from '../assets/github-octocat';

import axios from 'axios';

export default class Form extends Component{
    constructor(){
        super();
        this.state = {
            user: '',
            repos: [],
            statusErr: '',
            searchedUser: '',
        }
    }
      handleInputChange(event){
        var user = event.target.value;
        this.setState({
            user,
        });
    }
    handleSubmit(event){
        event.preventDefault();
        var userID = this.state.user;
        this.getUserRepos(userID);
        this.textInput.value = "";
        this.searchedUser = '';
    }
    getUserRepos(userID){
        var response = axios.get('https://api.github.com/users/' + userID + '/repos')
        response.data
       axios.get('https://api.github.com/users/' + userID + '/repos')
       .then((response) => {
            console.log('response: ', response);
            this.setState({
                repos: response.data,
                statusErr: '',
                searchedUser: userID
            }); 
        }).catch((error) => {
            if(error.response.status === 404){
                console.log('there is an error:')
                this.setState({
                    statusErr: 404,
                    repos: [],
                    searchedUser: userID
                })
            }
            console.log('eroare: ', error.response.status);
        });
   }

    render(){
        return(
            <div className="wrap">
                <h3 className="title text-center">Search GitHub users and see their repositories</h3>
                <div className="cat"><img src={Photo} className={`text-center ${this.state.repos.length ? 'shrink' : ''}`} /></div>
                <div className="col-md-12 col-sm-12 coll-xs-8 col-offset-1 col-sm-offset-0">
                    <form className="navbar-form navbar-center text-center" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="type username" ref={(input) => { this.textInput = input}} onChange={this.handleInputChange.bind(this)} />
                        </div>
                        <RaisedButton label="Search user" type="submit" primary={true}/>
                    </form>
                    <div className="col-md-12 col-sm-12 coll-xs-8 col-xs-offset-1 col-sm-offset-0 text-center content">
                        {!this.state.user ? <h4>Please write a username!</h4> 
                        : null}
                        {this.state.user && this.state.statusErr === 404
                        ? <h4>The GitHub user: {this.state.searchedUser} does not exist!</h4> 
                        : null }
                        {this.state.repos.length 
                        ? <div className="text-center phrase">
                            <p className="user"><span>{this.state.repos[0].owner.login}</span> has the following repositories:</p>
                            {this.state.repos.map(repo => <li key={repo.id}>
                                <div className="col-md-12 col-sm-12 text-center">{repo.name}</div>
                                <a target="_blank" href={`${repo.html_url}`} className="text-center">{repo.html_url}</a></li>)}</div>
                        : null}
                    </div>
                </div>
                <div className=" col-md-12 col-sm-12 col-xs-12 bottom-side">
                    <p className="text-center">&copy; Copyright 2017 Gabriela Bozbici</p>
                </div>
                {/*<List repos={this.state.repos} />*/}
            </div>
        )
    }
}