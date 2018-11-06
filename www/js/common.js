/* redirect page */
function redirect(route) {
	window.location.href = route;
}

/* validate email */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/* write cookie */
function writeCookie(cookie) {
	document.cookie = cookie;
}

/* get cookie */
function getCookie(cname) {
	var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* check cookie */
function checkCookie() {
    var user = getCookie("user");
    if (user != "") {
        //alert("Welcome again " + user);
        redirect("start.html");
    } else {
        redirect("login.html");
    	/*
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("user", user, 365);
        }
        */
    }
}