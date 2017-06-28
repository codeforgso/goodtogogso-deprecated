define(['validator/validator'], function(validator) {
  return {
    modal: function() {
      $('#voter-modal').modal('show');

      $('#voter-modal').on('shown.bs.modal', function() {
        $('#first-name').focus();
      });

      $('#first-name').keyup(function(event) {
          if(event.keyCode == 13){
              $('#voter-name-input').click();
          }
      });

      $('#last-name').keyup(function(event) {
          if(event.keyCode == 13){
              $('#voter-name-input').click();
          }
      });

      $('#voter-name-input').click(function() {
        if ( validator.isNull( $('#first-name').val()) || validator.isNull( $('#last-name').val()) ) {
          alert('first name null');
        }
        else {
        $.ajax({
          url: '../GoodToGoGSOapi/' + $('#first-name').val() + '/' + $('#last-name').val(),
          //url: 'http://vote.codeforgreensboro.org/GoodToGoGSOapi/' + $('#first-name').val() + '/' + $('#last-name').val(),
          data: {
            tables: 'voter'
          },
          success: function(data) {
            console.log(data);
            // if (data.length === 1) {
            //   alert(data[0].first_name + ' ' + data[0].last_name + ' \nVoter Status: ' + data[0].voter_status_reason_desc);
            // }
            if (data.length === 1) {
              let voters = $("#select-voter")
              voters.append('<div style="text-align: left">');
              voters.append('<li>Name: ' + data[0].first_name + " " + data[0].last_name  + '</li>');
              voters.append('<li>Registration: ' + data[0].voter_status_reason_desc + '</li>');

              voters.append('<div id="address">');
              voters.append('<li>' + data[0].res_street_address + '</li><li>' + data[0].mail_city + '</li><li>' +
                data[0].mail_state + '</li><li>' +  data[0].mail_zipcode+ '</li>');

              // national?
              voters.append('<p><strong>National</strong></p>');
              voters.append('<p id="congress">Congress: ' + data[0].cong_dist_abbrv + '</p>') // "cong_dist_abbrv":"13"

              // state?
              voters.append('<p><strong>State</strong></p>');
              voters.append('<li id="ncsenate">NC Senate: ' + data[0].nc_senate_abbrv + '</li>') // "nc_senate_abbrv":"28"
              voters.append('<li id="nchouse">NC House: ' + data[0].nc_house_abbrv + '</li>') // "nc_house_abbrv":"058"

              // local?
              voters.append('<p><strong>Local</strong></p>');
              voters.append('<li id="municipality">County: ' + data[0].county_desc + '</li>') // "county_desc":"GUILFORD"
              voters.append('<li id="municipality">Municipality: ' + data[0].municipality_desc + '</li>') // "municipality_desc":"GREENSBORO"
              voters.append('<li id="district">District: ' + data[0].rescue_dist_desc + '</li>')  // "rescue_dist_desc":"GSO CITY COUNCIL 4"
            }
            else if (data.length > 1) {
              let voters = $("#select-voter")
              $('#select-voter-title').html('Select your current address');
              //var liid = 0;
              $.each(data, function(i, obj) {
                  voters.append('<li><a id="address' + i + '">' + obj.resident_address + '</a></li>');
              });
            }

            else {
              alert('No voter found, check your spelling!');
            }
          }
        });
      }
      });
      console.log('It works!');
    }
  };
});
