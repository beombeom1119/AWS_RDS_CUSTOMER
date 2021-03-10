import React, { Component } from 'react';
import Customer from './Customer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';




class CustomerDelete extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false
        }
        
    }

    handleClickOpen = () => {
        this.setState({
        open: true
        });
        }
        
        
        
        handleClose= () => {
        this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
        })
        }


    
    deleteCustomer(id) {
        const url = '/api/customers/' +id;
        fetch(url, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }

    render()
    {
        return(
            <>
        <Button variant="contained" color="secondary" onClick = {this.handleClickOpen}>삭제</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle onClose={this.handleClose}>
                삭제 경고
            </DialogTitle>
            <DialogContent>
            <Typography gutterBottom>
                선택한 고객 정보가 삭제됩니다.
            </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={(e)=> { this.deleteCustomer(this.props.id)}}>삭제</Button>
                <Button variant="contained" color="outlined" onClick={this.handleClose}>닫기</Button>
            </DialogActions>

        </Dialog>
        </>
        )
    }


}

export default CustomerDelete;