function deleteTodo(todo){
    axios.delete(`/todos/deleteTodo/${todo}`).then(res =>{
        console.log(res);
        location.reload();
    })
    .catch(err=>{
        console.log(err);
    });

}