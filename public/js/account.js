function Datediff(string){
    var date1 = new Date(string)
    var date2 = new Date();
    var date = new Date(date2 - date1);
    var time = "";
    var year = date.getFullYear() - 1970;
    var month = date.getMonth();
    var day = date.getUTCDate() - 1;
    var hour = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var second = date.getUTCSeconds();
    if(year > 0) {time+=year + ' năm trước'; return time;}
    else if(month > 0){ time+=month + ' tháng trước'; return time;}
    else if(day >= 7 && day < 30) {time+= (day/7)+ ' tuần trước'; return time}
    else if(day > 0 && day < 7 ) {time += day + ' ngày trước'; return time}
    else if(hour > 0) {time += hour + ' giờ trước'; return time}
    else if(minutes > 0) {time += minutes + " phút trước"; return time;}
    else time+= second + " giây trước"
    return time;
}
function clicksignout() {
    if (document.getElementById('xxxx').style.display === "") {
        document.getElementById('xxxx').style.display = "block"
        document.getElementById('yyyy').style.display = ""
    }

    else {
        document.getElementById('xxxx').style.display = ''
    }
}
function clickNotification(iduser) {
    if ($('#yyyy').html() === '') {
        $.post('/thongbao', {
            iduser: iduser
        },
            function (data, status) {
                var html = '<div><h6>Thông báo</h6><ul>'
                for (let i = 0; i < data.length; i++) {
                    var x;
                    if (data[i].type === 'baidang') x = '</p> đã tải lên:  "'
                    else x = '</p> đã trả lời:  "'
                    var y;
                    if(!data[i].userurl)
                    y = '<div class="hinhanh-icon" style="background-color:' + data[i].usercolor + ';">' + data[i].userName.substr(0,1) + '</div>'
                    else
                    y = '<div class="hinhanh-icon" style="background-image: url(' + data[i].userurl + ');"></div>'
                    html += ('<li><div class="hinhanh-thongbao">' + y + '</div>'
                        + '<div class="noidung-thongbao">'
                        + '<div class="noidung"><p style="margin-bottom: 0px; display: inline-block; font-weight:bold;">' + data[i].userName + x + data[i].noidung_binhluan + '"</div>'
                        + '<div class="thoigian">' + Datediff(data[i].ngaybinhluan) + '</div></div>'
                        + '<div class="anhlienket" style="background-image: url(' + data[i].url + ');background-image: url(../' + data[i].url + ')"></div>'
                        + '</li>')
                }
                html += '</ul></div>'
                $('#yyyy').html(html);
            }
        )
        document.getElementById('yyyy').style.display = "block"
        document.getElementById('soluong-thongbao').style.display = "none"
        document.getElementById('xxxx').style.display = 'none'
    }
    else {
        var x = document.getElementById('yyyy').style.display;
        if (x === 'block') {
            document.getElementById('yyyy').style.display = 'none';
        }
        else {
            document.getElementById('yyyy').style.display = "block"
            document.getElementById('xxxx').style.display = 'none'
        }
    }
}