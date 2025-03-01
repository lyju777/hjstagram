import React from "react";
import "./app.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import SendEmailPage from "./pages/sendemailPage";
import AuthPage from "./pages/authPage";
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import EditProfilePage from "./pages/editprofilePage";
import ChangePasswordPage from "./pages/changepasswordPage";
import MainEditFile from "./pages/mainEditFile";
import Profile_changePage from "./pages/profile_changePage";
import RecoverPassword from "./components/auth/RecoverPassword";
import UpdatePassword from "./components/auth/UpdatePassword";
import OtherProfilePage from "./pages/other_profilePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* [ ] 배열처리는 /@username 이나 / 으로 url입력했을때 둘중 하나로 해도 보이도록 하는것 */}
          <Route path={["/login", "/"]} component={LoginPage} exact />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/sendemail" component={SendEmailPage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/recover_password" component={RecoverPassword} />
          <Route
            path="/update-password/:userId/:token"
            render={({ match }) => (
              <UpdatePassword
                userId={match.params.userId}
                token={match.params.token}
              />
            )}
          />
          
          <PrivateRoute path="/main" component={MainPage} />
          <PrivateRoute path="/profiles" component={ProfilePage} />
          <PrivateRoute path="/editprofile" component={EditProfilePage} />
          <PrivateRoute path="/changepassword" component={ChangePasswordPage} />
          <PrivateRoute path="/main_edit_file" component={MainEditFile} />
          <PrivateRoute path="/profile_change" component={Profile_changePage} />
          <PrivateRoute
            path="/namprofiles/:id"
            component={(props) => (
              <OtherProfilePage {...props} id={props.match.params.id} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
