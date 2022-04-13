var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
$(document).ready(function () {
  if(sessionStorage.getItem("News")==null) {
    document.getElementById('id01').style.display='block';
  }
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
  dbCheckProfile = firebase.firestore().collection("CheckProfile");
  dbSongkarn = firebase.firestore().collection("Songkarn");
  sessionStorage.setItem("News", "Songkarn");
  CheckProfile();
  ShowIMG();
}


var xCheckProfile = 0;
function CheckProfile() {
  dbCheckProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckProfile = 1;
      sessionStorage.setItem("EmpID", doc.data().empID);
      sessionStorage.setItem("EmpName", doc.data().empName);
      ShowIMG();
    });
    if(xCheckProfile==0) {
      location.href = "register.html";
    }
  });
}


function ShowIMG() {
  var str = "";
  str += '<div class="grid">';
  dbSongkarn.orderBy('TimeStampDate','desc')
  .limit(12)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<figure class="effect-zoe" onclick="viewpage(\''+ doc.id +'\')">';
      str += '<img src="'+doc.data().SendImg+'"/>';
      str += '<figcaption><div style="font-weight: 600;font-size:11px;">'+doc.data().EmpName+'</div>';
      str += '</figcaption></figure>';
    });
    str += '</div>';
    $("#DisplayImg").html(str);
  });
}


function viewpage(id) {
  location.href = "viewpage.html?gid="+id+"";
}

function GotoViewAll() {
  location.href = "viewall.html";
}


function GotoView() {
  location.href = "display.html";
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}
