import React, {Component} from 'react';

class ProfilStudent extends Component {
    constructor(){
        super();
        this.state={
                isLoading:false,
                isError:false,
                students: []
        };
    }
    async componentDidMount() {
        this.setState({isLoading:true});
        const response = await fetch('http://localhost:8095/dnevnik/student/profil', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const students= await response.json();
            this.setState({students, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }

    render() {
        const {students, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return students.length > 0
            ? (
                <div>
                    <h3>Your profile</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>
                                <th>ID</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>schoolClass</th>
                                <th>User ID Number</th>
                                <th>Username</th>
                                <th>Parent name</th>
                            </tr>
                      </thead>
                      <tbody>
                      {this.state.students.map((student) => {
                        return(
                            <tr key={student.id} >
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.schoolClass.className}</td>
                                <td>{student.user.USER_ID}</td>
                                <td>{student.user.username}</td>
                                <td>{student.parent.firstName}</td>
                                <td>{student.parent.lastName}</td>
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
export default ProfilStudent;