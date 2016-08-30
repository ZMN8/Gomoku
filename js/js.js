/**
 * Created by Administrator on 2016/8/19.
 */
var ulNode=document.getElementsByTagName("ul")[0];
var a=[];//创建二维数组
var chessBox=document.querySelector("#chessBox");
var bol=true;
function fun(row){
    var col=25;//每行25个
    var frag=document.createDocumentFragment();
    for(i=0;i<col;i++){
        for(j=0;j<row;j++) {
            var liNode = document.createElement("li");
            frag.appendChild(liNode);
        }
    }
    ulNode.appendChild(frag);
    for(i=0;i<=col;i++){
        a[i]=[];//声明一维数组的每个元素都是一个数组
        for(j=0;j<=row;j++) {
            a[i][j]=false;//二维数组每个元素都是false
        }
    }
}

fun(10);
chessBox.onclick=function(e){
    var current=document.querySelector(".current");
    var event=window.event || e;//事件对象
    var chessBodyPosX=chessBox.offsetLeft;//chessman的DIV与body左边的距离
    var chessBodyPosY=chessBox.offsetTop;//chessman的DIV与body上边的距离
    var chessPosX=event.pageX;//鼠标点击位置距网页（body）左边的距离
    var chessPosY=event.pageY;//鼠标点击位置距网页（body）上边的距离
    var posX=Math.round((chessPosX-chessBodyPosX)/40);//横坐标
    var posY=Math.round((chessPosY-chessBodyPosY)/40);//纵坐标
    var iNode=document.createElement("i");
    iNode.style.left=posX*40-15+"px";
    iNode.style.top=posY*40-15+"px";
    console.log(posX,posY);
    if(a[posX][posY]!=false){//如果当前位置已经有棋子了，则不做任何操作
        return;
    }
    if(bol){            //下黑棋
            iNode.className="black";
            a[posX][posY]="black";
            bol=false;
        current.style.top="0";
    }else{              //下白棋
        iNode.className="white";
        a[posX][posY]="white";
        bol=true;
        current.style.top="82px";
    }
    chessBox.appendChild(iNode);

    for(i=0;i<a.length;i++){
        for(j=0;j<a[1].length;j++) {
                if (a[i][j]=="black") {
                    if(judge(i, j, "black")=="winer"){
                        chessBox.onclick=null;
                        return alert("恭喜你赢了");
                    }
                }
                if (a[i][j] == "white") {
                    if(judge(i, j, "white")=="loser"){
                        chessBox.onclick=null;
                        return alert("你输了！再接再厉！");
                    }
                }
        }
    }
};


function judge(m,n,color){
    var countY=jgY(m,n,color);//纵向判断
    var countX=jgX(m,n,color);//横向判断
    var countZ=jgZ(m,n,color);//斜向判断
    if(((countX==5)||(countY==5)||(countZ==5))&&(color=="black")){
        return "winer";
    }
    if(((countX==5)||(countY==5)||(countZ==5))&&(color=="white")){
        return "loser";
    }
}

function jgY(x,y,color){
    var count=1;//已经存在一颗黑/白棋
    if(y-4<0){                  //向上没有五格
        for(var c=0;c<y;c++){
            if((a[x][c]==color)){//判断向上有几颗
                count++;
            }
        }
        funDown(x,y,color,count);//向下查询的函数
    }else{                          //向上有五格
        for(var d=1;d<5;d++){
            if((a[x][y-d]==color)){//判断向上有几颗
                count++;
            }
        }
        funDown(x,y,color,count);//向下查询的函数

    }
    return count;
}
function  funDown(x,y,color,count) {
    if(y+4>a[1].length-1){           //向下没有五格
        for(var g=y+1;g<=a[1].length-1;g++){
            if((a[x][g]==color)){//判断向下有几颗
                count++;
            }
        }
    }else{                      //向下有五格
        for(var h=1;h<5;h++){
            if((a[x][y+h]==color)){//判断向下有几颗
                count++;
            }
        }
    }
    return count;
}


function jgX(x,y,color){
    var count=1;//已经存在一颗黑/白棋
    if(x-4<0){                  //向左没有五格
        for(var c=0;c<x;c++){
            if((a[c][y]==color)){//判断向左有几颗
                count++;
            }
        }
        funRight(x,y,color,count);//向右查询的函数
    }else{                          //向左有五格
        for(var d=1;d<5;d++){
            if((a[x-d][y]==color)){//判断向左有几颗
                count++;
            }
        }
        funRight(x,y,color,count);//向右查询的函数
    }
    return count;
}

function funRight(x,y,color,count){
    if(x+4>a.length-1){           //向右没有五格
        for(var g=x+1;g<a.length;g++){
            if((a[g][y]==color)){//判断向右有几颗
                count++;
            }
        }
    }else{                      //向右有五格
        for(var h=1;h<5;h++){
            if((a[x+h][y]==color)){//判断向右有几颗
                count++;
            }
        }
    }
}


function jgZ(x,y,color){
    var count=1;//已经存在一颗黑/白棋
    if((x-4<0)||(y-4<0)){                  //向左或向上都没有五格
        var min1=Math.min(x,y);
        for(var c=1;c<=min1;c++){
            if((a[x-c][y-c]==color)){//左上角有几颗
                count++;
            }
        }
        funRightDown(x,y,color,count);//右下角查询函数
    }else{                          //向左或向上都有五格
        for(var d=1;d<5;d++){
            if((a[x-d][y-d]==color)){//判断向左有几颗
                count++;
            }
        }
        funRightDown(x,y,color,count);//右下角查询函数

    }


    if((x+4>a.length-1)||(y-4<0)){      //向右或向上都没有五格
        var min4=Math.min(a.length-1-x,y);
        for(var cc=1;cc<=min4;cc++){
            if((a[x+cc][y-cc]==color)){//右上角有几颗
                count++;
            }
        }
        funLeftDown(x,y,color,count);//左下角查询函数
    }else{                          //向右或向上都有五格
        for(var dd=1;dd<5;dd++){
            if((a[x+dd][y-dd]==color)){//判断向左有几颗
                count++;
            }
        }
        funLeftDown(x,y,color,count);//左下角查询函数
    }
    return count;
}

function  funLeftDown(x,y,color,count) {
    if((x-4<0)||(y+4>a[1].length-1)){            //向左或向下没有五格
        var min5=Math.min(x,a[1].length-1-y);
        for(var ee=1;ee<=min5;ee++){
            if((a[x-ee][y+ee]==color)){//左下角有几颗
                count++;
            }
        }
    }else{                         //向左或向下有五格
        for(var ff=1;ff<5;ff++){
            if((a[x-ff][y+ff]==color)){//左下角有几颗
                count++;
            }
        }
    }
}

function funRightDown(x,y,color,count) {
    if((x+4>a.length-1)||(y+4>a[1].length-1)){            //向右或向下没有五格
        var min2=Math.min(a.length-1-x,a[1].length-1-y);
        for(var e=1;e<=min2;e++){
            if((a[x+e][y+e]==color)){//右下角有几颗
                count++;
            }
        }
    }else{                         //向右或向下有五格
        for(var f=1;f<5;f++){
            if((a[x+f][y+f]==color)){//右下角有几颗
                count++;
            }
        }
    }

}