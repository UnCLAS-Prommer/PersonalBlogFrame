// JavaScript Document
/* exported Render Command_screen Chat Black_Curtains Select_File*/
function Render(conparms){
	var render = conparms[1].getElementsByTagName("p");//获取<p>标签的集合数组
	var num_people = conparms[0];//获取人数
	var rennum = render.length;//得到总长度
	var text;
	for(var i = 0; i < rennum;i++) {
		text = render[i].innerHTML;//获取人名，即HTML代码内的内容
		for(var j = 1; j <= num_people;j++){
			if(text.search(conparms[2*j]) != -1) /*判断*/{
				render[i].style.color = conparms[2*j+1];//修改属性
			}
		}
	}
}
function Command_screen(){ 
	//此段程序真的靠BUG运行 当不展开时，deatils的open会get到空(应该为false)，当展开时，deatils的open会get到null(应该为true)
	//此程序在<summary>被点时调用，使用onclick="Command_screen()"
	var cmd = document.getElementsByClassName("command_screen");//寻找位置
	var cmd_para;
	var num_cmd = cmd.length;
	for(var i = 0; i < num_cmd;i++) {
		cmd_para = cmd[i].getElementsByTagName("details"); //判定deatails
		if(cmd_para[0].getAttribute("open") != null) { //判定open
			cmd[i].style.backgroundColor = "rgb(0,0,0,0)";
			cmd[i].getElementsByTagName("summary")[0].style.color = "#000000";
		}
		if(cmd_para[0].getAttribute("open") == null){ //第一次时，getAttribute总会收到null，但好像无所谓
			cmd[i].style.backgroundColor = "rgb(0,0,0,1)";
			cmd[i].getElementsByTagName("summary")[0].style.color = "#0DD424";
		}
	}
}
/*
这一块是为了实现类似微信聊天那样的左右以及框功能的。构想是人名后加冒号，通过innerHTML加上<span>代码块，分离代码计算，生成效果。效果见聊天*/
function Chat(myself,others,location,format,subjects){
	var chat_num = location.getElementsByTagName("p").length;//判定个数
	var text_list = location.getElementsByTagName("p");//获取组
	var mlength = myself.length;//获取自己昵称长度
	var olength = others.length;//他人
	var text,text_front,text_last;//声明字符串拼接(text不是拼接用)
	//函数
	function Chat_Others(){
		text_list[i].style.textAlign = "left";//设置位置
		text_front = text.slice(0,olength);//截取前半
		text_last = text.slice(olength);//截取后半
		if(format == "QQ"){ //判断格式
			text_list[i].innerHTML = text_front + '<span class = "chat_others_QQ">' + text_last + '</span>';
		}
		if(format == "WeChat"){
			text_list[i].innerHTML = text_front + '<span class = "chat_others_WeChat">' + text_last + '</span>';//拼接计算
		}
	}
	function Chat_Myself(){
		text_list[i].style.textAlign = "right";
		text_front = text.slice(0,-mlength);//从后向前截取(最终效果要求)
		text_last = text.slice(-mlength);
		if(subjects == "others"){//判定转发
			if(format == "QQ"){
				text_list[i].innerHTML = '<span class = "chat_myself_QQ_2">' + text_front + '</span>' + text_last;//转换格式拼接
			}
			if(format == "WeChat"){
				text_list[i].innerHTML = '<span class = "chat_myself_WeChat_2">' + text_front + '</span>' + text_last;
			}
		}
		else{//正常拼接
			if(format == "QQ"){
				text_list[i].innerHTML = '<span class = "chat_myself_QQ">' + text_front + '</span>' + text_last;
			}
			if(format == "WeChat"){
				text_list[i].innerHTML = '<span class = "chat_myself_WeChat">' + text_front + '</span>' + text_last;
			}
		}
	}
	//主程序
	for(var i = 0;i < chat_num;i++){
		text = text_list[i].innerHTML;
		if(text.search("<img") == -1){
			if(text.slice(0,olength) == others && others != "empty"){ //判定只记录自言自语等情况
				Chat_Others();
			}
			if(text.slice(-mlength) == myself && myself != "empty"){ //判定只记录别人独白等情况
				Chat_Myself();
			}
		}
		else{
			text_list[i].getElementsByTagName("img")[0].style.verticalAlign = "top";
		}
	}
}
function Black_Curtains(){
	var cur_list = document.getElementsByTagName("hidding");//获取
	var cur_leng = cur_list.length//长度，循环用
	for(var i = 0;i < cur_leng;i++){
		if(cur_list[i].title == ""){//默认状态
			cur_list[i].title = "你知道的太多了";
		}
	}
}
function Select_File(loc, parent_path, audio_id){
	audio_id.volume = 0.08;
	var values = loc.value;
	var file_path = parent_path + values;
	audio_id.getElementsByTagName("source")[0].src = file_path;
	audio_id.load();
}

/*
Plans:
1.完善Chat()，看看能不能加上头像，然后重新调整。
*/
/*大量注释说明:
1.window.onload用法:
	window.onload = function(){目标函数};
	若直接使用:
	window.onload = 目标函数
	会调用失败
2.记得分清楚 null 与 "" 之间的不同
3.window.onload无法自动播放音视频。现无解决方案。
4.bug不要改
5.Chat示例：Chat("：我","张：",$20230121redpacket01,"QQ","myself")
*/