import { SvgIcon, SvgIconProps } from '@mui/material';

const ErrorIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} className="WIcon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" fill="white" />
        <path
          d="M12 8.99999V11M12 15H12.0101M5.01854 19H18.9815C20.5333 19 21.5028 17.333 20.7268 16L13.7454 3.99999C12.9694 2.66699 11.0306 2.66699 10.2546 3.99999L3.27317 16C2.49723 17.333 3.46665 19 5.01854 19Z"
          stroke="#FC5935"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

const InfoIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: '20px', height: '20px' }}
      className="WIcon"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16H12V12H11M12 8H12.01M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
          stroke="#4AC6FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

const CheckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: '20px', height: '20px' }}
      className="WIcon"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.25 1C7.91848 1 7.60054 1.10536 7.36612 1.29289C7.1317 1.48043 7 1.73478 7 2C7 2.26522 7.1317 2.51957 7.36612 2.70711C7.60054 2.89464 7.91848 3 8.25 3H10.75C11.0815 3 11.3995 2.89464 11.6339 2.70711C11.8683 2.51957 12 2.26522 12 2C12 1.73478 11.8683 1.48043 11.6339 1.29289C11.3995 1.10536 11.0815 1 10.75 1H8.25Z"
          fill="#666666"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 4.13333C3 3.56754 3.22827 3.02492 3.6346 2.62484C4.04093 2.22476 4.59203 2 5.16667 2C5.16667 2.84869 5.50908 3.66263 6.11857 4.26274C6.72806 4.86286 7.55471 5.2 8.41667 5.2H10.5833C11.4453 5.2 12.2719 4.86286 12.8814 4.26274C13.4909 3.66263 13.8333 2.84869 13.8333 2C14.408 2 14.9591 2.22476 15.3654 2.62484C15.7717 3.02492 16 3.56754 16 4.13333V15.8667C16 16.4325 15.7717 16.9751 15.3654 17.3752C14.9591 17.7752 14.408 18 13.8333 18H5.16667C4.59203 18 4.04093 17.7752 3.6346 17.3752C3.22827 16.9751 3 16.4325 3 15.8667V4.13333ZM13.5159 10.2208C13.7133 10.0196 13.8224 9.75018 13.82 9.47051C13.8175 9.19083 13.7036 8.9233 13.5027 8.72553C13.3019 8.52776 13.0301 8.41558 12.7461 8.41315C12.4621 8.41072 12.1884 8.51823 11.9841 8.71253L8.41667 12.2251L7.01592 10.8459C6.8116 10.6516 6.53795 10.5441 6.2539 10.5465C5.96985 10.5489 5.69814 10.6611 5.49728 10.8589C5.29642 11.0566 5.18249 11.3242 5.18002 11.6038C5.17755 11.8835 5.28675 12.153 5.48408 12.3541L7.65075 14.4875C7.85391 14.6874 8.12941 14.7998 8.41667 14.7998C8.70393 14.7998 8.97943 14.6874 9.18258 14.4875L13.5159 10.2208Z"
          fill="#666666"
        />
      </svg>
    </SvgIcon>
  );
};

const TruckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: '20px', height: '20px' }}
      className="WIcon"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 16.5C8 16.8978 7.84196 17.2794 7.56066 17.5607C7.27936 17.842 6.89782 18 6.5 18C6.10218 18 5.72064 17.842 5.43934 17.5607C5.15804 17.2794 5 16.8978 5 16.5C5 16.1022 5.15804 15.7206 5.43934 15.4393C5.72064 15.158 6.10218 15 6.5 15C6.89782 15 7.27936 15.158 7.56066 15.4393C7.84196 15.7206 8 16.1022 8 16.5ZM15 16.5C15 16.8978 14.842 17.2794 14.5607 17.5607C14.2794 17.842 13.8978 18 13.5 18C13.1022 18 12.7206 17.842 12.4393 17.5607C12.158 17.2794 12 16.8978 12 16.5C12 16.1022 12.158 15.7206 12.4393 15.4393C12.7206 15.158 13.1022 15 13.5 15C13.8978 15 14.2794 15.158 14.5607 15.4393C14.842 15.7206 15 16.1022 15 16.5Z"
          fill="#666666"
        />
        <path
          d="M3 4C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V15C2 15.2652 2.10536 15.5196 2.29289 15.7071C2.48043 15.8946 2.73478 16 3 16H4.05C4.16476 15.4349 4.47136 14.9268 4.91787 14.5618C5.36438 14.1969 5.92332 13.9975 6.5 13.9975C7.07668 13.9975 7.63562 14.1969 8.08213 14.5618C8.52864 14.9268 8.83524 15.4349 8.95 16H10C10.2652 16 10.5196 15.8946 10.7071 15.7071C10.8946 15.5196 11 15.2652 11 15V5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4H3ZM14 7C13.7348 7 13.4804 7.10536 13.2929 7.29289C13.1054 7.48043 13 7.73478 13 8V14.05C13.3217 13.9843 13.6533 13.9826 13.9757 14.045C14.2981 14.1074 14.605 14.2328 14.879 14.4139C15.1529 14.5949 15.3885 14.8282 15.5723 15.1004C15.756 15.3725 15.8844 15.6782 15.95 16H17C17.2652 16 17.5196 15.8946 17.7071 15.7071C17.8946 15.5196 18 15.2652 18 15V10C17.9999 9.73481 17.8946 9.48049 17.707 9.293L15.707 7.293C15.5195 7.10545 15.2652 7.00006 15 7H14Z"
          fill="#666666"
        />
      </svg>
    </SvgIcon>
  );
};
const UserIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      sx={{ width: '20px', height: '20px' }}
      className="WIcon"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.4244 7.69036C13.0673 7.06523 13.4286 6.21739 13.4286 5.33333C13.4286 4.44928 13.0673 3.60143 12.4244 2.97631C11.7814 2.35119 10.9093 2 10 2C9.09069 2 8.21862 2.35119 7.57563 2.97631C6.93265 3.60143 6.57143 4.44928 6.57143 5.33333C6.57143 6.21739 6.93265 7.06523 7.57563 7.69036C8.21862 8.31548 9.09069 8.66667 10 8.66667C10.9093 8.66667 11.7814 8.31548 12.4244 7.69036Z"
          fill="#666666"
        />
        <path
          d="M5.75736 12.8752C6.88258 11.7812 8.4087 11.1667 10 11.1667C11.5913 11.1667 13.1174 11.7812 14.2426 12.8752C15.3679 13.9692 16 15.4529 16 17H4C4 15.4529 4.63214 13.9692 5.75736 12.8752Z"
          fill="#666666"
        />
        <path
          d="M12.4244 7.69036C13.0673 7.06523 13.4286 6.21739 13.4286 5.33333C13.4286 4.44928 13.0673 3.60143 12.4244 2.97631C11.7814 2.35119 10.9093 2 10 2C9.09069 2 8.21862 2.35119 7.57563 2.97631C6.93265 3.60143 6.57143 4.44928 6.57143 5.33333C6.57143 6.21739 6.93265 7.06523 7.57563 7.69036C8.21862 8.31548 9.09069 8.66667 10 8.66667C10.9093 8.66667 11.7814 8.31548 12.4244 7.69036Z"
          stroke="#666666"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.75736 12.8752C6.88258 11.7812 8.4087 11.1667 10 11.1667C11.5913 11.1667 13.1174 11.7812 14.2426 12.8752C15.3679 13.9692 16 15.4529 16 17H4C4 15.4529 4.63214 13.9692 5.75736 12.8752Z"
          stroke="#666666"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export { InfoIcon, ErrorIcon, UserIcon, TruckIcon, CheckIcon };
