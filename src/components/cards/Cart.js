import React from "react";
import ReactDOM from "react-dom";
import { CartProvider, useCart } from "react-use-cart";

function Page(products) {
  const { addItem, inCart } = useCart();

  return (
    <div>
      {products.map(p => {
        const alreadyAdded = inCart(p.id);

        return (
          <div key={p.id}>
            <button onClick={() => addItem(p)}>
              {alreadyAdded ? "Add again" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Cart() {
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <>
      <h1>
        Cart ({totalUniqueItems} - {cartTotal})
      </h1>

      {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.quantity} x {item.name}
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button onClick={() => removeItem(item.id)}>Remove &times;</button>
          </li>
        ))}
      </ul>
    </>
  );
}

const Appo = () => {
  return (
    <>
      <CartProvider
        id="jamie"
        onItemAdd={item => //console.log(`Item ${item.id} added!`)}
          onItemUpdate = { item => //console.log(`Item ${item.id} updated.!`)}
      onItemRemove={() => //console.log(`Item removed!`)}
      >
        <Cart />
        <Page />
      </CartProvider>
    </>
  );
}

