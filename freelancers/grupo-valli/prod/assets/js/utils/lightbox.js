var Lightbox=function(){var i=$(".box-thumbs"),n=$(".carousel"),e=$(".description-carousel p"),t=$("#prev"),a=$("#next"),s="",c="",r="",o="",l="";function d(){i.find("a").on("click",function(){for(var i=$(this).parent().find("a").length,t=$(this).parents(".box-business").children(".btn-accordion").text(),a=$(this).index(),r=0,o=i;r<o;r++){var d=$(this).parent().find("a").eq(r).children("img").attr("src").replace("thumbs/","");n.append('<li><img src="'+d+'" alt="Image '+(r+1)+'" title="Image '+(r+1)+'" /></li>')}l=n.find("li").width(),c=a,s=i-1,n.width(l*i),n.css("marginLeft",-(l*a)),e.text(t),f(),$(".overlay, .lightbox").show()}),t.on("click",function(){r=parseInt(n.css("marginLeft").replace("px","")),o=r+l,n.is(":animated")||(n.animate({marginLeft:o},500),c--),f()}),a.on("click",function(){r=parseInt(n.css("marginLeft").replace("px","")),o=r-l,n.is(":animated")||(n.animate({marginLeft:o},500),c++),f()}),$("#close, .overlay").on("click",function(){$(".overlay, .lightbox").hide(0,function(){n.find("li").remove(),n.removeAttr("style")})})}function f(){c==s?a.css("display","none"):a.css("display","block"),0==c?t.css("display","none"):t.css("display","block")}return d}();