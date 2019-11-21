/* 
 Page Name: logout
 Module Name:  -na-
 */
 $('#logout').on('click',function(){
	var msg = 'Please wait while we login you to your account.';
    var url = APP_URL+'/api/logout';
    var return_function  = function(c){
        if(c.success){
            logout_common.delCookie('jwt_token');
            window.location.href = APP_URL;
        }
    }
    logout_common.logout(url,return_function,msg);
});
