import { useStoreState, useStoreActions } from "easy-peasy";

export default function useAuth() {
  const createUser = useStoreActions((actions) => actions.auth.createUser);
  const setUser = useStoreActions((actions) => actions.auth.setUser);
  const users = useStoreState((state) => state.auth.data);
  const selectedUser = useStoreState((state) => state.auth.selectedUser);
  const loginUser = useStoreActions((actions) => actions.auth.loginUser);
  const fetchUsers = useStoreActions((actions) => actions.auth.fetchUsers);
  const logoutUser = useStoreActions((actions) => actions.auth.logoutUser);
  const fetchMe = useStoreActions((actions) => actions.auth.fetchMe);
  const updateCredits = useStoreActions(
    (actions) => actions.auth.updateCredits
  );
  const updateUser = useStoreActions((actions) => actions.auth.updateUser);
  return {
    createUser,
    setUser,
    users,
    loginUser,
    fetchUsers,
    selectedUser,
    logoutUser,
    fetchMe,
    updateCredits,
    updateUser,
  };
}
