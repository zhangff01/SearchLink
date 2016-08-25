# searchLink
搜索加下拉框联动控件 -- pluugins about search with combobox autoly

基于jQuery实现

        主要参数(参数以对象形式传入，参数不传以以下则为默认值)
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
		
		例子：
	    <body>
    	    <div style="margin-top:100px;margin-left:100px;" id="container">
    		    <script language="javascript" type="text/javascript">
    			    var searchlink=new searchLink($("#container"));
    		    </script>
    	    </div>
    	</body>

注：
    
    示例中读取的是本地json文件，高版本的IE、chrome和火狐是禁止读取本地json数据的
    所以想看本地效果的话请在IE11(不包括)版本一下预览效果
