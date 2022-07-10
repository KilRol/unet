import React from "react";
import "./App.css";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {selectUser, useAppSelector} from "./app/hooks";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import NewFriendsPage from "./pages/NewFriendsPage/NewFriendsPage";
import SubscriptionsPage from "./pages/SubscriptionsPage/SubscriptionsPage";
import FriendsRequestsPage from "./pages/FriendsRequetsPage/FriendsRequestsPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import Friends from "./pages/Friends/Friends";
import Header from "./components/Header/Header";
import styles from "./pages/Page.module.css";

const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className="App">
      <BrowserRouter>
        {user ? (
          <div className={styles.page}>
            <Header/>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" replace/>}/>
              <Route path="auth" element={<AuthPage/>}/>
              <Route path="register" element={<RegisterPage/>}/>
              <Route path="profile" element={<ProfilePage/>}/>
              <Route path="/:id" element={<UserProfilePage/>}/>
              <Route path="edit" element={<EditProfilePage/>}/>
              <Route path="/friends" element={<Friends/>}>
                <Route path="" element={<FriendsPage/>}/>
                <Route path="subscriptions" element={<SubscriptionsPage/>}/>
                <Route path="requests" element={<FriendsRequestsPage/>}/>
                <Route path="find" element={<NewFriendsPage/>}/>
              </Route>
            </Routes>
          </div>
        ) : (
          <div className={styles.page}>
            <Header/>
            <Routes>
              <Route path="/" element={<Navigate to="/auth" replace/>}/>
              <Route path="auth" element={<AuthPage/>}/>
              <Route path="register" element={<RegisterPage/>}/>
              <Route path="*" element={<Navigate to="/auth" replace/>}/>
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
