function jaxPost() {

    let userid = String(document.getElementById("userid").value);
    let content = String(document.getElementById("content").value);
    
    //get date, courtesy https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
    let d = new Date,
    dformat = [d.getMonth()+1,
               d.getDate(),
               d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
    
    // Data which will need to add in a file.
    // this data will be later parsed into JSON
    let result = '{"userid":' + '"' + userid + '","content":' + '"' + content + '","date":"' + dformat + '"}';
    let data = JSON.parse(result);
    let payload = JSON.stringify(data);

    //jax sends payload into space and retrieves space station
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://180.76.152.39:29999", true);
    xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
    //dont send json, stringify it
    xhttp.send(payload);  

    if (xhttp.status!=200) {
        document.getElementById("board").innerHTML = "Server offline or error, please contact admin!"
    };
    xhttp.onload = function() {
      }
    retrieve()
    //i dunno how would this work, would there be magic?
  }

function retrieve() {
    // just retrieve
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://180.76.152.39:29999", true);
    xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')



    xhttp.onload = function() {
      let temp = JSON.parse(this.responseText);
      let tempLength = temp.length;
      //clears board
      document.getElementById('board').innerHTML = '';
      for (let i = 0; i <= tempLength-1; i++){
        render(temp[i].userid, temp[i].content, temp[i].date, String(i+1))
      };
      }
    xhttp.send();
    if (xhttp.status!=200) {
        document.getElementById("board").innerHTML = "Server offline or error, please contact admin!"
    }

}

//intended to be used inside jaxPOST and retrieve
//accepts the three stuff: userid, content and date
//then renders them in different divs
//divs are numbered by DATE; this is a very random decision because we wont interact with these generated divs anyways :p
function render(userid, content, date, no){
  let newDiv = document.createElement('date');
  let zzz = document.createTextNode(date + ' | ');
  let a = document.createTextNode(userid);
  let b = document.createElement('br')
  let c = document.createTextNode(content)
  let d = document.createElement('hr')
  let e = document.createTextNode(no + '楼')
  newDiv.appendChild(zzz);
  newDiv.appendChild(a);
  newDiv.appendChild(b);
  newDiv.appendChild(c);
  newDiv.appendChild(e)
  newDiv.appendChild(d);
  document.getElementById('board').innerHTML += newDiv.innerHTML;
}