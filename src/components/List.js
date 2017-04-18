import React, {Component} from 'react';

export default class List extends Component{
    // constructor(){
    //     super();
    //     this.state = {
    //         receivedRepos: []
    //     }
    // }
    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         receivedRepos: nextProps.repos
    //     });
    // }
    componentWillMount(){
        console.log('props', this.props);
    }

    render(){
        return(
            <div className="col-md-8 col-sm-8 coll-xs-8 col-offset-1 col-sm-offset-0">
                <h1>{this.props.unProp[0]}</h1>
                {this.props.unProp.map((a) => <li>{a} </li>)}
                {/*<h4>user has the following repos on Github:</h4>
                <ul className="list-unstyled">
                {this.state.receivedRepos && this.state.receivedRepos.map((repo) =>
                    <li key={repo.id}>{repo.name}</li>
                )}
                
                </ul>*/}
            </div>
        )
    }
}