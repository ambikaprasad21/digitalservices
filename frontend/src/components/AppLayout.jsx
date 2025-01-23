import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { FaWhatsapp } from "react-icons/fa";

function AppLayout() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "7905194692";
    const message = "Hello I need support 🙋‍♂️";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <div
        onClick={handleWhatsAppClick}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          width: "4rem",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <FaWhatsapp style={{ color: "white", fontSize: "2rem" }} />
      </div>
    </>
  );
}

export default AppLayout;
