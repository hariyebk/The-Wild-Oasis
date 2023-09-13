import Button from "../../ui/Button";
import useCheckinCheckout from "./useCheckinCheckout";

function CheckoutButton({ bookingId }) {
  const {isLoading:isCheckingout, mutate: checkout} = useCheckinCheckout("check-out")
  return (
    <Button variation="secondary" size="small" disabled = {isCheckingout} onClick={() => checkout(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
