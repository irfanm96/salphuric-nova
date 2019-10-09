// $('#contact-form-submit').on('click', function (e) {
//
//     // e.preventDefault();
//
//     let name = $('#name').val();
//     let email = $('#email').val();
//     let subject = $('#subject').val();
//     let message = $('#message').val();
//
//     let data = {
//         name: name,
//         email: email,
//         subject: subject,
//         message: message
//     };
//
//     if (validateEmail(email)) {
//         $.ajax({
//             url: "/api/contact",
//             type: "post",
//             data: data,
//             success: function (response) {
//                 $('#sendmessage').show();
//
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 console.log(textStatus, errorThrown);
//             }
//
//
//         });
//
//     } else {
//         alert('Please enter a valid email');
//     }
//
//
// });
//
// function validateEmail(email) {
//
//     return true;
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }
