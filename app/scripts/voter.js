import validator from 'validator';

export function getVoter() {
  if ( validator.isNull( $('#first-name').val()) || validator.isNull( $('#last-name').val()) ) {
    alert('Check name');
  }
  else {
    $.ajax({
      url: 'http://localhost:8123/GoodToGoGSOapi/' + $('#first-name').val() + '/' + $('#last-name').val(),
      data: {
        tables: 'voter'
      },
      success: function(data) {
        console.log(data);
        if (data.length === 1) {
          alert(data[0].first_name + ' ' + data[0].last_name + ' \nVoter Status: ' + data[0].voter_status_reason_desc);
        }
        else if (data.length > 1) {
          let voters = $("#select-voter")
          $('#select-voter-title').html('Select your address');
          $.each(data, function(i, obj) {
              voters.append('<li><a>' + obj.resident_address + '</a></li>')
          });
        }
        else {
          alert('No voter found, check your spelling!');
        }
      }
    });
  }
};
