// ✅ Add this below your existing imports and exports

// ----------------------
// Authentication Helpers
// ----------------------

// Set token (store in localStorage)
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Get token
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Clear token
export const clearToken = () => {
  localStorage.removeItem("token");
};

// ----------------------
// Login API Integration
// ----------------------

// Replace with your backend base URL
const API_BASE_URL = "https://your-backend-url.com/api"; 

// Login user with email + password
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    if (data.token) {
      setToken(data.token); // Save token on successful login
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Register user with signup details
export const registerUser = async (user: {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  bloodType: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    if (data.token) {
      setToken(data.token); // Save token on successful registration
    }

    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
// ...existing code...