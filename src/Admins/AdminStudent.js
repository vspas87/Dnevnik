import React , {Component} from 'react';

class AdminStudent extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                students: []
        };
    }
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/student', {
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
            return <div>Error....or doesnt have any grades</div>
        }
    
        return students.length > 0
            ? (
                <div>
                    <h3>All students for 2019/2020</h3>
                  <table className="tablemark">
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
                <tr key={student.id} >
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.schoolClass.className}</td>
                    <td>{student.user.USER_ID}</td>
                    <td>{student.parent.email}</td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.students[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminStudent;
