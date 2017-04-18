import React, {Component} from 'react';
import List from './List.js';

import axios from 'axios';

export default class Form extends Component{
    constructor(){
        super();
        this.state = {
            user: '',
            repos: [],
            statusErr: ''
        }
    }
      handleInputChange(event){
        var user = event.target.value;
        this.setState({
            user,
        })
    }
    handleSubmit(event){
        event.preventDefault();
        var userID = this.state.user;
        this.getUserRepos(userID);
    }
    getUserRepos(userID){
       axios.get('https://api.github.com/users/' + userID + '/repos').then((response) => {
            console.log('response: ', response);
            this.setState({
                repos: response.data
            }); 
        }).catch((error) => {
            if(error.response.status === 404){
                console.log('there is an error:')
                this.setState({
                    statusErr: 404
                })
            }
            console.log('eroare: ', error.response.status);
        });
   }

    render(){
        return(
            <div className="wrap">
                <div className="col-md-8 col-sm-8 coll-xs-8 col-offset-1 col-sm-offset-0">
                    <form className="navbar-form navbar-center" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="type username" onChange={this.handleInputChange.bind(this)} />
                        </div>
                        <button className="btn btn-default" type="submit">Search user!</button>
                    </form>
                    
                    <div className="col-md-8 col-sm-8 coll-xs-8 col-offset-1 col-sm-offset-0">
                        {this.state.statusErr === 404 
                        ? <h4>The GitHub user does not exist!</h4> 
                        : <div className="text-center">{this.state.user} has the following repositories:
                            {this.state.repos.map(repo => <li key={repo.id}>{repo.name}</li>)}</div> }



                        <ul className="list-unstyled">
                        {this.state.receivedRepos && this.state.receivedRepos.map((repo) =>
                            <li key={repo.id}>
                                <a href="https://github.com/ + {this.state.user} + '/' + {repo.name}">{repo.name}</a>
                            </li>
                        )}
                        </ul>
                    </div>
                </div>
                


                {/*<List repos={this.state.repos} />*/}
               
            </div>
        )
    }
}