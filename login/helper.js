/* 
 Page Name: login
 Module Name:  -na-
 */
 $(document).ready(function() {
    common = {
        self:this,
        ajaxPostRequest: function(a, b, c) {
            $.ajax({
                type: "POST",
                url: a,
                data: b,
                dataType: "json"
            }).done(function(a) {
                c(a)
            })
        },

        ajaxPostRequestWithOverlay: function(a, b, c, d) {
            self.overlay_msg(d);
            $.ajax({
                type: "POST",
                url: a,
                data: b,
                dataType: "json"
            }).done(function(a) {
                c(a)
            }).always(function() {
                self.overlay_rem()
            })
        },
        overlay_msg: function(a) {
            $("#overlay").html("<span class='msg'>" + a + "<span>"), $("#overlay").fadeIn(), $("#overlay").css("opacity", 1)
        },
        overlay_rem: function() {
            $("#overlay").empty(), $("#overlay").fadeOut()
        },
        setCookie: function(name, value, hours)
        {
          if (hours)
          {
            var date = new Date();
            date.setTime(date.getTime()+hours*60*60*1000); // ) removed
            var expires = "; expires=" + date.toGMTString(); // + added
          }
          else
            var expires = "";
          document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
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
    common.init();
});
