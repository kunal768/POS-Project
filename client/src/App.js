import "./App.css";
import { Staff } from "./staff";
import { Admin } from "./admin";
import { User } from "./user";
import { Login } from "./Login";
import { userType } from "./users";

const App = () => {
  const username = localStorage.getItem("username");
  const usertype = localStorage.getItem("usertype");
  if (!username || !usertype) {
    return <Login />;
  }
  if (usertype === userType.ADMIN) return <Admin />;
  if (usertype === userType.STAFF) return <Staff />;
  return <User />;
};

export default App;
