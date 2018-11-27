/*function deleteTodo(todo){
    axios.delete(`/todos/deleteTodo/${todo}`).then(res =>{
        console.log(res);
        location.reload();
    })
    .catch(err=>{
        console.log(err);
    });
    

}
*/
async function deleteTodo(todo){
    try{
        let res = await axios.delete(`/todos/deleteTodo/${todo}`);
        location.reload();
    
    } catch (err) {
        console.log(err);
    }
}