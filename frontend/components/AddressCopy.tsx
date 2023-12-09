import React from "react";
import { FaRegCopy } from "react-icons/fa";

const AddressCopy = ({ address }: { address: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex ">
        <p className="text-sm font-medium">{`${address.slice(0, 20)}...`}</p>
        <button onClick={copyToClipboard}>
          <FaRegCopy />
        </button>
      </div>
    </div>
  );
};

export default AddressCopy;
