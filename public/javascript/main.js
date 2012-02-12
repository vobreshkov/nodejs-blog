// ajax

$(function(){
  
  var pusher = new Pusher(PUSHER["app_key"]);
  var channel = pusher.subscribe(PUSHER["channel"]);

  channel.bind(PUSHER["events"], function(data) {
    response(data);
  });
  // create data
  
  $('#create').submit(function(){
    var data = $(this).serialize();
    $.post('/create', data, function(res){
      if(!res.error){
        // Do something!
      }
    });
    return false;
  });
  
})

// utility functions

function notify(type, msg, duration) {
  if (!msg) msg = type, type = 'info';
  duration = duration || 2000;
  var el = $('<li class="' + type + '">' + msg + '</li>');
  $('#flash').append(el);
  setTimeout(function(){ remove(el); }, duration);
}

// add elements to page

function response(res) {
  if (res.error) {
    notify('error', res.error);
  } else {
    if (res.message) notify(res.message);
    if (res.prepend) $(res.to).prepend(res.prepend).hide().fadeIn();
    if (res.append) $(res.to).append(res.append);
    if ($('#noposts')) $('#noposts').remove();
  }
}