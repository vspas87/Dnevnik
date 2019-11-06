import React , {Component} from 'react';

class AdminSubject extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                subjects: [],
            
        };
    }
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/subject', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const subjects = await response.json();
            this.setState({subjects, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {subjects, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....Are you sure this school doesnt teach ANY subject?</div>
        }
    
        return subjects.length > 0
            ? (
                <div>
                    <h3>All subjects and following info for 2019/2020</h3>
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
        return this.state.subjects.map((subject) => {
            return(
                <tr key={subject.SUBJECT_ID} >
                    <td>{subject.SUBJECT_ID}</td>
                    <td>{subject.name}</td>
                    <td>{subject.weeklyFund}</td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.subjects[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminSubject;
