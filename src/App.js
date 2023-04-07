import Todo from './Todo';
import React from 'react';
import AddTodo from './AddTodo';
import DeleteTodo from './DeleteTodo';
import {Paper,List,Container, AppBar, Toolbar, Grid, Typography, Button} from "@material-ui/core"
import {call, signout} from './service/ApiService'

class App extends React.Component {
  constructor(props){   //매개변수 props 생성자
    super(props);      //매개변수 props 초기화
    this.state = {    //item 에 item.id, item.title, item.done 매개변수 이름과 값 할당
      items : [],
      loading : true,
    };
  }
  // add 함수 추가
  add = (item)=>{
    call("/todo","POST",item).then((response)=>
      this.setState({items:response.data})
    )
  }
  // delete 함수 추가. (alt+shit+f 포맷팅)
  delete=(item)=>{
    call("/todo","DELETE",item).then((response)=>
      this.setState({items:response.data})
    );
  }

  update=(item)=>{
    call("/todo","PUT",item).then((response)=>
      this.setState({items:response.data})
    );
  }

  deleteForCompleted = ()=>{
    const thisItems = this.state.items;
    thisItems.map((e)=>{
      if(e.done === true){
        call("/todo","DELETE",e).then((response)=>
          this.setState({items:response.data})
        );
      }
    });
  }

  componentDidMount=()=>{
    call("/todo","GET",null).then((response)=>
      this.setState({items:response.data,loading:false})
    );
  }

  render(){
    // todoItems에 this.state.items.length 가 0보다 크다면 true 이므로 && 뒤에 값을 넘겨준다.
    // todoItem = this.sate.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과이다. 조건선택문 ? ternary operator
    // 자바스크립트가 제공하는 map 함수를 이용해서 배열을 반복해 <Todo />> 컴포넌트를 여러개 생성한다.
    var todoItems = this.state.items.length >0 &&(
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx)=>(
            <Todo item={item} key={item.id} delete ={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    var navigationBar=(
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant='h6'>오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color='inherit' onClick={signout}>logout</Button>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    );

    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
        <DeleteTodo deleteForCompleted={this.deleteForCompleted} />
      </div>
    );

    var loadingPage = <h1>로딩중..</h1>
    var content = loadingPage;

    if(!this.state.loading){
      content = todoListPage;
    };
    // add 함수 연결
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
