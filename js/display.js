var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
$(document).ready(function () {
  if(sessionStorage.getItem("EmpID")==null) { location.href = "index.html"; }
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
  ShowIMG();
}
function ShowIMG() {
  var str = "";
  str += '<div class="grid">';
  dbSongkarn.orderBy('TimeStampDate','desc')
  .limit(30)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //str += '<figure class="effect-zoe" onclick="ViewSongkarn(\''+ doc.id +'\')">';
      str += '<figure class="effect-zoe" onclick="viewpage(\''+ doc.id +'\')">';
      str += '<img src="'+doc.data().SendImg+'"/>';
      str += '<figcaption><div style="font-weight: 600;font-size:11px;">'+doc.data().EmpName+'</div>';
      str += '</figcaption></figure>';
    });
    str += '</div>';
    $("#DisplayImg").html(str);
  });
}
var EidSongkarn = "";
function ViewSongkarn(id) {
  var str = "";
  var sClickView = 0;
  dbSongkarn.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      EidSongkarn = doc.id;
      sClickView = (doc.data().ClickView+1);
      str += '<div style="text-align:left;">';
      str += '<div style="text-align:center; color:#0056ff; padding:8px;">Songkran Family Happy Together </div>';
      str += '<div><img src="'+doc.data().SendImg+'" style="width:100%;"/></div>';
      str += '<div style="font-size:11px; color:#777;line-height:1.2; padding:8px 0;">'+doc.data().SendMemo+'</div>';
      str += '<div style="font-size:11px; color:#0056ff;">ส่งโดย : '+doc.data().EmpName+' | View : '+sClickView+'</div>';
      str += '';
      str += '';
      str += '</div>';
    });
    $("#DisplaySongkarn").html(str);
  });
  document.getElementById('id01').style.display='block';
}
function viewpage(id) {
  location.href = "viewpage.html?gid="+id+"";
}
function GotoViewAll() {
  location.href = "viewall.html";
}
function CloseAll() {
  document.getElementById('id01').style.display='none'; 
}
