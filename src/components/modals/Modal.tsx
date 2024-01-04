import { AnimatePresence, MotionStyle, motion } from "framer-motion";
import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import ReactDOM from "react-dom";
import { CloseIcon } from "../../assets";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [rootElement, setRootElement] = useState(null);

  useHotkeys("esc", onClose);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById("root");
    setRootElement(root);
  }, []);

  if (!rootElement) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={onClose}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.1,
            }}
            style={ModalStyles.overlay}
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={ModalStyles.box}
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                scale: 1,
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.1,
              type: "tween",
            }}
          >
            <div className="py-5 px-4 flex items-center justify-between">
              <div>{title && <h3 className="text-2xl">{title}</h3>}</div>
              <button
                onClick={onClose}
                className="p-1.5 cursor-pointer rounded-md duration-100 text-[22px] w-max h-max hover:bg-[#ffffff21]"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="h-[1px] w-full bg-[#ffffff21]" />
            <div className="py-2 px-2">
              <motion.div
                className="w-full px-4 py-2 modal"
                style={ModalStyles.content}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    rootElement
  );
};

const ModalStyles: Record<string, MotionStyle> = {
  box: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: "auto",
    position: "absolute",
    width: "95%",
    maxWidth: "800px",
    height: "max-content",
    padding: "0",
    background: "#000000e0",
    borderRadius: "9px",
    border: "2px solid hsla(0, 0%, 100%, 0.233)",
    zIndex: 1001,
  },
  content: {
    height: "max-content",
    minHeight: "300px",
    maxHeight: "500px",
    overflowY: "auto",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 1000,
  },
};

export default Modal;
