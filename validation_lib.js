validate_lib = {
	vl_self:this,
	vali_sel: {},

	format : {
		str_sp: "^[a-zA-Z ]+$",
		alphanumerical: "^([\\d]*[a-zA-Z]*)+$",
		alpha:"^([\\dA-Za-z\\s])+$",
		alpha_dash: "^([\\da-zA-Z/\]*)+$",
		alpha_slash: "^([\\d]*[a-zA-Z/\]*)+$",
		alpha_slash_dash: "^([\\da-zA-Z/\][-]*)+$",
		//reg_no: "^[a-zA-Z]{2}[0-9]{1,2}[a-zA-Z]{0,3}[0-9]{0,4}$",
		reg_no: "^[a-zA-Z]{2}[0-9]{1,2}[a-zA-Z]{0,3}[0-9]{4}$",
		echier_reg: "^[a-zA-Z]{2}[0-9]{2}[a-zA-Z]{1,2}[0-9]{4}$",
		house_no: 	"^[a-zA-Z0-9 /]{2,15}$" ,
    	street: 	"^[a-zA-Z0-9 ]{5,40}$" ,
    	locality: 	"^[a-zA-Z0-9 ]{5,40}$" ,
    	address_special : "^[a-zA-Z0-9 /.,-]{2,50}$" ,
		// standard 
		number : "^\\d+$",
		float : "^\\d+(\\.\\d+)?$",
		pincode:"^[1-9][0-9]{5}$",
		// gstin: "^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$", // updated at 25/07/2019
		gstin: "^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})(([a-zA-Z]{5}|[a-zA-Z]{4}[0-9{1}])[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}([zZ]{1}|[dD]{1})[0-9a-zA-Z]{1})+$",
		string : "^[a-zA-Z]+$",
		aadhar_no: 	"^[0-9]{4}[-][0-9]{4}[-][0-9]{4}$",
		mobile_nu : "^[9876]{1}[0-9]{9}$",
		aadhar_no_without_dash: 	"^[0-9]{12}$",
		pan_no: 	"^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$",
		IFSC_code:"^[a-zA-Z0-9]{11}$",
		eng_no: 	"^[a-zA-Z0-9]{8,30}$" ,
    chassis_no: "^[a-zA-Z0-9]{10,40}$" ,
    color: 		 "^[a-zA-Z ]{3,15}$" ,
    policy_no: 	"^[a-zA-Z0-9 /-]{8,30}$" ,
    date: "^[0-9]{2}[-][a-zA-Z]{3}[-][0-9]{4}$"
	},

	mesages : {
	},

	getSelectorName: function(form_id,hidden=true){
    	var sel = 'hidden';
		var unsel = 'visible';
		
		if(hidden){
			sel = 'visible';
			unsel = 'hidden';
		}
		
		curr_selector = sel+'_'+form_id;
		prev_selector = unsel+'_'+form_id;

		return {curr_selector:curr_selector,
				prev_selector:prev_selector};
    },
  destroyValidation:  function(form_id,hidden=false){
    var sel = 'hidden';
		var unsel = 'visible';
		
		if(hidden){
			sel = 'visible';
			unsel = 'hidden';
		}
    sl = sel+'_'+form_id;
    if(sl in vl_self.vali_sel)
    vl_self.vali_sel[sl].destroy();
  },
  
	applyValidation: function(form_id,validation_rule,hidden=false,ignore=false){
		if(!ignore)
		var ignore = ".ep_hidden :input,.ep_hidden select";
		else
			ignore = ignore;

		var rules = {};
		var mesages = {};
// 		validate on radio btn , checkbox and selectbox 
    $("#"+form_id).on("change","select,input[type=radio],input[type=checkbox]",function(){
      is_valid = $(this).valid();
      if(is_valid){
        	if($(this).closest('.error-cont').length > 0)
            $(this).closest('.error-cont').find('.error').remove();
           else
             $(this).closest('.form-group').next('.error').remove(); 
      }
    });
    
		$.each(validation_rule,function(key,value){
			if (value in vl_self.rules)
				rules[key] = vl_self.rules[value];
		})

		$.each(validation_rule,function(key,value){
			if (value in vl_self.mesages)
				mesages[key] = vl_self.mesages[value];
		})
		
		if(hidden)
			ignore = ":hidden";
  
		selector = vl_self.getSelectorName(form_id,hidden);
    
		if(selector.prev_selector in vl_self.vali_sel)
		vl_self.vali_sel[selector.prev_selector].destroy();
    
    return vl_self.vali_sel[selector.curr_selector] = $("#"+form_id).validate({
			ignore : ignore,
      keypress: true,
      submitHandler: function() {},
      rules: rules,
			messages: mesages,
      errorPlacement: function (error, element) {
        if(error[0]['textContent'] == "Please fill at least 1 of these fields.")
			    	if($(element).closest('.error-cont').length > 0){
						$err = $(element).closest('.error-cont');
						$(element).closest('.error-cont').find('.error-place').remove();
						$err.prepend('<div class="error-place"></div>');
			        	$(element).closest('.error-cont').find('.error-place').append(error);
			        }
			        else 
			 	       	$(element).closest('.form-group').after(error);
			 	else
            $(element).closest('.form-group').after(error);
		    }	
		});
	},
  removeFieldRules: function(form,rules){
    var uform = form;
      $.each(rules,function(k,v){
        if($("#"+uform+" [name='"+k+"']").length)
        $("#"+uform+" [name='"+k+"']").rules( "remove" );
      })
  },
  addFieldRules:function(form,rules){
    var uform = form;
    $.each(rules,function(k,v){
       if($("#"+uform+" [name='"+k+"']").length)
        $("#"+uform+" [name='"+k+"']").rules("add", vl_self.rules[v]);
      })
  },
	addFormGrpReq: function(arr){
		$.each(arr,function(key,val){
			$.validator.addClassRules(val, {
		  		require_from_group: [1, "."+val]
			});	
		})
	},
	
	isValidate: function(form_id){		
    	return $('#'+form_id).valid();
	},

	addRules : function(rules){
		$.each(rules,function(k,v){
			vl_self.rules[k] = v;
		});
	},
	get_errors: function(form_id,ignore="",visible=true){
		obj = (visible)? $(form_id+" .error:visible")
		: $(form_id+" .error");
		error = {};
		$(obj).each(function(k,v){
			label = $(this).attr("for");
			if(typeof label == "undefined")
			return true;
			label = label.replace(/_/gi," ").toUpperCase();
			error[label] = $(this).text();
		});
		return error;
	},
	init: function(){
		vl_self = this;
		vl_self.rules = {};
	}

}

