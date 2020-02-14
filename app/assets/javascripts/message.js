$(function(){
  function buildHTML(message){
    if (message.image){
      var html =
     `<div class="messages">
        <div class="message">
          <div class="message__name">
            <div class="message__name--name">
              ${message.user_name}
            </div>
            <div class="message__name--day">
              ${message.created_at}
            </div>
          </div>
          <div class="message__coments">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    }else{
      var html =
     `<div class="messages">
        <div class="message">
          <div class="message__name">
            <div class="message__name--name">
              ${message.user_name}
            </div>
            <div class="message__name--day">
              ${message.created_at}
            </div>
          </div>
          <div class="message__coments">
            <p class="lower-message__content">
              ${message.content}
            </p> 
          </div>
        </div> 
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData:false,
      contentType:false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html);
       $('.chat-main__message-list').animate({ scrollTop: $('.messages')[0].scrollHeight});      
       $('form')[0].reset();
       $('.submit-btn').prop('disabled', false);
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
     })
  });
});