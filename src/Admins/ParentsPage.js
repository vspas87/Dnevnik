import React, {Component} from 'react'
import ParentPage from '../Parents/ParentPage'

class ParentsPage extends Component {
    constructor(props){
        super(props)
        this.state={
                isLoading:false,
                isError:false,
                parents: []
        }
    }
    async componentDidMount() {
        this.setState({ isLoading: true});
        const response = await fetch('http://localhost:8095/dnevnik/parent',{
            method: 'GET',
            headers:{
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if(response.ok) {
            const users = await JSON.parse(response)
            this.setState({users, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true })
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
                    <h1 id="title">All parents</h1>
                  <table id='users'>
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
        return this.state.parents.map((parent) => {
            return(
                <tr key={parent.id}>
                    <td>{parent.id}</td>
                    <td>{parent.firstName}</td>
                    <td>{parent.lastName}</td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.parents[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default ParentPage;