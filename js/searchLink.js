//       name--searchLink
//       user--zhangff01
//    version--v0.0.1
//       time--2016.08
;(function(Window,jQuery,document,undefined){
	"use strict";

	var Settings;
	if(!Settings){
		Settings={
			textwidth:400,
			btnwidth:82,
			height:24,
			btntext:"搜索",
			requesturl:"js/mydata.json",//必填
			searchurl:"https:www.baidu.com/s?wd=",//必填
			searchName:"searchname",//搜索框参数
			jsondata:"data",		//json对象要显示的数据
			dataparam1:"name",		//显示的数据字段1
			dataparam2:"num"		//显示的数据字段2
		};
	}
	function SearchLink(element,options){
		this.element=element;
		this.options=$.extend({},Settings,options||Settings);
		this.init();
	}
	SearchLink.prototype={
		contructor:SearchLink,
		init:function(){
			this.renderHtml();
			this.bindEvent();
		},
		renderHtml:function(){
			var _this=this;
			var options=this.options;
			var _textwidth=options.textwidth+"px";
			var _btnwidth=options.btnwidth+"px";
			var _height=options.height+"px";
			var _btnheight=(parseInt(options.height)+12)+"px";
			var _ulheight=(parseInt(options.textwidth)+9)+"px";
			var html=[];
			html.push('<div class="boxdiv">');
			html.push('<input type="text" name="key" id="key" class="searchKey" style="width:'+_textwidth+';height:'+_height+'" />');
			html.push('<input type="button" name="btn" id="btn" class="searchBtn" style="width:'+_btnwidth+';height:'+_btnheight+'" value="'+options.btntext+'" />');
			html.push('<div class="helper" style="width:'+_ulheight+'"><ul class="ulone"></ul>');
			html.push('<ul class="ultwo"><li><span id="close">关闭</span></li>');
			html.push('</ul></div>');
			_this.element.append(html.join(""));
		},
		bindEvent:function(){
			var _this=this;
			_this.element.on("keyup","#key",function(event){
				if($(this).val().length<=0){
					$(".helper").hide();
				}
				var keycode = (event.keyCode ? event.keyCode : event.which);  
				if(keycode==38||keycode==40||keycode==13){
					return false;
				}else{
					if($(this).val().length>0){
						_this.toLink($(this).val());					
					}
				}
			});
			_this.element.on("keydown","#key",function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);  
		    	if(keycode == 38){  //up
		    		_this.moveSelect(-1);
		    	}  
		    	else if (event.keyCode == 40){//down
		    		_this.moveSelect(1);
		 		}
		    	else if(event.keyCode == 13){//enter
		    		_this.toSearch($(this).val());
		    	}else{
		    		return ;
		    	}
			});
			_this.element.on("click","#key",function(){
				if($(this).val().length>0){
					$(".helper").show();
				}	
			});
			_this.element.on("focus","#key",function(){
				if($(this).val().length>0){
					$(".helper").show();
				}	
			});
			_this.element.on("click","#close",function(){
				$(".helper").hide();
			});
			_this.element.on("click","#btn",function(){
				_this.toSearch($("#key").val());
			});
			_this.element.on("mouseleave",".boxdiv",function(){
				$(".helper").hide();
			});
		},
		toSearch:function(searchname){
			Window.location.href=this.options.searchurl+searchname;
		},
		toLink:function(searchname){
			var _this=this;
			var sname=_this.options.searchName;
			$.ajax({
				url:_this.options.requesturl,
				type:'post',
				data:{sname:searchname},
				success:function(data){
					$(".ulone").empty();	
					var json=$.parseJSON(data);		
					$.each(json[_this.options.jsondata],function(i,obj){
						$(".ulone").append('<li><span>'+obj[_this.options.dataparam1]+'</span><span class="count">约'+obj[_this.options.dataparam2]+'个记录</span></li>');
					});
					_this.element.on("hover",".ulone li",function(){
						$(this).addClass("onhover");
						$(this).siblings().removeClass("onhover");
					});
					_this.element.on("click",".ulone li",function(){
						var sname=$(this).find("span:eq(0)").text();
						_this.toSearch(sname);
					});
					_this.element.on("mouseout",".ulone",function(){
						$(this).find("li").removeClass("onhover");
					});
					$(".helper").show();
				},
				error:function(error){				
					console.log("出错了...");
					console.log(error);
				}
			});
		},
		moveSelect:function(step){
			var listItems=$('.ulone li');
     		//当前hover的步数
     		var active;
     		active =  $('.onhover').index();
     		//flag=active;
     		listItems.eq(active).removeClass("onhover");
     		active += step;
     		if (active < 0) {
         		active = listItems.size() - 1;
     		} else if (active >= listItems.size()) {
         		active = 0;
     		}
     		var activeItem = listItems.eq(active).addClass("onhover");
     		var name=listItems.eq(active).find("span:eq(0)").text();
     		$("#key").val(name);
		}
	}
	Window.searchLink = SearchLink;
})(window,jQuery,document)
