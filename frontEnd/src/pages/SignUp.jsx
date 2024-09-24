import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  LinearProgress,
  InputAdornment,
  IconButton
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUserThunk } from "../thunk/userInfoThunk";
// import { userAuthKey } from "../auth/authKeys";
import ToastAlerts, {
  Success,
  Error
} from "../components/commonComponents/notifications/ToastAlerts";
import {
  ToastPosition,
  ToastOrder
} from "../components/commonComponents/notifications/alertConfig";

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)"
  }
}));

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  // const { registerSusses } = userAuthKey;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state) => state.userInfo
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // const validateField = (name, value) => {
  //   let error = "";
  //   switch (name) {
  //     case "name":
  //       error = value.trim() === "" ? "Name is required" : "";
  //       break;
  //     case "email":
  //       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //       error = !emailRegex.test(value) ? "Invalid email format" : "";
  //       break;
  //     case "password":
  //       error =
  //         value.length < 8 ? "Password must be at least 8 characters long" : "";
  //       setPasswordStrength(calculatePasswordStrength(value));
  //       break;
  //     default:
  //       break;
  //   }
  //   setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  // };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name": {
        error = value.trim() === "" ? "Name is required" : "";
        break;
      }
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Declare emailRegex inside a block
        error = !emailRegex.test(value) ? "Invalid email format" : "";
        break;
      }
      case "password": {
        error =
          value.length < 8 ? "Password must be at least 8 characters long" : "";
        setPasswordStrength(calculatePasswordStrength(value));
        break;
      }
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const calculatePasswordStrength = (password) => {
    const strengthChecks = {
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return Object.values(strengthChecks).filter(Boolean).length * 20;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const navigateLogin = () => {
    Success("Register is SussesFull");
    setTimeout(() => {
      navigate("/login");
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, profilePicture , firstName , lastName , userName} = formData;

    if ( !email || !password || !lastName || !firstName || !userName) {
      Error("Failed to Sign Up: All fields are required");
      return null;
    }

    const sendFormData = new FormData();

    sendFormData.append("userName", userName);
    sendFormData.append("firstName", firstName);
    sendFormData.append("lastName", lastName);
    sendFormData.append("email", email);
    sendFormData.append("password", password);

    if (profilePicture) {
      sendFormData.append("profilePicture", profilePicture);
    }

    console.log("sendFormData", sendFormData);

    dispatch(signupUserThunk(sendFormData)).then((res)=> {
      if(res.type .includes('rejected')){
        Error("Failed to Sign Up: All fields are required");
      }else {
        navigateLogin();
      }
    })

  };

  return (
    <Container maxWidth="sm">
      <ToastAlerts
        position={ToastPosition.topRight}
        reverseOrder={ToastOrder.ascending}
      />
      <StyledForm onSubmit={handleSubmit} encType="multipart/form-data">
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            name="profilePicture"
            id="profile-picture-upload"
            style={{ display: "none" }}
          />
          <label htmlFor="profile-picture-upload">
            <StyledAvatar
              src={
                formData.profilePicture
                  ? URL.createObjectURL(formData.profilePicture)
                  : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              }
              alt="Profile Picture"
            >
              <FaUpload />
            </StyledAvatar>
          </label>
          <Typography variant="body2" color="textSecondary">
            Click to upload profile picture
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="UserName"
          name="userName"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            "aria-label": "UserName"
          }}
        />
        <TextField
          fullWidth
          label="FirstName"
          name="firstName"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            "aria-label": "FirstName"
          }}
        />
        <TextField
          fullWidth
          label="LastName"
          name="lastName"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            "aria-label": "LastName"
          }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            "aria-label": "Email"
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            "aria-label": "Password",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box>
          <Typography variant="body2" gutterBottom>
            Password Strength
          </Typography>
          <LinearProgress
            variant="determinate"
            value={passwordStrength}
            sx={{
              height: 8,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor:
                  passwordStrength <= 20
                    ? "#f44336"
                    : passwordStrength <= 40
                    ? "#ff9800"
                    : passwordStrength <= 60
                    ? "#ffeb3b"
                    : passwordStrength <= 80
                    ? "#4caf50"
                    : "#2196f3"
              }
            }}
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          Do you have an existing account? <Link to="/login">Log In</Link>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={Object.values(errors).some((error) => error !== "")}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </StyledForm>
    </Container>
  );
};

export default SignUp;
