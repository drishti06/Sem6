import React, { useEffect, useState } from "react";
import { ContextData } from "./ContextData";

function Store({ children }) {
  return <ContextData.Provider value={{}}>{children}</ContextData.Provider>;
}

export default Store;
