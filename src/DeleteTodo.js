import { Grid, IconButton } from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutline";
import React from "react";


class DeleteTodo extends React.Component{
    constructor(props){
        super(props)
        this.deleteForCompleted=props.deleteForCompleted;
    }
    render(){
        return(
            <div>
                
                <Grid container justifyContent="center">
                
                    <IconButton
                        aria-label="Delete"
                        onClick={this.deleteForCompleted}
                        
                    >
                      완료한 할일들 일괄 삭제
                  <DeleteOutlined />
                    </IconButton>
                </Grid>
            </div>
        )
    }
}

export default DeleteTodo;



