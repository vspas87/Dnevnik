import React, {Component} from 'react';

class ProfilTeacher extends Component {
    constructor(){
        super();
        this.state={
                isLoading:false,
                isError:false,
                teachers: []
        };
    }
    async componentDidMount() {
        this.setState({isLoading:true});
        const response = await fetch('http://localhost:8095/dnevnik/teacher/profil', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const teachers= await response.json();
            this.setState({teachers, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }

    render() {
        const {teachers, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading grades...</div> 
        }
        if(isError){
            return <div>You havent examed your students yet. <br />
            Please, prepare test!</div>
        }

        return teachers.length > 0
            ? (
                <div>
                    <h3 style={{textAlign:"left"}}>Your profile information</h3>
                    <table>
                      <thead>
                            <tr>
                                <th>ID</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>User ID Number</th>
                                <th>Username</th>
                                <th>Subject name</th>
                                <th>Subject weekly fund</th>
                            </tr>
                      </thead>
                      <tbody>
                      {this.state.teachers.map((teacher) => {
                        return(
                            <tr key={teacher.id} >
                                <td>{teacher.id}</td>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.user.USER_ID}</td>
                                <td>{teacher.user.username}</td>
                                <td>{teacher.subject.name}</td>
                                <td>{teacher.subject.weeklyFund}</td>
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
export default ProfilTeacher;