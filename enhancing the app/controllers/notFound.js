//make a controller function that renders and returns 404 not found

//get function for 404
function getNotFound(req,res,next){
    res.status(404).render("404", {
        docTitle: "Not Found",
        path: ""
    });
};

module.exports = {
    getNotFound
};