validate_lib.init();

// defined common rules
vl_self.rules = {
  designation: {
    required: true,
    regex: {
			reg: validate_lib.format.string,
			msg: "Please Enter Only Character"
	}
  },
  required : {
    required: true
  },
	email : {
		required: true,
		email: true
	},
  price:{ 
		required:true,
		regex: {
			reg: validate_lib.format.number,
			msg: "Please Enter Number Only"
		},
	},
	mobile:{ 
		required:true,
		regex: {
			reg: validate_lib.format.mobile_nu,
			msg: "Please Enter 10 Digit Mobile Number"
		},
		minlength:10,
    maxlength:10
	},
	password : {
		required:true,
		minlength: 6,
	},
	conf_password : {
		required:true,
		equalTo:'#password',
		minlength: 6,
	},
	irdi_no:{
		required:true,
	},
	landline:{
		regex: {
			reg: validate_lib.format.number,
			msg: "Please Enter 10 Digit Mobile Number"
		},
    minlength: 6,
    maxlength: 11,
	},
  date:{
    required:true,
		regex: {
			reg: validate_lib.format.date,
			msg: "Please Enter Correct Date Format"
		},
  },
  number:{
    required:true,
		regex: {
			reg: validate_lib.format.number,
			msg: "Please Enter Number Only"
		},
  },
  age:{
    required:true,
		regex: {
			reg: validate_lib.format.number,
			msg: "Please Enter Number Only"
		}
  },
  alpha: {
    required:true,
		regex: {
			reg: validate_lib.format.alpha,
			msg: "Special Character Not Allowed"
		}
  },
  address_special: {
    required:true,
		regex: {
			reg: validate_lib.format.address_special,
			msg: "Special Character Not Allowed Except [,/-.]"
		}
  },
  alphanumerical: {
    required:true,
		regex: {
			reg: validate_lib.format.alphanumerical,
			msg: "Special Character Not Allowed and Space"
		}
  },
  name:{
    required:true,
    regex: {
    reg: validate_lib.format.str_sp,
    msg: "enter only characters"
    }
  },
  mname:{
    regex: {
    reg: validate_lib.format.str_sp,
    msg: "enter only characters"
    }
  },
 fname:{
    required:true,
    regex: {
    reg: validate_lib.format.string,
    msg: "Enter Only Characters"
    }
  },
 lname:{
     regex: {
    reg: validate_lib.format.string,
    msg: "Enter Only Characters"
    }
  },
 mname:{
    regex: {
    reg: validate_lib.format.string,
    msg: "Enter Only Characters"
    }
 },
 pan_no:{ 
 	//required: true,   
    regex: {
    reg: validate_lib.format.pan_no,
    msg: "Enter Correct Pan Number"
    },
      minlength: 10,
    maxlength: 10,
 },
 aadhar_no:{   
    regex: {
    reg: validate_lib.format.aadhar_no,
    msg: "Enter Correct Aadhaar Number"
    }
 },
 aadhar_no_without_dash:{  
 	//required: true,  
    regex: {
    reg: validate_lib.format.aadhar_no_without_dash,
    msg: "Enter Correct Aadhaar Number"
    }
 },
 address:{
   required: true,
   regex:{
       reg: validate_lib.format.alpha,
       msg: "No Special Charcter Allowed"
   }
 },
 pincode:{
   required: true,
   regex:{
       reg: validate_lib.format.pincode,
       msg: "Enter 6 Digit Pincode"
   }
 },
 gst_no_not_required:{
   regex:{
       reg: validate_lib.format.gstin,
       msg: "Enter 15 Digit GST No in Correct Format."
   },
   minlength:15,
    maxlength:15
 },
 gst_no:{
   required: true,
   regex:{
       reg: validate_lib.format.number,
       msg: "Enter 15 digit GST No"
   },
   minlength:15,
    maxlength:15
 },
 bank_acctno:{
   required: true,
   regex:{
       reg: validate_lib.format.number,
       msg: "Enter Digits Only"
   },
    maxlength:16
 },
 ifsc_code:{
   required: true,
   regex:{
       reg: validate_lib.format.IFSC_code,
       msg: "Enter Correct IFSC Number"
   },
   minlength: 11,
    maxlength: 11,
 },
 micr_code:{
   required: true,
   regex:{
       reg: validate_lib.format.number,
       msg: "Enter Correct MICR Code"
   },
   minlength: 9,
    maxlength: 9,
 },
reg_no:{
   required: true,
   regex:{
       reg: validate_lib.format.reg_no,
       msg: 'Enter the correct Registration Number'
   }
 },
 reg_no_without_required:{
	required: false,
	regex:{
			reg: validate_lib.format.reg_no,
			msg: 'Enter the correct Registration Number'
	}
},
echier_reg:{
   required: true,
   regex:{
       reg: validate_lib.format.echier_reg,
       msg: 'Correct Format like MH01AB1234'
   }
 },
 vehicle_idv:{
 	required: true,
 	greater: 5000
 }
  
};

// you can add external method over here
$.validator.addMethod("regex",function(value, element, params ) {
		if(typeof params == 'object')
			regexp = params.reg;
		else
			regexp = params;
		var re = new RegExp(regexp);
		return this.optional(element) || re.test(value);
	},
	function(params, element) {
		if(typeof params.msg != 'undefined')
			return params.msg;
		return 'Invalid Input. Please correct.';
	}
);

$.validator.addMethod("email",function(value, element, params ) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	},
	function(params, element) {
		if(typeof params.msg != 'undefined')
			return params.msg;
		return 'Please Enter Correct Email.';
	}
);

$.validator.addMethod("greater",function(value, element, params ) {
		return (value > params)
	},
	function(params, element) {
		if(typeof params.msg != 'undefined')
			return params.msg;
		return 'Please Enter Value Greater than '+params;
	}
);
