define(function(){
  return {
    modal: function() {
      $('#voter-modal').modal('show');

      $('#voter-modal').on('shown.bs.modal', function() {
        $('#first-name').focus();
      });
      console.log('It works!');
    }
  };
});
