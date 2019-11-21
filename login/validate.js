/* 
 Page Name: login
 Module Name:  -na-
 */
 $(document).ready(function(){
	form_id = 'form-login';
    
    field_rules  = {
        'user_name':'alphanumerical',
        'password':'check_password'
    };
    
    rules = {
    	user_name:{
    		required:true,
    		regex: {
				reg: validate_lib.format.email,
				msg: "enter only alphanumeric characters"
			}
    	},
        check_password:{
            required: true
        }
    }

    validate_lib.addRules(rules);
    validate_lib.applyValidation(form_id,field_rules);
})
