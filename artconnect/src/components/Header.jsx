import React from "react";

function Header({ title }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-4xl font-bold text-[#e94f37]">{title}</h1>
      <hr className="border-[#e94f37] w-24 mx-auto mt-2" />
    </div>
  );
}

export default Header;
