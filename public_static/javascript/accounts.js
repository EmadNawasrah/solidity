
$(document).ready(function () {
  var curraccount;
  var selectedAccount;
  $.get('/getAccounts', function (response) {
    for (let i = 0; i < response.length; i++) {
      curraccount = response[i];
      $('#options').append("<option value='" + curraccount + "'>" + curraccount + "</option>");
    }
  })

  $('#submit').click(function () {
    selectedAccount = $('#options').val();
    console.log(selectedAccount);
    $.post('/getBalance', { account: selectedAccount }, function (response) {
      $('.select').removeClass("active");
      $('.send').addClass("active");
      $('#account').text(selectedAccount);
      $('#balance').text(response[0]);
      var current_account_index = response[1].indexOf(selectedAccount);
      response[1].splice(current_account_index, 1); //remove the selected account from the list of accounts you can send to.
      $('#all-accounts').addClass("active");
      var list = $('#all-accounts > ol');
      for (let i = 0; i < response[1].length; i++) {
        li = "<li>" + response[1][i] + "</li>";
        list.append(li)
      }


    })
  })

  $('#send').on("click", function () {
    $('#status').text("Sending...");
    $.post('/addProducts', function (response) {
      console.log(response)
    });
    $.post('/addProduct', function (response) {
      console.log(response)
      if (response.status === 200) {
        $("#productBody").empty();
        $('#status').text("Sent!!");
        $.each(response.data[0], (index, data) => {
          $("#productBody").append(`
            <tr>
              <th scope="row">${index}</th>
              <td>${response.data[0][index]}</td>
              <td>${response.data[1][index]}</td>
              <td>${response.data[2][index]}</td>
              <td>${response.data[3][index]}</td>
              <td>${response.data[4][index]}</td>
            </tr>
          `);
        });
      }
    })
  });
})
