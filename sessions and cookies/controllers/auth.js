exports.getLogin = (req,res,next)=> {
    //my mozilla browser sends a cookie having only 1
    //piece of data, that being the logiedIn boolean
    const isLoggedIn = req.get("Cookie")
        .trim()
        //the data is stored like this: loggedIn=true
        //so i need the second value of the array that is returned
        .split("=")[1];
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login Page",
        isAuthenticated : isLoggedIn
    });
}

exports.postLogin = (req,res,next) => {

    //even tho i update isLoggedIn, this data is not stored anywhere
    //after the request is finished, it doesn't persist
    //req.isLoggedIn = true;

    //setting up a cookie
    //the Set-Cookie header name is reserved
    //after its name, define the values i want to be stored
    res.setHeader("Set-Cookie", "loggedIn = true");
    res.redirect("/");
}