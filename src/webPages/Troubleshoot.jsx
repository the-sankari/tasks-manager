import React from "react";
import { useTheme } from "../components/Theme";
import SideNavbar from "../components/SideNavbar";
const TroubleShoot = () => {
  const { dark } = useTheme();
  return (
    <div className="flex m-10 justify-center flex-col">
      <div className="md:block hidden flex-none">
        <SideNavbar />
      </div>
      <div className="main flex justify-center">
        <div className="overflow-y-auto max-h-screen custom-scrollbar">
          {" "}
          {/* Container for scrolling */}
          <div className="flex justify-center my-3">

          <h1 className="text-3xl font-bold">Troubleshootings</h1>
          </div>
          <div className="mb-24 mt-4  ">
            <h2 className="text-2xl font-bold">
              Environment Setup Troubleshoot
            </h2>
            <ul className="list-decimal pl-6">
              <li>
                <details>
                  <summary className="text-red-600">
                    Error: "json-server' is not recognized as an internal or
                    external command, operable program or batch file."
                  </summary>

                  <div className="max-w-lg w-full bg-gray-400 p-8 rounded-md shadow-md">
                    <h1 className="text-3xl font-bold mb-4">
                      Install json-server
                    </h1>

                    <h2 className="text-xl font-semibold mb-2">
                      Local Installation:
                    </h2>
                    <p>Ensure you have Node.js installed.</p>
                    <code className="block bg-gray-700 p-2 rounded-md">
                      npm install json-server --save-dev
                    </code>
                    <p>
                      This will install json-server as a development dependency
                      for your project.
                    </p>
                    <p>
                      Update your <code>package.json</code> scripts:
                    </p>
                    <code className="block bg-gray-700 p-2 rounded-md ">
                      "scripts":{" "}
                      {`"server": "json-server -H localhost -p 3010 -w db.json"`}
                    </code>
                    <p>Run the server:</p>
                    <code className="block bg-gray-700 p-2 rounded-md">
                      npm run server
                    </code>

                    <h2 className="text-xl font-semibold mt-6 mb-2">
                      Global Installation:
                    </h2>
                    <p>Install json-server globally:</p>
                    <code className="block bg-gray-700 p-2 rounded-md">
                      npm install -g json-server
                    </code>
                    <p>
                      Now you can use the <code>json-server</code> command from
                      any directory in your terminal.
                    </p>
                  </div>
                </details>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroubleShoot;
