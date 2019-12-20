import React, {Component} from 'react'

class SubjectPage extends Component {
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
        const response = await fetch('http://localhost:8095/dnevnik/teacher/subject', {
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
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }

        return teachers.length > 0
            ? (
                <div>
                    <h3 style={{textAlign:"left"}}>Your subjects</h3>
                  <table className="tablemark">
                      <thead>
                            <tr>
                                <th>Subject ID</th>
                                <th>Name</th>
                                <th>Weekly Fund</th>
                            </tr>
                      </thead>
                      <tbody>
                      {this.state.teachers.map((teacher) => {
                        return(
                            <tr key={teacher.SUBJECT_ID} >
                                <td>{teacher.SUBJECT_ID}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.weeklyFund}</td>
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
export default SubjectPage;