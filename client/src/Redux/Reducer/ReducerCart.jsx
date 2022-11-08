const initalState = {
  listCart: [],
};

const ReducerCart = (state = initalState, action) => {
  const data = action.data;
  let listCart = state.listCart;
  switch (action.type) {
    case 'ADD_CART':
      if (listCart.length < 1) {
        listCart.push(data);
      } else {
        //Tìm Vị Trí của sản phẩm đã mua
        const indexCart = listCart.findIndex(value => {
          return value.productId === data.productId;
        });

        //Tìm xem thử sản phẩm này đã mua hay chưa
        const findCart = listCart.find(value => {
          return value.productId === data.productId;
        });

        //Nếu này chưa được mua thì mình push vào
        //Còn đã từng mua rồi thì mình update tại vị trí indexCart mà mình vừa tìm được
        if (!findCart) {
          listCart.push(data);
        } else {
          listCart[indexCart].count =
            parseInt(listCart[indexCart].quantity) + parseInt(data.quantity);
        }
      }

      return (state = {
        listCart: listCart,
      });

    case 'DELETE_CART':
      listCart = listCart.filter(item => item.productId !== data.productId);
      state = {
        id_user: state.id_user,
        listCart: listCart,
      };

      return state;

    case 'DELETE_ALL_CART':
      const data_delete_all_cart = action.data;

      state = {
        listCart: data_delete_all_cart,
      };

      return state;

    case 'UPDATE_CART':
      const data_update_cart = action.data;

      const update_cart = state.listCart;

      const index = listCart.findIndex(value => {
        return value.productId === data.productId;
      });

      listCart[index].quantity = data_update_cart.quantity;

      state = {
        listCart: update_cart,
      };

      return state;

    default:
      return state;
  }
};

export default ReducerCart;
