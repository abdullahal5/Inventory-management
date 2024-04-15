import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.config";
import { Navigate, useLocation } from "react-router-dom";
import { setUser, toggleLoading } from "../../redux/features/auth/authSlice";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import FindUser from "../../hooks/FindUser";

const PrivateRoute = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [findUser, setFindUser] = useState(null);

  const { email, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
          })
        );
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });

    const GetData = async () => {
      const userData = await FindUser({ email });
      setFindUser(userData);
    };

    GetData();
  }, [dispatch, email]);

  if (isLoading) {
    return <Loading />;
  }

  if (!email) {
    toast.error("Please Login or Register First");
    return (
      <>
        <Toaster />
        <Navigate to="/login" state={{ path: pathname }} />
      </>
    );
  }

  if (email === findUser?.email) {
    return children;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
