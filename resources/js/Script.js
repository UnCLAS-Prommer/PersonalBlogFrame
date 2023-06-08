// JavaScript Document
/* exported Render Command_screen Chat Black_Curtains Select_File*/
var Sidebar = true;
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
function Black_Curtains(){
    var cur_list = document.getElementsByTagName("hidding");//获取
    var cur_leng = cur_list.length;//长度，循环用
    for(var i = 0;i < cur_leng;i++){
        if(cur_list[i].title == ""){//默认状态
            cur_list[i].title = "你知道的太多了";
        }
    }
}
document.onkeypress = function(e){background(e)}
//背景相关
function background(key){
    if(key.keyCode == 13){
        if(!Visible){
            document.getElementById("wrapper").style.opacity = 0;
            Visible = true;
        }
        else{
            document.getElementById("wrapper").style.opacity = 100;
            Visible = false;
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
function Side_Bar(){
    if(Sidebar){
        document.getElementById("index").className = "index index_hidden";
        document.getElementById("toc").className = "toc_hidden";
        document.getElementById("wrapper").className = "wrapper wrapper_extend";
        document.getElementById("index_button").innerHTML = "[Show Index]";
    }
    else{
        document.getElementById("index").className = "index";
        document.getElementById("index_button").innerHTML = "[Hide Index]";
        document.getElementById("wrapper").className = "wrapper";
        setTimeout(function(){document.getElementById("toc").className = "toc";},500);
    }
    Sidebar = !Sidebar;
}
//这一块是为了实现类似微信聊天那样的左右以及框功能的。构想是人名后加冒号，通过innerHTML加上<span>代码块，分离代码计算，生成效果。效果见聊天
function Chat_new(myself,others,location,format,subjects,is_inner){
    var chat_list = location.getElementsByTagName("chat"); // Get List
    var chat_num = chat_list.length;
    var mlength = myself.length;
    var olength = others.length;
    function Chat_Others(container, name, content, line){
        name.innerHTML = others;
        content.innerHTML = line.slice(olength);
        container.className = "con_container_l";
        name.className = "con_name_l";
        content.className = "con_content_l";
        container.appendChild(name);
        container.appendChild(content);
        return container;
    }
    function Chat_Myself(container, name, content, line){
        name.innerHTML = myself;
        content.innerHTML = line.slice(mlength);
        container.className = "con_container_r";
        name.className = "con_name_r";
        content.className = "con_content_r";
        container.appendChild(content)
        container.appendChild(name);
        return container;
    }
    function Render_QQ(box, target){
        if(target == "others"){
            box.children[1].className += " chat_others_QQ";
        }
        if(target == "myself"){
            if(subjects == "others"){
                box.children[0].className += " chat_myself_QQ_2";
            }
            else{
                box.children[0].className +=  " chat_myself_QQ";
            }
        }
        location.appendChild(box);
    }
    function Render_WeChat(box, target){
        if(target == "others"){
            box.children[1].className += " chat_others_WeChat";
        }
        if(target == "myself"){
            if(subjects == "others"){
                box.children[0].className += " chat_myself_WeChat_2";
            }
            else{
                box.children[0].className +=  " chat_myself_WeChat";
            }
        }
        location.appendChild(box);
    }
    for(var i = 0; i < chat_num; i++){
        var container = document.createElement("div");
        var name = document.createElement("p");
        var content = document.createElement("p");
        var line = chat_list[i].innerHTML;
        var target = "time";
		if(chat_list[i].parentElement.className.search("innerconversation") != -1){
			if(!is_inner){
				target = "NoRender";
			}
		}
        if(line.slice(0,olength) == others && target != "NoRender"){
            box = Chat_Others(container, name, content, line);
            target = "others";
        }
        if(line.slice(0,mlength) == myself && target != "NoRender"){
            box = Chat_Myself(container, name, content, line);
            target = "myself";
        }
        if(format == "QQ" && target != "time" && target != "NoRender"){
            Render_QQ(box, target);
        }
        if(format == "WeChat" && target != "time" && target != "NoRender"){
            Render_WeChat(box, target);
        }
        if(target == "time"){
            content.innerHTML = line;
            content.className = "time";
            location.appendChild(content);
        }
    }
    var divclear = document.createElement("div");
    divclear.className = "clear";
    location.appendChild(divclear);
}
/*注释说明:
1.window.onload用法:
    window.onload = function(){目标函数};
    若直接使用:
    window.onload = 目标函数
    会调用失败
2.记得分清楚 null 与 "" 之间的不同
3.window.onload无法自动播放音视频。现无解决方案。
4.bug不要改
5.Chat示例：Chat_new("我","张",$20230121redpacket01,"QQ","myself")
*/