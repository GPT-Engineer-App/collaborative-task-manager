import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" color="white" fontSize="lg" fontWeight="bold">
          Home
        </Link>
        <Link as={RouterLink} to="/about" color="white" fontSize="lg" fontWeight="bold">
          About
        </Link>
        <Link as={RouterLink} to="/contact" color="white" fontSize="lg" fontWeight="bold">
          Contact
        </Link>
        <Link as={RouterLink} to="/testing-feedback" color="white" fontSize="lg" fontWeight="bold">
          Testing Feedback
        </Link>
        {session ? (
          <>
            <Link as={RouterLink} to="/profile" color="white" fontSize="lg" fontWeight="bold">
              Profile
            </Link>
            <Link as={RouterLink} to="/group-management" color="white" fontSize="lg" fontWeight="bold">
              Group Management
            </Link>
            <Link as={RouterLink} to="/task-management" color="white" fontSize="lg" fontWeight="bold">
              Task Management
            </Link>
            <Button onClick={handleLogout} colorScheme="red" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link as={RouterLink} to="/login" color="white" fontSize="lg" fontWeight="bold">
              Login
            </Link>
            <Link as={RouterLink} to="/register" color="white" fontSize="lg" fontWeight="bold">
              Register
            </Link>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;