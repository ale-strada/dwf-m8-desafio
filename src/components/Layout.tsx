import { loadLocalToken, useUserState } from "hooks/hooks";
import React, { useEffect, useState } from "react";
import {Outlet} from "react-router-dom"
import {Header} from "./Header"

function Layout () {
  loadLocalToken()
  useUserState()
    return (
      <div>
        <Header/>
        <Outlet/>
      </div>
    )

}

export { Layout }

