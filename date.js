window.onload = function() {
    var thaiMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var thaiDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    var today = new Date();
    var day = today.getDay();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear(); // พ.ศ. + 543
  
    var thaiDay = thaiDays[day];
    var thaiMonth = thaiMonths[month];
  
    var dateString = thaiDay + " " + date + " " + thaiMonth + " " + year;
  
    document.getElementById("date").innerText = dateString;
  };
  