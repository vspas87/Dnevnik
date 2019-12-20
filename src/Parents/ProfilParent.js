import React, {Component} from 'react';

class ProfilParent extends Component {
    constructor(){
        super();
        this.state={
                isLoading:false,
                isError:false,
                parents: []
        };
    }
    async componentDidMount() {
        this.setState({isLoading:true});
        const response = await fetch('http://localhost:8095/dnevnik/parent/profil', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const parents= await response.json();
            this.setState({parents, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }

    render() {
        const {parents, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return parents.length > 0
            ? (
                <div>
                    <h3>Your profile information</h3>
                  <table>
                      <thead>
                            <tr>
                                <th>ID</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>User ID Number</th>
                                <th>Username</th>
                            </tr>
                      </thead>
                      <tbody>
                      {this.state.parents.map((parent) => {
                        return(
                            <tr key={parent.id} >
                                <td>{parent.id}</td>
                                <td>{parent.firstName}</td>
                                <td>{parent.lastName}</td>
                                <td>{parent.email}</td>
                                <td>{parent.user.USER_ID}</td>
                                <td>{parent.user.username}</td>
                            </tr>
                            )
                        })
                    }
                      </tbody>
                  </table>
                </div>
            )
            : null
        }
        
}
export default ProfilParent;