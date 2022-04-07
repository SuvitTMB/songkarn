var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


$(document).ready(function () {

/*
  sessionStorage.clear();
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"><div id="DisplayVaccine"></div></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  Connect_DB();
*/

  main()

});

async function main() {
  await liff.init({ liffId: "1656865573-d86OODkJ" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
  ShowIMG();
  CheckProfile();
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
  .limit(8)
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
