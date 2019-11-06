import React , {Component} from 'react';

class AdminClass extends Component {
    constructor(props){
        super(props);
        this.state={
                isLoading:false,
                isError:false,
                aclass: []
        };
    }
        async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/class', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const aclass = await response.json();
            this.setState({aclass, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {aclass, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....or doesnt have any classes</div>
        }
    
        return aclass.length > 0
            ? (
                <div>
                    <h3>All school classes for 2019/2020</h3>
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
        return this.state.aclass.map((aclas) => {
            return(
                <tr key={aclas.CLASS_ID} >
                    <td>{aclas.CLASS_ID}</td>
                    <td>{aclas.className}</td>
                    <td>{aclas.schoolYear}</td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.aclass[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminClass;
