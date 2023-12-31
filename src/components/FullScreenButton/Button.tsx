import { FC } from "react";

interface FullScreenButtonProps {
  onToggle: () => void;
}

const FullScreenButton: FC<FullScreenButtonProps> = ({ onToggle }) => {
  return (
    <button onClick={onToggle}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-300.000000, -4199.000000)"
            fill="currentColor"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M262.4445,4039 L256.0005,4039 L256.0005,4041 L262.0005,4041 L262.0005,4047 L264.0005,4047 L264.0005,4039.955 L264.0005,4039 L262.4445,4039 Z M262.0005,4057 L256.0005,4057 L256.0005,4059 L262.4445,4059 L264.0005,4059 L264.0005,4055.955 L264.0005,4051 L262.0005,4051 L262.0005,4057 Z M246.0005,4051 L244.0005,4051 L244.0005,4055.955 L244.0005,4059 L246.4445,4059 L252.0005,4059 L252.0005,4057 L246.0005,4057 L246.0005,4051 Z M246.0005,4047 L244.0005,4047 L244.0005,4039.955 L244.0005,4039 L246.4445,4039 L252.0005,4039 L252.0005,4041 L246.0005,4041 L246.0005,4047 Z"
                id="full_screen-[#904]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
};

export default FullScreenButton;
