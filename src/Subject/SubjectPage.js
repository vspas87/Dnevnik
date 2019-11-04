import React, {Component} from 'react'

class SubjectPage extends Component {
    constructor(props){
    super(props)
    this.state={
        isLoading:false,
        isError:false,
        subjects:[]
    };
}

async componentDidMount() {
    this.setState({isLoading: true});
    const response= await fetch('http://localhost:8095/')
}
}