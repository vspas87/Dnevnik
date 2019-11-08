import React, {Component} from 'react'


class ListGradeTeacher extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                gradings: [],
        };
 
    }

    async componentDidMount() {
        this.setState({isLoading:true});
        let classID= this.props.classID
        const response = await fetch(`http://localhost:8095/dnevnik/teacher/class/${classID}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json',
            }
        });
        if(response.ok) {
            const gradings= await response.json();
            this.setState({gradings, isLoading:false})
        } else {
            this.setState({isLoading:false, isError:true})
        }
    }
    renderTableHeader() {
        return(
            <tr>
                <td>Grading ID</td>
                <td>Student id</td>
                <td>Student name</td>
                <td>Exam type</td>
            </tr>
        )
    }
    renderTableData() {
        return this.state.gradings.map((grade) => {
            return(
                <tr key={grade.GRADING_ID}>
                    <td>{grade.GRADING_ID}</td>
                    <td>{grade.student.id}</td>
                    <td>{grade.student.firstName}</td>
                    <td>{grade.examType}</td>
                </tr>
            )
        })
    }  
    render() {
        const {gradings, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....</div>
        }
    
        return gradings.length > 0
            ? (
                <div>
                    <h3>Your given grades from  for class: {this.props.className}</h3>
                    <table className="tablemark">
                      <thead>
                            {this.renderTableHeader()}
                      </thead>
                      <tbody>
                        {this.renderTableData()}
                      </tbody>
                  </table>
                </div>
           
            )
            : null
            }
           
        }   
export default ListGradeTeacher;