module.exports = () =>{
    return (res,req,next) =>{
        if(req.url == '/' || req.url === '/users/login' || req.url === '/users/register')
            {
                console.log(req.url);next();}
        else
        {
            console.log(req);
            if(req.cookie["_id="]);
                next();
            else
            {
                console.log("nema dalje");
            }
        }
    }
}