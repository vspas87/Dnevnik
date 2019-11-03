import React , {Component} from 'react';
import '../Parents/ChildrenPage.css'

class ChildrenPage extends Component {
    constructor(props){
        super(props)
        this.state={
                isLoading:false,
                isError:false,
                students: [],
                selectedStudent:null
        };
    }
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/admin', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const students = await response.json();
            this.setState({students, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
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
                    <h3>Your children</h3>
                  <table className="tablechildren">
                      <thead>
                            <tr>{this.renderTableHeader()}</tr>
                      </thead>
                      <tbody>
                          {this.renderTableData()}
                      </tbody>
                  </table>
                </div>
            )
            : null
        }
    
renderTableData() {
        return this.state.students.map((student) => {
            return(
                <tr>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.user.username}</td>
                </tr>
            )
        })
    }
renderTableHeader() {
        return this.state.students.map((student) => {
            return (
                <tr>
                    <td>FirstName</td>
                    <td>Lastname</td>
                    <td>username</td>
                </tr>
            )
        })

    }
}
export default ChildrenPage;