module.exports = function sendresponse(req,res,output){

    //header assignment
    const reqHeader = req.headers; //write HEADERS
    console.log(reqHeader);

    const {referer} = reqHeader;
    //sitechecking
    if(referer === undefined){var sitechecker = false} else { var sitechecker = true};    
    console.log(sitechecker);

    if(sitechecker){
        res.render('index',{output})}
        else{
            res.json(output)};
}