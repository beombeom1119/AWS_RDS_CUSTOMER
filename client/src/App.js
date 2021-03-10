import React,{Component} from 'react';
import './App.css';
import Customer from './components/Customer';
import Header from './components/Header';
import CustomerAdd from './components/CustomerAdd';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography'



const styles = theme => ({
  root : {
    width : '100%',
    minWidth:1080
  },
  paper:{
    marginLeft:18,
    marginRight:18
  },
    progress:{
      margin : theme.spacing.unit*2
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
})




// const customers = [
// { "id": 1,"name":"이범기1", "birthday" : "9711191", 'gender' : "남자1", "job" : "대학생1" ,"img": "https://placeimg.com/64/64/any"},
// { "id": 2,"name":"이범기2", "birthday" : "9711192", 'gender' : "남자2", "job" : "대학생2","img": "https://placeimg.com/64/64/any"},
// { "id": 3,"name":"이범기3", "birthday" : "9711193", 'gender' : "남자3", "job" : "대학생3","img": "https://placeimg.com/64/64/any"},
// { "id": 4,"name":"이범기4", "birthday" : "9711194", 'gender' : "남자4", "job" : "대학생4","img": "https://placeimg.com/64/64/any"},
// ]

class App extends Component{



  constructor(props)     
  {
    super(props);
    this.state={
      customers:'',
      completed:0,
      searchKeyword:'',
    }
  }

  stateRefresh= () => {           //state 초기화 
    this.setState(
      {
        customers:'',
        completed:0,
        searchKeyword : "",
      });
      this.callApi().then(res=> this.setState({customers:res})) 
      .catch(err=> console.log(err));

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



  handleValueChange = (e) => {
    let nextState={};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);

  }



  
  render()
  
  {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      }
    );
    return data.map((c) => {
      return <Customer stateRefresh = {this.stateRefresh} key = {c.id} id={c.id} image = {c.image} name ={c.name} birthday = {c.birthday} gender = {c.gender} job = {c.job}/>
    });
  }


    
    const {classes} =this.props;
    const cellList = ["번호","프로필 이미지","이름","생년월일","성별","직업","설정"]
    return(
      <div className={classes.root}>
         <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name = "searchKeyword"
              value= {this.state.searchKeyword}
              onChange = {this.handleValueChange}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
        {/* <Header/> */}
      <Paper>
        <Table className={classes.table}>
        <TableHead>
         <TableRow>
           {
             cellList.map(c=>{
               return <TableCell className={
                 classes.tableHead}>{c}</TableCell>
               })
           }
         </TableRow>
        </TableHead> <TableBody>
        {this.state.customers ? 
        filteredComponents(this.state.customers) :   
      
        <TableRow><TableCell colSpan="6" align="center">
          <CircularProgress className={classes.progress} variant="determinate" value ={this.state.completed}>
          </CircularProgress> </TableCell> </TableRow>
        } </TableBody> </Table> </Paper>
      <CustomerAdd stateRefresh = {this.stateRefresh}></CustomerAdd>
      </div>
     
    );
  }
}


export default withStyles(styles)(App);
