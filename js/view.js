var cleararray = "";
var dbVDOTraining = "";
var sViewID = "";


$(document).ready(function () {
  sViewID = getParameterByName('gid');
 	Connect_DB();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbSongkarn = firebase.firestore().collection("Songkarn");
}


function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function ShowVDOmain() {










  var str = "";
  var str1 = "";
  dbVDOGroup
  .where('VDOmain','==',parseInt(sMain))
  .where('VDOgroup','==',parseInt(sGroup))
  .where('VDOdisplay','==',1)
  .limit(1).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str +='<div style="margin-top:50px;background-color: #002d63;height: 270px; overflow: hidden;">';
      str +='<img src="'+doc.data().VDOimg+'" style="width:100%; max-width: 500px;"></div>';
      //str +='<div style="max-height:300px;"><center>';
      //str +='<iframe width="100%" height="280" src="'+doc.data().VDOimg+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      //str +='</center></div>';
      $("#NameVDO").html('<div class="boxvdo-header">'+doc.data().VDOname+'</div>');
      $("#DetailVDO").html('<div class="boxvdo-line1" style="padding-top:10px;height:auto;">'+doc.data().VDOdetail+'</div>');
      $("#ImgVDO").html(str);

      str1 += '<div class="boxvdo-line2"><div class="boxvdo-icon1">';
      str1 += '<img src="./img/video2.png" class="boxvdoimg"> <span>'+doc.data().VDOitem+'</span> Clip</div>';
      str1 += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span>'+ doc.data().VDOclick +' อ่าน</span></div>';
      str1 += '</div></div>';
      $("#SocialICON").html(str1);
    });
    //alert(i);
    //$("#DisplayVDOmain").html(str);
  });
}


function ShowVDOgroup() {
  var i = 0;
  var sPhoto = "";
  //alert(sMain+"===="+sGroup);
  dbVDOTraining.where('VDOmain','==',parseInt(sMain))
  .where('VDOgroup','==',parseInt(sGroup))
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left" onclick="OpenVdo(\''+ doc.id +'\','+i+')">';
      str += '<div class="boxvdo-border member"><div class="boxvdo-img">';
      str += '<img src="'+doc.data().VDOimg+'" class="img-fluid" style="border-radius: 10px;"></div>';
      str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().VDOname+'</div>';
      str += '<div class="boxvdo-line1">'+doc.data().VDOdetail+'</div>';
      str += '<div class="boxvdo-line2"><div class="boxvdo-icon1">';
      str += '<img src="./img/calendar.png" class="boxvdoimg"> <span>'+doc.data().VDOdate+'</span></div>';
      str += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span id="ReadView-'+i+'">'+doc.data().VDOread+' อ่าน</span></div>';
      if(doc.data().VDOquiz==1) {
        str += '<div class="boxvdo-icon"><img src="./img/quizgame.png" class="boxvdoimg"> <span>เก็บคะแนน</span></div>';
      }
      if(doc.data().ShowQuestion==1) {
        str += '<div class="boxvdo-icon"><img src="./img/ask.png" class="boxvdoimg"> <span>'+doc.data().QuestionSend+' คำถาม</span></div>';
      }
      str += '</div></div></div></div>';
    });
    $("#DisplayVDOgroup").html(str);
  });
}


function ShowVDOList() {
  var i = 0;
  var str = "";
  dbVDOTraining.where('VDOmain','==',sVDOmain)
  .where('VDOstatus','==',0)
  .orderBy('VDOtimestamp','desc')
  .limit(10).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      str += '<div class="col-lg-6 col-md-2 slide text-center boxvdo" data-aos="fade-left" onclick="OpenVdo(\''+ doc.id +'\','+i+')">';
      str += '<div class="boxvdo-border member"><div class="boxvdo-img">';
      str += '<img src="'+doc.data().VDOimg+'" class="img-fluid" style="border-radius: 10px;"></div>';
      str += '<div class="boxvdo-title"><div class="boxvdo-header">'+doc.data().VDOname+'</div>';
      str += '<div class="boxvdo-line1">'+doc.data().VDOdetail+'</div>';
      str += '<div class="boxvdo-line2"><div class="boxvdo-icon1">';
      str += '<img src="./img/calendar.png" class="boxvdoimg"> <span>'+doc.data().VDOdate+'</span></div>';
      str += '<div class="boxvdo-icon"><img src="./img/reading.png" class="boxvdoimg"> <span id="ReadView-'+i+'">'+doc.data().VDOread+' อ่าน</span></div>';
      if(doc.data().VDOquiz==1) {
        str += '<div class="boxvdo-icon"><img src="./img/quizgame.png" class="boxvdoimg"> <span>เก็บคะแนน</span></div>';
      }
      if(doc.data().ShowQuestion==1) {
        str += '<div class="boxvdo-icon"><img src="./img/ask.png" class="boxvdoimg"> <span>'+doc.data().QuestionSend+' คำถาม</span></div>';
      }
      str += '</div></div></div></div>';
    });
  $("#DisplayVDOlist").html(str);
  });
}


function GotoVDOGroup(id,x,i,clip) {
  var sCountView = 0;
  dbVDOGroup.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCountView = parseInt(doc.data().VDOclick)+1;
      alert(sCountView);
      dbVDOGroup.doc(id).update({
        VDOclick : parseInt(sCountView) 
      });
    });
    location.href = "learning-group.html?gid="+x+"";
  });

  //alert(id+"==="+x);
  //if(x==1) {
    //location.href = "learning-group.html?gid="+x+"";
  //} else if(x==2) {
  //  location.href = "training-group.html?gid="+x+"";
  //}
}


function OpenVdo(x,r) {
  location.href = "displayvdo.html?gid="+x+"";
}


function CloseAll() {
	document.getElementById('id01').style.display='none';
}



