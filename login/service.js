/* 
 Page Name: login
 Module Name:  -na-
 */
 // on click of form create account 
req_data = {auth: {'accesskey': 'TTIBI','signature': ''},'data': {'user_code' : '',	'password' : ''}};
$('#login_btn').click(function(){
    req_data.data.user_code = $('#user_code').val();
    req_data.data.password = $('#password').val();
    var msg = 'Please wait while we login you to your account.';
    var url = APP_URL+'/api/login';
    var return_function  = function(c){
        error_label = '<label class="server-error error">[error]</label>';
        $('#form-login').find('.server-error').remove();
        if(c.success){
                //alert(c.message);
                common.setCookie('jwt_token',c.data.token,'2');
                window.location.href = APP_URL+"/"+c.data.redirect_url;
            }
            else{
                errors = [];
                if(typeof c.error == "string")
                    //alert(c.error);
                    x0p('', c.error, 'error');
                else
                $.each(c.error,function(k,error_objs){
                    field_name = k;
                    $.each(error_objs,function(error_objs_k,error_objs_v){
                      str_er = error_label.replace('[error]',error_objs_v[1]);
                      $('#'+field_name).after(str_er);
                    });
                });
            }
    }
    is_validated = validate_lib.isValidate(form_id);
    if(is_validated){
        var data = req_data;//$('#form-login').serialize();
        common.ajaxPostRequestWithOverlay(url,data,return_function,msg);
    }
});
