import useAuth from "./hooks/useAuth";
import { useEffect, useState } from "react";

export default function Total({ total }) {
  const { selectedUser } = useAuth();
  const [canAfford, setCanAfford] = useState(false);

  useEffect(() => {
    if (selectedUser.credits > total) {
      setCanAfford(true);
    }
  }, []);
  return (
    <div>
      <h3>Credit Balance</h3>
      <h1> {selectedUser.credits} credits</h1>
      <h3>Total</h3>
      <h1>{total} credits</h1>
      {canAfford ? (
        <button onClick={() => navigate("/loading")}>Start Cramming</button>
      ) : (
        <button onClick={() => navigate("/purchase")}>Purchase Credits</button>
      )}
    </div>
  );
}
