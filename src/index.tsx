 import React, {Suspense} from "react"
 import ReactDOM from "react-dom/client"
 import {AppRoutes} from "../src/router"
 import {BrowserRouter} from "react-router-dom"
 import {RecoilRoot} from "recoil"
 import { Loading } from "ui/Loading"

 class Home extends React.Component<any,any> {
  constructor(props) {
    super(props);
  }
  render() {return <RecoilRoot>
                    <React.StrictMode>
                     <Suspense fallback={<Loading/>}>
                        <BrowserRouter>
                          <AppRoutes />
                        </BrowserRouter>
                     </Suspense>
                    </React.StrictMode>
                   </RecoilRoot>  
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);

