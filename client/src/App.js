import React,{Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  root : {
    width : '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX:"auto"
  },
    table:{
      minWidth:1080
    },
    progress:{
      margin : theme.spacing.unit*2
    }
})




// const customers = [
// { "id": 1,"name":"이범기1", "birthday" : "9711191", 'gender' : "남자1", "job" : "대학생1" ,"img": "https://placeimg.com/64/64/any"},
// { "id": 2,"name":"이범기2", "birthday" : "9711192", 'gender' : "남자2", "job" : "대학생2","img": "https://placeimg.com/64/64/any"},
// { "id": 3,"name":"이범기3", "birthday" : "9711193", 'gender' : "남자3", "job" : "대학생3","img": "https://placeimg.com/64/64/any"},
// { "id": 4,"name":"이범기4", "birthday" : "9711194", 'gender' : "남자4", "job" : "대학생4","img": "https://placeimg.com/64/64/any"},
// ]

class App extends Component{



  state= {
    customers:"",     //변경될 값이기 때문에 ""처리
    completed: 0
  }
  
  componentDidMount() {
    this.timer = setInterval(this.progress,20);
    this.callApi().then(res=> this.setState({customers:res})) 
    .catch(err=> console.log(err));    // 가져온 JSON값을 customers에 저장
  }
  
  callApi = async() =>{
    const response = await fetch('/api/customers');  //server.js 에 있는 /api/customers JSON값을 가져온다
    const body = await response.json();
    return body;
  }
  

  progress = () => {
    const {completed} =this.state;
    this.setState({ completed: completed>=100? 0 : completed+1});
  }

  
  render()
  
  {
    const {classes} =this.props;
    return(
      <Paper className={classes.root}>
        
        <Table className={classes.table}>
        <TableHead>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>생년월일</TableCell>
          <TableCell>성별</TableCell>
          <TableCell>직업</TableCell>

        </TableHead>
        
        
        <TableBody>
        {this.state.customers ? this.state.customers.map(customer=> {return (<Customer key = {customer.id} id = {customer.id} name = {customer.name} birthday={customer.birthday} gender={customer.gender} job ={customer.job} image ={customer.image}>  </Customer>)
        }): 
        <TableRow>
            <TableCell colSpan="6" align="center">
          <CircularProgress className={classes.progress} variant="determinate" value ={this.state.completed}>
          </CircularProgress>
            </TableCell>
        </TableRow>
        
        }
      
        </TableBody>
        </Table>
        
      

      </Paper>
    );
  }
}


export default withStyles(styles)(App);
