// const deleteProduct = btn => {
//   //const prodId = btn.parentNode.querySelector('[name=productId]').value;
//   const prodId = btn.parentNode.querySelector('[name=roomoId]').value;
//   const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

//   //const productElement = btn.closest('article');
//   const roomoElement = btn.closest('article');

//   //fetch('/admin/product/' + prodId, {
//     fetch('/admin/roomo/' + prodId, {
//     method: 'DELETE',
//     headers: {
//       'csrf-token': csrf
//     }
//   })
//     .then(result => {
//       return result.json();
//     })
//     .then(data => {
//       console.log(data);
//       //productElement.parentNode.removeChild(productElement);
//       roomoElement.parentNode.removeChild(roomoElement);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
