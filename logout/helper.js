/* 
 Page Name: logout
 Module Name:  -na-
 */
 $(document).ready(function() {
    logout_common = {
        self:this,
        logout: function(a, b, c) {
            $.ajax({
                type: 'POST',
                url: a,
//                 headers:{
// 			        'Authorization': 'Bearer '+logout_common.getCookie('jwt_token')
// 			    },
			    data:{ 'ait' : logout_common.getCookie('jwt_token')},
                dataType: "json"
            }).done(function(a) {
                b(a)
            })
        },
        getCookie: function(name) {
            var cookieName = name + "="
            var docCookie = document.cookie
            var cookieStart
            var end
                if (docCookie.length>0) {
                    cookieStart = docCookie.indexOf(cookieName)
                if (cookieStart != -1) {
                    cookieStart = cookieStart + cookieName.length
                    end = docCookie.indexOf(";",cookieStart)
                if (end == -1) {
                    end = docCookie.length}
                    return unescape(docCookie.substring(cookieStart,end))
                }
            }
        return false
        },
        delCookie: function(name) {
            document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        // End Email Quote Function
        init: function(){
            self =  this;
        }
    };
    logout_common.init();
	// test bracnh
});
