import { Button } from "@components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [deliveryInformation, setDeliveryInformation] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    axios.get("/api/deliveryinfo").then((result) => {
      setDeliveryInformation(result.data);
    });
  }

  async function deleteOrder(orderId) {
    setDeleteConfirmation(orderId);
  }

  async function confirmDeleteOrder(orderId) {
    await axios.delete(`/api/deliveryinfo?id=${orderId}`);
    setDeleteConfirmation(null);
    fetchOrders();
  }

  function cancelDeleteOrder() {
    setDeleteConfirmation(null);
  }

  return (
    <div className="mt-12 max-xl:w-full">
      <div className="p-8 my-4 shadow-xl max-sm:shadow-none max-sm:border-none border rounded-lg  max-lg:flex-col max-lg:gap-5 max-lg:items-center">
        <h3 className=" bg-white/20 border-l-2 border-blue-400 rounded-md p-2 mb-4 font-semibold text-2xl max-sm:text-center max-sm:border-none max-sm:underline">
          basic Information
        </h3>
        <div className="flex items-center gap-6 max-xl:flex-col max-xl:justify-start">
          <div className="flex gap-12 max-sm:text-center max-sm:flex-col max-sm:gap-2">
            <p>Full name:</p>
            <input
              type="text"
              placeholder={session?.user.name}
              readOnly={"readonly"}
              className="px-2 rounded-md w-auto max-sm:text-center"
            />
          </div>
          <div className="flex gap-12 max-sm:text-center max-sm:flex-col max-sm:gap-2">
            <p>Login Email Address:</p>
            <input
              type="text"
              placeholder={session?.user.email}
              readOnly={"readonly"}
              className="px-2 rounded-md w-auto max-sm:text-center"
            />
          </div>
          <div className="flex gap-12 mt-4 max-sm:flex-col max-sm:gap-2 max-sm:text-center">
            <p>Email Contact:</p>
            <input
              type="text"
              placeholder={session?.user.email}
              readOnly={"readonly"}
              className="px-2 rounded-md w-auto max-sm:text-center"
            />
          </div>
        </div>
      </div>
      <div className="shadow-xl border rounded-lg p-4 mt-6 max-sm:shadow-none max-sm:border-none">
        <div>
          <h3 className=" bg-white/20 border-l-2 border-blue-400 rounded-md p-2 mb-4 font-semibold text-2xl max-sm:text-center max-sm:border-none max-sm:underline">
            Order Information
          </h3>
          <div className="max-lg:flex max-lg:gap-8 max-lg:justify-center max-lg:items-center max-lg:flex-col">
            {deliveryInformation.map((items, index) => (
              <div
                key={index}
                className="flex justify-between mb-2 items-center max-lg:flex-col max-lg:gap-2 max-lg:items-start max-sm:w-full"
              >
                <h2>{index + 1}.</h2>
                <div className="profileOrderList">
                  <p className="Title2">City:</p>
                  <label className="font-light">{items.city}</label>
                </div>
                <div className="profileOrderList">
                  <p className="Title2">Address:</p>
                  <label className="font-light">{items.address}</label>
                </div>
                <div className="profileOrderList">
                  <p className="Title2">Postal Code:</p>
                  <label className="font-light">{items.postal}</label>
                </div>
                <div className="profileOrderList">
                  <p className="Title2">Floor:</p>
                  <label className="font-light">{items.floor}</label>
                </div>
                <div className="profileOrderList">
                  <p className="Title2">Door:</p>
                  <label className="font-light">{items.door}</label>
                </div>
                <div className="profileOrderList">
                  <p className="Title2">Product:</p>
                  <label className="font-light">
                    {items.line_items.map((l, index) => (
                      <div key={index}>{l.price_data.product_data.name}</div>
                    ))}
                  </label>
                </div>
                <Button
                  variant="destructive"
                  className="float-right"
                  onClick={() => deleteOrder(items._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">Are you sure you want to delete this order?</p>
            <div className="flex justify-end">
              <Button
                variant="destructive"
                className="mr-2"
                onClick={() => confirmDeleteOrder(deleteConfirmation)}
              >
                Yes, Delete!
              </Button>
              <Button variant="primary" onClick={cancelDeleteOrder}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
