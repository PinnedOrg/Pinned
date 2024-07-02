import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { RxPinTop } from "react-icons/rx";

const Wrap = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          variant={"secondary"}
          onClick={goToTop}
          className="fixed shadow-md bottom-4 right-4 opacity-90"
          size="icon"
        >
          <RxPinTop className="text-lg" />
        </Button>
      )}
    </>
  );
};

export default Wrap;
