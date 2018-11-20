module.exports = () =>{
    return (req,res,next) =>{
        if(req.cookies._id != "" && req.cookies._id != null && req.cookies._id != undefined)
        {
            next();
        }
        else
        {
            if(req.url === '/' || req.url === '/users/login' || req.url === '/users/register')
            {
                next();
            }
                
            else
            {
                res.redirect('/');
            }
        }
    }
}