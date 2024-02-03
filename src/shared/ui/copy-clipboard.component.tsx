import React, { FC } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

interface ICopyToClipboardElem {
  text: string;
}

const CopyToClipboardElem: FC<ICopyToClipboardElem> = ({ text }) => {
  return (
    <div
      className="flex justify-center items-center hover:bg-gray-300 rounded-sm p-[0.6rem] cursor-pointer"
      onClick={() => {
        navigator.clipboard
          .writeText(text)
          .then(() => toast.success("Link copied to clipboard!"));
      }}
    >
      <FaRegCopy />
    </div>
  );
};

export default CopyToClipboardElem;
