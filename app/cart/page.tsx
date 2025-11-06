import AuthProtected from "@/components/AuthProtected/AuthProtected";
import CartDetail from "@/components/CartDetail/CartDetail";

const page = () => {
  return (
    
    <AuthProtected>
      <CartDetail />
    </AuthProtected>
  );
};
export default page;
